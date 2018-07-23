import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Badge,
  Body,
  Left,
  Right,
  Icon,
  Drawer,
  Toast
} from 'native-base';
import { NetInfo,FlatList,Dimensions, Text, View, TouchableOpacity, AsyncStorage,BackHandler } from "react-native";
import NumericInput from 'react-native-numeric-input';
import OfflineNotice from './OfflineNotice';
import SideBar from './Drawer';
export default class ProductSubDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      p_name: '',
      p_price: '',
      p_id: '',
      pro_price: '',
      quantitytext: '',
      nametext: '',
      pricetext: '',
      quantityarray: [],
      storagearray: [],
      myArray1:[],
      prod_quantity:0,
      total: '',
      isConnected: true
    }
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    }); 
  }
  async componentDidMount() {
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
    const value = await AsyncStorage.getItem('user');
    const varient = await AsyncStorage.getItem('varient');
    const product_name = await AsyncStorage.getItem('product_name');
    this.setState({ p_name: product_name });
    const product_price = await AsyncStorage.getItem('product_price');
    this.setState({ p_price: product_price });
    const product_id = await AsyncStorage.getItem('product_id');
    this.setState({ p_id: product_id });
    const t_save = await AsyncStorage.getItem('total');
    this.setState({ total: t_save });
    const pro_array = await AsyncStorage.getItem('prod_array');
    const myArray = await AsyncStorage.getItem('quantityarray');
    const myArray1 = await AsyncStorage.getItem('quantityarray');    
    this.setState({ myArray1: JSON.parse(myArray1) });
    // if(this.state.myArray1!==null){
    //   for (let i = 0; i < this.state.dataSource.length; i++) {
    //     if(this.state.dataSource[i].id==this.state.myArray1[i].product_id)
    //     {
    //       this.setState({prod_quantity:this.state.dataSource[i].quantity});
    //       break;
    //     }            
    //   }
    // }
    //alert(myArray1);
      if (myArray !== null) {
        this.setState({ quantityarray: JSON.parse(myArray) });
        
      }
   if(this.state.p_price==0){
    if (this.state.isConnected) {
    const url = '' + varient
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + value,
      }
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "ok") {
          this.setState({ dataSource: res.data.varients });
          
        }
        else {
          //alert('Timeout Login again');
         
            Toast.show({
              text: "Timeout Login again!",
              //buttonText: "Okay",
              //type: "warning"
            })
          this.props.navigation.push('Login');
        }
      })
      .done();    
                 
   }
  }
   else {
    if (this.state.isConnected) {

    this.setState({ dataSource:JSON.parse(pro_array)  });
   
    }
    }
    
  }
  renderItem = ({ item }) => {
    return (
      <View>
        <View style={{ flex: 1, marginTop: 20, marginBottom: 20 }}>

          <Text style={{fontSize:15}}>
            {item.name}
          </Text>
        </View>
        <View style={{
          position: 'absolute',
          right: 0,
          flex: 1,
          flexDirection: 'row',
          paddingTop: 7
        }}>
        <View style={{ paddingRight: 10 }}>
        <Text
                          style={{
                            width: 50,
                            height: 40,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            paddingTop: 10,
                            fontSize: 16,
                            paddingLeft: 5,
                            color: 'black',
                          }}>
                          {item.price}
                        </Text>
        </View>
          <View style={{ paddingRight: 10 }}>

            <NumericInput
                //onChange={(quantitytext) => this.setState({ quantitytext })}
                onChange={(quantitytext) => this.totalprice( quantitytext,item.name, item.price, item.id)}                
                rounded minValue={0}
                //value={Number(item.pro_quantity)}
            />
            {/* <TextInput
              style={{ height: 40, width: 50 }}
              underlineColorAndroid='black'
              placeholderTextColor="black"
              selectionColor="black"
              placeholder='0'
              keyboardType={'numeric'}
              onChangeText={(quantitytext) => this.setState({ quantitytext })}
            //value={this.state.quantitytext}
            /> */}

          </View>

          {/* <TouchableOpacity
            onPress={() => this.addquantity(item.name, item.price, item.id)}
            style={{
              width: 50,
              backgroundColor: '#297495',
              borderRadius: 10,
              paddingLeft: 10,
              paddingVertical: 10
            }}
          >
            <Text style={{ color: 'white', fontSize: 15 }}>Add</Text>
          </ TouchableOpacity> */}
        </View>
      </View>

    )
  }
   totalprice =async (quantitytext, name, price, id) => {
    //alert(quantitytext);
    this.setState({ quantitytext:quantitytext });
    const total_save = await AsyncStorage.getItem('total');
    let total1;
    let count = 0;
    let new_value = Number(this.state.quantitytext);//new value
    if (this.state.quantitytext ||this.state.quantitytext=='0') {
      //QuantityArray      
      if (!this.state.quantityarray.length) {
        if (new_value > 0) {
          total1 = (Number(this.state.quantitytext) * Number(price)) + Number(total_save);
          this.state.quantityarray.push({
            'quantity': this.state.quantitytext,
            'pro_name': name,
            'product_price': price,
            'product_id': id,
            'prod_quantity':this.state.quantitytext
          });
          this.setState({ quantityarray: this.state.quantityarray })
          try {
            await AsyncStorage.setItem('quantityarray', JSON.stringify(this.state.quantityarray));
          } catch (error) {
            alert('error saving');
          }
          await AsyncStorage.setItem('total', total1.toString());
          this.setState({ total: total1 })
        }
      }



      else {
        var str = this.state.quantityarray;
        for (let i = 0; i < this.state.quantityarray.length; i++) {

          if (str[i].pro_name == name) {
            count = 1;
            let previous = Number(str[i].quantity);//previous value
            let newvalue = Number(this.state.quantitytext);//new value
            if (newvalue < previous) {
              if (newvalue < previous && newvalue > 0) {
                //alert('Less and >0');
                let less = (previous * Number(price)) - (newvalue * Number(price));
                total1 = Number(total_save) - less;
                str[i].quantity = this.state.quantitytext;
                this.setState({ quantityarray: str });
              }
              if (newvalue == 0) {
                let less = (previous * Number(price));
                total1 = Number(total_save) - less;
                //alert('zero');
                str.splice(i, 1);
                this.setState({ quantityarray: str });
              }
            }
            else if (newvalue > previous) {
              //alert('greater');
              let great = (newvalue * Number(price)) - (previous * Number(price));
              total1 = Number(total_save) + great;
              str[i].quantity = this.state.quantitytext;
              this.setState({ quantityarray: str });
            }
            else {
              total1 = Number(total_save);
              str[i].quantity = this.state.quantitytext;
              this.setState({ quantityarray: str });
            }

            try {
              await AsyncStorage.setItem('quantityarray', JSON.stringify(this.state.quantityarray));
            } catch (error) {
              alert('error saving');
            }
            await AsyncStorage.setItem('total', total1.toString());
            this.setState({ total: total1 })
          }

        }
        if (count == 0 && Number(this.state.quantitytext) > 0) {

          this.state.quantityarray.push({
            'quantity': this.state.quantitytext,
            'pro_name': name,
            'product_price': price,
            'product_id': id,
            'prod_quantity':this.state.quantitytext
          });
          this.setState({ quantityarray: this.state.quantityarray })
          try {
            await AsyncStorage.setItem('quantityarray', JSON.stringify(this.state.quantityarray));
          } catch (error) {
            alert('error saving');
          }
          total1 = (Number(this.state.quantitytext) * Number(price)) + Number(total_save);
          await AsyncStorage.setItem('total', total1.toString());
          this.setState({ total: total1 })
        }
      }
    }    
    }
  async addquantity(name, price, id) {
    if (this.state.isConnected) {
    //const total_save = await AsyncStorage.getItem('total');
    //let total1;
    let count = 0;
    let new_value = Number(this.state.quantitytext);//new value
    if (this.state.quantitytext) {
      //QuantityArray      
      if (!this.state.quantityarray.length) {
        if (new_value > 0) {
          //total1 = (Number(this.state.quantitytext) * Number(price)) + Number(total_save);
          this.state.quantityarray.push({
            'quantity': this.state.quantitytext,
            'pro_name': name,
            'product_price': price,
            'product_id': id,
            'prod_quantity':this.state.quantitytext
            //'product_name':product_name
          });
          this.setState({ quantityarray: this.state.quantityarray })
          try {
            await AsyncStorage.setItem('quantityarray', JSON.stringify(this.state.quantityarray));
          } catch (error) {
            alert('error saving');
          }
         // await AsyncStorage.setItem('total', total1.toString());
          //this.setState({ total: total1 })
        }
      }



      else {
        var str = this.state.quantityarray;
        for (let i = 0; i < this.state.quantityarray.length; i++) {

          if (str[i].pro_name == name) {
            count = 1;
            let previous = Number(str[i].quantity);//previous value
            let newvalue = Number(this.state.quantitytext);//new value
            if (newvalue < previous) {
              if (newvalue < previous && newvalue > 0) {
                //let less = (previous * Number(price)) - (newvalue * Number(price));
                //total1 = Number(total_save) - less;
                str[i].quantity = this.state.quantitytext;
                this.setState({ quantityarray: str });
              }
              if (newvalue == 0) {
                //let less = (previous * Number(price));
                //total1 = Number(total_save) - less;
                str.splice(i, 1);
                this.setState({ quantityarray: str });
              }
            }
            else if (newvalue > previous) {
              //let great = (newvalue * Number(price)) - (previous * Number(price));
              //total1 = Number(total_save) + great;
              str[i].quantity = this.state.quantitytext;
              this.setState({ quantityarray: str });
            }
            else {
              //total1 = Number(total_save);
              str[i].quantity = this.state.quantitytext;
              this.setState({ quantityarray: str });
            }

            try {
              await AsyncStorage.setItem('quantityarray', JSON.stringify(this.state.quantityarray));
            } catch (error) {
              alert('error saving');
            }
            //await AsyncStorage.setItem('total', total1.toString());
            //this.setState({ total: total1 })
          }

        }
        if (count == 0 && Number(this.state.quantitytext) > 0) {

          this.state.quantityarray.push({
            'quantity': this.state.quantitytext,
            'pro_name': name,
            'product_price': price,
            'product_id': id,
            'prod_quantity':this.state.quantitytext
          });
          this.setState({ quantityarray: this.state.quantityarray })
          try {
            await AsyncStorage.setItem('quantityarray', JSON.stringify(this.state.quantityarray));
          } catch (error) {
            alert('error saving');
          }
          // total1 = (Number(this.state.quantitytext) * Number(price)) + Number(total_save);
          // await AsyncStorage.setItem('total', total1.toString());
          // this.setState({ total: total1 })
        }
      }
    }
  }
}
  closeDrawer() {
    this._drawer._root.close()
  }
  openDrawer() {
    this._drawer._root.open()
  }
  renderSeparator = () => {
    return (
      <View
        style={{ height: 1, width: '100%', backgroundColor: 'black' }}>
      </View>
    )
  }
  order = () => {
    if (this.state.isConnected) {
      AsyncStorage.setItem('total', '');
    this.props.navigation.push('Order');
    }
  }
  logout = () => {
    AsyncStorage.setItem('user', '');
    this.props.navigation.navigate('Login');
  }
  goback1 = () => {
    if (this.state.isConnected) {
    //this.setState({pro})
    AsyncStorage.removeItem('prod_array');
    this.props.navigation.navigate('ProductSubDetails1');
    }
  }
 render() {
    
    //alert(this.state.prod_quantity);
    return (
      <Drawer
      openDrawerOffset={1 - (200 / Dimensions.get('window').width)}
        ref={(ref) => { this._drawer = ref; }}
        content={<SideBar screenProps={{ navigation: this.props.navigation }} />}
        onClose={() => this.closeDrawer()} >
        <Container >
          <Header
            style={{ backgroundColor: "#297495" }}
            androidStatusBarColor="#297495">
            
            <Left>
              <Button transparent //onPress={this.goback1}
              onPress={() => this.props.navigation.push('Menu')}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body >
              <Title style={{ fontFamily: 'OpenSans',  }}>{this.state.p_name}</Title>
            </Body>            
            <Right>
              <Button
                transparent
                onPress={() => this.openDrawer()}
              >
                <Icon name="menu" />
              </Button>
            </Right >
            <OfflineNotice />
          </Header>
          <View style={{ height: 50, backgroundColor: '#e8eaf6' }}>
            <Text style={{ paddingLeft: 10, fontSize: 16, paddingTop: 15 }}>Varient</Text>
            <View style={{
              position: 'absolute',
              right: 0,
              flex: 1,
              flexDirection: 'row' 
            }}>
            <Text style={{ fontSize: 16, paddingTop: 15 }}>Price</Text>
              <Text style={{paddingLeft: 40, fontSize: 16, paddingTop: 15,paddingRight: 42 }}>Quantity</Text>
              {/* <Text style={{ paddingLeft: 35, paddingRight: 13, fontSize: 16, paddingTop: 15 }}>Action</Text> */}
            </View>
          </View>
          <Content padder >
          
            <FlatList
              data={this.state.dataSource}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            // ItemSeparatorComponent={this.renderSeparator}
            />
          </Content>
          <Footer >
            <FooterTab style={{ backgroundColor: "#297495", justifyContent: 'center',paddingTop:5 }}>
              <Button transparent onPress={this.order} disabled={true}>

              </Button>            
              <Badge
                style={{
                  paddingTop: 5, backgroundColor: "white", width: 80, height: 45, justifyContent: 'center',
                  alignContent: 'center', alignItems: 'center'
                }}
                textStyle={{ color: "black" }}
              >
                <Text style={{ fontSize: 16, color: 'black' }}
                >{this.state.total}</Text>
              </Badge>
              <Button transparent onPress={this.order}>
                <Title style={{ fontFamily: 'OpenSans', fontSize: 20, }}>Review</Title>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Drawer>
    );
  }
}