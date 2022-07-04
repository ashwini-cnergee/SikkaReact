import React,{useContext} from 'react';
import {View,Text} from 'react-native';
import { Overlay, Button, ListItem} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './../../Stylesheet';
import _ from 'lodash';

import UserContext from './../../contexts/UserContext';

const ErrorOverlay = (props) => {

  const {processing,setProcessing} = useContext(UserContext); 

  const colors = ['','#ffff00','#FFcc00','#cc99ff'];
  const icons = ['','info','exclamation-circle','exclamation-circle','exclamation-circle'];

  const onOk = () => {    
    if(_.get(processing,'onOk',false)){
      processing.onOk();
    }
    setProcessing({...processing,type: 0, onOk: false});
  }
  
  return <Overlay 
    isVisible={processing.type > 0} 
    overlayStyle={{
      width: "90%", 
      paddingBottom:20,       
      alignItems: 'center', 
      backgroundColor: '#ffffff'
    }}>
    
    <View style={styles.formRow}>      
      <Icon
        containerStyle={styles.center}        
        style={{fontSize: 40, backgroundColor: colors[processing.type], padding:10, borderRadius: 20}}
        name={icons[processing.type]}
        color='#000'
      />
      
      <Text style={{...styles.errorText,marginLeft: 10, color: '#333'}}>{processing.message}</Text>      
    </View>
    <View style={styles.formRow}>      
      <Button containerStyle={{marginLeft: 'auto'}} buttonStyle={{backgroundColor: colors[processing.type], padding: 10}} titleStyle={{color:'#000000'}} raised={true} title={_.get(processing,'btnLabel','Ok')} onPress={onOk} />
    </View>  
    
    
  </Overlay>
}

export default ErrorOverlay;