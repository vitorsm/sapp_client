import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';


class SeparatorGroupCrud extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            text: null,
            isLine: false
        };
    }

    componentWillMount() {
        this.setState({
            text: this.props.text,
            isLine: this.props.isLine !== undefined ? this.props.isLine : false
        });
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.text !== this.props.text) {
            this.setState({ text: nextProps.text });
        } 
        if (nextProps.isLine !== this.props.isLine) {
            this.setState({ isLine: nextProps.isLine });
        }
    }

    renderLine = () => {
        if (!this.state.isLine) return null;

        return(
            <View style={styles.line}/>
        );
    };

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>{ this.state.text }</Text>
                { this.renderLine() }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    text: {
        fontSize: 24,
        alignSelf: 'center'
    },
    line: {
        borderWidth: 1,
        borderColor: 'gray',
        marginLeft: 20,
        marginRight: 20
    }
});
export default SeparatorGroupCrud;