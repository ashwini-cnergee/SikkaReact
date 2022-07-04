import React, { useState,useContext, useRef, useEffect } from 'react';

import UserContext from './../contexts/UserContext';

import {
  View,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  TextInput,  
  TouchableOpacity
} from 'react-native';

import {Button} from 'react-native-elements';

import styles from '../Stylesheet';

import Utils from './../Utils';

import _ from 'lodash';

const Otp = (props) => {

  const [otp,setOtp] = useState(['','','','']);

  const {memberData, getLang, sendOTP,verifyOTP} = useContext(UserContext); 

  const otpBox = [useRef(null),useRef(null),useRef(null),useRef(null)];

  const afterScreen = _.get(props,'route.params.afterScreen','Dashboard');

  const resendOTP = () => {
    sendOTP(memberData,function(){
      setOtp(['','','','']);      
    });
  }
  
  const submitOTP = () => {
    verifyOTP(otp.join(''),function(){
      setOtp([...otp.fill('')]);
      props.navigation.navigate("AuthAccount",{afterScreen: afterScreen});     
    });
  }

  const isOTPFilled = () => {
    return otp.join('').length === 4;
  }

  const hasGotFocus = (idx) => {
    return otp.join('').length === idx;
  }

  return <ImageBackground source={require('./../images/site-bg.jpg')} style={styles.screenBackground}>
    <View style={styles.template1Wrapper}>
        
        <View style={styles.template1Header}>
          
          <Text style={styles.headingWhite}>{getLang('otp.heading')}</Text>
          
          <Image source={require('./../images/appicons/Password-Authentication.png')} style={styles.center} />
        
        </View>

        <View style={styles.template1Body}>
          
          <Text style={{...styles.textBlack,textAlign: 'center', paddingBottom: 15}}>{getLang('otp.details')}</Text>
          
          <View style={{...styles.formRow, justifyContent: 'space-evenly'}}>

            {
              otp.map((v,idx) => <TextInput 
                key={idx} 
                ref={otpBox[idx]}
                autoFocus={hasGotFocus(idx)}
                style={styles.otpInput} 
                maxLength={1} 
                defaultValue={v} 
                keyboardType="numeric"
                onChangeText = { val => {                  
                  otp[idx]=val;                  
                  setOtp([...otp]);
                  if(otp.join('').length < 4){
                    otpBox[otp.join('').length].current.focus();
                  }

                }}
              />)
            }
          </View>

          <View style={{...styles.center,paddingTop: 10}}>

            {isOTPFilled() && <TouchableOpacity onPress={submitOTP}><Image source={require('./../images/appicons/Round-Arrow.png')} style={{marginLeft: 15, marginTop: 20}} /></TouchableOpacity>}
            {!isOTPFilled() && <Image source={require('./../images/appicons/Round-Arrow-disabled.png')} style={{marginLeft: 15, marginTop: 20}} />}
            <Button type="clear" onPress={resendOTP} title={getLang('otp.resend')} />
          </View>

        </View>
      </View>    
  </ImageBackground>;
    
};

export default Otp;