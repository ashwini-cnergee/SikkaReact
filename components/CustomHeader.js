import React from 'react';

import {TouchableOpacity} from 'react-native';

import {Header, Icon, Text, Image, View} from 'react-native-elements';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import _ from 'lodash';
import styles from '../Stylesheet';

const CustomHeader = (props) => {

  const navigation = useNavigation();
  
  const gotoNotifications = () => {
   navigation.navigate('Notification');
  }
    
  return <Header containerStyle={styles.headerContainer} >
    <Icon color="#ffffff" name="menu" onPress={()=> navigation.dispatch(DrawerActions.openDrawer())} />
    <Text style={styles.headerTitle}>{_.get(props,'title','')}</Text>    
    <TouchableOpacity onPress={gotoNotifications}>
      <Image source={require('./../images/header/Header-Icon-Alert.png')} style={{width: 25, height: 25}} />    
    </TouchableOpacity>
  </Header>;
}

export default CustomHeader;