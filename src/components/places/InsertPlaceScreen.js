import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  Keyboard
} from 'react-native';
import NavBar, { buttonView } from '../NavBar';
import Constants, { 
  constNavigation,
  colors,
  saveImg,
  cancelImg,
  editImg
} from '../../Constants';

export const crudMode = {
  view: 1,
  edit: 2
};

class InsertPlaceScreen extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            place: null,
            backupPlace: null,
            crudMode: crudMode.view,
            isKeyboardHide: true,
            showBackButton: true
        };
    }

    componentWillMount() {

        if (this.props.crudMode != undefined) {
            this.setState( { crudMode: this.props.crudMode } );
        }
        let place = this.props.navigation.getParam('place', null);
        
        this.setPlace(place);
    }

    componentDidMount() {
        if (this.keyboardDidShowListener !== undefined)
            this.keyboardDidShowListener.remove();

        if (this.keyboardDidShowListener !== undefined)
            this.keyboardDidHideListener.remove();

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.setState( { isKeyboardHide: false } ));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.setState( { isKeyboardHide: true } ));
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.crudMode !== nextProps.crudMode) {
            this.setState( { crudMode: nextProps.crudMode } );
        } else if (this.props.place !== nextProps.place) {
            this.setPlace(nextProps.place);
        }

    }

    setPlace = (placeReceived) => {
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
            this.setState( { place, backupPlace, crudMode: crudMode.edit } );
        } else {
            this.setState( { place, backupPlace } );
        }
    };

    restoreBackupObject = () => {
        let place = {
            id: this.state.backupPlace.id,
            name: this.state.backupPlace.name,
            description: this.state.backupPlace.description,
            area: this.state.backupPlace.area,
            parentPlace: this.state.backupPlace.parentPlace
        };

        this.setState({ place });
    };

    getScreenBack = () => {
        let navScreenBack = this.props.navigation.getParam('screenBack', null);

        return navScreenBack !== null ? 
            navScreenBack : constNavigation.places.route;
    };

    handleChangeName = (text) => {
        let place = this.state.place;
        place.name = text;
        this.setState( { place } );
    };

    handleChangeDescription = (text) => {
        let place = this.state.place;
        place.description = text;
        this.setState( { place } );
    };

    handleChangeArea = (text) => {
        let place = this.state.place;
        place.area = text;
        this.setState( { place } );
    };

    handleClickEditButton = () => {
        this.setState({ crudMode: crudMode.edit, showBackButton: false });
    };

    handleClickSaveButton = () => {
        this.setPlace(this.state.place);
        this.setState( { crudMode: crudMode.view, showBackButton: true } );
    };

    handleClickCancelButton = () => {
        this.restoreBackupObject();
        this.setState( { crudMode: crudMode.view, showBackButton: true } );
    };

    renderNameHeader = () => {
        if (this.state.crudMode === crudMode.view) {
            return(
            <Text style={styles.textName}>
                { this.state.place.name }
            </Text>
            );
        } else if (this.state.crudMode == crudMode.edit) {
            return(
            <TextInput 
                style={styles.textNameEdit} 
                value={ this.state.place.name }
                onChangeText={this.handleChangeName}
                placeholder={"Insira o nome do local"}
                placeholderTextColor={"white"}
                underlineColorAndroid={"white"} />
            );
        }
    };

    renderId = () => {
        if (this.state.crudMode != crudMode.view) return null;

        return(
            <View style={{ flexDirection: 'row' }}>
            <Text style={ this.state.crudMode == crudMode.view ? styles.textId : styles.textIdEdit }>
                { this.state.place.id }
            </Text>

            {/* separator */}
            <View style={{ 
                backgroundColor: 'white', 
                height: 55, 
                width: 2 }} />
            </View>
        );
    };

    renderHeader = () => {
        return(
            <View style={ styles.header } >
            { this.renderId() }
            { this.renderNameHeader() }
            </View>
        );
    };

    renderViewActions = () => {
        return(
            <View style={styles.actions}>

            <TouchableOpacity 
                style={styles.actionsButton}
                onPress={this.handleClickEditButton}>
                <Image source={editImg} style={styles.imgButtons}/>
            </TouchableOpacity>

            </View>
        );
    };


    renderEditActions = () => {
        return(
            <View style={styles.actions}>

            <TouchableOpacity 
                style={styles.actionsButton} 
                onPress={this.handleClickCancelButton}>
                <Image source={cancelImg} style={styles.imgButtons}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.actionsButton}
                onPress={this.handleClickSaveButton}>
                <Image source={saveImg} style={styles.imgButtons}/>
            </TouchableOpacity>

            </View>
        );
    };

    renderActions = () => {
        if (!this.state.isKeyboardHide) return null;

        if (this.state.crudMode == crudMode.view) {
            return this.renderViewActions();
        } else if (this.state.crudMode == crudMode.edit) {
            return this.renderEditActions();
        }
    };

    renderBody = () => {

        return(
          <View style={styles.body}>
            
            <ScrollView>
              
              <Text style={styles.inputLabel}>Descrição</Text>
              <TextInput 
                placeholder={"Insira uma descrição do local"}
                style={styles.input}
                value={this.state.place.description}
                onChangeText={this.handleChangeDescription}
                editable={this.state.crudMode == crudMode.edit} />
    
              <Text style={styles.inputLabel}>Área</Text>
              <TextInput 
                placeholder={"Insira um valor para área"}
                style={styles.input} 
                value={this.state.place.area}
                onChangeText={this.handleChangeArea}
                editable={this.state.crudMode == crudMode.edit} />
                
                <TouchableOpacity 
                  style={styles.touchButton}
                  onPress={this.handleClickSaveButton}>
                  <Text style={styles.buttons}>Add área filha</Text>
                </TouchableOpacity>
    
            </ScrollView>
    
          </View>
        );
    };

    renderInputs = () => {
        return(
          <View style={{ flex: 1 }}>
            { this.renderHeader() }
            { this.renderBody() }
          </View>
        );
    };

    render() {
    
        return (
          <View style={{ flex: 1 }}>
            
            <NavBar 
              navigation={this.props.navigation}
              menuText={"Cadastrar Local"}
              buttonView={ buttonView.backWithoutFilter }
              screenBack={ this.getScreenBack() }
              showButton={ this.state.showBackButton } />
    
            <View style={styles.container} >
              { this.renderInputs() }
              { this.renderActions() }
            </View>
    
          </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    header: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#00a4d3',
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center'
      // backgroundColor: colors.backgroundMain
    },
    textId: {
      fontSize: 24,
      margin: 20,
      color: 'white'
    },
    textName: {
      fontSize: 24,
      margin: 20,
      color: 'white',
      flex: 1
    },
    textNameEdit: {
      fontSize: 16,
      margin: 2,
      color: 'white',
      flex: 1
    },
    body: {
      flex: 5,
      alignSelf: 'stretch'
    },
    inputLabel: {
      marginLeft: 20,
      marginTop: 20,
      marginBottom: 10
    },
    input: {
      marginLeft: 20,
      marginRight: 40
    },
    actions: {
      flexDirection: 'row',
      margin: 0,
      justifyContent: 'center',
      backgroundColor: '#00a4d3'
    },
    actionsButton: {
      margin: 15
    },
    touchButton: {
      backgroundColor: '#00a4d3',
      margin: 20,
      padding: 20,
      borderRadius: 5,
      alignItems: 'center'
    },
    buttons: {
      color: 'white',
      fontSize: 14
    },
    imgButtons: {
      width: 40,
      height: 40
    }
  });

  
export default InsertPlaceScreen;