import React,{useState, useContext} from 'react';

import {View} from 'react-native';

import {Overlay, Text } from 'react-native-elements';

import styles from './../Stylesheet';

import UserContext from './../contexts/UserContext';

import {DatePicker} from "react-native-common-date-picker";

import _ from 'lodash';

import moment from 'moment';

export default (props) => {

  const {getLang} = useContext(UserContext);

  const dtFormat = _.get(props,'format','YYYY-MM-DD');

  return <Overlay         
    isVisible={props.show}    
    onBackdropPress={props.onHide}    
  >
    <Text h4>{getLang('selectDate.heading')}</Text>
    <DatePicker
      width={320}
      cancelText={getLang('selectDate.cancel')}
      confirmText={getLang('selectDate.confirm')}
      toolBarCancelStyle={{backgroundColor: '#ccc', color: '#000', borderRadius: 10}}
      toolBarConfirmStyle={{backgroundColor: '#ffcc00', color: '#000', borderRadius: 10}}
      unselectedRowBackgroundColor="#f5f5f5"
      selectedTextFontSize={24}            
      monthDisplayMode="en-short"      
      defaultDate={moment(props.date).format(dtFormat)}
      minDate={moment().format(dtFormat)}
      maxDate={moment().add(5,'years').format(dtFormat)}
      selectedBorderLineMarginHorizontal={2}            
      toolBarPosition="bottom"      
      confirm={dt => {
        props.onSelect(dt);
        props.onHide();
      }}
      cancel={props.onHide}      
    />
    
  </Overlay>;

};