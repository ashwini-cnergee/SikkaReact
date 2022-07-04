import React from 'react';

import {View,Image} from 'react-native';

import styles from './../Stylesheet';

import _ from 'lodash';

const UserIcon = (props) => {

  const size = _.get(props,'size',50);
  const bgColor = _.get(props,'bgcolor','#eee');
  const imgStyle  = {width: _.get(props,'width',20), height: _.get(props,'height',40)};

  return <View style={{alignItems:'center', justifyContent:'space-around', backgroundColor: bgColor, borderRadius: size, width: size, height: size, marginRight: 5}}>
    <Image source={require('./../images/account-icon.png')} style={imgStyle} />  
  </View>;
}

export default UserIcon;