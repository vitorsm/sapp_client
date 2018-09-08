import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import SelectItems from './SelectItems';

const defualtBackgroundColor = '#BDBDBD';
const imgArrow = require('../../../imgs/arrow_drop_down.png');

class DropdownSelectedItems extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            modalTitle: null,
            dropdownTitle: null,
            multipleSelection: false,
            backgroundColor: defualtBackgroundColor,
            items: [],
            selectedItems: [],
            showModal: false
        };
    }

    componentWillMount() {
        let test = [{
            id: 1,
            name: "Coisa 1"
        },{
            id: 2,
            name: "Coisa 2"
        },{
            id: 3,
            name: "Coisa 3"
        }, {
            id: 4,
            name: "Coisa 1"
        },{
            id: 5,
            name: "Coisa 2"
        },{
            id: 6,
            name: "Coisa 3"
        }, {
            id: 7,
            name: "Coisa 1"
        },{
            id: 8,
            name: "Coisa 2"
        },{
            id: 9,
            name: "Coisa 3"
        }, {
            id: 10,
            name: "Coisa 1"
        },{
            id: 11,
            name: "Coisa 2"
        },{
            id: 12,
            name: "Coisa 3"
        }];

        this.setState( { 
            // items: this.props.items !== undefined && this.props.items !== null ? this.props.items : [],
            items: test,
            selectedItems: this.props.selectedItems !== undefined && this.props.selectedItems !== null ? this.props.selectedItems : [],
            multipleSelection: this.props.multipleSelection,
            backgroundColor: this.props.backgroundColor !== undefined ? this.props.backgroundColor : defualtBackgroundColor,
            modalTitle: this.props.modalTitle,
            dropdownTitle: this.props.dropdownTitle
         } );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.props.items) {
            this.setState( { items: nextProps.items !== undefined && nextProps.items !== null ? nextProps.items : [] } );
        } else if (nextProps.selectedItems !== this.props.selectedItems) {
            this.setState( { selectedItems: nextProps.selectedItems !== undefined && nextProps.selectedItems !== null ? nextProps.selectedItems : [] } );
        } else if (nextProps.multipleSelection !== this.props.multipleSelection) {
            this.setState( { multipleSelection: nextProps.multipleSelection } );
        } else if (nextProps.backgroundColor !== this.props.backgroundColor) {
            this.setState( { backgroundColor: nextProps.backgroundColor } );
        } else if (nextProps.modalTitle !== this.props.modalTitle) {
            this.setState( { modalTitle: nextProps.modalTitle } );
        } else if (nextProps.dropdownTitle !== this.props.dropdownTitle) {
            this.setState( { dropdownTitle: nextProps.dropdownTitle } );
        }
    }

    handleClick = () => {
        let showModal = this.state.showModal
        showModal = !showModal;

        this.setState( { showModal } );

    };

    handleCancelClick = (selectedItems) => {
        this.setState( { selectedItems, showModal: false } );
    };

    handleOkClick = (selectedItems) => {
        this.setState( { selectedItems, showModal: false } );
    };

    renderText = () => {
        if (!this.state.multipleSelection) {

            return this.state.selectedItems !== undefined && this.state.selectedItems !== null 
                && this.state.selectedItems.length > 0 ? 
                this.state.selectedItems[0].name : 
                this.state.dropdownTitle;

        } else {
            if (this.state.selectedItems !== undefined && this.state.selectedItems !== null
                && this.state.selectedItems.length > 0) {
                
                let text = "";
                this.state.selectedItems.map( item => text += item.name + ", ");
                return text;
            } else {
                return this.state.dropdownTitle;
            }
        }
    };

    render() {
        return(
            <TouchableOpacity
                onPress={ this.handleClick }>
                <View 
                    style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
                    <View style={styles.textView}>
                        <Text>
                            { this.renderText() }
                        </Text>
                    </View>
                    <View style={styles.imgView}>
                        <Image 
                            style={styles.img}
                            source={imgArrow} />
                    </View>

                    <SelectItems
                        selectedItems={this.state.selectedItems}
                        items={this.state.items}
                        multipleSelection={this.state.multipleSelection}
                        backgroundColor={this.state.backgroundColor}
                        title={this.state.modalTitle}
                        visible={this.state.showModal}
                        cancelOnPress={this.handleCancelClick}
                        okOnPress={this.handleOkClick} />
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 5
    },
    textView: {
        flex: 5,
        alignItems: 'flex-start'
    },
    imgView: {
        flex: 1,
        alignItems: 'flex-end'
    },
    img: {
        height: 24,
        width: 24
    }
});
export default DropdownSelectedItems;