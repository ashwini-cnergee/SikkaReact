import React,{useState, useContext, useEffect, useCallback} from 'react';

import {
  ImageBackground, Image, 
  ScrollView, 
  View,
  Text,
  TextInput,
  Linking,
  TouchableOpacity
} from 'react-native';

import {Picker} from '@react-native-community/picker';

import {Button} from 'react-native-elements';

import ImagePicker from 'react-native-image-picker';

import HomeBanner from './../components/HomeBanner';
import UserContext from '../contexts/UserContext';
import styles from '../Stylesheet';
import Utils from './../Utils';

import _ from 'lodash';

const banners = [
  ['http://newapp.guardini.in/banners/3.png','http://instagram.com'],
  ['http://newapp.guardini.in/banners/1.png','http://www.facebook.com'],
  ['http://newapp.guardini.in/banners/2.png','http://www.google.co.in']
];

const MyService = (props) => {

  const {getLang, getComplaint, alreadyHasComplaint, getSelfResolution, getComplaintCategory, submitService, setProcessing} = useContext(UserContext);
  const [cTypes, setCTypes] = useState(false);

  const [cTypeValue, setCTypeValue] = useState('');
  const [comments, setComments] = useState('');
  const [uploader, setUploader] = useState(false);

  const [complaint, setComplaint] = useState(false);

  const callClickHandler = useCallback(async () => {

    const url = `tel:${Utils.supportCall}`;
  
    const supported = await Linking.canOpenURL(url);

    
    if (supported) {    
      await Linking.openURL(url);
    } else {
      alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);


  useEffect(() => {
    getComplaintCategory((dt) => {      
      var data =[];
      dt.map(d => {
        data.push({label: d.ComplaintName[0], value: d.ComplaintId[0]});
      })            
      setCTypes(data);
    });        
  },[]);

  useEffect(() => {    
    getComplaint(setComplaint);    
  },[cTypes]);

  const onBack = () => {
    props.navigation.navigate('Dashboard');
  }

  const showImagePicker = () => {

    return ImagePicker.showImagePicker({
      title: 'Upload supporting Image',
      mediaType: 'photo'      
    },(res) => {
      setUploader(false);
      if(!_.get(res,'didCancel',false)){
        if(_.get(res,'fileSize',0)/1024/1024 > 2){
          setProcessing({loading: false, type: 1, message: getLang('service.imagesizeissue')})
        }else{
          uploadFileNow(res);
        }
      }

    })
    
  }

  const uploadFileNow = (fdata) => {
    setProcessing({loading: true, type: 0, message: getLang('service.fetchftp')});
      Utils.axios('FTPDetails',{ClientAccessId: Utils.API_ACCESS_ID},function(res,err){
        setProcessing({loading: false, type: 0});
        if(res){          
          var ftpd = _.get(res,'NewDataSet.0.Table.0',false);          
          console.log("connect ftp now..");          
        }
      });
  }

  const renderUploader = () => {
    return <>
      <Button type="clear" onPress={()=>{setUploader(true);}} title="Upload Image" />
      {uploader && showImagePicker()}
    </>;
  }

  const showComplaint = () => {
    const ary = {
      loginId: 'Login_x0020_Id',
      complaintNo: 'MemberComplaintNo',
      complaintDate: 'CreatedDate',
      status: 'Status',
      assignTo: 'AssignedToCrmUserName',
      complaintType: 'ComplaintType',
      complaintCategory: 'ComplaintCategory',
      resolution: 'Resolution',
      lastComment: 'LastComment',
      pendingHours: 'Pending_x0020_Hr'
    };

    return <View style={{marginTop: 10, marginBottom: 20, borderRadius: 5, backgroundColor: '#fff', padding: 10}}>
      <Text style={{...styles.textBold, ...styles.bold}}>{getLang('service.tktheading')}</Text>

      {Object.keys(ary).map(k => <View key={k} style={styles.formRow}>
        <View style={styles.left}><Text style={styles.textGrey}>{getLang(`service.${k}`)}</Text></View>
        <View style={styles.right}><Text style={styles.textBlack}>{_.get(complaint,`0.${ary[k]}.0`,'')}</Text></View>
      </View>)}

    </View>;
  }

  const renderForm = () => {
    //return <Text>{JSON.stringify(cTypes)}</Text>;
    return (<View style={{marginTop: 10, borderRadius: 5, backgroundColor: '#fff', padding: 10}}>
      
      {_.get(cTypes,'length',0) > 0 && <>
        <Text style={{...styles.textBlack,...styles.bold}}>{getLang('service.ctype')}</Text>
        <Picker
          selectedValue={cTypeValue}        
          style={{ height: 50}}
          onValueChange={(val,idx) => {setCTypeValue(val)}}
        >
          {cTypes.map(ct => <Picker.Item key={ct.value} label={ct.label} value={ct.value} />)}
        </Picker>
      </>}

      <Text style={{...styles.textBlack,...styles.bold}}>{getLang('service.commentTitle')}</Text>
      <TextInput 
        multiline={true}    
        numberOfLines={3}
        style={styles.inputType1}
        placeholder={getLang('service.commentText')}
        placeholderTextColor="#ddd"        
        defaultValue={comments}
        onChangeText={setComments}>
      </TextInput>

      {renderUploader()}

      <View style={styles.center}><Image source={require('./../images/Buttons/Submit-Button-Blue.png')} style={{width: 110, height: 40}} onPress={submitForm} /></View>

    </View>);
  }; 

  const submitForm = () => {

    var file = '';
    submitService(cTypeValue,comments,fil, () => {
      
    });
  }

  const onSelfRes = () => {
    getSelfResolution((opt) => {
      if(opt=='PayNow'){
        props.navigation.navigate("SelectPackage");
      }
    })
  }

  return <ImageBackground source={require('./../images/site-bg.jpg')} style={styles.screenBackground}>
    <ScrollView style={{width: "100%", padding: 10}}>
        
        <View style={{...styles.row, marginTop: 20, marginBottom: 20}}>
          <TouchableOpacity onPress={onBack}>
            <Image source={require('./../images/header/back-icon-black.png')} style={{width: 25, height: 25}} />
          </TouchableOpacity>
          <Text style={{...styles.headingWhite, fontWeight: 'normal', color:'#000'}}>{getLang('service.heading')}</Text>
        </View>    

        <HomeBanner banners={banners} />

        <View style={{marginTop: 20, marginBottom: 20}}>
          <View style={{...styles.row, backgroundColor: '#fff', width: "100%", paddingLeft: 10, borderRadius: 10}}>
            <Text style={styles.subheading}>Self Resolution</Text>
            
            <View style={styles.subheadingImage}>
              <TouchableOpacity onPress={onSelfRes}>
                <Image source={require('./../images/appicons/self-resolution.png')} style={{width: 70, height: 70}} />
              </TouchableOpacity>
            </View>

          </View>
        </View>

        {complaint && showComplaint()}

        {!complaint && renderForm()}

        <TouchableOpacity onPress={callClickHandler}>
          <Image source={require('./../images/Buttons/Call-Button.png')} style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: 30, width: '90%', height: 55}} />
        </TouchableOpacity>
  
      </ScrollView>    
  </ImageBackground>;

};

export default MyService;