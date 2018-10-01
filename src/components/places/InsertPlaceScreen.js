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
import DropdownSelectItems from '../selectItems/DropdownSelectItems';

import { connect } from 'react-redux';
import * as actions from "../../actions";
import { request } from '../../actions';

class InsertPlaceScreen extends InsertObjectScreen {
    constructor(props) {
        super(props);
    
        this.state = {
            object: null,
            backupObject: null,
            crudMode: crudMode.view,
            isKeyboardHide: true,
            showBackButton: true,
            objectBack: null,
            places: []
        };
    }

    componentWillMount() {
        super.componentWillMount();

        this.props.fetchDefault(request.fetchPlaces);

        this.setState({ 
            saveRequest: request.sendPlace,
            showProgress: true
         });
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.crudMode !== nextProps.crudMode) {
            this.setState( { crudMode: nextProps.crudMode } );
        }
        if (this.props.place !== nextProps.place) {
            console.log("recebeu place", nextProps.place);
            this.setObject(nextProps.place);
            this.setState({ showProgress: false });
        } 
        if (this.props.places !== nextProps.places) {
            if (nextProps.places.error !== undefined) {
                this.setState({ showProgress: false });
                alert("Erro http: " + nextProps.places.error);
            } else {
                // this.setObject(nextProps.places);
                this.setState({ showProgress: false });
                this.setPlaces(nextProps.places);
            }
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
            place.area = place.area + "";
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

        this.setPlaces(this.state.places, place);
    };

    getDeleteMessage = () => {
        return "Deseja deletar esse local ?";
    };

    deleteObject = (object) => {
        if (this.state.object)
            this.props.fetchDefault(request.deletePlace, { id: this.state.object.id });
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

    setPlaces = (places, object) => {
        let placesList = [];

        if (object === undefined) {
            object = this.state.object;
        }

        if (object === null) {
            placesList = places;
        } else if (places !== null) {
            places.map(p => {
                if (p.id !== object.id) {
                    placesList.push(p);
                }
            });
        }

        this.setState({ places: placesList });
    }
    
    getDefaultScreenBack = () => {
        // let navScreenBack = this.props.navigation.getParam('screenBack', null);
        
        return this.state.objectBack && this.state.objectBack.screenBack ? 
            this.state.objectBack.screenBack : constNavigation.places.route;
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

    handleChangeSelectedItems = (selectedPlaces) => {
        let object = this.state.object;
        if (selectedPlaces === null || selectedPlaces.length === 0) {
            object.parentPlace = null;
        } else {
            object.parentPlace = selectedPlaces[0];
        }

        this.setState({ object });
    }

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
                
                <Text style={styles.inputLabel}>
                    Local pai
                </Text>
                <View style={styles.dropdown}>
                    <DropdownSelectItems
                        dropdownTitle={"Nenhum local pai selecionado"}
                        modalTitle={"Selecione um local pai"}
                        multipleSelection={false}
                        editable={ this.state.crudMode == crudMode.edit }
                        items={this.state.places}
                        selectedItems={this.state.object.parentPlace !== null ? 
                            [this.state.object.parentPlace] : 
                                []
                        }
                        handleChangeSelectedItems={this.handleChangeSelectedItems}
                        />
                </View>

                {/* <TouchableOpacity 
                  style={styles.touchButton}
                  onPress={this.handleClickSaveButton}>
                  <Text style={styles.buttons}>Add área filha</Text>
                </TouchableOpacity> */}
    
            </ScrollView>
        );
    };

}
  
function mapStateToProps({ places, place }) {
    return { places, place };
}

export default connect(mapStateToProps, actions)(InsertPlaceScreen);
