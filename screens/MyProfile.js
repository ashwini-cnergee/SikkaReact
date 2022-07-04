import React,{useContext} from 'react';

import {
  ImageBackground, Image, 
  ScrollView, 
  View,
  Button,
  TouchableOpacity
} from 'react-native';

import {Text} from 'react-native-elements';

import CustomHeader from './../components/CustomHeader';

import UserContext from '../contexts/UserContext';
import styles from '../Stylesheet';
import Utils from './../Utils';

import _ from 'lodash';

const MyProfile = (props) => {
  
  const {getLang, userData, memberPlans, deleteMemberPlans, switchMemberPlan} = useContext(UserContext);

  const gotoAddAccount = () => props.navigation.navigate("AddAccount",{afterScreen: "MyProfile"}); 
  const gotoSelectPackage = () => props.navigation.navigate("SelectPackage");   

  const renderProfile = (data, secondary = false) => {
    return <View key={data.SubscriberID[0]} style={{width: "100%", marginTop: 10, marginBottom: 0, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, paddingRight: 1, paddingBottom: 3, backgroundColor: "rgba(0,0,0,0.05)"}}>
      <View style={{width: '99%', justifyContent: 'flex-start', backgroundColor: '#fff', borderRadius: 10,  marginLeft: 1, padding: 10}}>
      <View style={{...styles.row, marginBottom: 10, minHeight: 40}}>
        <Image source={require('./../images/footer/Footer-Profile.png')} style={{tintColor: '#444', width: 35, height: 35}} />
        {secondary && <TouchableOpacity onPress={() => switchMemberPlan(data.SubscriberID[0])} style={{marginLeft: 5, marginBottom: 10, marginRight: 'auto'}}>
        <Text style={{...styles.bold, fontSize: 18}}>{data.SubscriberName[0]} - {data.PrimaryMobileNo[0]}</Text>          
        </TouchableOpacity>}
        {!secondary && <Text style={{...styles.bold, fontSize: 18, marginLeft: 5, marginBottom: 10, marginRight: 'auto'}}>{data.SubscriberName[0]} - {data.PrimaryMobileNo[0]}</Text>} 
        {secondary && <TouchableOpacity onPress={() => deleteMemberPlans(data.SubscriberID[0])}>
          <Image source={require('./../images/appicons/Recycle.png')} style={{tintColor: '#990000',width: 23, height: 33}} />
          </TouchableOpacity>}
        </View>
        <View style={styles.row}>
          <Text style={{fontSize: 16, marginRight: 150}}>{data.CurrentPlan[0]}</Text>
          <Text style={{...styles.bold, fontSize: 15, color: '#c00', marginLeft: 'auto'}}>Rs. {parseFloat(data.PlanRate[0]).toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{fontSize: 16}}>{getLang('myprofile.validity')}</Text>
          <Text style={{fontSize: 16, marginLeft: 10}}>{data.PackageValidity[0]} Days</Text>
        </View>      
        <View style={styles.row}>
          <Text style={{fontSize: 16}}>{getLang('myprofile.expires')}</Text>
          <Text style={{fontSize: 16, marginLeft: 10}}>{data.expiryDate[0]}</Text>
        </View>      
        {!secondary && <Button style={{width: "100%"}} onPress={gotoSelectPackage} color="#cc0000" title="Renew Now" />}
      </View>          
    </View>;
  }

  return <ImageBackground source={require('./../images/site-bg.jpg')} style={styles.screenBackground}>      
    <CustomHeader title={getLang('myprofile.heading')} />
    <View style={styles.template1Wrapper}>
      <ScrollView contentContainerStyle={styles.template2Body}>
        <View style={{justifyContent: "flex-start", alignItems: "center"}}>

          <Text style={{...styles.bold,...styles.textGrey, fontSize: 20}}>{getLang('myprofile.title1')}</Text>

          {renderProfile(memberPlans[userData.MemberLoginID[0]])}

          <Text style={{...styles.bold,...styles.textGrey, fontSize: 20, marginTop: 10}}>{getLang('myprofile.title2')}</Text>

          {Object.keys(memberPlans).map(k => k!=userData.MemberLoginID[0] && renderProfile(memberPlans[k], true))}

        </View>
        <View style={{justifyContent: 'flex-end', marginTop: 10}}>
            <Button style={{width: "100%"}} onPress={gotoAddAccount} type="outline" title="Add Account" />
          </View>
      </ScrollView>
    </View>  
  </ImageBackground>;

};

export default MyProfile;