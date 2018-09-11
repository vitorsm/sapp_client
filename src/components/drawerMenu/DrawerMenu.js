import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import Constants, { constNavigation } from '../../Constants';

const accountIcon = require('../../../imgs/account.png');
const exitIcon = require('../../../imgs/exit.png');

class DrawerMenu extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
      
      console.log(this.props);

    }
    render() {
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
                <DrawerItems {...this.props} />
              </View>
        
              <View>
                <TouchableOpacity onPress={ this.props.setLogoff } style={styles.exitMenuView}>
                  <Image source={exitIcon} style={{width: 24, height: 24}}/>
                  <Text style={styles.exitMenu}>Sair</Text>
                </TouchableOpacity>
              </View>
        
            </ScrollView>
        );
    }
}

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

export default DrawerMenu;