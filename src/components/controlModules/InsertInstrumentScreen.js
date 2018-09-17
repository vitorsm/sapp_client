import React, { Component } from 'react';
import {
    Text,
    InputText,
    ScrollView,
    View,
    TextInput,
    Switch,
    StyleSheet
} from 'react-native';
import InsertObjectScreen, { crudMode, styles } from '../crud/InsertObjectScreen';
import Constants, { constNavigation } from '../../Constants';
import DropdownSelectItems from '../selectItems/DropdownSelectItems';
// import ConditionDialog from './ConditionDialog';
import ConditionItem from '../condition/ConditionItem';
import SeparatorGroupCrud from '../SeparatorGroupCrud';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import TextButton from '../TextButton';

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
                setPoint: null,
                pidControl: null,
                powerConditions: null
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
            setPoint: instrument.setPoint,
            pidControl: instrument.pidControl,
            powerConditions: instrument.powerConditions
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
            setPoint: this.state.backupObject.setPoint,
            pidControl: this.state.backupObject.pidControl,
            powerConditions: this.state.backupObject.powerConditions
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
    };

    handleClickAddCondition = () => {
        let object = this.state.object;

        if (object.powerConditions === null) object.powerConditions = [];

        let condition = {
            id: null,
            input: null,
            value: 0,
            operationType: null
        };

        object.powerConditions.push(condition);
        this.setState({ object });
    };
    
    handleClickRemoveCondition = (index) => {
        let object = this.state.object;
        object.powerConditions.splice(index, 1);
        this.setState({ object });
    };

    renderPIDParams = () => {
        return(
            <View style={specifStyles.viewPID}>
                <Text style={styles.inputLabel}>
                    Kp
                </Text>
                <TextInput 
                    keyboardType={"numeric"}
                    value={this.state.object.historySampleTime}
                    onChangeText={this.handleChangeHistorySampleTime}
                    style={specifStyles.inputNumber}
                    editable={this.state.crudMode === crudMode.edit} />

                <Text style={styles.inputLabel}>
                    Ki
                </Text>
                <TextInput 
                    keyboardType={"numeric"}
                    value={this.state.object.historySampleTime}
                    onChangeText={this.handleChangeHistorySampleTime}
                    style={specifStyles.inputNumber}
                    editable={this.state.crudMode === crudMode.edit} />

                <Text style={styles.inputLabel}>
                    Kd
                </Text>
                <TextInput 
                    keyboardType={"numeric"}
                    value={this.state.object.historySampleTime}
                    onChangeText={this.handleChangeHistorySampleTime}
                    style={specifStyles.inputNumber}
                    editable={this.state.crudMode === crudMode.edit} />
            </View>
        );
    };

    renderConditions = () => {
        let conditions = this.state.object.powerConditions;

        if (conditions === null || conditions.length === 0) {
            return(
                <View style={{ alignItems: "center" }}><Text>Nenhuma condição cadastrada.</Text></View>
            );
        }

        return conditions.map((condition, i) => {
            return(
                <ConditionItem
                    key={i}
                    title={"Condição " + (i + 1)}
                    editable={this.state.crudMode === crudMode.edit}
                    condition={condition}
                    onPressRemove={() => this.handleClickRemoveCondition(i)} />
            );
        });
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
                    style={styles.inputNumber}
                    editable={this.state.crudMode === crudMode.edit} />

                <SeparatorGroupCrud isLine={true} text={"Parametros de controle"}/>

                <Text style={styles.inputLabel}>
                    Parametros PID
                </Text>
                { this.renderPIDParams() }

                <Text style={styles.inputLabel}>
                    Entrada do controle
                </Text>
                <View style={styles.dropdown}>
                    <DropdownSelectItems
                        dropdownTitle={"Nenhum instrumento selecionado"}
                        modalTitle={"Selecione um instrumento"}
                        multipleSelection={false}
                        editable={ this.state.crudMode == crudMode.edit }
                        textAddButton={"ADD instrumento"} />
                </View>

                <SeparatorGroupCrud isLine={true} text={"Condição de energia"}/>
                
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

                <View style={{ marginTop: 20 }}>
                    { this.renderConditions() }
                </View>

                <View style={{ alignItems: "center" }}>
                    <View style={{ marginTop: 20, width: "50%" }}>
                        <TextButton 
                            text={"Add condição"}
                            onPress={this.handleClickAddCondition} />
                    </View>
                </View>
                
            </ScrollView>

        );
    };
}

const specifStyles = StyleSheet.create({
    viewPID: {
        flexDirection: 'row'
    },
    inputNumber: {
        width: "20%"
    },
    message: {

    }
});

export default InsertInstrumentScreen;
