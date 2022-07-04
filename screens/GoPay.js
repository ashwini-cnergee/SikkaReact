import React, { useEffect, useContext } from 'react';

import {
  ScrollView, 
  ImageBackground, 
  View,
  Text, 
  Image, 
  TouchableOpacity
} from 'react-native';

import { WebView } from 'react-native-webview';

import UserContext from './../contexts/UserContext';

import _ from 'lodash';

import styles from './../Stylesheet';

import Utils from './../Utils';

const GoPay = (props) => {

  const {doBeforePayment, paymentDetails} = useContext(UserContext);
  var URL,EnCURL;
  useEffect(() => {
    EnCURL = doBeforePayment(paymentDetails);

  //  paymentDetails((abc) => {
  //   console.log("Pay:-"+abc);
  //   URL = abc.EncRequest;
    console.log("EnCURL:-"+JSON.stringify(EnCURL));


  // });
    URL = EnCURL.EncRequest;
    console.log("URL:-"+URL)
  },[]);

  return <WebView
  source={{
    uri: URL,
    
  }}
  style={{ marginTop: 20 }}
/>
}

export default GoPay;