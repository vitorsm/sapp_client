import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NavBar from './NavBar'

class HomeScreen extends Component {
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
