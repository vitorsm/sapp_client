import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import NavBar, { buttonView } from '../NavBar';
import Constants, { 
    constNavigation,
} from '../../Constants';
import TextButton from '../TextButton';
import { connect } from 'react-redux';
import * as actions from "../../actions";



class InsertCredentialsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Credenciais módulo",
            ssid: null,
            wifiPassword: null,
            deviceLogin: null,
            devicePassword: null
        };
    }


    sendCredentials = (data) => {
        let dgram = require('dgram');
        let socket = dgram.createSocket('udp4');
        let port = 4421;
        let address = "192.168.43.238";
    
        socket.bind(4162);
    
        var buf = this.toUTF8Array('excellent!')
        socket.send(buf, 0, buf.length, port, address, function(err) {
            //if (err) throw err
            console.log(err);
        });
    }
    
    toUTF8Array = (str) => {
        var utf8 = [];
        for (var i=0; i < str.length; i++) {
            var charcode = str.charCodeAt(i);
            if (charcode < 0x80) utf8.push(charcode);
            else if (charcode < 0x800) {
                utf8.push(0xc0 | (charcode >> 6), 
                          0x80 | (charcode & 0x3f));
            }
            else if (charcode < 0xd800 || charcode >= 0xe000) {
                utf8.push(0xe0 | (charcode >> 12), 
                          0x80 | ((charcode>>6) & 0x3f), 
                          0x80 | (charcode & 0x3f));
            }
            // surrogate pair
            else {
                i++;
                // UTF-16 encodes 0x10000-0x10FFFF by
                // subtracting 0x10000 and splitting the
                // 20 bits of 0x0-0xFFFFF into two halves
                charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                          | (str.charCodeAt(i) & 0x3ff));
                utf8.push(0xf0 | (charcode >>18), 
                          0x80 | ((charcode>>12) & 0x3f), 
                          0x80 | ((charcode>>6) & 0x3f), 
                          0x80 | (charcode & 0x3f));
            }
        }
        return utf8;
    }

    handleSendCredentials = () => {
        // this.props.sendCredentials();
        this.sendCredentials();

        alert("Vai enviar as credenciais: ssid: " + 
            this.state.ssid + 
            " | wifiPass: " + 
            this.state.wifiPassword + 
            " | login: " + 
            this.state.deviceLogin + 
            " | devicePass: " + 
            this.state.devicePassword );
    };

    renderInputs = () => {
        return(
            <View style={styles.descriptionView} >

                <Text style={styles.descriptionTitle}>
                        Siga os passos para a conexão do módulo a rede
                </Text>

                <View style={styles.card}>
                    <Text style={styles.descriptionText}>
                        Serão necessários 2 credenciais para o módulo. A primeira é
                        referente ao acesso à rede wifi, SSID (nome da rede) e a senha.
                        A segunda se trata das credenciais do módulo para 
                        a rede de comunicação dos módulos, login e senha.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.descriptionSubtitle}>
                        1. Se conecte a rede do módulo
                    </Text>
                    <View style={styles.internalCard}>
                        <Text style={styles.descriptionText}>
                            Se o módulo não estiver conectado a uma rede será criada uma rede
                            wifi por ele. Caso o módulo já esteja conectado pressione o botão
                            reset. O nome da rede será exibido no display do módulo
                        </Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.descriptionSubtitle}>
                        2. Insira as credencias da rede wifi
                    </Text>
                    <View style={styles.internalCard}>
                        <Text style={styles.inputLabel}>SSID</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder={"Insira o SSID da rede wifi"}
                            value={this.state.ssdi}
                            onChangeText={(ssid) => this.setState({ ssid }) } />
                        <Text style={styles.inputLabel}>Senha</Text>
                        <TextInput 
                            style={styles.input}
                            secureTextEntry
                            value={this.state.wifiPassword}
                            onChangeText={(wifiPassword) => this.setState({ wifiPassword }) } />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.descriptionSubtitle}>
                        3. Insira as credencias da módulo
                    </Text>
                    <View style={styles.internalCard}>
                        <Text style={styles.inputLabel}>Login</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder={"Insira o login módulo"}
                            value={this.state.deviceLogin}
                            onChangeText={(deviceLogin) => this.setState({ deviceLogin }) } />
                        <Text style={styles.inputLabel}>Senha</Text>
                        <TextInput 
                            style={styles.input}
                            secureTextEntry
                            placeholder={"Insira a senha do módulo"}
                            value={this.state.devicePassword}
                            onChangeText={(devicePassword) => this.setState({ devicePassword }) } />
                    </View>
                </View>
            </View>
        );
    };

    renderActions = () => {
        return(
            <View style={styles.buttonView}>
                <TextButton 
                    text={"Enviar credenciais"}
                    onPress={this.handleSendCredentials}/>
            </View>
        );
    };

    render() {
        return(
            <View style={{ flex: 1 }}>
                <NavBar 
                    navigation={this.props.navigation}
                    menuText={this.state.title}
                    buttonView={ buttonView.backWithoutFilter }
                    screenBack={ constNavigation.home.route }
                    showButton={ true } />

                <View style={styles.container}>
                    <ScrollView>
                        { this.renderInputs() }
                        { this.renderActions() }
                    </ScrollView>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    descriptionView: {
        margin: 10
    },
    card: {
        backgroundColor: 'rgba(0, 164, 211, 0.5)',
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        margin: 5,
        marginTop: 10,
        marginBottom: 10
    },
    internalCard: {
        backgroundColor: 'white',
        padding: 10
    },
    descriptionText: {
        fontSize: 16
    },
    descriptionTitle: {
        fontSize: 18,
        marginBottom: 25
    },
    descriptionSubtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputLabel: {
      marginTop: 20,
      alignSelf: 'flex-start'
    },
    input: {
        marginBottom: 10
    },
    buttonView: {
        margin: 40,
        marginTop: 10,
        marginBottom: 20
    }
});
// export default InsertCredentialsScreen;

function mapStateToProps({ accountLogin }) {
    return { accountLogin };
}

export default connect(mapStateToProps, actions)(InsertCredentialsScreen);
