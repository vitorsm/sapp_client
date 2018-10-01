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

import { connect } from 'react-redux';
import * as actions from "../../actions";
import { request } from '../../actions';

class InsertControlModuleScreen extends InsertObjectScreen {

    constructor(props) {
        super(props);

        this.state = {
            title: "Cadastrar módulo",
            crudMode: crudMode.view,
            object: null,
            selectedPlaces: [],
            backupObject: null,
            description: " do módulo",
            isKeyboardHide: true,
            objectBack: null,
            places: []
        };
    }


    // TO DO
    //handle changes
    //renderBody ( dentro de um ScrollView )

    componentWillMount() {
        super.componentWillMount();
        //fetch no que é necessario
        // this.setState({ sendObject: this.props.sendControlModule, showProgress: false });
        this.props.fetchDefault(request.fetchPlaces);
        this.setState({ 
            sendSave: request.sendControlModule,
            showProgress: false
        });
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.places !== this.props.places) {
            if (nextProps.places.error !== undefined) {
                this.setState({ showProgress: false });
                alert("Erro http: " + nextProps.places.error);
            } else {
                this.setState({ 
                    places: nextProps.places,
                    showProgress: false
                });
            }
        }

    }

    setObject = (controlModuleReceived) => {
        let controlModule = null;
        let isNull = false;

        console.log(controlModuleReceived);

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
                instruments: []
                // instruments: [{ id: 1, name: "teste" },{ id: 2, name: "teste2"}]
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
        if (!this.state.backupObject) return;
        
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
        
        console.log(objReturn, value, objParent);
        
        if (value === "instrument" && objParent) {
            let object = objParent;
            
            if (object.instruments === null) object.instruments = [];
            
            if (objReturn && objReturn.id > 0) {
                let found = false;
                let index = -1;

                object.instruments.filter( instrument => {
                    return instrument.id === objReturn.id
                }).map( (instrument, i) => {
                    found = true;
                    instrument = objReturn;
                    index = i;
                });
    
                if (!found) {
                    object.instruments.push(objReturn);
                } else if (objReturn.deleted) {
                    object.instruments.splice(index, 1);
                }
            }

            this.setState({ object });

        } else if (value === "place" && objParent) {
            let object = objParent;

            object.place = objReturn;

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

    handleClickAddPlace = () => {
        let objectBack = {
            objEdit: null,
            objParent: this.state.object,
            value: "place",
            screenBack: constNavigation.insertControlModule.route
        };
        
        this.props.navigation.navigate(constNavigation.insertPlace.route, { object: objectBack });        
    }

    handleClickAddInstrument = () => {
        let objectBack = {
            objEdit: null,
            objParent: this.state.object,
            value: "instrument",
            screenBack: constNavigation.insertControlModule.route
        };
        
        this.props.navigation.navigate(constNavigation.insertInstrumentScreen.route, { object: objectBack });
    };

    handleChangeSelectedItems = (places) => {
        let object = this.state.object;

        if (places && places.length > 0) {
            object.place = places[0];
        } else {
            object.place = null;
        }

        this.setState({ object });
    }

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
                        multipleSelection={false}
                        editable={ this.state.crudMode == crudMode.edit }
                        textAddButton={ "ADD local" }
                        items={this.state.places}
                        selectedItems={this.state.object && this.state.object.place ? 
                            [this.state.object.place] :
                            []
                        }
                        handleChangeSelectedItems={this.handleChangeSelectedItems}
                        addButtonOnPress={this.handleClickAddPlace} />
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

function mapStateToProps({ controlModules, places }) {
    return { controlModules, places };
}

export default connect(mapStateToProps, actions)(InsertControlModuleScreen);