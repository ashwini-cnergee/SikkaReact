import 'react-native-gesture-handler';
import React,{useState, useEffect} from 'react';

import {StatusBar,Dimensions} from 'react-native';
import {Header,Icon} from 'react-native-elements';

import SplashScreen from 'react-native-splash-screen'

import {NavigationContainer, DrawerActions } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DefaultLang from './components/DefaultLang';

import {UserProvider} from './contexts/UserContext';

import Screen from './screens';

import TabbedMenu from './screens/tabbed/TabbedMenu';
import DrawerMenu from './screens/drawer/DrawerMenu';

import _ from 'lodash';
import styles from './Stylesheet';

const App = (props) => {

  useEffect(() => {
    SplashScreen.hide();
  });

  const [reload,setReload] = useState(false);
  const refresh = () => {
    setReload(!reload);
  }

  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();

  const AppDrawer = () => {
    const opts={headerShown: false};
    return <Drawer.Navigator drawerContent={(props) => <DrawerMenu {...props} />} options={opts} screenOptions={{headerTitleAlign: 'center'}}>
      <Drawer.Screen name="Dashboard" component={TabbedMenu} options={opts} ></Drawer.Screen>      
    </Drawer.Navigator>
  }

  const MyProfileDrawer = () => {
    const opts={headerShown: false};
    return <Drawer.Navigator drawerContent={(props) => <DrawerMenu {...props} />} options={opts}>
      <Drawer.Screen name="MyProfile" component={TabbedMenu} options={opts}></Drawer.Screen>      
    </Drawer.Navigator>
  }

  const HelpDrawer = () => {
    const opts={headerShown: false};
    return <Drawer.Navigator drawerContent={(props) => <DrawerMenu {...props} />} options={opts}>
      <Drawer.Screen name="Help" component={TabbedMenu} options={opts}></Drawer.Screen>      
    </Drawer.Navigator>
  }

  const ContactUsDrawer = () => {
    const opts={headerShown: false};
    return <Drawer.Navigator drawerContent={(props) => <DrawerMenu {...props} />} options={opts}>
      <Drawer.Screen name="ContactUs" component={TabbedMenu} options={opts}></Drawer.Screen>      
    </Drawer.Navigator>
  }

  
 
  
  const AppLayout = () => {    

    const opts={headerShown: false};

    return <NavigationContainer>      
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        >        
          <Stack.Screen name="Home" component={Screen.Home} options={opts} screenOptions={{headerTitleAlign: 'center'}} />
          <Stack.Screen name="Login" component={Screen.Login} options={opts} />
          <Stack.Screen name="Registration" component={Screen.RegistrationPage} options={opts} />
          <Stack.Screen name="OTP" component={Screen.Otp} options={opts} />          
          <Stack.Screen name="AuthAccount" component={Screen.AuthAccount} options={opts} />
          <Stack.Screen name="Dashboard" component={AppDrawer} options={opts} screenOptions={{headerTitleAlign: 'center'}} />
          <Stack.Screen name="DataUsage" component={Screen.DataUsage} options={opts} />
          <Stack.Screen name="ReferAFriend" component={Screen.ReferAFriend} options={opts} />
          <Stack.Screen name="SelectPackage" component={Screen.SelectPackage} options={opts} />
          <Stack.Screen name="PickRequest" component={Screen.PickRequest} options={opts} />
          <Stack.Screen name="PackageDetails" component={Screen.PackageDetails} options={opts} />
          <Stack.Screen name="SelectPayGate" component={Screen.SelectPayGate} options={opts} />
          <Stack.Screen name="GoPay" component={Screen.GoPay} options={opts} />          
          <Stack.Screen name="PaymentHistory" component={Screen.PaymentHistory} options={opts} />
          <Stack.Screen name="MyService" component={Screen.MyService} options={opts} />
          <Stack.Screen name="MyProfile" component={MyProfileDrawer} options={opts} />
          <Stack.Screen name="Help" component={HelpDrawer} options={opts} />
          <Stack.Screen name="ContactUs" component={ContactUsDrawer} options={opts} />
          <Stack.Screen name="Notification" component={Screen.Notification} options={opts} />
          <Stack.Screen name="AddAccount" component={Screen.AddAccount} options={opts} />
         
        </Stack.Navigator>
      </NavigationContainer>
  }
  
  const AppProvider = (props) => {
    return <UserProvider>            
      <StatusBar hidden={true} />                      
      <AppLayout />          
    </UserProvider>;
  }

  return <AppProvider navigation />
};

export default App;
