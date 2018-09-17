import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

const defaultBackgroundColor = "#00a4d3";

class TextButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: null,
            backgroundColor: null,
            smallButton: false
        };
    }

    componentWillMount() {
        this.setState({ 
            text: this.props.text,
            backgroundColor: this.props.backgroundColor !== undefined ? this.props.backgroundColor : defaultBackgroundColor,
            smallButton: this.props.smallButton
         });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.text !== this.props.text) {
            this.setState({ text: nextProps.text });
        } 
        if (nextProps.backgroundColor !== this.props.backgroundColor) {
            this.setState({ backgroundColor: nextProps.backgroundColor !== undefined ? nextProps.backgroundColor : defaultBackgroundColor });
        }
        if (nextProps.smallButton !== this.props.smallButton) {
            this.setState({ smallButton: nextProps.smallButton });
        }
    }

    render() {
        return(
            <TouchableOpacity 
                style={[this.state.smallButton ? styles.smallTouchButton : styles.touchButton, { backgroundColor: this.state.backgroundColor }]}
                onPress={this.props.onPress}>

                <Text style={styles.text}>{this.state.text}</Text>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    touchButton: {
        // margin: 20,
        padding: 20,
        borderRadius: 5,
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 16
    },
    smallTouchButton: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'center',
        padding: 10,
        // margin: 5,
    },
});
export default TextButton;