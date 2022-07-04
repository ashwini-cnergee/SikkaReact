import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  screenContainer:{

    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F3EAE5',
    height: "100%"
  },

  screenBackground: {
    width: "100%",
    height: "100%",
    justifyContent:'center',
    alignItems: 'center'
  },

  screenLogo: {
    width: 252,
    height: 110
  },

  headerContainer: {
    backgroundColor: '#0061a6',    
    height: 50,
    paddingTop: 0
  },

  drawerBar: {
    backgroundColor: '#0061a6',
    height: "100%",
    width: 30
  },

  headerTitle:{
    fontSize: 18,
    color: "#fff",
   
  },

  scrollview: {
    minHeight: '100%',    
    justifyContent: 'center',    
    alignItems: 'center'
  },

  center: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  centermiddle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto'
  },

  row: {
    flexDirection: 'row',    
    width: '100%'
  },

  formBox: {
    flexDirection: 'column',
    justifyContent: 'center'
  },

  formRow: {
    flexDirection: 'row',    
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10
  },

  left: {    
    marginRight: 'auto'
  },

  right: {
    marginLeft: 'auto'
  },

  heading1: {
    color: '#20437b',
    fontSize: 14,
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  heading2: {
    color: '#0c0c0c',
    fontSize: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderColor: '#f1f1f1',
    borderBottomWidth: 2,
    width: '80%',
    textAlign: 'center', 
    paddingBottom: 10   
  },

  headingWhite: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',    
    textAlign: 'center'
  },

  inputGrey: {
    color: '#888888',
    fontSize: 20,
    margin: 4,
    padding: 2
  },

  textBlack: {
    color: '#333333',
    fontSize: 16
  },

  textGrey: {
    color: '#888888',
    fontSize: 16
  },

  textBlue: {
    color: '#0a6bdd',
    fontSize: 16
  },

  planName: {
    color: '#999999',
    fontSize: 20
  },

  planCost: {
    color: '#d32929',
    fontSize: 20
  },

  template1Wrapper: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  
  template1Header: {
    flex: .7, 
    flexDirection: 'column', 
    justifyContent: 'space-around', 
    backgroundColor: '#0061a6', 
    padding: 20,
    minHeight: 160,
    maxHeight: 160
  },

  subheading: {
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 25
  },

  subheadingImage: {
    backgroundColor: 'rgba(248,148,28,1)',
    borderRadius: 10,
    padding: 10,
    marginLeft: 'auto'
  },

  template2Header: {
    backgroundColor: '#0061a6', 
    padding: 30,
    paddingBottom: 50
  },

  template1Body: {        
    flex: 2.3,
    flexDirection: 'column', 
    justifyContent: 'space-evenly', 
    padding: 10
  },

  template2Body: {        
    flexDirection: 'column', 
    justifyContent: 'space-evenly', 
    padding: 10
  },

  otpInput: {
    borderColor: '#0061a6',
    borderWidth: 1,
    width: 50,
    height: 70,
    fontSize: 40,
    textAlign: "center"
  },

  inputType1:{
    width: "100%",
    minHeight: 30,
    lineHeight: 20,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#d4d4d4",    
    marginBottom: 10
  },

  loadingOverlayText: {
    paddingLeft: 20,
    fontSize: 16,
    color: "#000000"
  }, 

  errorText: {
    color: "#000000",
    fontSize: 18,    
    padding: 5,
    marginTop: 'auto',
    marginBottom: 'auto'
  },

  bannerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',

  },

  box: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10
  },

  utilityButton: {
    marginTop: 'auto',
    marginBottom: 'auto',
    alignSelf: 'center',
    width: 55,
    height: 55
  },

  headerMenuItem: {
    width: '100%'
  },

  userName: {
    fontSize: 24,
    color: '#0061a6'
  },

  drawerLabel: {
    fontSize: 16
  },

  bold: {
    fontWeight: "bold"
  },

  helpTitleBox: {
    backgroundColor: '#cccccc22',
    padding: 10,
    borderTopColor: '#d8d8d8',
    borderTopWidth: 1 
  },

  helpTitle: {
    fontSize: 18,
    color: "#444444",
    paddingTop: 10,
    paddingBottom: 10
  }, 

  helpContentBox: {
    backgroundColor: '#dddddd11',    
    margin: 20
  },

  helpContent: {    
    fontSize: 18,
    color: "#444488",
  },

  faqBox: {
    backgroundColor: '#cccccc22',    
    padding: 20
  },

  packageBox: {
    backgroundColor: '#ffffff',
    marginLeft: "-2.5%",
    width: '106%',
    padding: 10,
    borderWidth: 1,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#00000022",
    borderRadius: 5,
    marginTop: 5
  },

  packageColor: {    
    height: '100%', 
    borderRadius: 25,
    borderTopLeftRadius: 0, 
    borderBottomLeftRadius: 0, 
    overflow: 'hidden',
    marginLeft: -45
  },

  packageTitle1: {
    fontSize: 25,
    fontWeight: 'bold'
  },

  packageTitle2: {
    fontSize: 15,
    fontWeight: 'bold'
  },

  dotGrey: {
    marginTop: 5,
    marginRight: 5,
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#00000022"
  },

  dotRed: {
    marginTop: 5,
    marginRight: 5,
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#ff000099"
  },

  packageDesc: {
    color: '#0061a6'
  },
  packageAmt:{
    color: '#880808',
    paddingRight: 30,
    fontSize: 18
  },
  greenbar: {
    backgroundColor: "#8bc34a",
    width: 10,
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  }


});

export default styles;