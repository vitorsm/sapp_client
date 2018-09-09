import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    TextInput
} from 'react-native';
import InsertObjectScreen, { styles, crudMode } from '../crud/InsertObjectScreen';
import Constants, { constNavigation } from '../../Constants';
import DropdownSelectItems from '../selectItems/DropdownSelectItems';

class InsertControlModuleScreen extends InsertObjectScreen {

    constructor(props) {
        super(props);

        this.state = {
            title: "Cadastrar módulo",
            crudMode: crudMode.view,
            object: null,
            backupObject: null,
            description: " do módulo",
            isKeyboardHide: true
        };
    }


    // TO DO
    //handle changes
    //renderBody ( dentro de um ScrollView )

    componentWillMount() {
        super.componentWillMount();
    }

    componentDidMount() {
        super.componentDidMount();
    }

    setObject = (controlModuleReceived) => {
        let controlModule = null;
        let isNull = false;
        if (controlModuleReceived !== undefined && controlModuleReceived !== null) {
            controlModule = controlModuleReceived;
        } else {
            isNull = true;
            controlModule = {
                id: 0,
                name: null,
                description: null,
                place: null,
                login: null,
                password: null
            };
        }

        let controlModuleBackup = {
            id: controlModule.id,
            name: controlModule.name,
            description: controlModule.description,
            place: controlModule.place,
            login: controlModule.login,
            password: controlModule.password
        };


        if (isNull) {
            this.setState( { object: controlModule, backupObject: controlModuleBackup, crudMode: crudMode.edit } );
        } else {
            this.setState( { object: controlModule, backupObject: controlModuleBackup } );
        }
    };

    restoreBackupObject = () => {
        let controlModule = {
            id: this.state.backupObject.id,
            name: this.state.backupObject.name,
            description: this.state.backupObject.description,
            place: this.state.backupObject.place,
            login: this.state.backupObject.login,
            password: this.state.backupObject.password
        };
        this.setState( { object: controlModule } );
    };

    getDefaultScreenBack = () => {
        return constNavigation.controlModules.route;
    };

    getObjectScreenBack = () => {
        return null;
    };
    
    handleChangeDescription = (text) => {
        let object = this.state.object;
        object.description = text;
        this.setState( { object } );
    };

    handleChangeLogin = (text) => {
        let object = this.state.object;
        object.login = text;
        this.setState( { object } );
    };

    handleChangeLogin = (text) => {
        let object = this.state.object;
        object.password = text;
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
                    Login
                </Text>
                <TextInput 
                    value={this.state.object.login}
                    onChangeText={this.handleChangeLogin}
                    style={styles.input}
                    editable={this.state.crudMode === crudMode.edit}
                    placeholder={"Insira aqui o login"} />

                <Text style={styles.inputLabel}>
                    Senha
                </Text>
                <TextInput 
                    value={this.state.object.login}
                    onChangeText={this.handleChangeLogin}
                    style={styles.input}
                    editable={this.state.crudMode === crudMode.edit}
                    placeholder={"Insira aqui a senha"} />
                
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

export default InsertControlModuleScreen;