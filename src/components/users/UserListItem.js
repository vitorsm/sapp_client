import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    Text,
    Image
 } from 'react-native';

const touchImg = require('../../../imgs/touch.png');

class UserListItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    componentWillMount() {
        this.setState( { user: this.props.user} );
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.user !== this.props.user) {
            this.setState( { user: nextProps.user } );
        }
    }

    render() {

        return(
            <View style={styles.container}>
                <View style={styles.containerLeft}>
                    <View style={styles.nameId}>
                        <Text style={styles.textId} >
                            { this.state.user.id }
                        </Text>
                        <Text style={styles.textLogin} >
                            { this.state.user.login }
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.textName} >
                            { this.state.user.name }
                        </Text>
                    </View>
                </View>
                <View style={styles.containerRight}>
                    <Image 
                        style={styles.touchImg} 
                        source={touchImg} />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        backgroundColor: 'rgba(0, 164, 211, 0.5)',
        padding: 20,
        borderRadius: 5,
        flexDirection: 'row',
    },
    containerLeft: {
        flex: 4
    },
    containerRight: {
        flex: 1,
        alignItems: 'flex-end',
        alignSelf: 'stretch'
    },
    touchImg: {
        width: 24,
        height: 24
    },
    nameId: {
        flexDirection: 'row'
    },
    textId: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    textLogin: {
        fontSize: 22,
        color: 'white',
        marginLeft: 20
    },
    textName: {
        fontSize: 14,
        color: 'white',
        marginTop: 10
    }
});

export default UserListItem;