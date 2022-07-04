import React,{useState, useContext} from 'react';

import {
  View,
  Text, Image,  
  TextInput, 
  TouchableOpacity,
  } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import UserContext from './../contexts/UserContext';

import styles from './../Stylesheet';

import DatePicker from './../components/SelectDateModal'; 

import TimePicker from './../components/SelectTimeModal'; 

import Utils from './../Utils';

import moment from 'moment';

import _ from 'lodash';

const Registration = (props) => {

  const dtFormat = 'YYYY-MM-DD';

  const [show, setShow] = useState({date: false, time: false});

  const getDefaultTime = () => {    
    return [parseInt(moment().add(1,'hours').format('HH')),0];
  }
  const [data,setData] = useState({date: moment(), time: getDefaultTime()});
  
  const {getLang,ReferAFriendSubmit} = useContext(UserContext);

  const onSubmit = () => {

    ReferAFriendSubmit(_.get(props,'refer',false),{      
      FullName: data.name,
      MobileNo: data.mobile,
      EmailId: data.email,
      VisitDateTime: moment(data.date).format(dtFormat) + ' ' + showTime(),
      Address: data.address
    },() => {
      if(_.get(props,'refer',false)){
        props.navigation.navigate('Dashboard');
      }else{
        props.navigation.navigate('Login');
      }
    });
  }

  const showTime = () => {
    return _.padStart(data.time[0],2,'0') + 
    ' : ' + 
    _.padStart(data.time[1],2,'0');
  }; 

    return (<View style={{...styles.center, width: "90%", padding: 10, paddingTop: 20, paddingBottom: 20}}>

          
          <Text style={{...styles.textGrey}}>{getLang('refer.name')}</Text>          
          <TextInput
            autoFocus={true}
            style={{...styles.inputType1, marginBottom: 20}}
            placeholder={'Enter ' + getLang('refer.name')}
            placeholderTextColor="#ddd"
            defaultValue={_.get(data,'name','')}
            onChangeText={(val) => setData({...data,name: val})}            
          />
        

        
          <Text style={{...styles.textGrey}}>{getLang('refer.mobile')}</Text>
          <TextInput                        
            style={{...styles.inputType1, marginBottom: 20}}
            placeholder={'Enter ' + getLang('refer.mobile')}
            placeholderTextColor="#ddd"
            defaultValue={_.get(data,'mobile','')}
            onChangeText={(val) => setData({...data,mobile: val})}
          />

          <Text style={{...styles.textGrey, marginBottom: 10}}>{getLang('refer.datetime')}</Text>

          <View style={styles.row}>
            
            <View style={{width: "50%", alignItems: 'flex-start', marginBottom: 10}}>              
                <View style={styles.row}>  
                <Icon name="calendar" size={24} style={{paddingRight: 10}} onPress={() => {setShow({...show,date: true})}} />
                <Text style={styles.textBlue}>{moment(data.date).format('DD-MMM-YY')}</Text>
              </View>              
            </View>

            <View style={{width: "50%", alignItems: 'flex-start'}}>
              <View style={styles.row}>  
                <Icon name="clock-o" size={25} style={{paddingRight: 10}} onPress={() => {setShow({...show,time: true})}} />
                <Text  style={styles.textBlue}>{showTime()}</Text>
              </View>              
            </View>

          </View>

          <Text style={{...styles.textGrey, marginTop: 10}}>{getLang('refer.address')}</Text>
          <TextInput                    
            multiline={true}    
            numberOfLines={3}
            style={{...styles.inputType1, marginTop: -20, marginBottom: 10}}
            placeholder={'Enter ' + getLang('refer.address')}
            placeholderTextColor="#ddd"
            defaultValue={_.get(data,'address','')}
            onChangeText={(val) => setData({...data,address: val})}
          />

          <Text style={{...styles.textGrey}}>{getLang('refer.email')}</Text>
          <TextInput                        
            style={{...styles.inputType1, marginBottom: 10}}
            placeholder={'Enter ' + getLang('refer.email')}
            placeholderTextColor="#ddd"
            defaultValue={_.get(data,'email','')}
            onChangeText={(val) => setData({...data,email: val})}
          />

        <View style={styles.centermiddle}>       
          <TouchableOpacity onPress={onSubmit}>
            <Image source={require('./../images/Buttons/Submit-Button.png')} /> 
          </TouchableOpacity>
        </View>

        {show.date && <DatePicker date={data.date} show={show.date} onSelect={(dt) => setData({...data,date: dt})} onHide={() => setShow({...show,date: false})} />} 
        
        {show.time && <TimePicker time={data.time} show={show.time} onSelect={(tm) => setData({...data,time: tm})} onHide={() => setShow({...show,time: false})} />} 
        
      </View>);
  }

  export default Registration;