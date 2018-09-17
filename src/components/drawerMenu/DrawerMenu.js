import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { DrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';
import Constants, { constNavigation } from '../../Constants';

import { connect } from 'react-redux';
import * as actions from "../../actions";

const accountIcon = require('../../../imgs/account.png');
const exitIcon = require('../../../imgs/exit.png');

var store = null;

class DrawerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedIndex: 0,
          accountLogin: null
        };
    }

    componentWillMount() {
      store = this.props.store;
      this.setState({ accountLogin: this.props.accountLogin });
    }

    navigateToScreen = (route) => {
      const navigateAction = NavigationActions.navigate({
        routeName: route,
        params: { store: store }
      });

      this.props.navigation.dispatch(navigateAction);
    }

    handleClickLogoffButton = () => {
      this.props.fetchLogoff();
    };

    handleClickMenuItem = (route, index) => {
      this.navigateToScreen(route);
      this.setState({ index });
    };

    renderMenu = (name, img, route, index) => {
      let selectedStyleView = null;
      let selectedStyleText = null;

      if (this.state.index === index) {
        selectedStyleView = { backgroundColor: '#F2F2F2'};
        selectedStyleText = { color: 'blue' };
      }

      return(
        <TouchableOpacity key={index} onPress={() => {this.handleClickMenuItem(route, index)}} >
          <View style={[styles.menuView, selectedStyleView]}>
            <Image source={img} style={styles.imgMenu}/>
            <Text style={[styles.textMenu, selectedStyleText]}>
              { name }
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    renderMenus = () => {
      let menuIndex = 1;
      let returnList = [];

      Object.keys(constNavigation).forEach((item, index) => {
        if (constNavigation[item].img !== undefined) {
          returnList.push(this.renderMenu(constNavigation[item].title, constNavigation[item].img, constNavigation[item].route, index));
        }
      });
      return returnList;
    };

    render() {
        return (
            <ScrollView style = {{ flex: 1 }}>
              <TouchableOpacity onPress={ () => { alert("clicou na coisa de ver conta do usuario") }}>
                <View style = {{ paddingTop: 20, paddingBottom: 20, paddingLeft: 10, backgroundColor: '#00a4d3', flexDirection: 'row' }}>
                  <Image source={accountIcon} />
                  <View style={{ alignSelf: 'stretch', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>
                      { this.state.accountLogin !== null ? this.state.accountLogin.name : "" }
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
        
              {/* <View>
                <DrawerItems {...this.props} vitor={"teste"}/>
              </View> */}
              <View>
                { this.renderMenus() }
              </View>
              <View>
                <TouchableOpacity onPress={ this.handleClickLogoffButton } style={styles.exitMenuView}>
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
    },
    menuView: {
      flexDirection: 'row', 
      alignItems: 'center',
      padding: 10,
      marginLeft: 7,
      paddingTop: 15,
      paddingBottom: 15
    },
    imgMenu: {
      height: 24,
      width: 24,
      marginRight: 30
    },
    textMenu: {
      color: 'black',
      fontWeight: 'bold'
    }
});

function mapStateToProps({ accountLogin }) {
  return { accountLogin };
}

export default connect(mapStateToProps, actions)(DrawerMenu);
// export default DrawerMenu;
