import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Modal,
    Button
} from 'react-native';
import ItemList from './ItemList';

class SelectItems extends Component {

    constructor(props) {
        super(props);

        this.state = {
            multipleSelection: false,
            items: [],
            selectedItems: [],
            title: null,
            textOkButton: "OK",
            textCancelButton: "Cancelar",
            visible: false,
            backgroundColor: 'gray'
        };
    }

    componentWillMount() {
        this.setState( { 
            items: this.props.items,
            selectedItems: this.props.selectedItems,
            multipleSelection: this.props.multipleSelection,
            visible: this.props.visible,
            backgroundColor: this.props.backgroundColor !== undefined ? this.props.backgroundColor : 'gray'
         } );
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.items !== this.props.items) {
            this.setState( { items: nextProps.items } );
        } else if (nextProps.selectedItems !== this.props.selectedItems) {
            this.setState( { selectedItems: nextProps.selectedItems } );
        } else if (nextProps.multipleSelection !== this.props.multipleSelection) {
            this.setState( { multipleSelection: nextProps.multipleSelection } );
        } else if (nextProps.visible !== this.props.visible) {
            this.setState( { visible: this.props.visible } );
        } else if (nextProps.backgroundColor !== this.props.backgroundColor) {
            this.setState( { backgroundColor: nextProps.backgroundColor } );
        }

    }

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <Text>Selecione as coisas aqui</Text>
            </View>
        );
    };

    renderBody = () => {
        return (
            <View style={styles.body}>
                <ItemList 
                    selected={false}
                    item={{id: 1, name: "Sala 1"}}
                    onPress={() => { alert("clicou") }} />
            </View>
        );
    };

    renderBottom = () => {
        return (
            <View style={styles.bottom}>
                <Button title={"OK"} onPress={() => {alert("ok")}}/>
            </View>
        );
    };

    renderContent = () => {
        
        return(
            <View style={styles.container}>
                <View style={ [styles.containerFoward, { backgroundColor: this.state.backgroundColor }] }>
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
                onRequestClose={() => {
                    this.setState( { visible: false } );
                }}>

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
        borderRadius: 5
    },
    header: {
        margin: 20
    },
    body: {
        
    },
    bottom: {
        margin: 20
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    }

});

export default SelectItems;