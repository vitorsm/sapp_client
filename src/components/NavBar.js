import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class NavBar extends Component {
  render() {
    return (
        <View style = { styles.nav } >
            <Text>SAPP client</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    nav: {
        backgroundColor: '#CCC',
        padding: 10,
        height: 60
    }
});

export default NavBar;