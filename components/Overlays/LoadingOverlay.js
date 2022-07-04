import React,{useContext} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import { Overlay, Button, ListItem} from 'react-native-elements';

import styles from './../../Stylesheet';

import UserContext from './../../contexts/UserContext';

const LoadingOverlay = (props) => {

  const {processing} = useContext(UserContext); 
  
  return <Overlay isVisible={processing.loading} overlayStyle={{width: "90%", padding: 20}}>
    <View style={styles.formRow}>
      <ActivityIndicator />
      <Text style={styles.loadingOverlayText}>{processing.message}</Text>
    </View>
  </Overlay>
}

export default LoadingOverlay;