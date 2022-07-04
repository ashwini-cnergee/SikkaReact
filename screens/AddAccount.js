import React, { useState,useContext } from 'react';

import UserContext from '../contexts/UserContext';

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

import _ from 'lodash';

const AddAccount = (props) => {

  const [memberId,setMemberId] = useState('');
  
  const {getLang,userData,getMemberDetails,setProcessing} = useContext(UserContext); 

  const afterScreen = _.get(props,'route.params.afterScreen','Dashboard');


  const onCancel = () => {
    props.navigation.navigate(afterScreen);
  }

  const onSubmit = () => {
    var acts = _.get(userData,'accounts',[]);
    if(acts.findIndex(a => a.MemberLoginID[0]===memberId) > -1){
      setProcessing({loading: false, type: 1, message: getLang('messages.accountAlreadyAdded')});
      return false;
    }else{
      if(memberId!=''){
        getMemberDetails({mobile: userData.MobileNoprimary[0],memberLoginId: memberId, addAccount: true},(data,err) => {
          props.navigation.navigate('OTP',{afterScreen: afterScreen});
        });
      }
    }
  }

  const renderForm = () => {    
    return (<View style={{...styles.formBox, ...styles.center, height: '80%', justifyContent: "flex-start"}}>

        <View style={styles.formRow}>
          <Text style={{...styles.textBlack, flex:1}}>{getLang('addAccount.mobile')}</Text>
          <Text style={{...styles.textBlack, flex:1}}>: {userData.MobileNoprimary[0]}</Text>
        </View>

        <View style={styles.formRow}>
          <Text style={{...styles.textBlack, flex:1}}>{getLang('addAccount.primary')}</Text>          
          <Text style={{...styles.textBlack, flex:1}}>: {userData.MemberLoginID[0]}</Text>          
        </View>
        

        <View style={styles.formRow}>
          <Text style={{...styles.textBlack, flex:1}}>{getLang('addAccount.memberId')}</Text>
        
          <TextInput
            autoFocus={true}
            style={{...styles.inputType1,flex:1}}
            placeholder="New Member Id"
            defaultValue={memberId}
            onChangeText={setMemberId}
          />
        </View>
        

        <View style={{...styles.formRow, ...styles.center, justifyContent: "space-evenly"}}>          

          <TouchableOpacity onPress={onCancel}>
            <Image source={require('./../images/Buttons/Cancel-Button.png')} /> 
          </TouchableOpacity>

        
          <TouchableOpacity onPress={onSubmit}>
            <Image source={require('./../images/Buttons/Submit-Button.png')} /> 
          </TouchableOpacity>

        </View>

      </View>);
  }

  return <ImageBackground source={require('./../images/site-bg.jpg')} style={styles.screenBackground}>
    <View style={styles.template1Wrapper}>
        
        <View style={styles.template1Header}>
          
          <Text style={styles.headingWhite}>{getLang('addAccount.heading')}</Text>
          
          <Image source={require('./../images/appicons/Authentication.png')} style={styles.center} />
        
        </View>

        <View style={styles.template1Body}>          

          {renderForm()}

        </View>
      </View>    
  </ImageBackground>;
    
};

export default AddAccount;