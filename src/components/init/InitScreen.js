import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import Constants, { constNavigation } from '../../Constants';
import LoginScreen from '../login/LoginScreen';
import DrawerMenu from '../drawerMenu/DrawerMenu';

const accountIcon = require('../../../imgs/account.png');
const exitIcon = require('../../../imgs/exit.png');

var store = null;
var accountLogin = null;

class InitScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accountLogin: null
        };
    }

    componentWillMount() {
        initialRouteParams.params.store = this.props.store;
        store = this.props.store;
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.accountLogin !== this.props.accountLogin) {
            if (nextProps.accountLogin === false) {
                this.setState({ accountLogin: null });
            } else {

                if (nextProps.accountLogin.error === undefined) {
                    this.setState({ accountLogin: nextProps.accountLogin });
                    accountLogin = nextProps.accountLogin;
                }

                
            }
        }
    }

    renderNavigation = () => {
        return (
            <MyApp store={this.props.store} />
        );
    }

    renderLogin = () => {
        return (
            <LoginScreen store={this.props.store}/>
        );
    }

    render() {

        if (this.state.accountLogin === null) {
            return this.renderLogin();
        } else {
            return this.renderNavigation();
        }

    }
}

var initialRouteParams = { params: { id: 1, name: "teste"} };

const MyApp = DrawerNavigator(
    constNavigation,
    {
        initialRouteName: 'home',
        drawerPosition: 'left',
        contentComponent: props => {
            return(
                <DrawerMenu {...props} store={store} accountLogin={accountLogin}/>
            )
        },
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        animationEnabled: 'true',
        contentOptions: {
            
        },
        initialRouteParams: initialRouteParams
    }
);

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

function mapStateToProps({ accountLogin }) {
    return { accountLogin };
}

export default connect(mapStateToProps, actions)(InitScreen);
