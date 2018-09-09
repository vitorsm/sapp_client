import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    Switch,
    StyleSheet
} from 'react-native';
import InsertObjectScreen, { crudMode, styles } from '../crud/InsertObjectScreen';
import Constants, { constNavigation } from '../../Constants';
import SelectItems from '../selectItems/SelectItems';
import DropdownSelectItems from '../selectItems/DropdownSelectItems';


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
        super.componentWillMount();
        if (this.props.doorLock !== undefined)
            this.setObject(this.props.doorLock);
    }

    

    setObject = (doorLockReceived) => {
        let doorLock;
        let isNull = false;
        if (doorLockReceived === undefined || doorLockReceived === null) {
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

    handleChangeDescription = (text) => {
        let object = this.state.object;
        object.description = text;
        this.setState( { object } );
    };

    handleChangeKeepOpen = (value) => {
        let object = this.state.object;
        object.keepOpen = value;
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
                
                <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                    <Text style={styles.inputLabel}>
                        Manter aberta
                    </Text>
                    <Switch 
                        value={this.state.object.keepOpen}
                        onValueChange={this.handleChangeKeepOpen}
                        disabled={this.state.crudMode !== crudMode.edit}
                        style={{ flex: 1, alignSelf: 'flex-end', marginRight: 20 }} />
                </View>
                
                {/* <SelectItems visible={true} multipleSelection={false}/> */}
                
                <Text style={styles.inputLabel}>
                    Local
                </Text>
                <View style={styles.dropdown}>
                    <DropdownSelectItems
                        dropdownTitle={"Nenhum local selecionado"}
                        modalTitle={"Selecione um local"}
                        multipleSelection={false}
                        editable={ this.state.crudMode == crudMode.edit } />
                </View>
                

                {/* keepOpen: doorLock.keepOpen,
                place: doorLock.place,
                createdBy: doorLock.createdBy,
                createdAt: doorLock.createdAt */}
            </ScrollView>
        );
    }

    // TO DO
    //handle changes
}

export default DoorLockInsertScreen;