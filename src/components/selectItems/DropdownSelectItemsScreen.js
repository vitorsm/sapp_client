import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import SelectItems, { selectMode } from './SelectItems';

const defualtBackgroundColor = '#7a7a7a';

const imgArrow = require('../../../imgs/arrow_drop_down.png');

class DropdownSelectItemsScreen extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            modalTitle: null,
            dropdownTitle: null,
            multipleSelection: false,
            backgroundColor: defualtBackgroundColor,
            items: [],
            selectedItems: [],
            selectedItem: null,
            showModal: false,
            editable: true,
            textAddButton: null
        };
    }

    componentWillMount() {

        this.setState( { 
            items: this.props.items !== undefined && this.props.items !== null ? this.props.items : [],
            selectedItems: this.props.items !== undefined && this.props.items !== null ? this.props.items : [],
            selectedItem: this.props.selectedItem !== undefined && this.props.selectedItem !== null ? this.props.selectedItem : [],
            multipleSelection: this.props.multipleSelection,
            backgroundColor: this.props.backgroundColor !== undefined ? this.props.backgroundColor : defualtBackgroundColor,
            modalTitle: this.props.modalTitle,
            dropdownTitle: this.props.dropdownTitle,
            editable: this.props.editable !== undefined ? this.props.editable : true,
            textAddButton: this.props.textAddButton !== undefined ? this.props.textAddButton : null
        } );
        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.props.items) {
            this.setState( { items: nextProps.items !== undefined && nextProps.items !== null ? nextProps.items : [] } );
        } else if (nextProps.selectedItems !== this.props.selectedItems) {
            this.setState( { selectedItems: nextProps.selectedItems !== undefined && nextProps.selectedItems !== null ? nextProps.selectedItems : [] } );
        } else if (nextProps.selectedItem !== this.props.selectedItem) {
            this.setState( { selectedItem: nextProps.selectedItem !== undefined && nextProps.selectedItem !== null ? nextProps.selectedItem : [] } );
        } else if (nextProps.multipleSelection !== this.props.multipleSelection) {
            this.setState( { multipleSelection: nextProps.multipleSelection } );
        } else if (nextProps.backgroundColor !== this.props.backgroundColor) {
            this.setState( { backgroundColor: nextProps.backgroundColor } );
        } else if (nextProps.modalTitle !== this.props.modalTitle) {
            this.setState( { modalTitle: nextProps.modalTitle } );
        } else if (nextProps.dropdownTitle !== this.props.dropdownTitle) {
            this.setState( { dropdownTitle: nextProps.dropdownTitle } );
        } else if (nextProps.editable !== this.props.editable) {
            this.setState( { editable: nextProps.editable !== undefined ? nextProps.editable : true } );
        } else if (nextProps.textAddButton !== this.props.textAddButton) {
            this.setState( { textAddButton: nextProps.textAddButton !== undefined ? nextProps.textAddButton : null } );
        }
    }

    handleClick = () => {
        if (this.state.editable) {
            let showModal = this.state.showModal
            showModal = !showModal;

            this.setState( { showModal } );
        }
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
                onPress={ this.handleClick }
                activeOpacity={ this.state.editable ? 0.5 : 1 }>
                <View 
                    style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
                    <View style={styles.textView}>
                        <Text style={styles.text}>
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
                        okOnPress={this.handleOkClick}
                        textAddButton={this.state.textAddButton}
                        mode={selectMode.screenMode}
                        onPressItem={this.props.onPressItem}
                        addButtonOnPress={this.props.addButtonOnPress} />
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
    },
    text: {
        color: 'white'
    }
});
export default DropdownSelectItemsScreen;