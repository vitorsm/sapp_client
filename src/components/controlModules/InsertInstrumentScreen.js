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

import { connect } from 'react-redux';
import * as actions from "../../actions";
import { request } from '../../actions';

const groupTypes = [
    { 
        value: 0,
        label: "e        ",
        id: 'E'
    },
    {
        value: 1,
        label: "ou",
        id: 'OU'
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
            objectBack: null,
            pinTypes: [],
            instruments: [], // buscar isso
        };
    }

    componentWillMount() {
        super.componentWillMount();

        this.props.fetchDefault(request.fetchPinTypes);
        this.props.fetchDefault(request.fetchInstruments);

        this.setState({ showProgress: true });
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.pinTypes !== this.props.pinTypes) {
            if (nextProps.pinTypes.error !== undefined) {
                this.setState({ showProgress: false });
                alert("Erro http: " + nextProps.pinTypes.error);
            } else {
                this.setState({ 
                    showProgress: false,
                    pinTypes: nextProps.pinTypes
                 });
            }
        }
    }

    setObject = (instrumentReceived) => {
        let instrument = null;
        let isNull = true;

        if (instrumentReceived !== undefined && instrumentReceived !== null) {
            instrument = instrumentReceived;
            isNull = false;

            instrument.number = instrument.number + "";
            
            this.prepareCondition(instrument);

            if (instrument.historySampleTime) {
                instrument.historySampleTime = instrument.historySampleTime + "";
            }

            if (instrument.pidControl) {
                instrument.pidControl.kp = instrument.pidControl.kp + "";
                instrument.pidControl.ki = instrument.pidControl.ki + "";
                instrument.pidControl.kd = instrument.pidControl.kd + "";
            }
        } else {
            instrument = {
                id: 0,
                number: null,
                name: null,
                description: null,
                historySampleTime: null,
                powered: true,
                pinType: null,
                setPoint: null,
                pidControl: {
                    kp: "0",
                    ki: "0",
                    kd: "0",
                    sampleTime: "0",
                    input: null
                },
                powerConditions: null,
                powerConditionsGroupType: groupTypes[0].id
            };
        }
        
        let backupInstrument = {
            id: instrument.id,
            number: instrument.number,
            name: instrument.name,
            description: instrument.description,
            historySampleTime: instrument.historySampleTime,
            powered: instrument.powered,
            pinType: instrument.pinType,
            setPoint: instrument.setPoint,
            pidControl: instrument.pidControl,
            powerConditions: instrument.powerConditions,
            powerConditionsGroupType: instrument.powerConditionsGroupType
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
            powered: this.state.backupObject.powered,
            pinType: this.state.backupObject.pinType,
            setPoint: this.state.backupObject.setPoint,
            pidControl: this.state.backupObject.pidControl,
            powerConditions: this.state.backupObject.powerConditions,
            powerConditionsGroupType: this.state.backupObject.powerConditionsGroupType
        };

        this.setState({ object });
    };

    prepareCondition = (instrument) => {
        if (instrument && instrument.powerConditions && instrument.powerConditions.map) {
            instrument.powerConditions.map((condition, index) => {
                condition.value = index;
            });
        } 
    }

    getDefaultScreenBack = () => {
        return constNavigation.insertControlModule.route;
    };

    getDeleteMessage = () => {
        return "Deseja deletar o instrumento do módulo de controle ?";
    };

    deleteObject = (object) => {
        object.deleted = true;
    };

    getGroupTypeValueById = () => {

        if (this.state.object 
            && this.state.object.powerConditionsGroupType === groupTypes[1].id) {
            return 1;
        } else {
            return 0;
        }

    };

    setObjectsParams = (objParams) => {
        if (objParams) {
            if (objParams.instruments) {
                this.setState({ instruments: objParams.instruments });
            }
        }
    }

    // TO DO
    //();
    //handle changes
    // ( dentro de um ScrollView )

    handleChangeNumber = (text) => {
        let object = this.state.object;
        object.number = text;
        // object.id = text;
        this.setState({ object });
    };

    handleChangeDescription = (text) => {
        let object = this.state.object;
        object.description = text;
        this.setState({ object });
    };

    handleChangePowered = (value) => {
        let object = this.state.object;
        object.powered = value;
        this.setState({ object });
    };

    handleChangeHistorySampleTime = (text) => {
        let object = this.state.object;
        object.historySampleTime = text;
        this.setState({ object });
    }

    handleClickAddCondition = () => {
        let object = this.state.object;

        if (object.powerConditions === null) object.powerConditions = [];

        let condition = {
            id: null,
            input: null,
            valueId: 0,
            operationType: null,
            value: object.conditions.length ? object.conditions.length + 1 : 1
        };

        object.powerConditions.push(condition);
        this.setState({ object });
    };

    handleClickEditCondition = (condition) => {
        let object = this.state.object;

        let conditionSave = null;
        let index = -1;

        object.powerConditions.filter( c => {
            return c.valueId === condition.valueId
        }).map( (c, i) => {
            conditionSave = c;
            index = i;
        });

        if (conditionSave) {
            conditionSave.input = condition.input;
            conditionSave.value = condition.value;
            conditionSave.value = condition.value;
        } else {
            object.conditions.push(condition);
        }
        
        this.setState({ object });
    }
    
    handleClickRemoveCondition = (index) => {
        let object = this.state.object;
        object.powerConditions.splice(index, 1);
        this.setState({ object });
    };

    handleChangeKp = (text) => {
        let object = this.state.object;
        object.pidControl.kp = text;
        this.setState({ object });
    };

    handleChangeKi = (text) => {
        let object = this.state.object;
        object.pidControl.ki = text;
        this.setState({ object });
    };

    handleChangeKd = (text) => {
        let object = this.state.object;
        object.pidControl.kd = text;
        this.setState({ object });
    };

    handleChangePinType = (pinTypeList) => {
        let object = this.state.object;

        if (pinTypeList && pinTypeList.length > 0) {
            object.pinType = pinTypeList[0];
        } else {
            object.pinType = null;
        }

        this.setState({ object });
    }

    handleChangeInput = (inputList) => {
        let object = this.state.object;

        if (inputList && inputList.length > 0) {
            object.pidControl.input = inputList[0];
        } else {
            object.pidControl.input = null;
        }

        this.setState({ object });
    };

    handleChangeSetPoint = (text) => {
        let object = this.state.object;
        object.setPoint = text;
        this.setState({ object });
    }

    handleChangeGroupType = (value) => {
        let object = this.state.object;
        object.conditionsGroupType = groupTypes[value].id;
        this.setState({ object });
        console.log("novo obj", object);
    }

    renderPIDParams = () => {
        if (this.state.object.pinType.id !== 2) return null;

        return(
            <View>
                <Text style={styles.inputLabel}>
                    Parametros PID
                </Text>

                <View style={specifStyles.viewPID}>
                    <Text style={styles.inputLabel}>
                        Kp
                    </Text>
                    <TextInput 
                        keyboardType={"numeric"}
                        value={this.state.object.pidControl.kp}
                        onChangeText={this.handleChangeKp}
                        style={specifStyles.inputNumber}
                        editable={this.state.crudMode === crudMode.edit} />

                    <Text style={styles.inputLabel}>
                        Ki
                    </Text>
                    <TextInput 
                        keyboardType={"numeric"}
                        value={this.state.object.pidControl.ki}
                        onChangeText={this.handleChangeKi}
                        style={specifStyles.inputNumber}
                        editable={this.state.crudMode === crudMode.edit} />

                    <Text style={styles.inputLabel}>
                        Kd
                    </Text>
                    <TextInput 
                        keyboardType={"numeric"}
                        value={this.state.object.pidControl.kd}
                        onChangeText={this.handleChangeKd}
                        style={specifStyles.inputNumber}
                        editable={this.state.crudMode === crudMode.edit} />
                </View>
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
                    onPressRemove={() => this.handleClickRemoveCondition(i)}
                    handleClickEditCondition={this.handleClickEditCondition}
                    inputs={this.state.instruments} />
            );
        });
    };


    renderControlParams = () => {

        if (!this.state.object || !this.state.object.pinType || 
            (this.state.object.pinType.id !== 2 && this.state.object.pinType.id !== 3)) return null;

        return(
            <View>
                <SeparatorGroupCrud isLine={true} text={"Parametros de controle"}/>

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
                        textAddButton={"ADD instrumento"}
                        items={this.state.instruments}
                        selectedItems={this.state.object.pidControl.input ? 
                            [this.state.object.pidControl.input] :
                            []
                        }
                        handleChangeSelectedItems={this.handleChangeInput} />
                </View>

                <Text style={styles.inputLabel}>
                    Setpoint
                </Text>
                <TextInput 
                    keyboardType={"numeric"}
                    value={this.state.object.setPoint}
                    onChangeText={this.handleChangeSetPoint}
                    style={styles.inputNumber}
                    editable={this.state.crudMode === crudMode.edit} />

            </View>
        );
    }

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
                    Tempo de amostragem histórico (ms)
                </Text>
                <TextInput 
                    keyboardType={"numeric"}
                    value={this.state.object.historySampleTime}
                    onChangeText={this.handleChangeHistorySampleTime}
                    style={styles.input}
                    editable={this.state.crudMode === crudMode.edit}
                    placeholder={"Tempo de amostragem para o histórico"} />

                <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                    <Text style={styles.inputLabel}>
                        Ligado
                    </Text>
                    <Switch 
                        value={this.state.object.powered}
                        onValueChange={this.handleChangePowered}
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
                        editable={ this.state.crudMode == crudMode.edit }
                        items={this.state.pinTypes}
                        selectedItems={this.state.object && this.state.object.pinType ?
                            [this.state.object.pinType] :
                            []
                        }
                        handleChangeSelectedItems={this.handleChangePinType} />
                </View>


                { this.renderControlParams() }


                <SeparatorGroupCrud isLine={true} text={"Condição de energia"}/>
                
                <Text style={styles.inputLabel}>
                    Tipo de agrupamento das condições
                </Text>
                <View style={styles.input}>
                    <RadioForm
                        radio_props={groupTypes}
                        initial={this.getGroupTypeValueById()}
                        onPress={(value) => {this.handleChangeGroupType(value)}}
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


function mapStateToProps({ pinTypes }) {
    return { pinTypes };
}

export default connect(mapStateToProps, actions)(InsertInstrumentScreen);