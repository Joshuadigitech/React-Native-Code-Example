import React from 'react';
import { Root } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  AppRegistry
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './components/Login';
import Splash from './components/Splash';
import Table from './components/Table';
import Home from './components/Home';
 import ProductSubDetails from './components/ProductSubDetails';
 import PlaceOrder from './components/PlaceOrder';
 import Parked_Tables from './components/Parked_Tables';
const Application = StackNavigator(
  {
    Home: { screen: Splash },
    Login: { screen: Login },
    Profile: { screen: Table },
    Menu: { screen: Home },
    Subcategory:{screen: ProductSubDetails},
    Order: { screen: PlaceOrder },
    Parked_Tables:{screen: Parked_Tables},
  },
  {
    navigationOptions: { header: null, }
  }
);
export default class App extends React.Component {
  render() {
    return (
      <Root>
        
        <Application />
  </Root>      
    );
  }
}