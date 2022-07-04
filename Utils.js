import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import {parseString} from 'react-native-xml2js';

import AsyncStorage from '@react-native-community/async-storage';

import LoadingOverlay from './components/Overlays/LoadingOverlay';
import ErrorOverlay from './components/Overlays/ErrorOverlay';

const Utils = {

    API_URL: "http://150.129.48.28:8005/CCRMToMobileIntegration.asmx?wsdl",
    API_ACCESS_ID: "CM000046SB",

    //API_URL: "http://103.54.180.3:8005/CCRMToMobileIntegration.asmx?wsdl",
    //API_ACCESS_ID: "CM0120ARS",

    WSDL_TARGET_NS: "http://tempuri.org/",

    supportCall: '+919868256219',

    

    axios: (mname,params,callback,toParse = true) => {        
        axios.post(Utils.API_URL,Utils.buildXML(mname,params),Utils.apiHeaders(mname)).then(res => {
            console.log("Request:-"+JSON.stringify(params));
            parseString(res.data,function(err,results){                
                if(results){
                    var rec = _.get(results,`soap:Envelope.soap:Body.0`,false);
                    
                    if(rec){
                        var rec1 = _.get(rec,`${mname}Response.0.${mname}Result.0`,false);
                        if(rec1 && _.isString(rec1) && toParse){
                            rec1 = JSON.parse(rec1);                                
                        }
                        callback(rec1,false, rec);   
                        
                    }else{
                        callback(false,getLang('messages.invalidResponse'));
                    }
                }else{
                    callback(false,JSON.stringify(err));
                }
            });
            
        }).catch((e) => {
            callback(false,e);
        });;
    },

    buildXML: (mname,json) => {
        
        if(!_.get(json,'ClientAccessId',false)){
            json['CliectAccessId']=Utils.API_ACCESS_ID;
        }

        var params = '';
        for(var i in json){
            params += `<${i}>${json[i]}</${i}>`;            
        }

        var str = `<?xml version="1.0" encoding="utf-8"?>
            <soap12:Envelope 
                        xmlns:soap12="http://www.w3.org/2003/05/soap-envelope" 
                        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                        xmlns:xsd="http://www.w3.org/2001/XMLSchema">  
                <soap12:Body>
                    <${mname} xmlns="${Utils.WSDL_TARGET_NS}">
                        ${params}
                    </${mname}>
                </soap12:Body>
            </soap12:Envelope>`;
        return str;

    },

    apiHeaders: (mname) => {
        return {
            headers: {
                'Content-Type': 'application/soap+xml',
                'SOAPAction': Utils.WSDL_TARGET_NS + mname
            }
        };
    },

    getUserData: async function (){
        try {
            let userData = await AsyncStorage.getItem('CYNMYAPP.appData');          
            if (userData !== null) {
                return JSON.parse(userData);
            }
        } catch(e){
            //window.alert('1 ' + JSON.stringify(e));
        }
        return false;
    },
    
    setUserData: async function (userData){          
        try{      
            await AsyncStorage.setItem('CYNMYAPP.appData',JSON.stringify(userData));
        } catch(e){
            console.log('not able to save');
            //window.alert('2 ' + JSON.stringify(e));
        }
    },

    removeUserData: async function(){
        try{           
            await AsyncStorage.removeItem('CYNMYAPP.appData');
        }catch(e){
            console.log('not able to logout');
        }
    },

    commonComponents: () => <>
        <LoadingOverlay />
        <ErrorOverlay />
    </>
};

export default Utils;