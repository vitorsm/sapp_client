import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TextInput
} from 'react-native';
import InsertObjectScreen, { styles, crudMode } from '../crud/InsertObjectScreen';
import Constants, { constNavigation } from '../../Constants';
import DropdownSelectItems from '../selectItems/DropdownSelectItems';


class RfIdCardInsertScreen extends InsertObjectScreen {

    constructor(props) {
        super(props);

        this.state = {
            title: "Cartões RF-ID",
            isKeyboardHide: true,
            object: null,
            backupObject: null,
            crudMode: crudMode.view,
            description: " do cartão"
        };

    }

    // TO DO
    //handle changes

    componentWillMount() {
        super.componentWillMount();
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillReceiveProps(nextProps) {

    }

    setObject = (receivedCard) => {

        let card = null;
        let isNull = true;
        if (receivedCard !== null && receivedCard !== undefined) {
            card = receivedCard;
            isNull = false;
        } else {
            card = {
                id: 0,
                description: null,
                number: null,
                user: null
            };
        }

        let backupCard  = {
            id: card.id,
            description: card.description,
            number: card.nubmer,
            user: card.user
        };

        if (isNull) {
            this.setState( { object: card, backupObject: backupCard, crudMode: crudMode.edit } );
        } else {
            this.setState( { object: card, backupObject: backupCard } );
        }
    };

    restoreBackupObject = () => {
        let card = {
            id: this.state.backupObject.id,
            description: this.state.backupObject.description,
            number: this.state.backupObject.number,
            user: this.state.backupObject.user
        };
        this.setState( { object: card } );
    };

    getDefaultScreenBack = () => {
        return constNavigation.rfIdCards.route;
    };

    handleChangeDescription = (text) => {
        let object = this.state.object;
        object.description = text;
        this.setState( { object } );
    };

    handleChangeNumber = (text) => {
        let object = this.state.object;
        object.nubmer = text;
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
                    Número
                </Text>
                <TextInput 
                    value={this.state.object.number}
                    onChangeText={this.handleChangeNumber}
                    style={styles.input}
                    editable={this.state.crudMode === crudMode.edit}
                    placeholder={"Insira aqui número do cartão"} />
                
                <Text style={styles.inputLabel}>
                    Usuário
                </Text>
                <View style={styles.dropdown}>
                    <DropdownSelectItems
                        dropdownTitle={"Nenhum usuário selecionado"}
                        modalTitle={"Selecione um usuário"}
                        multipleSelection={false}
                        editable={ this.state.crudMode == crudMode.edit } />
                </View>

            </ScrollView>
        );
    }

}


export default RfIdCardInsertScreen;