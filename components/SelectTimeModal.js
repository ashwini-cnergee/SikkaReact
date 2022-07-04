import React from 'react';
import {View, Text} from 'react-native';
import {Button, Overlay } from 'react-native-elements';
import TimePicker from 'react-native-simple-time-picker';
import _ from 'lodash';

import styles from './../Stylesheet';

export default (props) => {

  let time = props.time;
  
  return <Overlay         
    isVisible={props.show}    
    onBackdropPress={props.onHide}
  >
    <View style={{...styles.box,width: '50%'}}>            

      <View style={{...styles.row, width: '100%'}}>
        <Text style={{width: '50%', paddingLeft: 5}}>Hours: </Text>
        <Text>Minutes: </Text>
      </View>  

      <TimePicker
        selectedHours={time[0]}      
        selectedMinutes={time[1]}    
        onChange={(h,m) => {
          time=[h,m];
        }}
      />
      <View style={{...styles.row, justifyContent: 'space-evenly'}}>        
        <Button type="clear" title={_.get(props,'cancel','Cancel')} onPress={props.onHide} />
        <Button type="solid" title={_.get(props,'submit','Submit')} onPress={() => {props.onSelect(time);props.onHide();}} />
      </View>
    </View>    
  </Overlay>;
};