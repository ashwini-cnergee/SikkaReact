import React,{useContext} from 'react';
import {ScrollView,View, Button, ImageBackground} from 'react-native';
import {Image, Icon,Avatar,Text} from 'react-native-elements';

import {DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';

import Screen from './../../screens';

import styles from './../../Stylesheet';

import _ from 'lodash';

import UserIcon from './../../components/UserIcon';

import UserContext from './../../contexts/UserContext';

const DrawerMenu = (props) => {

  const {userData, logout} = useContext(UserContext);

  const drawers = [{
    title: 'Profile',    
    icon: require('./../../images/sidebar/SideMenu-Icon-Home.png'),
    page: 'MyProfile'
  },{
    title: 'My Plan',    
    icon: require('./../../images/sidebar/SideMenu-Icon-MyPlan.png'),
    page: 'ReferAFriend'
  },{
    title: 'Usage',    
    icon: require('./../../images/sidebar/SideMenu-Icon-Usage.png'),
    page: 'DataUsage'
  },{
    title: 'Renew',    
    icon: require('./../../images/sidebar/SideMenu-Icon-Renew.png'),
    page: 'SelectPackage'
  },{
    title: 'Transaction',    
    icon: require('./../../images/sidebar/SideMenu-Icon-Transaction.png'),
    page: 'SelfResolution'
  },{
    title: 'History',    
    icon: require('./../../images/sidebar/SideMenu-Icon-History.png'),
    page: 'PaymentHistory'
  },{
    title: 'Support',    
    icon: require('./../../images/sidebar/SideMenu-Icon-Support.png'),
    page: 'MyService'
  },{
    title: 'Help',    
    icon: require('./../../images/sidebar/SideMenu-Icon-Help.png'),
    page: 'Help'
  },{
    title: 'Logout',    
    icon: require('./../../images/sidebar/SideMenu-Icon-Logout.png'),
    onPress: () => {logout(() => {props.navigation.navigate('Login');})}
  }];
     return (<ImageBackground source={require('./../../images/site-bg.jpg')} style={styles.screenBackground}>
      <DrawerContentScrollView {...props} style={{width: "100%"}}>            
        <View style={{...styles.row, margin: 10}}>
          <UserIcon />
          <View style={{marginLeft: 10,paddingBottom: 20, borderBottomColor: '#ddd', borderBottomWidth: 1}}>
            <Text style={styles.userName}>{_.get(userData,'CustomerName[0]','XXX')}</Text>
            <Text h6>{_.get(userData,'EmailId.0','***')}</Text>
            <Text h6>{_.get(userData,'MobileNoprimary.0','***')}</Text>
          </View>
        </View>
        <View>
          {drawers.map(d => <DrawerItem
            label={d.title}
            labelStyle={styles.drawerLabel}
            icon={({size,focused,color}) => <Image source={d.icon} style={{width: size, height: size}} />}            
            onPress={_.get(d,'onPress',() => props.navigation.navigate(d.page))}
          />)}
        </View>
      </DrawerContentScrollView>
    </ImageBackground>);  
}

export default DrawerMenu;