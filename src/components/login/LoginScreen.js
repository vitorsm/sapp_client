import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../actions";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import ButtonText from '../TextButton';

const logoIcon = require('../../../imgs/logo.png');

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginText: null,
            passwordText: null,
            accountLogin: null,
            showProgress: false,
            openLoginFail: false
        };
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.accountLogin !== this.props.accountLogin) {
            this.setState({ showProgress: false });

            if (nextProps.accountLogin.error === undefined) {
                this.setState({ accountLogin: nextProps.accountLogin });
            } else if (nextProps.accountLogin.error === 401) {
                // this.setState({ openLoginFail: true });
                alert("Login e/ou senha incorretos")
            } else if (nextProps.accountLogin.error === 403) {
                alert("Sem permissão ou acesso")
            } else {
                alert("Falha de conexão");
            }

        }

    }

    handleLoginButton = () => {
        this.setState({ showProgress: true });

        this.props.fetchAccountLogin({
            login: this.state.loginText,
            password: this.state.passwordText
        });

    };

    handleForgotPasswordButton = () => {
        alert("clicou no bt esqueci minha senha");
    };

    renderProgress = () => { 
        return(
            <Text>
                Carregando...
            </Text>
        );
    };

    renderActions = () => {
        if (this.state.showProgress) {
            return(
                <ActivityIndicator size="large" />
            );
        }

        return(
            <View style={styles.buttonView}>

                <ButtonText onPress={this.handleLoginButton}
                    text={"Entrar"} />
                
                <TouchableOpacity onPress={this.handleForgotPasswordButton}>
                    <Text style={styles.textForgotPassword}>
                        Esqueci minha senha
                    </Text>
                </TouchableOpacity>
            </View>
        );

    };

    render() {

        return (
        <View style={styles.login}>
            
            <View style={styles.imgView}>
                <Image source={logoIcon} />
            </View>

            <View style={styles.inputView}>

                <TextInput 
                    value={this.state.loginText}
                    onChangeText={(loginText) => { this.setState( { loginText } ); } }
                    placeholder={"Login"}
                    style={styles.loginInput} />

                <TextInput 
                    value={this.state.passwordText}
                    onChangeText={(passwordText) => { this.setState( { passwordText } ); } }
                    placeholder={"Senha"}
                    secureTextEntry
                    style={styles.passwordInput}/>

            </View>

            { this.renderActions() }

        </View>
        );
    }
}

const styles = StyleSheet.create({
    login: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgView: {

    },
    inputView: {
        margin: 20,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'stretch',
        alignSelf: 'stretch'
    },
    loginInput: {
        marginBottom: 5,
        marginBottom: 15,
        fontSize: 16
    },
    passwordInput: {
        fontSize: 16
    },
    buttonView: {
        alignItems: 'stretch',
        alignSelf: 'stretch',
        paddingLeft: 30,
        paddingRight: 30
    },
    buttonLogin: {
        marginTop: 10,
        marginBottom: 65
    },
    textForgotPassword: {
        fontSize: 17,
        //fontWeight: 'bold',
        color: 'blue',
        margin: 35,
        alignSelf: 'center'
    }
});

function mapStateToProps({ accountLogin }) {
    return { accountLogin };
}

export default connect(mapStateToProps, actions)(LoginScreen);
