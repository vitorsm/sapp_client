import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Constants, { addImg } from '../Constants';

const defaultSize = 60;

class FloatActionButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            source: null,
            color: 'red',
            size: 100
        };
    }

    componentWillMount() {
        this.setState( {
            source: this.props.source,
            color: this.props.color,
            size: this.props.size !== undefined ? this.props.size : defaultSize
        } );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.source !== this.props.source) {
            this.setState( { source: nextProps.source } );
        } else if (nextProps.color !== this.props.color) {
            this.setState( { color: nextProps.color } );
        } else if (nextProps.size !== this.props.size) {
            this.setState( { 
                size: next.props.size !== undefined ? next.props.size : defaultSize
            } );
        }
    }

    render() {
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <View 
                    style={{
                        width: this.state.size,
                        height: this.state.size,
                        borderRadius: this.state.size / 2,
                        backgroundColor: this.state.color,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowOpacity: 1.0,
                        shadowColor: 'red',
                        shadowRadius: 20,
                        marginLeft: 10
                    }}>
                    <Image 
                        source={
                            this.state.source !== undefined ? 
                            this.state.source : addImg } 
                        style={{ height: 36, width: 36 }} />
                </View>
            </TouchableOpacity>
        );
    }
}

export default FloatActionButton;