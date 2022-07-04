import React,{useContext, useState, useEffect} from 'react';

import {
  ScrollView, 
  ImageBackground, 
  View,
  Text, 
  Image, 
  TouchableOpacity
} from 'react-native';

import { CheckBox } from 'react-native-elements';

import UserContext from './../contexts/UserContext';

import _ from 'lodash';

import styles from './../Stylesheet';

import Utils from './../Utils';

const SelectPayGate = (props) => {

  const {getLang, getPayGates, addPaymentGatewayToPayPackage} = useContext(UserContext);
  const [gateways,setGateways] = useState(false);
  const [gway, setGway] = useState(0); 
  
  const onBack = () => {
    props.navigation.navigate('PackageDetails');
  }

  const payNow = () => {    
    addPaymentGatewayToPayPackage(gateways.filter(g => g.PGID===gway)[0]);
    props.navigation.navigate('GoPay');
  }

  useEffect(()=> { getPayGates(setGateways); },[]); //== load gateways
  useEffect(()=> { 
    if(_.get(gateways,'0.PGID',false)){
      setGway(gateways[0].PGID); 
    }
  },[gateways]);
 

  const renderPayGates = () => <>
    <View style={{width: "90%", marginTop: 10, marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, paddingRight: 1, paddingBottom: 4, backgroundColor: "rgba(0,0,0,0.03)"}}>
      <View style={{width: '98%', justifyContent: 'flex-start', backgroundColor: '#ffffff99', borderColor: '#ff9900', borderWidth: 2, borderRadius: 10,  marginLeft: 2, padding: 10}}>
        <View style={styles.row}>
          {showOptions()}          
        </View>
        <TouchableOpacity onPress={payNow}>
          <Image source={require('./../images/Buttons/Pay-Now-Button.png')} style={{height: 50, width: 140, marginLeft: 'auto', marginRight: 'auto'}} />
        </TouchableOpacity>
      </View>
    </View>
  </>

  const showOptions = () => <View>
    {gateways.map(g => <View style={{...styles.row, padding: 5}} key={g.PGID}>
      <CheckBox        
        title={g.btnFace}
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        onPress={() => setGway(g.PGID)}
        checked={ gway === g.PGID }
        containerStyle={{borderWidth: 0, justifyContent: 'flex-start', margin: 0}}
      />      
    </View>)}

  </View>;




  return <ImageBackground source={require('./../images/site-bg.jpg')} style={styles.screenBackground}>
    <ScrollView style={{width: "100%"}} contentContainerStyle={styles.template1Wrapper}>

        <View style={{...styles.template2Header,backgroundColor: '#ffffff00'}}>
          <TouchableOpacity onPress={onBack}><Image source={require('./../images/header/back-icon-black.png')} style={{width: 25, height: 25}} /></TouchableOpacity>
          <Text style={{...styles.heading1, fontSize: 20, marginTop: -25}}>{getLang('selectPayGate.heading')}</Text>          
        </View>       

        <ScrollView style={{width: "95%", marginTop: -30,marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto'}}>
          <View style={{justifyContent: "center", alignItems: "center", margin: 10}}>
            {gateways===false && <Text style={styles.bold}>{getLang('selectPayGate.notfound')}</Text>}
            {gateways!==false && renderPayGates()}
          </View>
        </ScrollView>

        
    </ScrollView>    
  </ImageBackground>;


};

export default SelectPayGate;