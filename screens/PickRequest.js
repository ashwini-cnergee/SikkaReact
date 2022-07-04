import React,{useContext, useState, useEffect} from 'react';

import {
  ScrollView, 
  ImageBackground, 
  View,
  Text, 
  TextInput,
  Image, 
  TouchableOpacity
} from 'react-native';

import UserContext from '../contexts/UserContext';

import Calendar from 'react-native-calendar';

import TimePicker from 'react-native-simple-time-picker';

import _ from 'lodash';

import styles from '../Stylesheet';

import moment from 'moment';

import Utils from './../Utils';

const PickRequest = (props) => {

  const {getLang, userData , setProcessing} = useContext(UserContext);  
  const [date,setDate] = useState(false);
  const [time,setTime] = useState([parseInt(moment().hours()),parseInt(moment().minutes())]);
  const [msg, setMsg] = useState('');
  
  useEffect(() => {
    
  },[]);

  const onBack = () => {
    props.navigation.navigate('Dashboard');
  }

  const setMessage = (e) => {
    setMsg(e.currentTarget.value);
  }

  const onPickRequest = () => {

    const data = {MemberId: userData.MemberId[0]};

    if(!date){
      setProcessing({loading: false, type: 3, message: getLang('pickRequest.noDateSelected')});
    }else if(moment().isAfter(date)){      
      setProcessing({loading: false, type: 3, message: getLang('pickRequest.invalidDate')});
    }else{
      data['Visitdatetime']=moment(date).hours(time[0]).minutes(time[1]).format('YYYY-MM-DD hh:mm:ss');      
      data['Message'] = msg;
      setProcessing({loading: true, message: getLang('pickRequest.processing')});
      Utils.axios('InsertPaymentPickupRequest',data,(res,err) => {
        setProcessing({
          loading: false, 
          type: err? 3 : 1, 
          message: err ? err: res, 
          onOk: err ? false : onBack
        });
      },false);

    }
  }

  const dtFormat = _.get(props,'format','YYYY-MM-DD');


  return <ImageBackground source={require('./../images/site-bg.jpg')} style={styles.screenBackground}>
    <ScrollView style={{width: "100%"}} contentContainerStyle={{...styles.template1Wrapper}}>
        
        <View style={{...styles.row,...styles.template1Header}}>
          <TouchableOpacity onPress={onBack}><Image source={require('./../images/header/back-icon.png')} style={{width: 25, height: 25}} /></TouchableOpacity>
          <Text style={{...styles.headingWhite, flex: 0.8, fontSize: 20, marginTop: -40}}>{getLang('pickRequest.heading')}</Text>          
        </View>       

        <View style={{height: "100%"}}>          
          <View style={{width: "90%", marginLeft:"5%", marginRight: "5%", minHeight: 100, marginTop: -90, backgroundColor: "#ffffff", borderWidth: 1}}>
            <Text style={styles.heading2}>{getLang('pickRequest.title')}</Text>
            <Calendar              
              showControls
              onDateSelect={setDate}
              customStyle={{
                weekendDayText: {color: 'black'},
                weekendHeading: {color: 'black'},                
                dayButton: {fontSize: 20, width: 50}
              }}
              prevButtonText='<'
              nextButtonText='>'
            />
          </View>


          <View style={{width: '90%', marginTop: 20, marginLeft: '5%', marginRight: '5%', backgroundColor: "#ffffff", borderWidth: 1}}>
            <Text style={styles.heading2}>{getLang('pickRequest.pickTime')}</Text>
            <TimePicker            
              selectedHours={time[0]}
              selectedMinutes={time[1]}
              hoursUnit=" Hour"
              minutesUnit=" Min."
              onChange={(h,m) => {
                setTime([h,m]);
              }}
              style={{maxWidth:50, borderWidth: 2, borderColor: '#000000'}}
            />
          </View>

          <View style={{width: '90%', marginTop: 20, marginLeft: '5%', marginRight: '5%', backgroundColor: "#ffffff", borderWidth: 1}}>
            <Text style={styles.heading2}>{getLang('pickRequest.message')}</Text>
            <TextInput multiline={true} style={{height: 150, textAlignVertical: "top", textAlign:"left"}} onChange={setMessage} />
          </View>

          <View style={{...styles.row, width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 20}}>
            <View  style={{flex: 0.5, alignItems: 'flex-start'}}>
              <TouchableOpacity onPress={onBack}>
                <Image source={require('./../images/Buttons/Cancel-Button.png')} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.5, alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={onPickRequest}>
                <Image source={require('./../images/Buttons/Submit-Button.png')} />
              </TouchableOpacity>
            </View>
          </View>

        </View>       

      </ScrollView>    
  </ImageBackground>;
}

export default PickRequest;
