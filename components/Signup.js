import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  NetInfo,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  BackHandler,
  AsyncStorage,
  
} from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Body,
    Left,
    Right,
    Item,
    Input,
    Form,
    Picker,
    Toast
  } from "native-base";
  import OfflineNotice from './OfflineNotice';
//import PhoneInput from 'react-phone-number-input'
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email:'',
      contact:'',      
      user:'',
      address:'',
      dataSource:[],
      outlet_array:[],
      outlet_array1:[],
      nameValidate:true,
      outlet_location:'null',
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
  componentWillMount() {    
    const url = ''
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "ok") {
          this.setState({ dataSource: res.data });
          this.setState({ outlet_array1: res.data }); 
        }       
      })
      .done();
  }  
  updateUser = (user) => {
    this.setState({ user: user })
 }
  render() {
    return (
      <KeyboardAvoidingView style={styles.wrapper}>
        <View style={styles.container}>
        
          <Image
          style={{width:120, height: 50,paddingBottom:20}}
          source={require('./logo1.png')}/>
         
          <Form>
            <Item>
              <Input 
              style={{color:'#ffffff'}}
              
              placeholder="Name" 
              onChangeText={(username) => this.setState({ username })}/>
            </Item>
            <Item>
              
              <Input 
              style={{color:'#ffffff'}}
              
               placeholder="Email" 
              keyboardType="email-address"
              //onChangeText={(email) => this.emailvalidate(email)}
              onChangeText={(email) => this.setState({ email })}
             
             />
            </Item>
            <Item>
              
              <Input 
              style={{color:'#ffffff'}}
              placeholder="Password" 
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}/>
            </Item>
            <Item>
              
              <Input 
              style={{color:'#ffffff'}}
              placeholder="Contact"
              keyboardType={'phone-pad'}
            onChangeText={(contact) => this.setState({ contact })}/>
            {/* <PhoneInput
              smartCaret={ false }
              style={{color:'#ffffff'}}
              placeholder="Start typing a phone number"
              //value={ this.state.value }
              onChange={ (contact) => this.setState({ contact }) }/> */}
            </Item>
            <Item>
              
              <Input 
              style={{color:'#ffffff'}}
              placeholder="Address"
               
            onChangeText={(address) => this.setState({ address })}/>
            </Item>
           
            <Item>
            <Picker 
            style={{color:'#ffffff'}}
            selectedValue = {this.state.user} onValueChange = {this.updateUser}>
            
            { this.state.dataSource.map((item, key)=>(
            <Picker.Item label={item.name} value={item.name} key={key} />)
            )}
            </Picker> 
          </Item>     
                        
          <TouchableOpacity
            style={styles.button}
            onPress={this.signup}
          >
            <Text style={styles.buttonText}>Register</Text>
          </ TouchableOpacity>
          </Form>
          
          <Text style={styles.signupText}>Already have an account?</Text>
			<TouchableOpacity onPress={() => this.props.navigation.goBack()}><Text style={styles.signupButton}> Login Now</Text></TouchableOpacity>
				
        </View>
        <OfflineNotice />
      </KeyboardAvoidingView>

    );
  }
  emailvalidate = (email) => {
    console.log(email);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(email) === false)
    {
    console.log("Email is Not Correct");
    alert("Email is Not Correct");
    this.setState({email:email})
    this.setState({nameValidate:false})
    return false;
      }
    else {
      this.setState({email:email})
      this.setState({nameValidate:true})
      alert("Email is Correct");
      console.log("Email is Correct");
    }
    }
  signup = () => {
    if (this.state.isConnected) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (this.state.username == '')
    {
      //alert("username is required");
      Toast.show({
        text: "username is required!",
        type: "warning",
        position: "top"
      })
    } 
     else if(this.state.email=='')
     {
     // alert("enter a valid email");
      Toast.show({
        text: "enter a valid email!",
        type: "warning",
        position: "top"
      })
    }
    else if(reg.test(this.state.email) === false)
    {
     // alert("enter a valid email");
      Toast.show({
        text: "enter a valid email!",
        type: "warning",
        position: "top"
      })
    }    
    else if(this.state.password == '')
     {
      //alert("password is required");
      Toast.show({
        text: "password is required!",
        type: "warning",
        position: "top"
      })
    }  
     else if(this.state.contact == '')
     {
      //alert("contact is required");
      Toast.show({
        text: "contact is required!",
        type: "warning",
        position: "top"
      })
    }
     else if(this.state.user=='')
     {
      //alert("select an outlet");
      Toast.show({
        text: "select an outlet!",
        type: "warning",
        position: "top"
      })
    }
     else if(this.state.address=='')
     {
      //alert("address is required");
      Toast.show({
        text: "address is required!",
        type: "warning",
        position: "top"
      })
    }
    else {
      let data=JSON.stringify(
        {
          name:this.state.username,
          email: this.state.email,
          password: this.state.password,
          contact:this.state.contact,
          address:this.state.address,
          outlet_name:this.state.user,
        }); 
       console.log(JSON.stringify({
        data:data
       }));
      fetch('', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         data:data
        })
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status === "ok") {
            AsyncStorage.setItem('user', res.access_token);
            AsyncStorage.setItem('quantityarray','');
            AsyncStorage.setItem('total','');
            AsyncStorage.setItem('productarray','');
            Toast.show({
              text: "Successfully Registered!",
              type: "success",
              duration: 3000,
              position: "top"
            })
            this.props.navigation.push('Menu');
            //alert(JSON.stringify(res.message));
          }
          else {
            if(JSON.stringify(res.message.email)=='["The email has already been taken."]'){
            Toast.show({
              text: "The email has already been taken!",
              type: "warning",
              position: "top"
            });
          }
            else if(JSON.stringify(res.message.password)=='["The password must be at least 6 characters."]'){
              Toast.show({
                text: "The password must be at least 6 characters!",
                type: "warning",
                position: "top"
              });
            }
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
    //paddingLeft:40
    
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
