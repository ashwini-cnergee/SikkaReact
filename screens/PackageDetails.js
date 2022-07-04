import React,{useContext, useState, useEffect} from 'react';

import {
  ScrollView, 
  ImageBackground, 
  View,
  Text, 
  Image, 
  TouchableOpacity
} from 'react-native';

import { CheckBox } from 'react-native-elements';

import Accordion from 'react-native-collapsible/Accordion';

import moment from 'moment';

import UserContext from './../contexts/UserContext';

import _ from 'lodash';

import styles from './../Stylesheet';

import Utils from './../Utils';
import CurrentPlan from '../components/CurrentPlan';

const PackageDetails = (props) => {

  const {getLang, userData, fetchMemberPlan, getSelectedPackage, setProcessing, setPayPackage} = useContext(UserContext);
  const [details,showDetails] = useState(false);
  const [dynamicRates, setDynamicRates] = useState(false);
  const [mode, setMode] = useState(0);
  const [terms, setTerms] = useState(true);
  const [privacy, setPrivacy] = useState(true);
  const pkg = getSelectedPackage();

  const crntPlan = fetchMemberPlan(userData);

  const planAry = [
      ['currentPackage', crntPlan.CurrentPlan[0]],
      ['rate', parseFloat(crntPlan.PlanRate[0]).toFixed(2)],
      ['validity', crntPlan.PackageValidity[0] + ' Days'],
      ['expiry', crntPlan.expiryDate]
  ];

  const selPlanAry = [
    ['customerId', userData.MemberLoginID[0]],
    ['packageName',_.get(pkg,'PlanName[0]','')],
    ['rate',parseFloat(_.get(pkg,'PlanAmount[0]',0)).toFixed(2)],
    ['validity',_.get(pkg,'PackageValidity[0]',0) + ' Days'],
    ['genDiscount',parseFloat(dynamicRates.GeneralDiscount).toFixed(2)],
    ['addAmount',parseFloat(dynamicRates.AdditionalAmount).toFixed(2)],
    ['cheque',dynamicRates.IsChequeBounce==="false" ? "-" : "Yes"],
    ['fineAmount',parseFloat(dynamicRates.FineAmount).toFixed(2)],
    ['totalAmount',parseFloat(dynamicRates.finalcharges).toFixed(2)]
  ];

  const onBack = () => {
    props.navigation.navigate('SelectPackage');
  }

  const payNow = () => {        
    setPayPackage({pkg, dynamicRates, mode, terms, privacy});
    props.navigation.navigate('SelectPayGate');
  }

  const fetchDynamicRates = (callback = false) => {
    Utils.axios('GetAdditionAmountDataForMyApp',{
      SubscriberID: userData.MemberLoginID[0],
      PackageId: pkg.PackageId[0],
      DynamicPackageRate: "0"
    }, function(res,err){      
      const data = _.get(res,'NewDataSet.AdditionAmount',false);
      setDynamicRates(data);
      if(callback) callback(data);
    });
  }

  const fetchAdjustmentAmount = () => {
    Utils.axios('GetPackageAdjustmentAmountforAPP_New',{
      MemberId: userData.MemberId[0],
      NewPlanName: pkg.PlanName[0]
    }, function(res,err){
       if(!err){
        setProcessing({loading: false, type: 2, message: res});
       }
    }, false);
  }

  useEffect(()=> {
    if(mode===2){      
      fetchDynamicRates(fetchAdjustmentAmount);
    }else{
      fetchDynamicRates();
    }
  },[mode]);

  const renderPlanTop = () => <>
    {planAry.map((p,idx) => <View style={{...styles.row, padding: 5}} kye={idx}>
      <Text>{getLang(`packageDetails.${p[0]}`)}</Text>
      <Text style={{maxWidth: '50%', marginLeft: 'auto'}}>{p[1]}</Text>
    </View>)}
  </>;

  const renderPlanDetails = () => <>
    <View style={{width: "90%", marginTop: 10, marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, paddingRight: 1, paddingBottom: 4, backgroundColor: "rgba(0,0,0,0.03)"}}>
      <View style={{width: '98%', justifyContent: 'flex-start', backgroundColor: '#fff', borderRadius: 10,  marginLeft: 2}}>
        <View style={styles.row}>
          <View style={styles.greenbar}></View>
          <View style={{padding: 5, paddingRight: 20}}>
            <View style={styles.row}>
              <Text style={{...styles.bold, fontSize: 20}}>{getLang('packageDetails.detailsTitle')}</Text>          
            </View>  

            {selPlanAry.map((p,idx) => <View style={{...styles.row, padding: 5}} kye={idx}>
              <Text>{getLang(`packageDetails.${p[0]}`)}</Text>
              <Text style={{maxWidth: '50%', marginLeft: 'auto'}}>{p[1]}</Text>
            </View>)}

          </View>
        </View>
      </View>
    </View>
  </>

  const showOptions = () => <View>
    {[0,1,2].map(m => <View style={{...styles.row, padding: 5}} kye={m}>
      {(m!==2 || CurrentPlan.PlanRate < selPlanAry.PlanRate) && <CheckBox        
        title={getLang(`packageDetails.mode${m+1}`)}
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        onPress={() => setMode(m)}
        checked={ mode === m }
        containerStyle={{borderWidth: 0, justifyContent: 'flex-start', margin: 0}}
      />}      
    </View>)}

    <View style={{...styles.row, padding: 5}}>
      <CheckBox
        title={getLang('packageDetails.terms')}
        checked={ terms }
        onPress={() => setTerms(!terms)}
        containerStyle={{borderWidth: 0, justifyContent: 'flex-start', margin: 0}}
      />      
    </View>

    <View style={{...styles.row, padding: 5}}>
      <CheckBox        
        title={getLang('packageDetails.privacy')}
        checked={ privacy }
        onPress={() => setPrivacy(!privacy)}
        containerStyle={{borderWidth: 0, justifyContent: 'flex-start', margin: 0}}
      />
    </View>


  </View>;




  return <ImageBackground source={require('./../images/site-bg.jpg')} style={styles.screenBackground}>
    <ScrollView style={{width: "100%"}} contentContainerStyle={styles.template1Wrapper}>

        <View style={{...styles.template2Header,backgroundColor: '#ffffff00'}}>
          <TouchableOpacity onPress={onBack}><Image source={require('./../images/header/back-icon-black.png')} style={{width: 25, height: 25}} /></TouchableOpacity>
          <Text style={{...styles.heading1, fontSize: 20, marginTop: -25}}>{getLang('packageDetails.heading')}</Text>          
        </View>       

        <ScrollView style={{width: "95%", marginTop: -30,marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto'}}>
          <View style={{justifyContent: "flex-start", alignItems: "center", margin: 10}}>
            {renderPlanTop()}
            <TouchableOpacity onPress={() => showDetails(true)}>
              <Image source={require('./../images/Buttons/Show-Details.png')} style={{height: 50, width: 140}} />              
            </TouchableOpacity>
            {details && dynamicRates!==false && renderPlanDetails()}
            {showOptions()}
            {terms && privacy && <TouchableOpacity onPress={payNow}>
              <Image source={require('./../images/Buttons/Pay-Now-Button.png')} style={{height: 50, width: 140, marginTop: 10}} />
            </TouchableOpacity>}            
          </View>
        </ScrollView>

        
    </ScrollView>    
  </ImageBackground>;


};

export default PackageDetails;