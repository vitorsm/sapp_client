import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';

const logoIcon = require('../../imgs/logo.png');

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginText: null,
            passwordText: null
        };
    }

    handleLoginButton = () => {
        this.props.setToken("TESTE");
    };

    handleForgotPasswordButton = () => {
        alert("clicou no bt esqueci minha senha");
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

            <View style={styles.buttonView}>

                <Button 
                    onPress={this.handleLoginButton}
                    title={"Entrar"}
                    style={styles.buttonLogin}/>
                
                <TouchableOpacity onPress={this.handleForgotPasswordButton}>
                    <Text style={styles.textForgotPassword}>
                        Esqueci minha senha
                    </Text>
                </TouchableOpacity>
            </View>

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
        margin: 10,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'stretch',
        alignSelf: 'stretch'
    },
    loginInput: {
        marginBottom: 5,
        marginBottom: 10,
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

export default LoginScreen;
