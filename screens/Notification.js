import React, { useEffect, useState, useContext } from 'react';

import {
  ScrollView, 
  ImageBackground, 
  View,
  Text, 
  Image, 
  TouchableOpacity
} from 'react-native';

import UserContext from '../contexts/UserContext';

import _ from 'lodash';

import styles from '../Stylesheet';

import Utils from '../Utils';

const Notification = (props) => {

  const {getNotifications, delNotification, getLang} = useContext(UserContext);  

  const onBack = () => {
    props.navigation.goBack();
  }

  const delNots = (nid) => (e) => {
    const dnid = nid+'';
    delNotification(nid,(nids) => {      
      if(dnid.split(',').length > 1){
        setSel([]);
      }else{
        setSel(sel.filter(s => s!=dnid));
      }
      setNots(nids);
    });
  }

  const [nots, setNots] = useState(false);/*[
    {
      NotifyId: [1],
      isNotify: [true],
      NotificationMessage: ["Your Complaint No.: TAI1121345 has been updated successfully. Thank you."]
    },
    {
      NotifyId: [2],
      isNotify: [false],
      NotificationMessage: ["This is notified message."]
    }
  ]);*/

  const [sel, setSel] = useState([]);

  const selectNots = (nid) => {
    if(sel.includes(nid)){
      setSel(sel.filter(s => s!=nid));
    }else{
      setSel([...sel,nid]);
    }
  }

  
  useEffect(() => {
    getNotifications(setNots);
  },[]);

  const renderNots = () => <>
    {nots.length === 0 && <Text style={{...styles.center,...styles.bold}}>{getLang('notifications.norecords')}</Text>}
    {nots.map(n => <View style={{...styles.row, padding: 5}} key={n.NotifyId[0]}>
      {sel.includes(n.NotifyId[0]) && <View style={styles.dotRed} />}
      {!sel.includes(n.NotifyId[0]) && <View style={styles.dotGrey} />}      
      <View style={{flexDirection: "column", flex: .8, borderWidth: 1, borderColor: '#ddd', borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderRightWidth: 0, padding: 0, paddingLeft: 10, marginLeft: 5}}>
        <TouchableOpacity onPress={() => selectNots(n.NotifyId[0])}>
        <View style={styles.col}>
          <Text>{n.NotificationMessage[0]}</Text>
        </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={delNots(n.NotifyId[0])} style={{flexDirection: "column", flex: .2, backgroundColor: '#d32929', borderTopRightRadius: 5, borderBottomRightRadius: 5, padding: 10}}>
        <Image source={require('./../images/appicons/Recycle.png')} style={{...styles.centermiddle, width: 24, height: 35}} />
      </TouchableOpacity>
    </View>)}
  </>;

  return <ImageBackground source={require('./../images/site-bg.jpg')} style={styles.screenBackground}>
    <ScrollView style={{width: "100%"}} contentContainerStyle={styles.template1Wrapper}>

      <View style={{...styles.template2Header,backgroundColor: '#ffffff00'}}>
        <TouchableOpacity onPress={onBack}>
          <Image source={require('./../images/header/back-icon-black.png')} style={{width: 25, height: 25}} />
        </TouchableOpacity>
        <Text style={{...styles.heading1, fontSize: 20, marginTop: -25}}>{getLang('notifications.heading')}</Text>          
        {sel.length > 0 && <TouchableOpacity onPress={delNots(sel.join(','))} style={{flexDirection: 'row', backgroundColor: '#d32929', borderRadius: 5, marginTop: 20, padding: 10}}>
          <Image source={require('./../images/appicons/Recycle.png')} style={{width: 24, height: 35}} />
          <Text style={styles.headingWhite}>{getLang('notifications.delBtn')}</Text>
        </TouchableOpacity>}
      </View>

      <ScrollView style={{width: "95%", marginTop: -30,marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto'}}>
        {nots!==false && renderNots()} 
      </ScrollView>
    </ScrollView>
  </ImageBackground>;
}

export default Notification;