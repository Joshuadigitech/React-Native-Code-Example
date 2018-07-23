import React, { Component } from "react";
import { Text, TouchableOpacity, View, Button } from "react-native";
import Modal from "react-native-modal";

export default class Example extends Component {
  state = {
    visibleModal: null
  };

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={{ backgroundColor: 'rgba(255, 255,255,0.2)' }}>
        <Text style={{ fontFamily: 'OpenSans', fontSize: 25, }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={
      {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
      }
    }>
      <Text style={{ fontFamily: 'OpenSans', fontSize: 20, }}>Your Order is Successfully Placed!</Text>
      {this._renderButton("Close", () => this.setState({ visibleModal: null }))}
      
    </View>
  );

  render() {
    return (
      <View >
        {this._renderButton("Place Order", () =>
          this.setState({ visibleModal: 6 })
        )}
        <Modal
          isVisible={this.state.visibleModal === 6}
          onBackdropPress={() => this.setState({ visibleModal: null })}
        >
          {this._renderModalContent()}
        </Modal>
        
      </View>
    );
  }
}