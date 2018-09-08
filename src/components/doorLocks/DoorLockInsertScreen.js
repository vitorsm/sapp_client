import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text
} from 'react-native';
import InsertObjectScreen, { crudMode } from '../crud/InsertObjectScreen';
import Constants, { constNavigation } from '../../Constants';

class DoorLockInsertScreen extends InsertObjectScreen {
    constructor(props) {
        super(props);

        this.state = {
            crudMode: crudMode.view,
            object: null,
            backupObject: null,
            description: " da porta",
            title: "Cadastrar porta",
            isKeyboardHide: true
        };
    }

    componentWillMount() {

        let doorLock = {
            id: 10,
            name: "Porta 2",
            description: null,
            keepOpen: null,
            place: null,
            createdBy: null,
            createdAt: null 
        };

        this.setObject(doorLock);
    }

    setObject = (doorLockReceived) => {
        let doorLock;
        let isNull = false;
        if (doorLockReceived === null) {
          isNull = true;
          doorLock = {
            id: 0,
            name: null,
            description: null,
            keepOpen: null,
            place: null,
            createdBy: null,
            createdAt: null
          };
        } else {
            doorLock = doorLockReceived;
        }
        let backupDoorLock = {
          id: doorLock.id,
          name: doorLock.name,
          description: doorLock.description,
          keepOpen: doorLock.keepOpen,
          place: doorLock.place,
          createdBy: doorLock.createdBy,
          createdAt: doorLock.createdAt
        };
        if (isNull) {
          this.setState( { object: doorLock, backupObject: backupDoorLock, crudMode: crudMode.edit } );
        } else {
          this.setState( { object: doorLock, backupObject: backupDoorLock } );
        }
    };

    restoreBackupObject = () => {
        let doorLock = {
          id: this.state.backupObject.id,
          name: this.state.backupObject.name,
          description: this.state.backupObject.description,
          keepOpen: this.state.backupObject.keepOpen,
          place: this.state.backupObject.place,
          createdBy: this.state.backupObject.createdBy,
          createdAt: this.state.backupObject.createdAt
        };
    
        this.setState({ object: doorLock });
    };

    getDefaultScreenBack = () => {
        return constNavigation.doorLocks.route;
    };

    renderBody = () => {
        return(
            <ScrollView>
                <Text>Teste</Text>
            </ScrollView>
        );
    }

    // TO DO
    //handle changes
}

export default DoorLockInsertScreen;