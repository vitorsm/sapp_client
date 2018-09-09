import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';

import { DrawerNavigator, DrawerItems } from 'react-navigation';
import LoginScreen from './src/components/login/LoginScreen';
import Constants, { constNavigation } from './src/Constants';

const accountIcon = require('./imgs/account.png');
const exitIcon = require('./imgs/exit.png');

export default class sapp_client extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "null"
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
    <ScrollView style = {{ flex: 1 }}>
      <TouchableOpacity onPress={ () => { alert("clicou na coisa de ver conta do usuario") }}>
        <View style = {{ paddingTop: 20, paddingBottom: 20, paddingLeft: 10, backgroundColor: '#00a4d3', flexDirection: 'row' }}>
          <Image source={accountIcon} />
          <View style={{ alignSelf: 'stretch', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, color: 'white' }}>Vítor de Sousa Moreira</Text>
          </View>
        </View>
      </TouchableOpacity>
      
      
      <View>
        <DrawerItems {...props} />
      </View>

      <View>
        <TouchableOpacity onPress={ props.setLogoff } style={styles.exitMenuView}>
          <Image source={exitIcon} style={{width: 24, height: 24}}/>
          <Text style={styles.exitMenu}>Sair</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const MyApp = DrawerNavigator(
  constNavigation
  ,{
  initialRouteName: 'about',
  drawerPosition: 'left',
  contentComponent: DrawerMenu,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  animationEnabled: 'true'
});

const styles = StyleSheet.create({
  exitMenuView: {
    padding: 10,
    marginLeft: 7,
    flexDirection: 'row'
  },
  exitMenu: {
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 31,
    fontSize: 16
  }
});

AppRegistry.registerComponent('sapp_client', () => sapp_client);
