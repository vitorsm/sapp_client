import React, { Component } from 'react';
import {
    Text,
    InputText,
    ScrollView,
    View
} from 'react-native';
import InsertObjectScreen, { crudMode } from '../crud/InsertObjectScreen';
import Constants, { constNavigation } from '../../Constants';

class InsertInstrumentScreen extends InsertObjectScreen {
    constructor(props) {
        super(props);
        this.state = {
            crudMode: crudMode.view,
            object: null,
            backupObject: null,
            description: " do instrumento",
            title: "Cadastro de instrumento",
            isKeyboardHide: true
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
                number: 0,
                name: null,
                description: null,
                historySampleTime: null,
                isPowered: true,
                pinType: null,
                setPoint: 0.0
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
        let backupObject = {
            id: this.state.backupObject.id,
            number: this.state.backupObject.number,
            name: this.state.backupObject.name,
            description: this.state.backupObject.description,
            historySampleTime: this.state.backupObject.historySampleTime,
            isPowered: this.state.backupObject.isPowered,
            pinType: this.state.backupObject.pinType,
            setPoint: this.state.backupObject.setPoint
        };

        this.setState({ backupObject });
    };

    getDefaultScreenBack = () => {
        return constNavigation.insertControlModule.route;
    };

    getObjectScreenBack = () => {
        return null;
    };

    // TO DO
    //();
    //handle changes
    //renderBody ( dentro de um ScrollView )
    //super.componentDidMount
}

export default InsertInstrumentScreen;
