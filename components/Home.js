import React, { Component } from "react";
import { FlatList, Image, StyleSheet,Dimensions, BackHandler, Text, NetInfo, View, TouchableOpacity, AsyncStorage,
  ActivityIndicator } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Body,
  Left,
  Right,
  Icon,
  Drawer
} from "native-base";
import SideBar from './Drawer';
import OfflineNotice from './OfflineNotice';
export default class ProductSubDetails1 extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],
      productarray:[],
      isConnected: true,
       isLoading: true
    }
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
    const value = await AsyncStorage.getItem('user');
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
          this.setState({isLoading: false, dataSource: res.data });
        }
      })
      .done();
  }
  closeDrawer  () {
    this._drawer._root.close()
  }
  openDrawer () {
    this._drawer._root.open()
  }

  renderItem = ({ item }) => {    
    return (
      <View style={styles.cont}>
        <TouchableOpacity
          onPress={() => this.sub(item.id, item.name, item.price)}
        >
          <Image
            style={styles.imagestyle}
            source={{ uri: '' + item.id + '.jpg' }} />
          <Text style={{ paddingLeft: 10 }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    )
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
      content={<SideBar screenProps={{ navigation: this.props.navigation }}/>}//navigator={this._navigator} />}
      onClose={() => this.closeDrawer()} >
      <Container >      
        <Header  
        style={{ backgroundColor: "#297495" }}
          androidStatusBarColor="#297495">
          
          {/* <Left>
            <Button transparent //onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left> */}
          <Body >
            <Title style={{fontFamily:'OpenSans', fontSize:20,paddingLeft:10}}>Products</Title>
          </Body>
          <Right>
          <Button
              transparent
              onPress={() => this.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
            </Right>
            <OfflineNotice />
        </Header>
        
        <Content padder >
        
          <FlatList
            data={this.state.dataSource}
            numColumns={3}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
          />

        </Content>
      </Container>
      </Drawer>
    );
  }
  sub(id, product_name, product_price) {
    if (this.state.isConnected) {
    this.state.productarray.push({
      'name': product_name,
      'price': product_price,
      'id': id,
    });
    this.setState({ productarray: this.state.productarray })
    AsyncStorage.setItem('prod_array', JSON.stringify(this.state.productarray));
    AsyncStorage.setItem('varient', id.toString());
    AsyncStorage.setItem('product_name', product_name);
    AsyncStorage.setItem('product_price', product_price);
    AsyncStorage.setItem('product_id', id.toString());
    this.props.navigation.push('Subcategory');
  }
}
  logout = () => {
    AsyncStorage.setItem('user', '');
    this.props.navigation.navigate('Login');
  }
}
const styles = StyleSheet.create({
  cont: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  imagestyle: {
    width: 112,
    height: 112,
    borderRadius: 15,
  }
});