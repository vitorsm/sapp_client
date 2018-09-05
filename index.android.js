import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';
import HomeScreen from './src/components/HomeScreen';
import SettingScreen from './src/components/SettingScreen';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import LoginScreen from './src/components/LoginScreen';


const logoIcon = require('./imgs/logo.png');

export default class sapp_client extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null
    };
  }

  setToken = (token) => {
    this.setState( { token } );
  }

  setLogoff = () => {
    this.setState( { token: null } );
    alert("logoff");
  };

  renderNavigation = () => {
    return (
      <MyApp setLogoff={this.setLogoff} />
    );
  }

  renderLogin = () => {
    return (
      <LoginScreen setToken={this.setToken} />
    );
  }

  render() {

    if (this.state.token == null) {
      return this.renderLogin();
    } else {
      return this.renderNavigation();
    }

  }
}

const DrawerMenu = (props) => {
  return (
    <View style = {{ flex: 1 }}>
      <View style = {{ marginBottom: 10 }}>
        <Image source={logoIcon} />
      </View>
      
      <View>
        <DrawerItems {...props} />
      </View>

      <View style={styles.exitMenuView}>
        <TouchableOpacity onPress={ props.setLogoff }>
          <Text style={styles.exitMenu}>Sair</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const MyApp = DrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Setting: {
    screen: SettingScreen
  }
},{
  initialRouteName: 'Home',
  drawerPosition: 'left',
  contentComponent: DrawerMenu,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
});

const styles = StyleSheet.create({
  exitMenuView: {
    marginLeft: 17
  },
  exitMenu: {
    fontWeight: 'bold',
    color: 'black'
  }
});

AppRegistry.registerComponent('sapp_client', () => sapp_client);
