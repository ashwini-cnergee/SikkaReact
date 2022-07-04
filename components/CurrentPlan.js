import React, { useState,useContext, useEffect } from 'react';

import UserContext from '../contexts/UserContext';

import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import styles from '../Stylesheet';

import _ from 'lodash';
import moment from 'moment';

import Utils from './../Utils';

const CurrentPlan = (props) => {

  const [currentPlan,setCurrentPlan] = useState(false);

  const {fetchMemberPlan,getLang} = useContext(UserContext);

  useEffect(() => {
    if(!currentPlan){
      Utils.getUserData().then((data) => {        
        fetchMemberPlan(data,setCurrentPlan);                
      }).catch(err => {});      
    }    
  },[]);

  const getPlanDate = () => {
    return moment(_.get(currentPlan,'expiryDate[0]',''),"DD-MM-YYYY");
  }

  const showPackage = () => {
    //setSelectedPackage(currentPlan.PackageId[0]);
    props.navigation.navigate('SelectPackage');
  }


  return <View style={styles.row}>
      <View style={{flexDirection: "column", flex: .7, borderWidth: 2, borderColor: '#ddd', borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderRightWidth: 0, padding: 5, paddingLeft: 10}}>
        <View style={styles.row}>
          <View style={{flexDirection: "column", flex: .7}}><Text style={styles.planName}>{_.get(currentPlan,'CurrentPlan[0]','__')}</Text></View>
          <View style={{flexDirection: "column", flex: .3, alignItems: 'flex-end', paddingRight: 10}}><Text style={styles.planCost}>{getLang('appdata.currency')} {_.get(currentPlan,'PlanRate[0]','__')}</Text></View>
        </View>
        <View style={styles.row}><Text style={{...styles.textBlack,fontWeight:'bold'}}>{getPlanDate().fromNow()}</Text></View>
        <View style={styles.row}></View>
        <View style={styles.row}><Text>{getPlanDate().isBefore() ? getLang('appdata.planexpired') : getLang('appdata.planexpiring')}</Text></View>

      </View>
      <TouchableOpacity onPress={showPackage} style={{flexDirection: "column", flex: .3, backgroundColor: '#d32929', borderTopRightRadius: 5, borderBottomRightRadius: 5, minHeight: 100}}>
      
          <Image source={require('./../images/appicons/Renew-Now.png')} style={styles.centermiddle} />
      
      </TouchableOpacity>  
    </View>;

}

export default CurrentPlan;