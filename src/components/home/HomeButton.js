import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Constants, { constNavigation } from '../../Constants';

class HomeButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sourceImg: null,
            title: null
        };

    }

    componentWillMount() {
        this.setState({
            sourceImg: this.props.sourceImg,
            title: this.props.title !== undefined ? this.props.title : null
        });
    }

    renderTitle = () => {
        if (this.state.title === null) return null;

        return(
            <Text style={styles.text}>
                {this.state.title}
            </Text>
        );
    };

    render() {
        return(
            <TouchableOpacity 
                style={styles.container}
                onPress={this.props.onPress}>
                <Image source={this.state.sourceImg} style={styles.img}/>
                { this.renderTitle() }
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '45%',
        margin: 5,
        height: 170,
        backgroundColor: 'rgba(0, 164, 211, 0.5)',
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
        // borderRadius: 5,
        // flexDirection: 'row',
    },
    img: {
        height: 80,
        width: 80
    },
    text: {
        fontSize: 16,
        color: 'white',
        marginTop: 10
    }
});

export default HomeButton;