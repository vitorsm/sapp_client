import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ToolbarAndroid
} from 'react-native';
import Toolbar from 'react-native-material-design'
import NavBar from './src/components/NavBar'

export default class sapp_client extends Component {

  onActionSelected = () => {
    
  };

  render() {
    return (
      <View>

        {/* <StatusBar hidden/> */}

        <ToolbarAndroid
          logo={require('./imgs/menu.png')}
          title="AwesomeApp"
          actions={[{title: 'Settings', icon: require('./imgs/menu.png'), show: 'always'}]}
          onActionSelected={this.onActionSelected} />

      </View>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('sapp_client', () => sapp_client);
