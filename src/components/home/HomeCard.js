import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Image
} from 'react-native';
import Contants, { constNavigation } from '../../Constants';

class HomeCard extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return(
            <View style={styles.container}>
                
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
    }
});
export default HomeCard;