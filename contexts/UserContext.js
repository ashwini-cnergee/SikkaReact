import React, { useState, useEffect, createContext } from 'react'
import _ from 'lodash';
import DefaultLang from './../components/DefaultLang';
import Utils from './../Utils';
import DeviceInfo from 'react-native-device-info';
import { call } from 'react-native-reanimated';

const UserContext = createContext();

const UserProvider = (props) => {

  const [userData, setUserData] = useState(false);
  const [memberData, setMemberData] = useState({});
  const [memberPlans, setMemberPlans] = useState({});    
  const [processing, setProcessing] =  useState({
    loading: false,    
    message: "",//"Loading data.. please wait..",
    type: 0  //0-no show, 1-info, 2-warning, 3-danger, 4-success
  });
  let response ="";
  const [payPackage, setPayPackage] = useState({});  

  const getUserData = (callback = () => {}) => {
    if(userData===false){
      Utils.getUserData().then((data) => {      
        if(data){               
          setUserData(data);
          fetchMemberPlans(data).then(callback);
        }
      }).catch(err => {});
    }else{
      callback();
    }
  }

  useEffect(getUserData,[]);  
  
  const saveUserData = (uData,callback) => {
    if(uData.addAccount){
      var tmp = {...userData};
      _.set(tmp,'accounts',_.get(tmp,'accounts',[]));
      tmp.accounts.push(uData);
      setUserData(tmp);
      uData = {...tmp};
    }
    setUserData(uData);    
    Utils.setUserData(uData).then(() => {
      if(callback) callback();
    }).catch(err => window.alert("Issue in saving session"));
  }

  const logout = (callback) => {

    const logoutData = {
      MemberId: userData.MemberId[0],
      MemberLoginId: userData.MemberLoginID[0]
    };
    
    Utils.axios('LogOffCustomer',logoutData, function(res,err){ });

    Utils.removeUserData().then(() => {
      setUserData(false);
      callback();
    });    

    

  }

  const getLang = (key) => {
    const lang = _.get(userData,'lang','en');
    
    if(lang=='en'){
      return _.get(DefaultLang,key,'N/A');
    }else{
      const systemLang = {};
      return _.get(systemLang,key,_.get(DefaultLang,key,'N/A'));
    }
   
  }

  const getLoginByNumber = (mobile, callback) => {
    
    //window.alert(JSON.stringify(otpData));

    setProcessing({loading: true, type: 0, message: getLang('login.loading')});

    Utils.axios('GetLoginByNumber',{"Primaryphoneno": mobile},function(res,err){
      if(res===false || err!==false){
        setProcessing({loading: false, type: 3, message: getLang('messages.invalid')});
        //callback(false,getLang('messages.invalid'));
      }else{
        const myCheckPoint = parseInt(_.get(res,'NewDataSet.0.Table.0.myCheckPoint',"0"));

        if(myCheckPoint===0){
        // if number is not found
          setProcessing({loading: false, type: 2, message: getLang('login.notfound')});
          //callback(false,getLang('login.notfound'));
        }
        else{
          setProcessing({loading: false, type: 0, message: ''});
          //== if number is found 
          //setMembersData(_.get(res,'NewDataSet.0.Table'));
          callback(myCheckPoint,false);
        }
      }
    });
    
  }

  const getMemberDetails = (data, callback) => {
    
    var postData = {'Moilenumber': data.mobile};
    if(_.get(data,'memberLoginId', false)){
      postData['MemberLoginId'] = data.memberLoginId;
    

      setProcessing({loading: true, type: 0, message: getLang('login.memberDetailsloading')});

      Utils.axios('GetMemberDetails',postData,function(res,err){               
        const memdetails = _.get(res,'NewDataSet.0.Table.0',{});        
        if(_.get(memdetails,'MemberLoginID',false)){          
          setProcessing({loading: false, type: 0, message: ''});
          _.set(memdetails,'addAccount',_.get(data,'addAccount',false));
          setMemberData(memdetails);          
          sendOTP(memdetails,callback);
        }else{
          setProcessing({loading: false, type: 2, message: getLang('messages.memberNotFound')});
        }
      });    

    }
  }

  const wipeMemberData = (callback) => {
    setMemberData({});
    callback();
  }

  const ReferAFriendSubmit = (refer,data,callback) => {

    let funcName = 'GenralShortEnquiryForm';
    let msg = 'register.submitting';
    let done = 'register.done';
    
    if(refer){
      data['SubscriberId'] = userData.MemberLoginID[0];
      funcName = 'GenralShortEnquiryFormRef';
      msg = 'refer.submitting';
      done = 'refer.done';
    }

    setProcessing({loading: true, message: getLang(msg)});

    Utils.axios(funcName,data, function(res,err){                    
      setProcessing({loading: false, type: 1, message: getLang(done)});
      callback();      
    });
  }

  const sendOTP = (memdetails,callback) => {
    
    if(_.get(memdetails,'MemberId',false)){
      var otpData = {
        "MemberId": memdetails.MemberId[0],      
        "PhoneName": DeviceInfo.getBrand(),
        "PhoneVersion": DeviceInfo.getBuildNumber(),
        "PhoneUniqueId": DeviceInfo.getUniqueId(),
        "Phoneplatform": DeviceInfo.getSystemName(),
        "phonepackage": DeviceInfo.getSystemVersion(),
        "PhoneNumber": memdetails.MobileNoprimary[0],
        "AppVersion": DeviceInfo.getApplicationName()
      };

      setProcessing({loading: true, type: 0, message: getLang('messages.insertPhoneDetailsloading')});

      Utils.axios('InsertPhoneDetailsWithAppVersion',otpData, function(res,err){        
        if(parseInt(res)>0){
          setProcessing({loading: false, type: 0, message: ''});
          callback();
        }else{
          setProcessing({loading: false, type: 3, message: getLang('messages.noOTPGenerated')});
        }
      });
    }

  }

  const verifyOTP = (otp, callback) => {

    if(_.get(memberData,'MemberId',false)){
      var otpData = {
        "MemberId": memberData.MemberId[0],
        "PhoneUniqueId": DeviceInfo.getUniqueId(),
        "Ontimepassword": otp
      };

      setProcessing({loading: true, type: 0, message: getLang('messages.verifyOTP')});

      Utils.axios('VerifyPassword',otpData, function(res,err){        
        if(parseInt(res)===1){
          setProcessing({loading: false, type: 0, message: ''});
          //authorizeAccount(callback);
          if(callback){            
            callback();
          }         
        }else{
          setProcessing({loading: false, type: 3, message: getLang('messages.wrongOTP')});
        }
      });
    }
  }

  const authorizeAccount = (callback) => {
    //==== login the user and save the data
    saveUserData({...memberData},() => {
      fetchMemberPlan(memberData,callback);
    });     
  }

  const fetchMemberPlan = (udata,callback = null) => {        
    if(_.get(memberPlans,udata.MemberLoginID[0],false)){
      if(callback)      
        callback(memberPlans[udata.MemberLoginID[0]]);
      else{
        return memberPlans[udata.MemberLoginID[0]];
      }  
    }else{      
      Utils.axios('GetSubscriberPackageDetails',{SubscriberId: udata.MemberLoginID[0]}, function(res,err){                            
        var data = _.get(res,'NewDataSet.0.Table.0',false);                  
        if(data){                           
          memberPlans[data.SubscriberID[0]] = data;
          setMemberPlans(memberPlans);
          if(callback){            
            callback(data);
          }          
        }else{
          setProcessing({loading: false, type: 3, message: getLang('messages.fetchPlanError')});
        }
      });
    }
        
  }

  const fetchMemberPlans = (uData) => {    
    return new Promise((resolve,reject) => {
      const callback = () => {        
        if(_.get(uData,'accounts',[]).length+1  === Object.keys(memberPlans).length){          
          resolve();
        }
      };
      fetchMemberPlan(uData, callback);    
      _.get(uData,'accounts',[]).forEach(data => fetchMemberPlan(data, callback));      
    })
  }

  const deleteMemberPlans = (memid) => {    
    const mplans = _.omit(memberPlans,memid);    
    setMemberPlans(mplans);
    var acts = _.get(userData,'accounts',[]).filter(a => a.MemberLoginID[0]!==memid);
    
    saveUserData({...userData,accounts: [...acts]});
  }

  const switchMemberPlan = (memid) => {    
    var actOthers = _.get(userData,'accounts',[]).filter(a => a.MemberLoginID[0]!==memid);
    actOthers.push(_.omit(userData,'accounts'));

    var actMain = _.get(userData,'accounts',[]).filter(a => a.MemberLoginID[0]===memid);

    setUserData({...actMain[0],accounts: [...actOthers]});    
  }

  const getComplaintCategory = (callback) => {
    Utils.axios('GetComplaintCategoryList',{},function(res,err){
      var data = _.get(res,'NewDataSet.0.Table',false);       
      if(data){
        callback(data);
      }else{
        setProcessing({loading: false, type: 3, message: getLang('messages.noComplaintCategoryFound')});
      }
    });
  }

  const submitService = (ctype,comment,file='', callback) => {
    setProcessing({loading: true, type: 1, message: 'Saving your complaint.. please wait..!'});
    Utils.axios('InsertMemberComplaints',{
      "MemberId": memdetails.MemberId[0],
      "Comments": comment,
      "ComplaintId": ctype
    },function(res,err){      
      var data = _.get(res,'NewDataSet.0.Table',false);       
      if(data){
        //callback(data);
        var tmp = {...memberPlans};
        tmp[memberData.SubscriberID[0]].ComplaintStatus = 1;
        setMemberPlans({...tmp});
        setProcessing({loading: false, type: 0, message: ''});
      }else{
        setProcessing({loading: false, type: 3, message: getLang('messages.complaintSaveError')});
      }
    });
  }

  const alreadyHasComplaint = () => {
    if(_.get(userData,'MemberLoginID[0]',false)){
      return parseInt(_.get(memberPlans,`${userData.MemberLoginID[0]}.ComplaintStatus[0]`,0));
    }else{            
      return false;
    }    
  }

  const getComplaint = (callback) => {    
    if(_.get(userData,'MemberId[0]',false)){
      Utils.axios('SelfResolution',{"MemberId": userData.MemberId[0]},function(res,err){        
        var data = _.get(res,'NewDataSet.0.Table',false);               
        if(data){
          callback(data);
        }
      });
    }else{
      console.log('aww');
    }
  }

  const getSelfResolution = (callback) => {    

    if(_.get(userData,'MemberId[0]',false)){
      setProcessing({loading: true, type: 0, message: getLang('service.srProcessing')});
      Utils.axios('GetSelfResolution',{"Memberid": userData.MemberId[0]},function(res,err){
        if(res){
          var str = res.split('#');          
          setProcessing({loading: false, type: 1, message: str[0], btnLabel: str[1], onOk: afterSelRes(str[1],callback)});
        }
      },false);
    }else{
      setProcessing({loading: false, type: 3, message: getLang('service.invalid')});      
    }
  }

  const afterSelRes = (opt,callback) => {    

    const resType = {
      'Password': 'ResetPassword',
      'Logoff': 'LogOffCustomer',
      'Mac': 'ResetMacAddress',
      'Refresh': 'GetSelfResolution'
    };

    const data = {      
      'Password': {MemberId: userData.MemberId[0], MemberLoginId: userData.MemberLoginID[0]},
      'Logoff': {MemberId: userData.MemberId[0], MemberLoginId: userData.MemberLoginID[0]},
      'Mac': {MemberId: userData.MemberId[0], MemberLoginId: userData.MemberLoginID[0], MobileNo: userData.MobileNoprimary[0]},
      'Refresh': {MemberId: userData.MemberId[0]},
    };

    if(_.get(resType,`opt`,false)){      
      return function (){
        setProcessing({loading: true, type: 0, message: getLang('service.srFinalProcessing')});
        Utils.axios(resType[opt],data[opt],function(res,err){
          setProcessing({loading: false, type: 1, message: res});
        },false);
      }
    }else{
      return function(){
        callback(opt);
      }
    }
  }

  const getAreawiseSetting = (memId,callback) => {

    if(_.get(memberPlans,memId,false)){      
      if(getMemberPackages(memId)===false){
        setProcessing({loading: true, type: 0, message: 'Fetching packages available..!'});
        Utils.axios('GetAreawiseSetting',{
          'AreaId': memberPlans[memId].AreaCode[0],
          'SettingType': 'UP'
        },(res,err) => {
          if(res=="1"){
            Utils.axios('GetPackageListWithConnectionTypeByMemberid',{
              "MemberId": memberPlans[memId].MemberId[0] ,
              "ConnectionTypeId":  memberPlans[memId].ConnectionTypeId[0],
              "AreaCode": memberPlans[memId].AreaCode[0]
            },(res,err) => {
              var pkgs = _.get(res,'NewDataSet.0.Table',false);               
              if(pkgs===false || pkgs.length===0){
                setProcessing({loading: false, type: 3, message: 'No Package Available!'});
                callback(false);
              }else{
                setProcessing({loading:false});
                setMemberPackages(memId,pkgs);
                callback(pkgs);
              }
              
            });
          }
        });
      }else{
        callback(getMemberPackages(memId));
      }
    }else{
      setProcessing({loading:false, type: 3, error: 'failed to fetch area settings'});
      callback(false);
    }

  }

  const setMemberPackages = (memId, pkgs) => {
    const a = {...memberPlans};
    a[memId]['packages'] = {...pkgs};
    setMemberPlans({...a});
  }

  const getMemberPackages = (memId) => {
    return _.get(memberPlans,`${memId}.packages`,false);
  }

  const setSelectedPackage = (pkgId) => {
    setUserData({...userData, selectedPkgId: pkgId});
  }

  const getSelectedPackage = () => {

    let pkgs = getMemberPackages(userData.MemberLoginID[0]);

    return Object.values(pkgs).filter(p => p.PackageId[0] == userData.selectedPkgId)[0];
  }

  const getPayGates = (callback) => {
    const mplan = fetchMemberPlan(userData);    
    setProcessing({loading: true, type: 0, message: 'Fetching available gateways..!'});
    Utils.axios('GetAndCreatePGButton',{
      CompanyId: mplan.CompanyID[0],
      MemberId: userData.MemberId[0]
    },(res,err) => {
      setProcessing({loading:false});
      callback(res);
    });
  }

  const addPaymentGatewayToPayPackage = (gway) => {    
    setPayPackage({...payPackage, gway: gway});
  }

  const [txnid, setTxnid] = useState(false);

  const doBeforePayment = (callback) => {    
    
    // var response;
    console.log("IN doBeforePayment");
    
    setProcessing({loading: true, type: 0, message: getLang('payment.init')});
    Utils.axios('BeforeMemberPaymentPGInsertUpdate_withTrackID',{
      MemberId: userData.MemberId[0],
      BankCode: payPackage.gway.BankCode,
      Amount: payPackage.pkg.PlanAmount[0],
      DiscountAmount: payPackage.dynamicRates.DiscountAmount,
      PackageName: payPackage.pkg.PlanName[0],
      ServiceTax: payPackage.pkg.ServiceTax[0],
      PGUniqueId: payPackage.gway.PGID,
      PoolRate: payPackage.dynamicRates.PoolRate
      //AdvanceType: 
      //RenewalType: 
      //IsPhoneRenewal:
    },(res,err) => {
      setProcessing({loading:false});
      setTxnid(res);
     
    response = callback(res);
    console.log("IN doBeforePayment Response123:-"+res);
    console.log("IN doBeforePayment Response:-"+response);

    },false);
    return response;
  }

  const [nots, setNots] = useState([]);


  const  paymentDetails = async  (callbackResponse) => {    
       
    console.log('callback-response', callbackResponse);
    
    setProcessing({loading: true, type: 0, message: getLang('payment.init')});
     await Utils.axios('GetAtomSignatureLive',{
      MemberId: userData.MemberId[0],
      TrackId:callbackResponse,
      Amount: payPackage.pkg.PlanAmount[0],
      
      //AdvanceType: 
      //RenewalType: 
      //IsPhoneRenewal:
    },(res,err) => {
      setProcessing({loading:false});
    //   setTxnid(res);
      console.log("IN doBeforePayment Response:-"+res);
     
    // response= callback(res);
    },false);
  }

  const getNotifications = (callback) => {
    setProcessing({loading: true, type: 0, message: getLang('notifications.fetch')});
    Utils.axios('GetNotificationonMemberId', {
      MemberId: userData.MemberId[0]
    },(res,err) => {
      var rec = _.get(res,'NewDataSet.0.Table',[]);
      setProcessing({loading:false});
      setNots(rec);
      callback(rec);
    });
  }

  const delNotification = (nid, callback) => {
    setProcessing({loading: true, type: 0, message: getLang('notifications.delete')});
    Utils.axios('DeletNotification', {
      MemberId: userData.MemberId[0],
      NotifyId: nid
    },(res,err) => {
      setProcessing({loading:false});
      //let rec = nots.filter(n => n.NotifyId[0]!=nid);
      //setNots(rec);
      //callback(rec);
      getNotifications(callback);
    });
  }

  
  return <UserContext.Provider value={{ memberData, userData, processing, memberPlans, deleteMemberPlans, switchMemberPlan,
    ReferAFriendSubmit, alreadyHasComplaint, getComplaintCategory, submitService, getComplaint, getSelfResolution,
    wipeMemberData, logout, getLang, getLoginByNumber, getUserData, getMemberDetails, 
    verifyOTP, sendOTP, authorizeAccount, setProcessing, fetchMemberPlan, getNotifications, delNotification,
    getAreawiseSetting, setSelectedPackage, getSelectedPackage, payPackage, setPayPackage, getPayGates, addPaymentGatewayToPayPackage, doBeforePayment,paymentDetails }} >
    {props.children}
  </UserContext.Provider>;
}

export default UserContext;

export { UserProvider };