import React, { Component } from "react";
import { NetInfo, Image, StyleSheet,BackHandler,BackAndroid, DeviceEventEmitter, Text, TextInput, View, TouchableOpacity, AsyncStorage } from "react-native";
import {
  Container,
  Content,
} from "native-base";
export default class Splash extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
        isConnected: true,
        count:''
      
    };
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  } 
  componentWillMount(){
    if(this.state.isConnected){
    setTimeout(() => {
      this._loadInitialState().done();
    }, 1000)
  }
  this.setState({count:'ok'});
}
  _loadInitialState = async () => {
    if (this.state.isConnected) {
    var value = await AsyncStorage.getItem('user');
    url = ''
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + value,
      }
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "ok") {
          AsyncStorage.setItem('quantityarray','');
            AsyncStorage.setItem('total','0');
            AsyncStorage.setItem('final_name','');
        AsyncStorage.setItem('final_quantity', '');
        AsyncStorage.setItem('final_total', '');
        AsyncStorage.setItem('f_total', '');
      AsyncStorage.setItem('subtotal', '');
      AsyncStorage.setItem('prod_quantity', '');
          this.props.navigation.push('Profile');

        }
        else {
          AsyncStorage.setItem('quantityarray','');
            AsyncStorage.setItem('total','0');
            AsyncStorage.setItem('final_name','');
        AsyncStorage.setItem('final_quantity', '');
        AsyncStorage.setItem('final_total', '');
        AsyncStorage.setItem('f_total', '');
      AsyncStorage.setItem('subtotal', '');
      AsyncStorage.setItem('prod_quantity', '');
          this.props.navigation.push('Login');
        }
      })
      .done();
  }
}
  componentDidMount() {
    
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
}
componentWillUnmount() {
    LocationServicesDialogBox.stopListener(); // Stop the "locationProviderStatusChange" listener
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
}
handleConnectivityChange = isConnected => {
  if (isConnected) {    
    this.setState({ isConnected });
    this.setState({count:'no' });
  } else {
    this.setState({ isConnected });
    if(this.state.count=='ok'){
      alert("No Network Connection");
      setTimeout(() => {
        BackHandler.exitApp();
    }, 2000)
    
    
  }}
};
  render() {
    return (
      <Container >
        <Content style={styles.container}>
        {/* <OfflineNotice /> */}

          <View style={styles.logo}>
        
            <Image
              style={{ width: 180, height: 65 }}
              source={require('./logo1.png')}
            />
          </View>

        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#297495',
  },
  logo: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 270
  },
});
