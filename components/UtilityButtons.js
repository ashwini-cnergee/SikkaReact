import React,{useState, useContext} from 'react';

import {View,Row,Col,Image, TouchableOpacity} from 'react-native';
import styles from '../Stylesheet';

const UtilityButtons = (props) => {

  const buttons = [
    [require('./../images/appicons/Renewal-History.png'), '#03afed', 'PaymentHistory'],
    [require('./../images/appicons/Data-Usage.png'), '#efb13a', 'DataUsage'],    
    [require('./../images/appicons/Pickup-Request.png'), '#ee6338', 'PickRequest'],
    [require('./../images/appicons/Service-Request.png'), '#27b8b5', 'MyService']
  ];

  const onClickHandler = (nm) => {
    props.navigation.navigate(nm);
  }

  return <View style={{...styles.row, width: '100%', justifyContent: "space-between"}}>
    {buttons.map((btn,idx) => <TouchableOpacity onPress={() => {onClickHandler(btn[2])}}>
      <View key={idx} style={{width: 85, height: 85,backgroundColor: btn[1]}}>
        <Image source={btn[0]} style={styles.utilityButton} />
      </View>
    </TouchableOpacity>)}
  </View>;
};

export default UtilityButtons;