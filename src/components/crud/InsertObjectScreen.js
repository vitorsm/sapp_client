import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Keyboard,
    Alert,
    ActivityIndicator
} from 'react-native';
import NavBar, { buttonView } from '../NavBar';
import Constants, { 
    constNavigation,
    colors,
    saveImg,
    cancelImg,
    editImg,
    deleteImg
} from '../../Constants';

export const crudMode = {
    view: 1,
    edit: 2
};

class InsertObjectScreen extends Component {
    constructor(props) {
        super(props);
    }

    // TO DO
    //setObject();
    //restoreBackupObject();
    //getDefaultScreenBack();
    //handle changes
    //this.state.crudMode
    //this.state.object ( deve conter id e name )
    //this.state.backupObject ( deve conter id e name )
    //this.state.description ( do q se trata a classe. ex.: "do usuário")
    //renderBody ( dentro de um ScrollView )
    //this.state.title
    //this.state.isKeyboardHide
    //super.componentDidMount
    //super.componentWillMount
    //setObjectScreenBack(){ objParent, objEdit, objReturn, value, isEditing }
    //if objEdit !== null then setObject(objEdit) else setObject(objParent)
    //setObjectReturn();{ objParent, objEdit, objReturn, value, isEditing } pega o objReturn e trabalha 
    //o value é pra saber oq ta sendo retornado
    //this.state.sendObject => this.props.sendAlgumaCoisa
    //getDeleteMessage()
    
    componentWillMount() {
      if (this.props.crudMode != undefined) {
        this.setState( { crudMode: this.props.crudMode } );
      }

      // let object = this.props.navigation.getParam('object', null);
      // this.setObject(object);

      let objectBack = this.props.navigation.getParam('object', null);
      // this.setObjectScreenBack(objectBack);

      if (objectBack !== null) {
        let setCrudModeEditing = false;

        if (objectBack.objReturn !== undefined) {
          if (this.setObjectReturn !== undefined) {
            this.setObjectReturn(objectBack.objReturn, objectBack.value, objectBack.objParent);
          }
          setCrudModeEditing = true;
          // verificando se tem objectEdit, se tiver é ele q tem q setar
        } else if (objectBack.objEdit !== undefined) {
          this.setObject(objectBack.objEdit);
        } else {
          this.setObject(objectBack.objParent);
        }
        if (setCrudModeEditing || objectBack.isEditing) {
          this.setState({ crudMode: crudMode.edit });
        }
      } else {
        // o setObject cria uma instancia no caso de o objeto ser nulo
        // o objeto pode ser nulo se for inserir ao inves de editar objeto
        this.setObject(null);
      }

      // if (objectBack !== null) {
      //   if (objectBack.edit) {
      //     if (this.setObjectReturn === undefined) {
      //       this.setObject(objectBack.objectReturn);
      //     } else {
      //       this.setObjectReturn(objectBack);
      //     }
      //   } else {
      //     this.setObject(objectBack.objectEditing);
      //   }
      // }

      this.setState( { objectBack: objectBack } );
    }

    componentDidMount() {
      if (this.keyboardDidShowListener !== undefined)
        this.keyboardDidShowListener.remove();
  
      if (this.keyboardDidShowListener !== undefined)
        this.keyboardDidHideListener.remove();
  
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.setState( { isKeyboardHide: false } ));
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.setState( { isKeyboardHide: true } ));
    }

    getScreenBack = () => {
        let navScreenBack = this.props.navigation.getParam('screenBack', null);
    
        return navScreenBack !== null ? 
          navScreenBack : this.getDefaultScreenBack();
    };

    handleChangeName = (text) => {
        let object = this.state.object;
        object.name = text;
        this.setState( { object } );
    };

    handleClickSaveButton = () => {
      this.state.sendObject(this.state.object);
      this.setState( { crudMode: crudMode.view, showBackButton: true } );
    }
  
    handleClickDeleteButton = () => {

      Alert.alert(
        'Deletar',
        this.getDeleteMessage(),
        [
          {text: 'Não', onPress: () => { }, style: 'cancel'},
          {text: 'Sim', onPress: () => {
            this.props.deleteUser(this.state.object);
            this.props.navigation.navigate(this.getDefaultScreenBack());
          }},
        ],
        { cancelable: false }
      );

    }

    handleClickEditButton = () => {
        this.setState({ crudMode: crudMode.edit, showBackButton: false });
    }

    handleClickCancelButton = () => {
        this.restoreBackupObject();
        this.setState( { crudMode: crudMode.view, showBackButton: true } );
    }

    handlePressBack = () => {
      if (this.state.crudMode === crudMode.edit) {
        this.restoreBackupObject();
      }
    }

    renderNameHeader = () => {
        if (this.state.crudMode === crudMode.view) {
          return(
            <Text style={styles.textName}>
              { this.state.object.name }
            </Text>
          );
        } else if (this.state.crudMode == crudMode.edit) {
          return(
            <TextInput 
              style={styles.textNameEdit} 
              value={ this.state.object.name }
              onChangeText={this.handleChangeName}
              placeholder={"Insira o nome " + this.state.description }
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
              { this.state.object.id }
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
              onPress={this.handleClickDeleteButton}>
              <Image source={deleteImg} style={styles.imgButtons}/>
            </TouchableOpacity>

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

    _renderBody = () => {
        if (this.state.showProgress) {
          return(
            <ActivityIndicator size="large" />
          );
        }

        return(
          <View style={styles.body}>
            
            { this.renderBody() }
    
          </View>
        );
    };

    renderInputs = () => {
        return(
          <View style={{ flex: 1 }}>
            { this.renderHeader() }
            { this._renderBody() }
          </View>
        );
    };

    render() {
    
        return (
          <View style={{ flex: 1 }}>
            
            <NavBar 
              navigation={this.props.navigation}
              menuText={this.state.title}
              buttonView={buttonView.backWithoutFilter}
              screenBack={this.getScreenBack()}
              showButton={true}
              objectScreenBack={this.state.objectBack}
              objectBackupReturn={this.state.backupObject}
              onPressBack={this.handlePressBack} />
    
            <View style={styles.container} >
              { this.renderInputs() }
              { this.renderActions() }
            </View>
    
          </View>
        );
    }

}

export const styles = StyleSheet.create({
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
    alignSelf: 'stretch',
    marginBottom: 20
  },
  inputLabel: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start'
  },
  input: {
    marginLeft: 20,
    marginRight: 40,
  },
  inputNumber: {
    width: "20%",
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
  },
  dropdown: {
    marginLeft: 20,
    marginRight: 40
  }
});

export default InsertObjectScreen;