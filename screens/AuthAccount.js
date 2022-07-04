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

import _, { after } from 'lodash';

const AuthAccount = (props) => {

  const [memberId,setMemberId] = useState('');
  
  const {getLang,memberData,wipeMemberData,authorizeAccount} = useContext(UserContext); 

  const afterScreen = _.get(props,'route.params.afterScreen','Dashboard');

  const onCancel = () => {
    wipeMemberData(() => {
      props.navigation.navigate(afterScreen);
    });        
  }

  const onSubmit = () => {
    authorizeAccount(() => {
      props.navigation.navigate(afterScreen);
    });
  }

  const renderForm = () => {    
    return (<View style={{...styles.formBox, ...styles.center, height: '80%', justifyContent: "flex-start"}}>

        <View style={styles.formRow}>
          <Text style={{...styles.textBlue, flex:1}}>{getLang('addAccount.memberId')}</Text>
          <Text style={{...styles.textBlack, flex:1}}>{_.get(memberData,'MemberLoginID[0]','')}</Text>
        </View>
        <View style={styles.formRow}>
          <Text style={{...styles.textBlue, flex:1}}>{getLang('addAccount.mobile')}</Text>
          <Text style={{...styles.textBlack, flex:1}}>{_.get(memberData,'MobileNoprimary[0]','')}</Text>
        </View>

        <View style={styles.formRow}>
          <Text style={{...styles.textBlue, flex:1}}>{getLang('addAccount.name')}</Text>          
          <Text style={{...styles.textBlack, flex:1}}>{_.get(memberData,'CustomerName[0]','')}</Text>          
        </View>
        

        <View style={styles.formRow}>
          <Text style={{...styles.textBlue, flex:1}}>{getLang('addAccount.address')}</Text>          
          <Text style={{...styles.textBlack, flex:1}}>{_.get(memberData,'InstallationAddress[0]','')}</Text>          
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

export default AuthAccount;