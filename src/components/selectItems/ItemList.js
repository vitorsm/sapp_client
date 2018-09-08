import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

const selectedImg = require('../../../imgs/check.png');
const unselectedImg = require('../../../imgs/cancel.png');

class ItemList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            item: null,
            selectedColor: '#6E6E6E'
        }
    }

    componentWillMount() {
        this.setState( {
            selected: this.props.selected,
            item: this.props.item
        } );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selected !== this.props.selected) {
            this.setState( { selected: nextProps.selected} );
        } else if (nextProps.item !== this.props.item) {
            this.setState( { item: nextProps.item } );
        }
    }

    render() {
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[styles.container, { backgroundColor: this.state.selected ? selectedColor : null } ]}>
                    <Image 
                        style={{ height: 24, width: 24 }}
                        source={ this.state.selected ? selectedImg : unselectedImg} />

                    <Text> { this.state.item.name } </Text>
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        flexDirection: 'row'
    }
});

export default ItemList;