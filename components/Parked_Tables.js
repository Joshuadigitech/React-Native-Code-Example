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
  Left,
  Right,
  Icon,
  View,
  Drawer
} from "native-base";
import { TouchableOpacity, ActivityIndicator,Dimensions, Image, StyleSheet,NetInfo, BackHandler, AsyncStorage,FlatList } from 'react-native';
import SideBar from './Drawer';
import OfflineNotice from './OfflineNotice';
export default class Parked_Tables extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],
      isConnected: true,
      isLoading: true
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
        else {
          alert('Timeout Login again');
          this.props.navigation.navigate('Login');
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
          onPress={() => this.parkedinvoice(item)}
        >
          <Image
            style={styles.imagestyle}
            source={require('./table.jpg')} />
          <Text style={{ paddingLeft: 25 }}>
            Table{item}
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
        <Header style={{ backgroundColor: "#297495" }}
          androidStatusBarColor="#297495">
          <Body >
            <Title style={{fontFamily:'OpenSans', fontSize:20,paddingLeft:10}}>Review Order</Title>
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
  parkedinvoice(parked_table) {
    if (this.state.isConnected) {
    AsyncStorage.removeItem('quantityarray');
    AsyncStorage.removeItem('total');    
    AsyncStorage.setItem('parked_table', parked_table.toString());
    this.props.navigation.push('Order');
  }
}
  logout = () => {
    AsyncStorage.setItem('user', '');
    this.props.navigation.push('Login');
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