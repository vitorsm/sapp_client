import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NavBar from './NavBar'

class SettingSrceen extends Component {
  render() {
    return (
      <View>
        
        <NavBar navigation={this.props.navigation} />

        <Text>Setting screen</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default SettingSrceen;
