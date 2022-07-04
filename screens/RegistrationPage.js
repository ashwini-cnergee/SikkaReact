import React,{useContext} from 'react';

import {
  ScrollView, 
  ImageBackground, 
  View,
  Text, 
  Image, 
  TouchableOpacity,
} from 'react-native';

import UserContext from './../contexts/UserContext';

import Utils from './../Utils';

import Registration from './../components/Registration';

import styles from './../Stylesheet';

const RegistrationPage = (props) => {

  const {getLang} = useContext(UserContext);

  const onBack = () => {
    props.navigation.navigate('Login');
  }

  return <ImageBackground source={require('./../images/site-bg.jpg')} style={styles.screenBackground}>
    <ScrollView style={{width: "100%"}} contentContainerStyle={styles.template1Wrapper}>
        
        <View style={styles.template2Header}>
          <TouchableOpacity onPress={onBack}><Image source={require('./../images/header/back-icon.png')} style={{width: 25, height: 25}} /></TouchableOpacity>
          <Text style={{...styles.headingWhite, marginTop: -25}}>{getLang('register.heading')}</Text>          
        </View>       

        <View style={{width: "80%", marginTop: -30,marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, paddingRight: 1, paddingBottom: 4, backgroundColor: "rgba(0,0,0,0.03)"}}>
          <View style={{width: '98%', justifyContent: 'flex-start', backgroundColor: '#fff', borderRadius: 10,  marginLeft: 2}}>
            <Registration {...props} />
          </View>
        </View>
      </ScrollView>  
      {Utils.commonComponents()}    
  </ImageBackground>;
}

export default RegistrationPage;
