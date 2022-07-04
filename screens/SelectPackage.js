import React,{useContext, useState, useEffect} from 'react';

import {
  ScrollView, 
  ImageBackground, 
  View,
  Text, 
  Image, 
  TouchableOpacity
} from 'react-native';

import Accordion from 'react-native-collapsible/Accordion';

import UserContext from './../contexts/UserContext';

import _ from 'lodash';

import styles from './../Stylesheet';

const SelectPackage = (props) => {

  const {getLang, userData ,getAreawiseSetting, setSelectedPackage} = useContext(UserContext);
  const [packages, setPackages] = useState(false);
  const [activeSections, setActiveSections] = useState([0]);

  useEffect(() => {
    getAreawiseSetting(userData.MemberLoginID[0], (res) => {      
      setPackages(_.groupBy(res,'PackageValidity.0'));
    });
  },[]);

  const onBack = () => {
    props.navigation.navigate('Dashboard');
  }

  const getPackageColor = (pkg) => {
    return {
      "30": "#f5941f",
      "60": "#00a7e4",
      "90": "#91c14a",
      "120": "#5d025a",
      "360": "#ef6fac",

    }[pkg];
  }

  const showPackage = (pkgid) => (e) => {
    setSelectedPackage(pkgid);
    props.navigation.navigate('PackageDetails');
  }

  const renderPackages = () => {
        
    return (<ScrollView>
      <Accordion      
        sections={Object.keys(packages)}        
        activeSections={activeSections}
        renderHeader={ pkg => <View style={{...styles.row,...styles.packageBox}}>
          <View style={{width: 5, height: 60, marginRight: 5}}><View style={{...styles.packageColor, backgroundColor: getPackageColor(pkg)}}></View></View>
          <View>
            <Text style={styles.packageTitle1}>{pkg}</Text>
            <Text style={styles.packageTitle2}>Days</Text>
          </View>
          <Text style={{marginLeft: 'auto', marginTop: 20, marginRight: 5}}>UPGRADE PLAN</Text>
        </View>}
        renderContent={ pkg => <View style={styles.helpContentBox}>{packages[pkg].map(p => <TouchableOpacity onPress={showPackage(p.PackageId[0])} key={p.PackageId[0]}>
          <View style={{...styles.row, marginBottom: 5}}>
            <View style={styles.dotGrey}></View>
            <Text style={styles.packageAmt}>{"Rs "+p.PlanAmount[0]}</Text>
            <Text style={styles.packageDesc}>{p.PlanName[0]}</Text>
            <Image source={require('./../images/appicons/Paper-Plane.png')} style={{width: 20, height: 20, marginLeft: 'auto'}} />
          </View>
        </TouchableOpacity>)}</View>}
        onChange={setActiveSections}
        align="center"
        underlayColor="#eee"
      /></ScrollView>)    
  }

  return <ImageBackground source={require('./../images/site-bg.jpg')} style={styles.screenBackground}>
    <ScrollView style={{width: "100%"}} contentContainerStyle={styles.template1Wrapper}>
        
        <View style={{...styles.template2Header,backgroundColor: '#ffffff00'}}>
          <TouchableOpacity onPress={onBack}><Image source={require('./../images/header/back-icon-black.png')} style={{width: 25, height: 25}} /></TouchableOpacity>
          <Text style={{...styles.heading1, fontSize: 20, marginTop: -25}}>{getLang('selectPackage.heading')}</Text>          
        </View>       

        <View style={{width: "80%", marginTop: -30,marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, paddingRight: 1, paddingBottom: 4, backgroundColor: "rgba(0,0,0,0.03)"}}>
          <View style={{width: '98%', justifyContent: 'flex-start', backgroundColor: '#ffffff11', borderRadius: 10,  marginLeft: 2}}>
            {packages!==false && renderPackages()}            
          </View>
        </View>
      </ScrollView>    
  </ImageBackground>;
}

export default SelectPackage;
