import React,{useState,useEffect,useContext} from 'react';

import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity
} from 'react-native';

import {Icon} from 'react-native-elements';

import styles from './../Stylesheet';

import _ from 'lodash';

import Utils from './../Utils';

import UserContext from './../contexts/UserContext';

import PureChart from 'react-native-pure-chart';

const DataUsage = (props) => {

  const {getLang, userData} = useContext(UserContext);
  const [data,setData] = useState(false);

  const onBack = () => {
    props.navigation.goBack();
  }

  useEffect(()=> {    
    Utils.axios('GetUsageDetails', {memberId: userData.MemberId[0]}, (res,err) => {
        setData(_.get(res,'table.0.Table1',{}));
      });
  },[])

  const renderGraph = () => {

    /*<SessionTime>353</SessionTime>
    <ActiveTime>353</ActiveTime>
    <DownloadData>1.13</DownloadData>
    <UploadData>0.94</UploadData>
    <TotalDataTransfer>2.07</TotalDataTransfer>
    <AllotedData>10240</AllotedData>
    <RemainData>10237.93</RemainData>*/

    /*const gdata = {      
      SessionTime: [353],
      ActiveTime: [353],
      DownloadData: [1.13],
      UploadData: [0.94],
      TotalDataTransfer: [1049.07],
      AllotedData: [10240],
      RemainData: [9190.93]
    };*/

    const gdata = {...data};

    let sampleData = [
      {
        value: parseFloat(_.get(gdata,'TotalDataTransfer.0',0)),
        label: getLang('dataUsage.title1'),
        color: '#88ff88'
      }, {
        value: parseFloat(_.get(gdata,'RemainData.0',0)),
        label: getLang('dataUsage.title2'),
        color: '#8888ff'
      }, {
        value: parseFloat(_.get(gdata,'AllotedData.0',0)),
        label: getLang('dataUsage.title3'),
        color: '#ff6666'        
      }  
    ];

    return (
      <ScrollView>
        <View style={styles.centermiddle}><PureChart data={sampleData} type='pie' /></View>

        {sampleData.map((d,idx) => <View key={idx} style={{...styles.row, marginTop: 10, marginLeft: 40}}>
          <View style={{...styles.dotRed, backgroundColor: d.color, marginRight: 20}}></View>
          <Text style={{flex: 0.5, fontSize: 18}}>{d.label}</Text>
          <Text style={{flex: 0.4, fontSize: 18}}>{d.value} MB</Text>
        </View>)}

        <View style={{...styles.row, marginTop: 20,borderWidth: 1, borderColor: '#cccccc', padding: 10}}>
          <Icon type="font-awesome" name="arrow-up" />
          <Text style={{fontSize: 18, marginLeft: 10}}>{getLang('dataUsage.upload')}: {_.get(gdata,'UploadData.0',0)} MB</Text>
        </View>

        <View style={{...styles.row, marginTop: 10,borderWidth: 1, borderColor: '#cccccc', padding: 10}}>
          <Icon type="font-awesome" name="arrow-down" />
          <Text style={{fontSize: 18, marginLeft: 10}}>{getLang('dataUsage.download')}: {_.get(gdata,'DownloadData.0',0)} MB</Text>
        </View>

      </ScrollView>
      );

  }
  
  return <ImageBackground source={require('./../images/site-bg.jpg')} style={styles.screenBackground}>
    <View style={styles.template1Wrapper}>
        
        <View style={{...styles.template1Header, minHeight: 60, maxHeight: 60}}>
          
          <View style={styles.row}>
            <TouchableOpacity onPress={onBack}><Image source={require('./../images/header/back-icon.png')} style={{width: 25, height: 25}} /></TouchableOpacity>
            <Text style={styles.headingWhite}>{getLang('dataUsage.heading')}</Text>
          </View>
        
        </View>

        <View style={styles.template1Body}>          
          <ScrollView>
            {data!==false && _.get(data,'AllotedData.length',0)===1 && renderGraph()}
            {data!==false && _.get(data,'AllotedData.length',0)===0 && <Text style={styles.centermiddle}>{getLang('dataUsage.norecords')}</Text>}
          </ScrollView>
        </View>
      </View>    
  </ImageBackground>;
}

export default DataUsage;