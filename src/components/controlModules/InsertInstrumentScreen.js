import React, { Component } from 'react';
import {
    Text,
    InputText,
    ScrollView,
    View,
    TextInput,
    Switch
} from 'react-native';
import InsertObjectScreen, { crudMode, styles } from '../crud/InsertObjectScreen';
import Constants, { constNavigation } from '../../Constants';
import DropdownSelectItems from '../selectItems/DropdownSelectItems';
import ConditionDialog from './ConditionDialog';

class InsertInstrumentScreen extends InsertObjectScreen {
    constructor(props) {
        super(props);
        this.state = {
            crudMode: crudMode.view,
            object: null,
            backupObject: null,
            description: " do instrumento",
            title: "Cadastro de instrumento",
            isKeyboardHide: true,
            objectBack: null
        };
    }

    componentWillMount() {
        super.componentWillMount();
    }

    setObject = (instrumentReceived) => {
        let instrument = null;
        let isNull = true;

        if (instrumentReceived !== undefined && instrumentReceived !== null) {
            instrument = instrumentReceived;
            isNull = false;
        } else {
            instrument = {
                id: 0,
                number: null,
                name: null,
                description: null,
                historySampleTime: null,
                isPowered: true,
                pinType: null,
                setPoint: null
            };
        }
        
        let backupInstrument = {
            id: instrument.id,
            number: instrument.number,
            name: instrument.name,
            description: instrument.description,
            historySampleTime: instrument.historySampleTime,
            isPowered: instrument.isPowered,
            pinType: instrument.pinType,
            setPoint: instrument.setPoint
        };

        if (isNull) {
            this.setState( { object: instrument, backupObject: backupInstrument, crudMode: crudMode.edit } );
        } else {
            this.setState( { object: instrument, backupObject: backupInstrument } );
        }
    };

    restoreBackupObject = () => {
        let object = {
            id: this.state.backupObject.id,
            number: this.state.backupObject.number,
            name: this.state.backupObject.name,
            description: this.state.backupObject.description,
            historySampleTime: this.state.backupObject.historySampleTime,
            isPowered: this.state.backupObject.isPowered,
            pinType: this.state.backupObject.pinType,
            setPoint: this.state.backupObject.setPoint
        };

        this.setState({ object });
    };

    getDefaultScreenBack = () => {
        return constNavigation.insertControlModule.route;
    };
    
    // TO DO
    //();
    //handle changes
    // ( dentro de um ScrollView )

    handleChangeNumber = (text) => {
        let object = this.state.object;
        object.number = text;
        object.id = text;
        this.setState({ object });
    };

    handleChangeDescription = (text) => {
        let object = this.state.object;
        object.description = text;
        this.setState({ object });
    };

    handleChangeIsPowered = (text) => {
        let object = this.state.object;
        object.isPowered = text;
        this.setState({ object });

        console.log(object, this.state.backupObject);
    };
    
    renderBody = () => {
        return(
            <ScrollView>
                <Text style={styles.inputLabel}>
                    Número da porta
                </Text>
                <TextInput 
                    keyboardType={"numeric"}
                    value={this.state.object.number}
                    onChangeText={this.handleChangeNumber}
                    style={styles.input}
                    editable={this.state.crudMode === crudMode.edit}
                    placeholder={"Número da porta do módulo referente ao instrumento"} />

                <Text style={styles.inputLabel}>
                    Descrição
                </Text>
                <TextInput 
                    value={this.state.object.description}
                    onChangeText={this.handleChangeDescription}
                    style={styles.input}
                    editable={this.state.crudMode === crudMode.edit}
                    placeholder={"Insira uma descrição para o instrumento"} />

                <Text style={styles.inputLabel}>
                    Tempo de amostragem (ms)
                </Text>
                <TextInput 
                    keyboardType={"numeric"}
                    value={this.state.object.historySampleTime}
                    onChangeText={this.handleChangeHistorySampleTime}
                    style={styles.input}
                    editable={this.state.crudMode === crudMode.edit}
                    placeholder={"Informe um tempo de amostragem para o histórico"} />

                <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                    <Text style={styles.inputLabel}>
                        Ligado
                    </Text>
                    <Switch 
                        value={this.state.object.isPowered}
                        onValueChange={this.handleChangeIsPowered}
                        disabled={this.state.crudMode !== crudMode.edit}
                        style={{ flex: 1, alignSelf: 'flex-end', marginRight: 20 }} />
                </View>

                <Text style={styles.inputLabel}>
                    Tipo de instrumento
                </Text>
                <View style={styles.dropdown}>
                    <DropdownSelectItems
                        dropdownTitle={"Nenhum tipo selecionado"}
                        modalTitle={"Selecione um tipo"}
                        multipleSelection={false}
                        editable={ this.state.crudMode == crudMode.edit } />
                </View>

                <Text style={styles.inputLabel}>
                    Setpoint
                </Text>
                <TextInput 
                    keyboardType={"numeric"}
                    value={this.state.object.historySampleTime}
                    onChangeText={this.handleChangeHistorySampleTime}
                    style={styles.input}
                    editable={this.state.crudMode === crudMode.edit}
                    placeholder={"Informe um valor de setpoint"} />

                <ConditionDialog />

            </ScrollView>
        );
    };
}

export default InsertInstrumentScreen;
