import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Text,
  ListItem,
  Badge,
  Body,
  Toast,
  Left,
  Right,
  Icon,
  View,
  Drawer
} from 'native-base';
import { ActivityIndicator,TouchableOpacity, FlatList,Dimensions, StyleSheet, NetInfo, AsyncStorage,BackHandler } from 'react-native';
import SideBar from './Drawer';
import OfflineNotice from './OfflineNotice';
export default class PlaceOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      name: '',
      quantity: '',
      price: '',
      total: '',
      totalitems: '',
      subtotal: '',
      f_total: '',
      quantitytext: '',
      p_name:'',
      data: [],
      final_name: [],
      final_quantity: [],
      final_price: [],
      final_total: [],
      quantityarray:[],
      invoiceid_array:[],
      dataSource:[],
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
    
    const myArray = await AsyncStorage.getItem('quantityarray');
    const value = await AsyncStorage.getItem('user');
    const parked_table = await AsyncStorage.getItem('parked_table');
    AsyncStorage.setItem('final_name','');
    AsyncStorage.setItem('final_quantity', '');
    AsyncStorage.setItem('final_total', '');
    if(myArray == null){
    this.setState({isLoading: false});
    }
    if (myArray !== null) {
      this.setState({ final_name: [] });
      this.setState({ final_quantity: [] });
      this.setState({ final_total: [] });
      this.setState({ data: JSON.parse(myArray) });
      this.setState({ isLoading: false,dataSource: JSON.parse(myArray) });     
      let t = 0, s = 0;
      for (let i = 0; i < this.state.data.length; i++) {
        t = t + Number(this.state.data[i].quantity);
        s = s + Number((this.state.data[i].product_price * this.state.data[i].quantity));
        this.state.final_name.push(this.state.data[i].product_id.toString());
        this.state.final_quantity.push(this.state.data[i].quantity);
        this.state.final_total.push((this.state.data[i].product_price * this.state.data[i].quantity).toString());
        this.setState({ final_name: this.state.final_name });
        this.setState({ final_quantity: this.state.final_quantity });
        this.setState({ final_total: this.state.final_total });
        AsyncStorage.setItem('final_name', JSON.stringify(this.state.final_name));
        AsyncStorage.setItem('final_quantity', JSON.stringify(this.state.final_quantity));
        AsyncStorage.setItem('final_total', JSON.stringify(this.state.final_total));
      }
      this.setState({ totalitems: t });
      AsyncStorage.setItem('totalitems', t.toString());
      this.setState({ subtotal: s });
      AsyncStorage.setItem('subtotal', s.toString());
      AsyncStorage.setItem('total', s.toString());
      this.setState({ f_total: s });
      AsyncStorage.setItem('f_total', s.toString());
      


    }
    //if(parked_table!=='')
    else{
      const url = ''
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
          this.setState({ invoiceid_array: res.data });
          for (let i = 0; i <this.state.invoiceid_array.length; i++) {
            if(this.state.invoiceid_array[i].table_num==parked_table){
              AsyncStorage.setItem('invoice_id',this.state.invoiceid_array[i].id.toString() );
              break;
            } 
       }
           
        }
        else {
          alert('Timeout Login again');
          this.props.navigation.push('Login');
        }
      })
      .done();
      fetch(''+ parked_table, 
      { 
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + value,
        }})
        .then((response) => response.json())
        .then((res) => {
          if (res.status === "ok") {
            this.setState({isLoading: false, data: res.data.invoice_details });
            //this.setState({ dataSource: res.data.invoice_details });
            for (let i = 0; i < this.state.data.length; i++) {
            this.state.quantityarray.push({
              'quantity': this.state.data[i].quantity,
              'pro_name': this.state.data[i].product.name,
              'product_price': this.state.data[i].product_price,
              'product_id': this.state.data[i].product_id,
            });
             this.setState({ quantityarray: this.state.quantityarray });
             AsyncStorage.setItem('quantityarray', JSON.stringify(this.state.quantityarray));
             }
             this.setState({ dataSource: this.state.quantityarray });           
              let t = 0, s = 0;
              for (let i = 0; i < this.state.quantityarray.length; i++) {
                t = t + Number(this.state.quantityarray[i].quantity);
                s = s + ((this.state.quantityarray[i].product_price * this.state.quantityarray[i].quantity));
                this.state.final_name.push(this.state.quantityarray[i].product_id.toString());
                this.state.final_quantity.push(this.state.quantityarray[i].quantity);
                this.state.final_total.push((this.state.quantityarray[i].product_price * this.state.quantityarray[i].quantity).toString());
                this.setState({ final_name: this.state.final_name });
                this.setState({ final_quantity: this.state.final_quantity });
                this.setState({ final_total: this.state.final_total });
                AsyncStorage.setItem('final_name', JSON.stringify(this.state.final_name));
                AsyncStorage.setItem('final_quantity', JSON.stringify(this.state.final_quantity));
                AsyncStorage.setItem('final_total', JSON.stringify(this.state.final_total)); 
              }
              this.setState({ totalitems: t });
              AsyncStorage.setItem('totalitems', t.toString());
              this.setState({ subtotal: s });
              AsyncStorage.setItem('subtotal', s.toString());
              AsyncStorage.setItem('total', s.toString());
              this.setState({ f_total: s });
              AsyncStorage.setItem('f_total', s.toString());
            }

            })
            .done(); 
    }
    

  }
  parked= async() =>{
    if (this.state.isConnected) {
    const final_name = await AsyncStorage.getItem('final_name');
    const final_quantity = await AsyncStorage.getItem('final_quantity');
    const final_total = await AsyncStorage.getItem('final_total');
    const subtotal = await AsyncStorage.getItem('subtotal');
    const f_total = await AsyncStorage.getItem('f_total'); 
    const parked_table = await AsyncStorage.getItem('parked_table');
    const table_no=await AsyncStorage.getItem('table_no');
    const invoice_id = await AsyncStorage.getItem('invoice_id');
     
    if(invoice_id!=null){
    let data = JSON.stringify(
      {
        name: JSON.parse(final_name),
        quantity: JSON.parse(final_quantity),
        price: JSON.parse(final_total),
        customer: "0",
        total: f_total,
        total_due_amount: subtotal,
        paytype: "directpay",
        draft: null,
        amount: "0",
        id:invoice_id,
        table_name: parked_table
      });
      
      if(final_name===null){
        Toast.show({
          text: "You have not added any Item to Invoice!",
          duration: 2000,
          type: "danger",
          position: "top"
        })
      }
      else{
        // alert(JSON.stringify({
        //   data:data
          
        // }));
          const value = await AsyncStorage.getItem('user');
          fetch('', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + value,
            },
            body: JSON.stringify({
              data:data
              
            })
          })
            .then((response) => response.json())
            .then((res) => {
              
               if (res.status === "ok") {
            Toast.show({
                      text: "Order Updated Successfully!",
                      type: "success",
                      duration: 4000,
                      position: "top"
                    })
                    AsyncStorage.setItem('quantityarray','');
            AsyncStorage.setItem('total','');
            AsyncStorage.setItem('final_name','');
        AsyncStorage.setItem('final_quantity', '');
        AsyncStorage.setItem('final_total', '');
        AsyncStorage.setItem('f_total', '');
      AsyncStorage.setItem('subtotal', '');
      AsyncStorage.setItem('parked_table', '');
                    this.props.navigation.push('Profile')
                  }                 
              })
             .done();
            }
      }

      else
      {
        let data=JSON.stringify(
          {
            name:JSON.parse(final_name),
            quantity:JSON.parse(final_quantity),
            price:JSON.parse(final_total),
            customer:"0",
            total:f_total,
            total_due_amount:subtotal,
            paytype:"directpay",
            draft:null,
            amount:"0",            
            table_name:table_no,
          });    
          if(final_name===null){
            Toast.show({
              text: "You have not added any Item to Invoice!",
              duration: 2000,
              type: "danger",
              position: "top"
            })
          }
          else{
            // alert(JSON.stringify({
            //   data:data
              
            // }));
    const value = await AsyncStorage.getItem('user');
    fetch('', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + value,
      },
      body: JSON.stringify({
        data:data        
      })
    })
      .then((response) => response.json())
      .then((res) => {

        if (res.status === "ok") {
           Toast.show({
                      text: "Order Placed Successfully!",
                      type: "success",
                      duration: 4000,
                      position: "top"
                    })
                    AsyncStorage.setItem('quantityarray','');
            AsyncStorage.setItem('total','');
            AsyncStorage.setItem('final_name','');
        AsyncStorage.setItem('final_quantity', '');
        AsyncStorage.setItem('final_total', '');
        AsyncStorage.setItem('f_total', '');
      AsyncStorage.setItem('subtotal', '');
                    this.props.navigation.push('Profile')
                  }
                  
              })
     .done(); 
    
      }  
    }
  }
}
  async deleteNote(product_id) {
    const subtotal = await AsyncStorage.getItem('subtotal');
    const totalitems = await AsyncStorage.getItem('totalitems');
    let t = 0, s = 0;
    for (let i = 0; i < this.state.dataSource.length; i++) {
      if (this.state.dataSource[i].product_id == product_id) {
        t = totalitems - this.state.dataSource[i].quantity;
        s = subtotal - (this.state.dataSource[i].quantity * this.state.dataSource[i].product_price);
        this.setState({ totalitems: t });
        AsyncStorage.setItem('totalitems', t.toString());
        this.setState({ subtotal: s });
        AsyncStorage.setItem('subtotal', s.toString());
        //this.state.data.splice(i, 1);
        this.state.dataSource.splice(i, 1);
        
      }
      
    }
        //this.setState({ data: this.state.data });
        this.setState({ dataSource: this.state.dataSource });
        AsyncStorage.setItem('quantityarray', JSON.stringify(this.state.dataSource));
        componentWillMount=this.componentWillMount();
   
   
  }
  closeDrawer() {
    this._drawer._root.close()
  }
  openDrawer() {
    this._drawer._root.open()
  }
  addproduct=()=>{
    if (this.state.isConnected) {
    this.props.navigation.push('Menu');
    //this.props.navigation.navigate('Menu');
  }
}
  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
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


            {/* <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left> */}
            <Body >
              <Title style={{ fontFamily: 'OpenSans', fontSize: 20,paddingLeft:10 }}>Invoice</Title>
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
            <Text style={{ paddingLeft: 15, fontSize: 16, paddingTop: 15 }}>Item</Text>
            <View style={{
              position: 'absolute',
              right: 0,
              flex: 1,
              flexDirection: 'row'
            }}>
              <Text style={{ fontSize: 16, paddingTop: 15 }}>Price</Text>
              <Text style={{ paddingLeft: 13, fontSize: 16, paddingTop: 15 }}>Quantity</Text>
              <Text style={{ paddingLeft: 10, paddingRight: 13, fontSize: 16, paddingTop: 15 }}>Total</Text>
              <Text style={{ paddingLeft: 15, paddingRight: 13, fontSize: 16, paddingTop: 15 }}>Action</Text>

            </View>
          </View>
          <Content  >
            <View style={{ flex: 1, paddingTop: 20 }}>
              <FlatList
                data={this.state.dataSource}
                renderItem={({ item }) =>
                  <ListItem>
                    <Text style={{ fontSize: 10 }}>{item.pro_name} 
                      </Text>
                    <View style={{
                      position: 'absolute',
                      right: 0,
                      flex: 1,
                      flexDirection: 'row'
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
                          {item.product_price}
                        </Text>
                      </View>
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
                          {item.quantity}
                        </Text>
                        {/* <TextInput
                          style={styles.inputBox}
                          underlineColorAndroid='black'
                          placeholderTextColor="black"
                          selectionColor="black"
                          placeholder={item.quantity}
                          //value={item.quantity}
                          keyboardType={'numeric'}
                        //onChange={value => this.updatedata(value,item.quantity,item.price)}
                        //onChangeText={(quantitytext) => this.setState({ quantitytext })}
                        /> */}


                      </View>
                      <Text
                        style={{
                          width: 50,
                          height: 40,
                          backgroundColor: 'white',
                          borderRadius: 10,
                          paddingTop: 10,
                          paddingLeft: 5,
                          fontSize: 16,
                          color: 'black',
                        }}>
                        {item.product_price * item.quantity}
                      </Text>
                      <View style={{ paddingLeft: 15 }}>
                        <TouchableOpacity
                          onPress={() => this.deleteNote(item.product_id)}
                          style={{
                            width: 60,
                            backgroundColor: '#297495',
                            borderRadius: 10,
                            paddingLeft: 10,
                            marginRight: 5,
                            paddingVertical: 10
                          }}
                        >
                          <Text style={{ color: 'white', fontSize: 15 }}>Delete</Text>
                        </ TouchableOpacity>
                      </View>
                    </View>
                  </ListItem>
                }
                keyExtractor={(item, index) => index.toString()}
              />
            </View>

          </Content>

          <View style={{ height: 100, backgroundColor: '#e8eaf6' }}>
            <ListItem style={{ margin: 10, height: 60 }}>
              <View style={{
                position: 'absolute',
                left: 0,
                flex: 1,
                flexDirection: 'row'
              }}>
                <Text style={{ fontSize: 16, paddingTop: 10 }}>Items  </Text>
                <View style={{ paddingLeft: 20 }}>
                  <Text
                    style={{
                      width: 50,
                      height: 40,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      paddingTop: 10,
                      paddingLeft: 5,
                      fontSize: 16,
                      color: 'black', justifyContent: 'center',
                      alignContent: 'center', alignItems: 'center'
                    }}>
                    {this.state.totalitems}
                  </Text>
                </View>
              </View>


              <View style={{
                position: 'absolute',
                right: 0,
                flex: 1,
                flexDirection: 'row'
              }}>
                <Text style={{ fontSize: 16, paddingTop: 10 }}>Sub Total </Text>
                <View style={{ paddingRight: 15, paddingLeft: 20 }}>

                  <Text
                    style={{
                      width: 70,
                      height: 40,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      paddingTop: 10,
                      paddingLeft: 5,
                      fontSize: 16,
                      color: 'black', justifyContent: 'center',
                      alignContent: 'center', alignItems: 'center'
                    }}>
                    {this.state.subtotal}
                  </Text>
                </View>
              </View>
            </ListItem>
          </View>
        </Container>
        <Footer >
          <FooterTab style={{ backgroundColor: "#297495", justifyContent: 'center', }}>
            <Button transparent onPress={this.parked}
              style={{ backgroundColor: 'rgba(255, 255,255,0.2)' }}
            >
              <Title style={{ fontFamily: 'OpenSans', fontSize: 25, }}>PARK</Title>
            </Button>
            <Button transparent onPress={this.addproduct}
              style={{ backgroundColor: '#297495' }}
            >
              <Title style={{ fontFamily: 'OpenSans', fontSize: 25, }}>Add Product</Title>
            </Button>
            
            
          </FooterTab>
        </Footer>
      </Drawer>
    );
  }
}
const styles = StyleSheet.create({
  inputBox: {
    width: 50,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 16,
    color: 'black',
  }
});

