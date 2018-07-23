import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  BackHandler,
  Alert,
  NetInfo
} from 'react-native';
import{Toast}from 'native-base'
import Logo from './Logo';
import OfflineNotice from './OfflineNotice';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
        isConnected: true
      
    };
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }
  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };
  async componentWillMount() {
    const rem_email = await AsyncStorage.getItem('email');
    const rem_password = await AsyncStorage.getItem('password');
    if(rem_email!=null)
    {
      this.setState({username:rem_email});
      this.setState({password:rem_password});
    }
    //alert(rem_email+' '+rem_password);
   
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.wrapper}>
        <View style={styles.container}>
        
          <Logo />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
            keyboardType="email-address"
            placeholder='Email'
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            underlineColorAndroid='transparent'
          />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
            placeholder='Password'
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            underlineColorAndroid='transparent'
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.login}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </ TouchableOpacity>
          
        </View>
        <OfflineNotice />
      </KeyboardAvoidingView>
    );
  }
  SignUp = () => {
    if (this.state.isConnected) {
    this.props.navigation.push('Signup');
    }
  }
  rememberlogin = async() => {
    const rem_email = await AsyncStorage.getItem('email');
    const rem_password = await AsyncStorage.getItem('password');
    if(this.state.username ==rem_email && this.state.password==rem_password)
    {

    }
    else{
    AsyncStorage.setItem('email', this.state.username);
    AsyncStorage.setItem('password', this.state.password);
    }    
  }
  notrememberlogin = async() => {
    const rem_email = await AsyncStorage.getItem('email');
    const rem_password = await AsyncStorage.getItem('password');
    if(this.state.username ==rem_email && this.state.password==rem_password)
    {
    AsyncStorage.setItem('email', '');
    AsyncStorage.setItem('password', '');
    }
    else{
    }    
  }
  login =async () => {
    const rem_email = await AsyncStorage.getItem('email');
    const rem_password = await AsyncStorage.getItem('password');
    if (this.state.isConnected) {
    //keyboard.dismiss()
    //Keyboard.dismiss()    
    if (this.state.username == ''||this.state.password == '')
    {
      //onPress={() =>
        Toast.show({
          text: "Email and Password are required!",
          type: "warning",
          position: "top"
        })
      //}
      //alert('Email and Password are required');
    }    
    else {
      fetch('', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.username,
          password: this.state.password,
        })
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status === "ok") {
            AsyncStorage.setItem('user', res.access_token);
            if(this.state.username !==rem_email || this.state.password!==rem_password){
            Alert.alert(
              'Remember Email and Password!',
              'Would you to save email and password?',
              [
               // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {text: 'No', onPress: () =>{this.notrememberlogin()}},
                {text: 'Yes', onPress: () =>{this.rememberlogin()}},
              ],
              { cancelable: false }
            )
          }
            this.props.navigation.push('Profile');
          }
          else {
            //alert('Wrong Login Details');
            Toast.show({
              text: "Invalid Login Details!",
              type: "danger",
              position: "top"
            })
          }
        })
        .done();
    }
  }
}
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#297495',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.5)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: '#01c853',
    padding: 20,
    alignItems: 'center',
  },

  button: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
  }

});
