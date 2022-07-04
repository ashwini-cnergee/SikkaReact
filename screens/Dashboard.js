import React, { useState,useContext } from 'react';

import UserContext from '../contexts/UserContext';

import {
  View,
  ScrollView,
  Text,  
  ImageBackground,
  TextInput,  
  TouchableOpacity,
  Dimensions
} from 'react-native';

import {Image,Button} from 'react-native-elements';

import styles from '../Stylesheet';

import CustomHeader from './../components/CustomHeader';
import CurrentPlan from './../components/CurrentPlan';

import HomeBanner from './../components/HomeBanner';
import MemberAccounts from './../components/MemberAccounts';
import UtilityButtons from './../components/UtilityButtons';

import _, { rangeRight } from 'lodash';

const Dashboard = (props) => {

  const {getLang,getLoginByNumber} = useContext(UserContext); 
  const rowbox = {...styles.row, marginTop: 10};

  const onUpgrade = () => {
    props.navigation.navigate('SelectPackage');
  }
  const onComplain = () => {
    props.navigation.navigate('MyService');
  }
  const renderUpgradeButton = () => {
    const win = Dimensions.get('window');
    var width = win.width - (win.width/10) - 15;
    
    return <ImageBackground source={require('./../images/Buttons/Upgrade-Plan-Bg.png')} style={{width: '100%', height: 50}}>
      <View style={{...styles.row}}>
        <TouchableOpacity onPress={onUpgrade}>
          <Image source={require('./../images/appicons/Right-Arrow.png')} style={{width: 30, height: 30, marginLeft: width, marginTop: 10}} />
        </TouchableOpacity>
      </View>
    </ImageBackground>;
  }

  const renderComplainButton = () => {
    const win = Dimensions.get('window');
    var width = win.width - (win.width/10) - 15;
    
    return <ImageBackground source={require('./../images/Buttons/Complain.png')} style={{width: '100%', height: 50}}>
      <View style={{...styles.row}}>
        <TouchableOpacity onPress={onComplain}>
          <Image source={require('./../images/appicons/Right-Arrow.png')} style={{width: 30, height: 30, marginLeft: width, marginTop: 10}} />
        </TouchableOpacity>
      </View>
    </ImageBackground>;
  }
 

  return <ImageBackground source={require('./../images/site-bg.jpg')} style={styles.screenBackground}>      
    <CustomHeader title={getLang('appdata.title')} />
    <View style={styles.template1Wrapper}>
      <ScrollView contentContainerStyle={styles.template2Body}>   

        <View style={styles.row}><CurrentPlan {...props} /></View>
        <View style={rowbox}><HomeBanner /></View>
        <View style={rowbox}>{renderUpgradeButton()}</View>
        {/* <View style={rowbox}><MemberAccounts {...props} /></View>   */}
        <View style={rowbox}>{renderComplainButton()}</View>           
        <View style={rowbox}><UtilityButtons {...props} /></View>

      </ScrollView>
    </View>    
  </ImageBackground>;
    
};

export default Dashboard;