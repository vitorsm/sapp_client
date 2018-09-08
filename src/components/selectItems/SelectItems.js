import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';
import ItemList from './ItemList';

const defualtBackgroundColor = '#BDBDBD';

const defaultAmountShowFilter = 2;

class SelectItems extends Component {

    constructor(props) {
        super(props);

        this.state = {
            multipleSelection: false,
            items: [],
            itemsFiltered: [],
            selectedItems: [],
            backupSelectedItems: [],
            title: null,
            textOkButton: "OK",
            textCancelButton: "Cancelar",
            visible: false,
            backgroundColor: defualtBackgroundColor,
            amountShowFilter: defaultAmountShowFilter,
            textSearch: null
        };
    }

    componentWillMount() {
        this.setState( { 
            itemsFiltered: this.props.items !== undefined && this.props.items !== null ? this.props.items : [],
            items: this.props.items !== undefined && this.props.items !== null ? this.props.items : [],
            selectedItems: this.props.selectedItems !== undefined && this.props.selectedItems !== null ? this.props.selectedItems : [],
            backupSelectedItems: this.copyItems(this.props.selectedItems),
            multipleSelection: this.props.multipleSelection,
            visible: this.props.visible,
            backgroundColor: this.props.backgroundColor !== undefined ? this.props.backgroundColor : defualtBackgroundColor,
            title: this.props.title,
            amountShowFilter: this.props.amountShowFilter !== undefined && this.props.amountShowFilter !== null ? this.props.amountShowFilter : defaultAmountShowFilter
         } );
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.items !== this.props.items) {
            this.setState( { 
                items: nextProps.items !== undefined && nextProps.items !== null ? nextProps.items : [],
                itemsFiltered: nextProps.items !== undefined && nextProps.items !== null ? nextProps.items : [],
                textSearch: null
            });
        } 
        if (nextProps.selectedItems !== this.props.selectedItems) {
            this.setState( { 
                selectedItems: nextProps.selectedItems !== undefined && nextProps.selectedItems !== null ? nextProps.selectedItems : [], 
                backupSelectedItems: this.copyItems(nextProps.selectedItems) 
            } );
        } 
        if (nextProps.multipleSelection !== this.props.multipleSelection) {
            this.setState( { multipleSelection: nextProps.multipleSelection } );
        } 
        if (nextProps.visible !== this.props.visible) {
            this.setState( { visible: nextProps.visible } );
            if (nextProps.visible) {
                this.setState( { 
                    backupSelectedItems: this.copyItems(this.state.selectedItems),
                    itemsFiltered: this.copyItems(this.state.items)
                } );
            }
        } 
        if (nextProps.backgroundColor !== this.props.backgroundColor) {
            this.setState( { backgroundColor: nextProps.backgroundColor } );
        }
        if (nextProps.title !== this.props.title) {
            this.setState( { title: nextProps.title } );
        }
        if (nextProps.amountShowFilter !== this.props.amountShowFilter) {
            this.setState( { amountShowFilter: nextProps.amountShowFilter !== undefined && nextProps.amountShowFilter !== undefined !== null ? nextProps.amountShowFilter : defaultAmountShowFilter } );
        }
    }

    copyItems = (list) => {

        let response = [];
        if (list !== null && list !== undefined) {
            list.map( item => { response.push(item); } );
        }

        return response;
    }

    handleClickSelectAll = () => {
        let selectedItems = [];
        
        if (this.state.items.length !== this.state.selectedItems.length) {
            this.state.items.map( item => selectedItems.push(item) );
        }

        this.setState( { selectedItems } );
    }

    handleClickItem = (item) => {

        if (!this.state.multipleSelection) {
            let list = [item];
            this.props.okOnPress(list);
        }

        let list = this.state.selectedItems;

        let index = list.indexOf(item);

        if (index >= 0) {
            list.splice(index, 1);
        } else {
            list.push(item);
        }

        this.setState( { selectedItems: list });
    };

    handleChangeTextSearch = (text) => {
        let itemsFiltered = [];

        this.state.items.filter(item => item.name.toUpperCase().includes(text.toUpperCase()))
        .map(item => itemsFiltered.push(item));

        this.setState( { itemsFiltered } );
    };

    renderSelectAll = () => {
        if (!this.state.multipleSelection) return null;
        let text = "Remover seleção";

        if (this.state.items.length !== this.state.selectedItems.length) {
            text = "Selcionar tudo";
        }

        return(
            <TouchableOpacity onPress={ this.handleClickSelectAll }>
                <Text style={styles.textSelectAll}>{ text }</Text>
            </TouchableOpacity>
        );
    };

    renderFilter = () => {
        if (this.state.items.length < this.state.amountShowFilter) return null;

        return(
            <TextInput 
                style={{ marginTop: 30 }}
                placeholder={"Pesquisa..."} 
                value={this.state.textSearch}
                onChangeText={this.handleChangeTextSearch} />  
        );
    };

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.textTitle}>{ this.state.title }</Text>
                { this.renderFilter() }
                { this.renderSelectAll() }
            </View>
        );
    };

    renderItems = () => {
        if (this.state.itemsFiltered === undefined || this.state.itemsFiltered === null) return null;

        return this.state.itemsFiltered.map( item => {
            return (
                <ItemList
                    key={item.id}
                    selected={this.state.selectedItems.includes(item)}
                    item={item}
                    onPress={() => { this.handleClickItem(item); }} />
            );
        });
    };

    renderBody = () => {
        return (
            <View style={styles.body}>
                <ScrollView>
                    { this.renderItems() }
                </ScrollView>
            </View>
        );
    };

    renderOkButtun = () => {
        if (!this.state.multipleSelection) return null;

        return(
            <TouchableOpacity 
                style={styles.okButtonView}
                onPress={() => { this.props.okOnPress(this.state.selectedItems); }}>
                <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
        );
    };

    renderBottom = () => {
        return (
            <View style={styles.bottom}>

                <TouchableOpacity 
                    style={styles.cancelButtonView}
                    onPress={() => { this.props.cancelOnPress(this.state.backupSelectedItems); }}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                { this.renderOkButtun() }
            </View>
        );
    };

    renderContent = () => {
        
        return(
            <View style={styles.container}>
                {/* <View style={ [styles.containerFoward, { backgroundColor: this.state.backgroundColor }] }> */}
                <View style={ [ { backgroundColor: this.state.backgroundColor }, styles.containerFoward] }>
                    { this.renderHeader() }
                    { this.renderBody() }
                    { this.renderBottom() }
                </View>
            </View>
        );
        
    }

    render() {
        
        return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => {this.props.cancelOnPress(this.state.backupSelectedItems);} }>

                { this.renderContent() }

            </Modal>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 30
    },
    containerFoward: {
        borderRadius: 5,
        minWidth: '90%'
        // backgroundColor: 'green'
    },
    header: {
        margin: 20
    },
    body: {
        flex: 1,
        justifyContent: 'center'
    },
    bottom: {
        margin: 20,
        alignSelf: 'stretch',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
        marginLeft: 20,
        marginRight: 20
    },
    okButtonView: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#00a4d3',
        borderRadius: 5,
        alignItems: 'center',
        marginLeft: 10
    },
    okButtonText: {
        color: 'white',
        fontSize: 16
    },
    cancelButtonView: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center'
    },
    cancelButtonText: {
        fontSize: 16
    },
    textSelectAll: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20
    }
});

export default SelectItems;