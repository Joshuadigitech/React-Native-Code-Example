import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image
} from 'react-native';

export default class Logo extends Component {
	render(){
		return(
			<View style={styles.container}>
				<Image
          style={{width:180, height: 65}}
          source={require('./logo1.png')}/>
    	</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    padding:10,
  },

});
