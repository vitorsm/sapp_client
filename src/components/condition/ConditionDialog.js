import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Modal,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import ConditionItem from './ConditionItem';

const defualtBackgroundColor = '#BDBDBD';
const groupTypes = [
    { 
        value: 0,
        label: "e        ",
        id: 'E'
    },
    {
        value: 1,
        label: "ou",
        id: 'O'
    }
];

class ConditionDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Condições de energia",
            conditions: [],
            backupConditions: [],
            backgroundColor: defualtBackgroundColor
        }
    }

    renderClearConditions = () => {
        if (this.state.conditions === null || this.state.conditions === undefined || this.state.conditions.length == 0) 
            return null;

        return(
            <TouchableOpacity onPress={ this.handleClickSelectAll }>
                <Text style={styles.textSelectAll}>Limpar condição</Text>
            </TouchableOpacity>
        );
    };

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.textTitle}>{ this.state.title }</Text>
                { this.renderClearConditions() }
            </View>
        );
    };

    renderBottom = () => {

        return (
            <View style={styles.bottom}>

                <TouchableOpacity 
                    style={styles.cancelButtonView}
                    onPress={() => { this.props.cancelOnPress(this.state.backupConditions); }}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.okButtonView}
                    onPress={() => { this.props.okOnPress(this.state.conditions); }}>
                    <Text style={styles.okButtonText}>OK</Text>
                </TouchableOpacity>

            </View>
        );
    };

    renderBody = () => {
        return (

            <View style={styles.body}>

                <Text style={styles.inputLabel}>
                    Tipo de agrupamento das condições
                </Text>
                <View style={styles.input}>
                    <RadioForm
                        radio_props={groupTypes}
                        initial={groupTypes[0].value}
                        onPress={(value) => {this.setState({value:value})}}
                        buttonSize={10}
                        formHorizontal={true}
                        animation={false} />    
                </View>

                <ConditionItem />

            </View>

            
        );
    };

    renderContent = () => {
        
        return(
            <View style={styles.container}>
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
                style={{ flex: 1 }}
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
        flex: 1,
        borderRadius: 5,
        minWidth: '98%',
        // borderWidth: 2,
        // borderColor: 'white'
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
        marginRight: 20,
        color: 'white'
    },
    okButtonView: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#00a4d3',
        borderRadius: 5,
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10
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
        marginTop: 20,
        color: 'white'
    },
    inputLabel: {
      marginLeft: 20,
      marginTop: 20,
      marginBottom: 10,
      alignSelf: 'flex-start'
    },
    input: {
      marginLeft: 20,
      marginRight: 40,
    },
    inputNumber: {
      width: "20%"
    },
});

export default ConditionDialog;