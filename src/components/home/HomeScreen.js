import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Image,
    PanResponder
} from 'react-native';
import NavBar, { buttonView } from '../NavBar';
import HomeCard from './HomeCard';
import HomeButton from './HomeButton';
import { constNavigation } from '../../Constants';



const img = require('../../../imgs/home.png');
const appName = "Cliente MG";


const imgNetwork = require('../../../imgs/module_network.png');

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: "",
            loggedUser: {
                name: "Vítor de Sousa Moreira"
            }
        };
    }

    componentWillMount() {

        // console.log("parametros", this.props.navigation.getParam('params', null));
        // console.log("props home", this.props);
        // this.props.navigation.test = "teste";
        // console.log("props home", this.props);

        this._panResponder = PanResponder.create({

            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {
              this.fScroll.setNativeProps({ scrollEnabled: false })
            },
            onPanResponderMove: () => {
      
            },
            onPanResponderTerminationRequest: () => true,
            onPanResponderRelease: () => {
              this.fScroll.setNativeProps({ scrollEnabled: true })
            },
            fScroll: this.fScroll
        });
    }

    static navigationOptions = {
        drawerIcon: (
          <Image 
            source={img}
            style={{ height: 24, width: 24}} />
        ),
        title: "Home"
    };

    renderLastEvents = () => {
        return(
            <View style={styles.card}>
                <HomeCard
                    panHandlers={this._panResponder.panHandlers}
                    title={"Últimos eventos"}
                    footerText={"atualizado em 20/05/2018"}/>
            </View>
        );
    }

    renderPlaceControl = () => {
        return(
            <View style={styles.card}>
                <HomeCard
                    panHandlers={this._panResponder.panHandlers}
                    title={"Últimos eventos"}
                    footerText={"atualizado em 20/05/2018"} />
            </View>
        );
    };

    renderDoorLocks = () => {
        return(
            <View style={styles.card}>
                <HomeCard 
                    panHandlers={this._panResponder.panHandlers}
                    title={"Últimos eventos"} 
                    footerText={"atualizado em 20/05/2018"} />
            </View>
        );
    };

    renderHeader = () => {
        return(
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.appNameText}>{appName}</Text>
                </View>
            </View>
        );
    };

    renderWelcome = () => {
        return(
            <View style={styles.welcomeView}>
                <Text style={styles.welcomeText}>Bem-vindo, { this.state.loggedUser.name }</Text>
            </View>
        );
    };

    renderBody = () => {
        return (
            <View style={styles.body}>
                <ScrollView ref={(e) => { this.fScroll = e }} >
                    { this.renderWelcome() }
                    { this.renderTopAction() }
                    { this.renderPlaceControl() }
                    { this.renderDoorLocks() }
                    { this.renderLastEvents() }
                </ScrollView>
            </View>
        );
    };

    renderTopAction = () => {
        return(
            <View style={styles.action}>
                <HomeButton 
                    sourceImg={imgNetwork} 
                    title={"Conectar módulo a rede"}
                    onPress={() => this.props.navigation.navigate(constNavigation.insertCredentialsScreen.route)}/>
                <HomeButton />
            </View>
        );
    };

    render() {
        return(
            <View style={{ flex: 1 }}>

                <NavBar 
                    navigation={this.props.navigation}
                    menuText={this.state.title}
                    buttonView={ buttonView.menuText }
                    showButton={ true } />

                <View style={styles.container}>
                    { this.renderHeader() }
                    { this.renderBody() }
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#00a4d3',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        flex: 5
    },
    appNameText: {
        fontSize: 24,
        color: 'white'
    },
    card: {
        margin: 5
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    welcomeView: {
        margin: 10,
        marginTop: 20,
        alignItems: 'center',
        alignSelf: 'center'
    },
    welcomeText: {
        fontSize: 18
    }
});
export default HomeScreen;