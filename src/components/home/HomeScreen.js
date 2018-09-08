import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import NavBar from '../NavBar'

const img = require('../../../imgs/home.png');

class HomeScreen extends Component {
  static navigationOptions = {
    drawerIcon: (
      <Image 
        source={img}
        style={{ height: 24, width: 24}} />
    )
  };

  render() {
    return (
      <View>
        
        <NavBar navigation={this.props.navigation} />
        
        <Text>Home screen</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default HomeScreen;
