import React, { useState,useContext } from 'react';

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

import Utils from './../Utils';

import styles from './../Stylesheet';

import _ from 'lodash';

const Login = (props) => {

  const [mobile,setMobile] = useState('');//useState('9868256219');  
  const [askMemberLoginID,setAskMemberLoginID] = useState(false);
  const [memberLoginID,setMemberLoginID] = useState(''); //useState('uat0004');

  const {getLang,getLoginByNumber,getMemberDetails} = useContext(UserContext); 

  const onCancel = () => {
    setMobile('');
    setAskMemberLoginID(false);
    setMemberLoginID('');
  }

  const onSubmit = () => {

    if(askMemberLoginID){

      if(mobile!='' && memberLoginID!=''){
        getMemberDetails({mobile: mobile,memberLoginId: memberLoginID},onOTPReceived);
      }

    }else{

      if(mobile!=''){
        getLoginByNumber(mobile,(data,err) => {
          if(data){
            //if(data === 1){
            //  getMemberDetails({mobile: mobile},onOTPReceived);
           // }else{
              setAskMemberLoginID(true);
           //s }
          }else{
            window.alert(err);
          }
        });
      }
    } 
  }

  const onOTPReceived = () => {    
    props.navigation.navigate("OTP");     
  }

  const gotoRegistration = () => {    
    props.navigation.navigate("Registration");     
  }

  const renderLoginForm = () => {
    return (<View style={styles.formBox}>

      <View style={styles.formRow}>
        <TouchableOpacity onPress={gotoRegistration}><Text style={styles.heading1}>{getLang('login.registerLink')}</Text></TouchableOpacity>
      </View>
      <View style={styles.formRow}>
        <Text style={styles.heading2}>{getLang('login.heading')}</Text>
      </View>

      <View style={{...styles.formBox, ...styles.center, height: '80%', justifyContent: "space-evenly"}}>

        <View style={styles.formRow}>
          <View style={{...styles.formBox, ...styles.center}}>
            <View style={{...styles.center,flexDirection: "row"}}>
              <View style={{borderColor: '#e1e1e1', borderRightWidth: 2}}>
                <TextInput
                  editable={false}
                  style={styles.inputGrey}                  
                  placeholderTextColor="#aaaaaa"
                  placeholder={getLang('login.defaultCountryCode')}
                  autoFocus={true}
                  maxLength={3}
                />
              </View>
              <View>
                <TextInput
                  onChangeText={setMobile} 
                  defaultValue={mobile}
                  style={styles.inputGrey}
                  placeholderTextColor="#aaaaaa"
                  placeholder={getLang('login.defaultMobile')}
                  autoFocus={true}
                  maxLength={10}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={{...styles.center,flexDirection: "row"}}>
              <Text style={styles.textBlack}>{getLang('login.otp')}</Text>
            </View>


            {askMemberLoginID && <>
              <View style={{flexDirection: "row", marginTop: 30}}>
                <Text style={{...styles.textBlack, fontWeight:'bold', fontSize: 16, paddingTop: 5}}>{getLang('login.memberid')}</Text>
              </View>

              <View style={{...styles.center,flexDirection: "row"}}>
                <TextInput
                    onChangeText={setMemberLoginID} 
                    defaultValue={memberLoginID}
                    style={{...styles.inputGrey,borderBottomWidth: 1, borderBottomColor: "#eee", padding: 5, paddingLeft: 10, width: "100%"}}
                    autoFocus={true}
                    maxLength={50}
                  />
              </View>
            </>}
          
          </View>

        </View>

        <View style={{...styles.formRow, ...styles.center, justifyContent: "space-evenly"}}>
          <TouchableOpacity onPress={onCancel}>
            <Image source={require('./../images/Buttons/Cancel-Button.png')} style={{marginRight: 2}} /> 
          </TouchableOpacity>

          <TouchableOpacity onPress={onSubmit}>
            <Image source={require('./../images/Buttons/Submit-Button.png')}  style={{marginleft: 2}} /> 
          </TouchableOpacity>

        </View>

      </View>
         
    </View>);
  }


  return <ImageBackground source={require('./../images/site-bg.jpg')} style={styles.screenBackground}>
    <ScrollView contentContainerStyle={styles.scrollview}>
      {renderLoginForm()}     
      {Utils.commonComponents()}  
    </ScrollView>    
  </ImageBackground>;
    
};

export default Login;