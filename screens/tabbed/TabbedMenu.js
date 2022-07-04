import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View, Image, Text} from 'react-native';
import {Icon} from 'react-native-elements';

import Screen from './../../screens';

import styles from './../../Stylesheet';

const TabbedMenu = (props) => {

  const Tab = createBottomTabNavigator();
  const opts={headerShown: false};
  const tabs = [{
    title: 'Dashboard',    
    image: require('./../../images/footer/Footer-Home.png'),
    component: 'Dashboard'
  },{
    title: 'MyProfile',    
    image: require('./../../images/footer/Footer-Profile.png'),
    component: 'MyProfile'
  },{
    title: 'ContactUs',    
    image: require('./../../images/footer/Footer-Contact.png'),
    component: 'ContactUs'
  },{
    title: 'Help',    
    image: require('./../../images/footer/Footer-Help.png'),    
    component: 'Help'
  }];

  return <Tab.Navigator initialRouteName={props.route.name} screenOptions={{
    activeTintColor: '#ffcc00', 
    inactiveTintColor: '#fff', 
    activeBackgroundColor: '#000', 
    inactiveBackgroundColor: '#000',
    labelStyle: {fontWeight: 'bold'},
    headerShown: false  
    }} >    
    {tabs.map((t,idx) => <Tab.Screen 
      key={idx}
      name={t.title}       
      component={Screen[t.component]}
      options={{tabBarIcon: ({color, size}) => <Image source={t.image} style={{tintColor: color, width: size, height: size}}  />}}
       />)}    
  </Tab.Navigator>;
}

export default TabbedMenu;