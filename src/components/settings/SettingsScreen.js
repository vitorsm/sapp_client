import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import NavBar from '../NavBar'

const img = require('../../../imgs/settings.png');


class SettingsScreen extends Component {
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

        <Text>Setting screen</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default SettingsScreen;
