import React,{useState, useContext, useEffect} from 'react';

import {
  ImageBackground, Image, 
  ScrollView, 
  View
} from 'react-native';

import {Text} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import UserContext from '../contexts/UserContext';
import styles from '../Stylesheet';
import Utils from './../Utils';

import CustomHeader from './../components/CustomHeader';

import Accordion from 'react-native-collapsible/Accordion';

import _ from 'lodash';

const Help = (props) => {

  const {getLang} = useContext(UserContext);

  const [activeSections, setActiveSections] = useState([]);
  const [activeFaqs, setActiveFaqs] = useState([]);

  const icons = [
    require('./../images/help_icons/renew.png'),
    require('./../images/help_icons/upgrade.png'),
    require('./../images/help_icons/request_pay.png'),
    require('./../images/help_icons/complaint.png'),
    require('./../images/help_icons/self.png'),
    require('./../images/help_icons/ren_his.png'),
    require('./../images/help_icons/data.png'),
    require('./../images/help_icons/alerts.png'),
    require('./../images/help_icons/faq.png')
  ];

  const sections = [...getLang('help.content')];

  const renderHeader = (section,idx) => <View style={{...styles.row,...styles.helpTitleBox}}>
    <Text style={styles.helpTitle}>{section.title}</Text>
    <Image source={icons[idx]} style={{marginLeft:'auto'}} />
  </View>;

  const renderContent = section => {
    
    let content = section.content;

    if(typeof(content)==='object'){
      return <View style={styles.faqBox}>{renderFAQ(content)}</View>;
    }else{
      content = section.content.replace(/##APPNAME##/g,getLang('appdata.title'));
      return <View style={styles.helpContentBox}>
        <Text style={styles.helpContent}>{content}</Text>
      </View>;  
    }
  }

  const renderFAQ = (faqs) => {
    return (
    <Accordion      
      sections={faqs}
      activeSections={activeFaqs}
      renderHeader={ faq => <View style={{...styles.row,...styles.helpTitleBox}}>        
        <Text style={styles.helpTitle}>{faq.title}</Text>
      </View>}
      renderContent={ faq => <View style={styles.helpContentBox}><Text style={styles.helpContent}>{faq.content}</Text></View>}
      onChange={setActiveFaqs}           
      align="center"
      underlayColor="#eee"
    />)
  }

  const renderHelp = () => {
    return (
      <Accordion
        sections={sections}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}     
        onChange={setActiveSections}           
        align="center"
        underlayColor="#eee"
      />
    );
  }

  return <ImageBackground source={require('./../images/site-bg.jpg')} style={styles.screenBackground}>      
    <CustomHeader title={getLang('help.heading')} />
    <View style={styles.template1Wrapper}>
      <ScrollView contentContainerStyle={styles.template2Body}>
        {renderHelp()}
      </ScrollView>    
    </View>    
  </ImageBackground>;

};

export default Help;