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
import DropdownSelectItemsScreen from '../selectItems/DropdownSelectItemsScreen';

class InsertControlModuleScreen extends InsertObjectScreen {

    constructor(props) {
        super(props);

        this.state = {
            title: "Cadastrar módulo",
            crudMode: crudMode.view,
            object: null,
            backupObject: null,
            description: " do módulo",
            isKeyboardHide: true,
            objectBack: null
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
                password: null,
                // instruments: []
                instruments: [{ id: 1, name: "teste" },{ id: 2, name: "teste2"}]
            };
        }

        let controlModuleBackup = {
            id: controlModule.id,
            name: controlModule.name,
            description: controlModule.description,
            place: controlModule.place,
            login: controlModule.login,
            password: controlModule.password,
            instruments: controlModule.instruments
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

    setObjectScreenBack = (objectBack) => {
        this.setState({ objectBack });
    }
    
    setObjectReturn = (objReturn, value, objParent) => {
        
        console.log("a calsse recebeu", objReturn);

        if (value === "instrument") {
            let object = objParent;

            if (object.instruments === null) object.instruments = [];
            
            let found = false;

            object.instruments.filter( instrument => {
                return instrument.id === objReturn.id
            }).map( instrument => {
                found = true;
                instrument = objReturn
            });

            if (!found) {
                object.instruments.push(objReturn);
            }

            this.setState({ object });
        }
    }

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

    handleChangePassword = (text) => {
        let object = this.state.object;
        object.password = text;
        this.setState( { object } );
    };

    handleClickInstrumentItem = (instrument) => {
        let objectBack = {
            objEdit: instrument,
            objParent: this.state.object,
            value: "instrument"
        };
        
        this.props.navigation.navigate(constNavigation.insertInstrumentScreen.route, { object: objectBack });
    };

    handleClickAddInstrument = () => {
        let objectBack = {
            objEdit: null,
            objParent: this.state.object,
            value: "instrument"
        };
        
        this.props.navigation.navigate(constNavigation.insertInstrumentScreen.route, { object: objectBack });        
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
                    value={this.state.object.password}
                    onChangeText={this.handleChangePassword}
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

                <Text style={styles.inputLabel}>
                    Instrumentos
                </Text>
                {/* <View style={[styles.dropdown, { marginBottom: 20 }]}> */}
                <View style={styles.dropdown}>
                    <DropdownSelectItemsScreen
                        items={this.state.object.instruments}
                        dropdownTitle={"Nenhum local selecionado"}
                        modalTitle={"Selecione um local"}
                        multipleSelection={true}
                        editable={ this.state.crudMode == crudMode.edit }
                        textAddButton={ "ADD instrumento" }
                        onPressItem={this.handleClickInstrumentItem}
                        addButtonOnPress={this.handleClickAddInstrument} />
                </View>
            </ScrollView>
        );
    };
} 

export default InsertControlModuleScreen;