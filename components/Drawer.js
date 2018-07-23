import React, { Component } from 'react';
import {
  Content,Container,Button,Title,Toast
} from 'native-base';
import { Text, View,StyleSheet,Image,AsyncStorage} from "react-native";
//#3F51B5
export default class SideBar extends Component {
  logout=()=>{
    AsyncStorage.setItem('user', '');
    Toast.show({
      text: "Successfully Logout!",
      type: "success",
     
    })
    AsyncStorage.setItem('quantityarray','');
            AsyncStorage.setItem('total','0');
            AsyncStorage.setItem('final_name','');
        AsyncStorage.setItem('final_quantity', '');
        AsyncStorage.setItem('final_total', '');
        AsyncStorage.setItem('f_total', '');
      AsyncStorage.setItem('subtotal', '');
    this.props.screenProps.navigation.push('Login')
   }  
   parkedinvoicetable = () => {
    AsyncStorage.setItem('quantityarray','');
            AsyncStorage.setItem('total','0');
            AsyncStorage.setItem('final_name','');
        AsyncStorage.setItem('final_quantity', '');
        AsyncStorage.setItem('final_total', '');
        AsyncStorage.setItem('f_total', '');
      AsyncStorage.setItem('subtotal', '');
      AsyncStorage.setItem('prod_quantity', '');
      AsyncStorage.setItem('parked_table', '');
    this.props.screenProps.navigation.push('Parked_Tables') 
  }
  gototable = () => {
    AsyncStorage.setItem('quantityarray','');
            AsyncStorage.setItem('total','0');
            AsyncStorage.setItem('final_name','');
        AsyncStorage.setItem('final_quantity', '');
        AsyncStorage.setItem('final_total', '');
        AsyncStorage.setItem('f_total', '');
      AsyncStorage.setItem('subtotal', '');
      AsyncStorage.setItem('prod_quantity', '');
    AsyncStorage.removeItem('invoice_id');
    AsyncStorage.setItem('parked_table', '');
    this.props.screenProps.navigation.push('Profile') 
  }
  render(){
return(
    <Container style={{backgroundColor:'#ffffff'}}>
        <Content> 
          <View style={styles.logo}> 
            <Image
              style={{ width: 180, height: 65 }}
              source={require('./logo1.png')}
            />
          </View>
          <View style={styles.logo}>
          </View>

         <Button  style={styles.button} 
          onPress={() => this.parkedinvoicetable()}
          >
              <Title style={{color:'black',fontFamily:'OpenSans', fontSize:20,}}>Parked Invoices</Title>
          </Button>
          <Button  style={styles.button} 
          onPress={() => this.gototable()}
          >
            <Title style={{color:'black',fontFamily:'OpenSans', fontSize:20,}}>Table Menu</Title>
          </Button>
          <Button  style={styles.button} 
          onPress={() => this.logout()}
          >
            <Title style={{color:'black',fontFamily:'OpenSans', fontSize:20,}}>Log Out</Title>
          </Button>
          <Button  disabled={true}
          style={styles.button} 
          //onPress={() => this.logout()}
          >
          </Button>
        </Content>
      </Container>
)};
}
const styles = StyleSheet.create({
    button: {
      backgroundColor: 'rgba(255, 255,255,0.2)',
      width:'100%',
      //alignItems:'center',
      justifyContent: 'center'
    },
    logo: {
      flex: 1,  
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#297495',
      paddingTop: 50
    },
  });