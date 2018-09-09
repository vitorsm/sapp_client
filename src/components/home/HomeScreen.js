import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Image
} from 'react-native';
import NavBar, { buttonView } from '../NavBar';

const img = require('../../../imgs/home.png');
const appName = "SAPP Client";

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ""
        };
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
        
    }

    renderPlaceControl = () => {

    };

    renderDoorLocks = () => {

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

    renderBody = () => {
        return (
            <View style={styles.body}>
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
        margin: 5,
        height: 100,
        backgroundColor: 'rgba(0, 164, 211, 0.5)',
        padding: 20,
        borderRadius: 5,
        flexDirection: 'row',
    }
});
export default HomeScreen;