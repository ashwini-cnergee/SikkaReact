import React,{useEffect, useContext} from 'react';

import {
  View,
  Image,
  ImageBackground,
} from 'react-native';

import styles from './../Stylesheet';

import Utils from './../Utils';
import UserContext from '../contexts/UserContext';


const Home = (props) => {

  const {setProcessing, getLang} = useContext(UserContext);

  useEffect(() => {

      setProcessing({loading: true, type: 0, message: getLang('messages.initialLoading')});

      Utils.getUserData().then(res => {        
        setProcessing({loading: false, type: 0, message: ''});
        if(res){
          gotoDashboard();
        }
        else{
          gotoLogin();
        }
      }).catch(err => gotoLogin())
  },[]);

  const gotoDashboard = () => props.navigation.navigate("Dashboard"); 
  const gotoLogin = () => props.navigation.navigate("Login"); 
  
  return <View style={styles.screenContainer} >
    <ImageBackground source={require('./../images/splash-bg.png')} style={styles.screenBackground}>
      <Image source={require('./../images/logo.png')} style={styles.screenLogo} />
      {Utils.commonComponents()}
    </ImageBackground>    
</View>
}

export default Home;