import React,{useState, useContext, useEffect} from 'react';

import {
  ImageBackground, Image, 
  ScrollView, 
  View,
  Linking,
  TouchableOpacity
} from 'react-native';

import {Text} from 'react-native-elements';

import CustomHeader from './../components/CustomHeader';

import UserContext from '../contexts/UserContext';
import styles from '../Stylesheet';
import Utils from './../Utils';

import _ from 'lodash';

const ContactUs = (props) => {

  const {getLang, userData} = useContext(UserContext);

  const [cdata,setCData] = useState(false);

  useEffect(() => {    
    Utils.axios('GetCompanyDetails', {
        UserLoginName: userData.MemberLoginID[0],
        ClientAccessId: Utils.API_ACCESS_ID
      }, (res,err) => {        
        setCData(_.get(res,'NewDataSet.0.Table.0',''));
      });
    },[]);

  const onCall = () => {
    Linking.openURL(`tel:${cdata.SupportNumber[0]}`)
  }

  const renderDetails = () => {    
    const clogo = 'data:image/png;base64,' + cdata.CompanyLogo[0];
    return <View>
        <Image source={{uri: clogo}} style={{minWidth: 300, height: 100}} />
        <View style={{...styles.row, marginTop: 20}}>
          <Text style={{...styles.bold}}>{getLang('contact.cname')}</Text>
          <Text>{cdata.CompanyName[0]}</Text>
        </View>
        <View style={{...styles.row, marginTop: 20}}>
          <Text style={{...styles.bold}}>{getLang('contact.caddress')}</Text>
          <Text>{cdata.Address[0]}</Text>
        </View>
        <View style={{...styles.row, marginTop: 20}}>
          <Text style={{...styles.bold}}>{getLang('contact.cemail')}</Text>
          <Text>{cdata.Email[0]}</Text>
        </View>
        <View style={{...styles.row, marginTop: 20}}>
          <Text style={{...styles.bold}}>{getLang('contact.ccare')}</Text>
          <Text>{cdata.SupportNumber[0]}</Text>
        </View>


        <TouchableOpacity onPress={onCall}>
            <Image source={require('./../images/Buttons/Call-Button.png')}  style={{marginTop: 20}} /> 
          </TouchableOpacity>

      </View>
  }

  return <ImageBackground source={require('./../images/site-bg.jpg')} style={styles.screenBackground}>      
    <CustomHeader title={getLang('contactus.heading')} />
    <View style={styles.template1Wrapper}>
      <ScrollView contentContainerStyle={styles.template2Body}>
        <View style={{justifyContent: "flex-start", alignItems: "center", margin: 10}}>          
          {cdata !== false && renderDetails()}
        </View>
      </ScrollView>
    </View>  
  </ImageBackground>;

};

export default ContactUs;