import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Constants, { constNavigation } from '../../Constants';
import InsertObjectScreen, { crudMode, styles } from '../crud/InsertObjectScreen';

class InsertPlaceScreen extends InsertObjectScreen {
    constructor(props) {
        super(props);
    
        this.state = {
            object: null,
            backupObject: null,
            crudMode: crudMode.view,
            isKeyboardHide: true,
            showBackButton: true,
            objectBack: null
        };
    }

    componentWillMount() {
        super.componentWillMount();
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.crudMode !== nextProps.crudMode) {
            this.setState( { crudMode: nextProps.crudMode } );
        } else if (this.props.place !== nextProps.place) {
            this.setObject(nextProps.place);
        }

    }

    setObject = (placeReceived) => {
        let place;
        let isNull = false;

        if (placeReceived === null) {
            isNull = true;
            place = {
                id: 0,
                name: null,
                description: null,
                area: null,
                parentPlace: null
            };
        } else {
            place = placeReceived;
        }

        let backupPlace = {
            id: place.id,
            name: place.name,
            description: place.description,
            area: place.area,
            parentPlace: place.parentPlace
        };

        if (isNull) {
            this.setState( { object: place, backupObject: backupPlace, crudMode: crudMode.edit } );
        } else {
            this.setState( { object: place, backupObject: backupPlace } );
        }
    };

    restoreBackupObject = () => {
        let place = {
            id: this.state.backupObject.id,
            name: this.state.backupObject.name,
            description: this.state.backupObject.description,
            area: this.state.backupObject.area,
            parentPlace: this.state.backupObject.parentPlace
        };

        this.setState({ place });
    };

    getScreenBack = () => {
        let navScreenBack = this.props.navigation.getParam('screenBack', null);

        return navScreenBack !== null ? 
            navScreenBack : constNavigation.places.route;
    };
    
    setObjectScreenBack = (objectBack) => {
        this.setState({ objectBack });
    }

    handleChangeName = (text) => {
        let place = this.state.object;
        place.name = text;
        this.setState( { place } );
    };

    handleChangeDescription = (text) => {
        let place = this.state.object;
        place.description = text;
        this.setState( { place } );
    };

    handleChangeArea = (text) => {
        let place = this.state.object;
        place.area = text;
        this.setState( { place } );
    };

    handleClickEditButton = () => {
        this.setState({ crudMode: crudMode.edit, showBackButton: false });
    };

    handleClickSaveButton = () => {
        this.setObject(this.state.object);
        this.setState( { crudMode: crudMode.view, showBackButton: true } );
    };

    handleClickCancelButton = () => {
        this.restoreBackupObject();
        this.setState( { crudMode: crudMode.view, showBackButton: true } );
    };


    renderBody = () => {

        return(
            <ScrollView>
              
              <Text style={styles.inputLabel}>Descrição</Text>
              <TextInput 
                placeholder={"Insira uma descrição do local"}
                style={styles.input}
                value={this.state.object.description}
                onChangeText={this.handleChangeDescription}
                editable={this.state.crudMode == crudMode.edit} />
    
              <Text style={styles.inputLabel}>Área</Text>
              <TextInput 
                placeholder={"Insira um valor para área"}
                style={styles.input} 
                value={this.state.object.area}
                onChangeText={this.handleChangeArea}
                editable={this.state.crudMode == crudMode.edit} />
                
                <TouchableOpacity 
                  style={styles.touchButton}
                  onPress={this.handleClickSaveButton}>
                  <Text style={styles.buttons}>Add área filha</Text>
                </TouchableOpacity>
    
            </ScrollView>
        );
    };

}
  
export default InsertPlaceScreen;