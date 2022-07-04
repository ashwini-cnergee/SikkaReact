import React,{useState,useContext, useEffect} from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

import {Button} from 'react-native-elements';

import styles from './../Stylesheet';

import UserContext from './../contexts/UserContext';

import UserIcon from './../components/UserIcon';

import _ from 'lodash';

import moment from 'moment';


const MemberAccounts = (props) => {

  const {userData,fetchMemberPlan} = useContext(UserContext); 
  
  const [memberPlans, setMemberPlans] = useState({});

  const gotoAddAccount = () => props.navigation.navigate("AddAccount",{afterScreen: "Dashboard"}); 
  const gotoRenew = () => props.navigation.navigate('SelectPackage');

  const fromNow = (plan) => {    
    if(_.get(plan,'expiryDate[0]',false)){
      var exp = moment(plan.expiryDate[0],"DD-MM-YYYY");    
      if(exp.isBefore()){
        return false;
      }else{
        return Math.round(moment.duration(exp - moment().startOf('day')).asDays());        
      }
    }else{
      return false;
    }
  }

  const renderMemberRow = (a) => {
    
    if(!memberPlans[a.MemberLoginID[0]]){
      fetchMemberPlan(a,(data) => {         
          memberPlans[data.SubscriberID[0]]= data;          
          setMemberPlans({...memberPlans});        
      });
    }

    const fnow = fromNow(_.get(memberPlans,a.MemberLoginID[0],{}));

    return <View style={{flexDirection: 'row', width: '100%', justifyContent:'space-between'}}>

      <UserIcon size={45} width={20} height={40} />

      <View style={{flexDirection:'column'}}>        
        <Text style={{...styles.textBlack,fontWeight: 'bold'}}>{_.get(a,'CustomerName[0]','__')}</Text>
        <Text style={{...styles.textBlue,fontWeight: 'bold', fontSize: 12}}>{_.get(a,'MemberLoginID[0]','__')}</Text>
      </View>

      <View style={{width: 150}}>        
        <Text style={{...styles.inputGrey,fontSize: 12}}>{_.get(memberPlans,`${a.MemberLoginID[0]}.CurrentPlan[0]`,'__')}</Text>        
      </View>

      <View style={{maxWidth: 50, flexDirection: 'column'}}>
        {fnow===false && <Text>Expired</Text>}
        {fnow!==false && <>
          <Text style={{...styles.textBlack, fontWeight: 'bold'}}>{fnow}</Text>
          <Text style={styles.textBlack}>Days</Text>
        </>}
      </View>

    </View>;
  }


  const renderAccounts = () => {
    return <>
      <View style={styles.center}>
        {_.get(userData,'accounts.length',0)===0 && <Text>No account Added yet</Text>}
        {_.get(userData,'accounts.length',0) > 0 && userData.accounts.map(a => renderMemberRow(a))}
      </View>
      <View style={styles.row}>
        <View style={{flex:0.5, alignItems: "flex-start"}}><Button onPress={gotoAddAccount} type="outline" title="Add Account" /></View>
        <View style={{flex:0.5, alignItems: "flex-end"}}><Button onPress={gotoRenew} type="outline" title="Renew" /></View>
      </View>
    </>  
  }


  return <View style={styles.box}>
      <Text style={styles.heading2}>More Accounts</Text>
      {renderAccounts()}
   </View> 


}

export default MemberAccounts;