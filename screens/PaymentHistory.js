import React, { useEffect, useContext, useState } from 'react';

import {
  ScrollView, 
  ImageBackground, 
  View,
  Text, 
  Image,
  Button, 
  TouchableOpacity
} from 'react-native';

import UserContext from '../contexts/UserContext';

import _ from 'lodash';

import styles from '../Stylesheet';

import Utils from '../Utils';

const PaymentHistory = (props) => {

  const {userData, getLang, setProcessing} = useContext(UserContext);
  const [phis, setPHis] = useState(false);

  //const memid = 14935;
  const memid = userData.MemberId[0];

  const onBack = () => {
    props.navigation.goBack();
  }

  const fetchPaymentHistory = () => {    
    setProcessing({loading: true, type: 0, message: getLang('paymentHistory.fetch')});
    Utils.axios('GetPaymentHistory',{MemberId: memid},(res,err) => {      
      setPHis(_.get(res,'NewDataSet.0.Table',[]));
      setProcessing({loading: false});
    });
  }

  useEffect(fetchPaymentHistory,[]);

  const getImage = (mode) => {
    return {
      'CASH': require(`./../images/appicons/CASH.png`),
      'CHEQUE': require(`./../images/appicons/MOBILE.png`),
      'CARD': require(`./../images/appicons/CARD.png`),
      'Net Banking': require(`./../images/appicons/ONLINE.png`)
    }[mode];
  }

  const fetchDetails = (mode, rid) => (e) => {
    let tmp = [...phis];
    const idx = _.findIndex(tmp, (a) => a.RenewalID[0]==rid);   
    
    _.each(tmp,(a,i) => tmp[i]['detMode']=0); //== hide all the details first

    tmp[idx]['detMode'] = mode; //== show the details for clicked one

    if(_.get(tmp,`${idx}.details`,false)){
      setPHis([...tmp]);
    }
    else{
      setProcessing({loading: true, type: 0, message: getLang('paymentHistory.fetchdetails')});
      Utils.axios('ReceiptPrinting',{Memberid: memid, Renewalid: rid},(res,err) => {        
        tmp[idx]['details'] = _.get(res,'NewDataSet.Table',{});      
        setPHis([...tmp]);      
        setProcessing({loading: false});
      },'raw');
    }
  }

  const renderPayment = (p,idx) => <View key={idx} style={{marginTop: 10, paddingRight: 10, marginBottom: 10}}>
    
    <View style={styles.row}>
      <Text style={{...styles.bold, flex: 0.3,textAlign:"left", fontSize: 20}}>{p.PaymentDate[0]}</Text>
      <Text style={{...styles.bold, flex: 0.7,textAlign:"right"}}>{p.Mode[0]}</Text>      
    </View>

    <View style={styles.box}>
      <View style={styles.row}>
        <Image source={getImage(p.Mode[0])} style={{flex: 0.2, height: 50, maxWidth: 50, marginLeft: 0, marginRight: 10}} />
        <View style={{flex: 0.8}}>
          <Text>{getLang('paymentHistory.pname')}: {p.PackageFullName[0]}</Text>
          <Text>{getLang('paymentHistory.rno')}: {p.ReceiptNo[0]}</Text>
          <View style={styles.row}>
            <Text style={{...styles.bold,flex: 0.6}}>{getLang('paymentHistory.expDate')}: {p.ExpiryDate[0]}</Text>
            <Text style={{...styles.bold,flex: 0.4, textAlign: 'right'}}>{getLang('paymentHistory.billPaid')} {parseFloat(p.Amount[0]).toFixed(2)}</Text>
          </View>          
        </View>        
      </View>  

      <View style={{...styles.row, marginTop: 5}}>
        
        <TouchableOpacity style={{flex: 0.5, alignItems: "flex-start"}} onPress={fetchDetails(1, p.RenewalID[0])}>
          <View style={{...styles.row, backgroundColor: "#0061a6", width: 100, borderRadius: 5, padding: 5, alignItems: "center"}}>
            <Text style={{...styles.bold,color: "#ffffff", marginLeft: 8}}>{getLang('paymentHistory.rcptBtn')}</Text>
            <Image source={require('./../images/appicons/Receipt-icon.png')} style={{width: 15, height: 22, marginLeft: 5}} />
          </View>        
        </TouchableOpacity>

        <TouchableOpacity style={{flex: 0.5, alignItems: "flex-end"}} onPress={fetchDetails(2, p.RenewalID[0])}>
          <View style={{...styles.row, backgroundColor: "#f08921", width: 100, borderRadius: 5, padding: 5, alignItems: "center"}}>
            <Text style={{...styles.bold,color: "#ffffff", marginLeft: 8}}>{getLang('paymentHistory.invBtn')}</Text>
            <Image source={require('./../images/appicons/Invoice-Icon.png')} style={{width: 20, height: 22, marginLeft: 5}} />
          </View>
        </TouchableOpacity>        
        
      </View>
    </View>

    {p.detMode > 0 && renderDetails(p)}

  </View>;

  const getPHisFeilds = (ph) => {
    let ary = {};
    if(_.get(ph,'detMode',false)){
      if(ph.detMode==2){    
        ary['rno'] = _.get(ph,'details.ReceiptNo','-');
        ary['date'] = _.get(ph,'details.RenewalDate','-');
        ary['cname'] = _.get(ph,'details.MemberName','-');
        ary['pname'] = _.get(ph,'details.PackageName','-');
        ary['bcycle'] = _.get(ph,'details.RenewalPeriod','-');
        ary['pmode'] = _.get(ph,'details.PaymentMode','-');
        ary['amt'] = 'Rs ' + _.get(ph,'details.Amount','-');
      }else{
        ary['cin'] = _.get(ph,'details.CINNo','-');
        ary['cemail'] = _.get(ph,'details.Email','-');
        ary['cogst'] = _.get(ph,'details.CompanyGSTNo','-');
        ary['invno'] = _.get(ph,'details.Invoice_x0020_Number','-');
        ary['dissue'] = _.get(ph,'details.RenewalDate','-');
        ary['bperiod'] = _.get(ph,'details.RenewalPeriod','-');
        ary['uid'] = _.get(ph,'details.MemberLoginID','-');
        ary['cno'] = _.get(ph,'details.Telephone','-');
        ary['email'] = 'Rs ' + _.get(ph,'details.EmailId','-');
        ary['name'] = 'Rs ' + _.get(ph,'details.MemberName','-');
        ary['address'] = 'Rs ' + _.get(ph,'details.BillAddress','-');
        ary['pname'] = _.get(ph,'details.PackageName','-');
      }
    }

    return ary;
  }

  const renderDetails = (ph) => {

    const ary = getPHisFeilds(ph);

    return <View style={{...styles.box, borderColor: '#000000', width: "98%", marginLeft: "1%", marginRight: "1%", marginTop: 20}}>
      <Text style={styles.textBlue}>{getLang('paymentHistory.linetext')}</Text>
      
      {Object.keys(ary).map(k => <View style={{...styles.row, borderBottomWidth: 1, borderBottomColor: '#eeeeee', marginBottom: 5}} key={k}>
        <Text style={{flex: 0.4, textAlign: 'left'}}>{getLang(`paymentHistory.${k}`)}: </Text>
        <Text style={{flex: 0.6, textAlign: 'right'}}>{ary[k]}</Text>
      </View>)}

      {parseInt(_.get(ph,'detMode',0))===1 && renderReceiptExtra(ph)}
    </View>
  }

  const renderReceiptExtra = (ph) => {
    const clogo = 'data:image/png;base64,' + _.get(ph,'details.Logo','');
    return <>
      <View style={{...styles.box}}>
        <View style={{...styles.row, borderBottomColor: '#ccc', borderBottomWidth: 1}}>
          <Text style={{flex: 0.5,textAlign: 'center',borderRightColor: '#ccc', borderRightWidth: 1}}>{getLang('paymentHistory.cgst')}</Text>        
          <Text style={{flex: 0.5,textAlign: 'center'}}>{_.get(ph,'details.CGST','')}</Text>
        </View>
        <View style={{...styles.row, borderBottomColor: '#ccc', borderBottomWidth: 1}}>
          <Text style={{flex: 0.5,textAlign: 'center',borderRightColor: '#ccc', borderRightWidth: 1}}>{getLang('paymentHistory.sgst')}</Text>        
          <Text style={{flex: 0.5,textAlign: 'center'}}>{_.get(ph,'details.SGST','')}</Text>
        </View>
        <View style={{...styles.row}}>
          <Text style={{flex: 0.5,textAlign: 'center',borderRightColor: '#ccc', borderRightWidth: 1}}>{getLang('paymentHistory.igst')}</Text>        
          <Text style={{flex: 0.5,textAlign: 'center'}}>{_.get(ph,'details.IGST','')}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={{...styles.bold, flex: 0.5, textAlign: 'left'}}>{getLang('paymentHistory.total')}</Text>
        <Text style={{...styles.bold, flex: 0.5, textAlign: 'right'}}>Rs. {_.get(ph,'details.Amount','')}</Text>
      </View>

      <Image source={{uri: clogo}} style={{width: "100%", height: 100}} />
    </>;
  }


  const renderPayments = () => {
    return <>
      {_.get(phis,'length',0) === 0 && <Text style={{...styles.centermiddle, ...styles.bold}}>{getLang('paymentHistory.norecords')}</Text>}
      {_.get(phis,'length',0) > 0 && <>
        {phis.map(renderPayment)}
        </>}
    </>
  }

  return <ImageBackground source={require('./../images/site-bg.jpg')} style={styles.screenBackground}>
  <View style={styles.template1Wrapper}>
      
      <View style={{...styles.template1Header, minHeight: 60, maxHeight: 60}}>
        
        <View style={styles.row}>
          <TouchableOpacity onPress={onBack}><Image source={require('./../images/header/back-icon.png')} style={{width: 25, height: 25}} /></TouchableOpacity>
          <Text style={styles.headingWhite}>{getLang('paymentHistory.heading')}</Text>
        </View>
      
      </View>

      <View style={styles.template1Body}>          
        <ScrollView>
          {renderPayments()}

        </ScrollView>
      </View>
    </View>    
</ImageBackground>;
}

export default PaymentHistory;