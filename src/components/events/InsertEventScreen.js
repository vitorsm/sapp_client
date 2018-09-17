import React, { Component } from 'react';
import { 
    Text,
    View,
    ScrollView,
    TextInput,
    Switch
} from 'react-native';
import Constants, { constNavigation } from '../../Constants';
import InsertObjectScreen, { styles, crudMode } from '../crud/InsertObjectScreen';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DropdownSelectItems from '../selectItems/DropdownSelectItems';
import ConditionItem from '../condition/ConditionItem';

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

class InsertEventScreen extends InsertObjectScreen {
    constructor(props) {
        super(props);

        this.state = {
            crudMode: crudMode.view,
            object: null,
            backupObject: null,
            description: "do evento",
            title: "Cadastro de evento",
            isKeyboardHide: true,
            value: 0,
            objectBack: null
        };
    }

    componentWillMount() {
        super.componentWillMount();
    }

    componentDidMount() {
        super.componentDidMount();
    }

    setObject = (eventReceived) => {
        let event = null;
        let isNull = true;

        if (eventReceived !== undefined && eventReceived !== null) {
            event = eventReceived;
            isNull = false;
        } else {
            event = {
                id: 0,
                name: null,
                description: null,
                groupType: null,
                active: false,
                place: null,
                eventConditions: []
            };
        }

        let eventBackup = {
            id: event.id,
            name: event.name,
            description: event.description,
            groupType: event.groupType,
            active: event.active,
            place: event.place,
            eventConditions: event.eventConditions
        };

        if (isNull) {
            this.setState( { object: event, objectBackup: eventBackup, crudMode: crudMode.edit } );
        } else {
            this.setState( { object: event, objectBackup: eventBackup } );
        }
    };

    restoreBackupObject = () => {
        let event = {
            id: this.state.objectBackup.id,
            name: this.state.object.name,
            description: this.state.description,
            groupType: this.state.groupType,
            active: this.state.active,
            place: this.state.place,
            eventConditions: this.state.eventConditions
        };

        this.setState( { object: event } );
    };

    getDefaultScreenBack = () => {
        return constNavigation.events.route;
    };
    
    setObjectScreenBack = (objectBack) => {
        this.setState({ objectBack });
    }
    
    handleChangeActive = (value) => {
        let object = this.state.object;
        object.active = value;
        this.setState( { object } );
    }

    handleChangeDescription = (text) => {
        let object = this.state.object;
        object.description = text;
        this.setState( { object } );
    };

    renderBody = () => {
        return(
            <ScrollView>
                <Text style={styles.inputLabel}>
                    Descrição
                </Text>
                <TextInput 
                    value={this.state.object.description}
                    onChangeText={this.handleChangeDescription}
                    style={styles.input}
                    editable={this.state.crudMode === crudMode.edit}
                    placeholder={"Insira aqui a descição"} />

                
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

                <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                    <Text style={styles.inputLabel}>
                        Ativo
                    </Text>
                    <Switch 
                        value={this.state.object.active}
                        onValueChange={this.handleChangeActive}
                        disabled={this.state.crudMode !== crudMode.edit}
                        style={{ flex: 1, alignSelf: 'flex-end', marginRight: 20 }} />
                </View>

                <Text style={styles.inputLabel}>
                    Local
                </Text>
                <View style={styles.dropdown}>
                    <DropdownSelectItems
                        dropdownTitle={"Nenhum local selecionado"}
                        modalTitle={"Selecione um local"}
                        multipleSelection={true}
                        editable={ this.state.crudMode == crudMode.edit }
                        textAddButton={ "ADD local" } />
                </View>

            </ScrollView>
        );
    };
}

export default InsertEventScreen;