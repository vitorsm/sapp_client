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
import InsertObjectScreen, { crudMode, styles } from '../crud/InsertObjectScreen';

class InsertUserScreen extends InsertObjectScreen {

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

  componentWillReceiveProps(nextProps) {

    if (this.props.crudMode !== nextProps.crudMode) {
      this.setState( { crudMode: nextProps.crudMode } );
    } else if (this.props.user !== nextProps.user) {
      this.setObject(nextProps.user);
    }

  }

  setObject = (userReceived) => {
    let user;
    let isNull = false;
    if (userReceived === null) {
      isNull = true;
      user = {
        id: 0,
        name: null,
        login: null,
        password: null
      };
    } else {
      user = userReceived;
    }
    let backupUser = {
      id: user.id,
      name: user.name,
      login: user.login,
      password: user.password
    };
    if (isNull) {
      this.setState( { object: user, backupObject: backupUser, crudMode: crudMode.edit } );
    } else {
      this.setState( { object: user, backupObject: backupUser } );
    }
  };

  restoreBackupObject = () => {
    let user = {
      id: this.state.backupObject.id,
      name: this.state.backupObject.name,
      login: this.state.backupObject.login,
      password: this.state.backupObject.password
    };

    this.setState({ object: user });
  };

  getScreenBack = () => {
    let navScreenBack = this.props.navigation.getParam('screenBack', null);

    return navScreenBack !== null ? 
      navScreenBack : constNavigation.users.route;
  };

  setObjectScreenBack = (objectBack) => {
    this.setState({ objectBack });
  }
  
  handleChangeName = (text) => {
    let user = this.state.object;
    user.name = text;
    this.setState( { user } );
  };

  handleChangeLogin = (text) => {
    let user = this.state.object;
    user.login = text;
    this.setState( { user } );
  };

  handleChangePassword = (text) => {
    let user = this.state.object;
    user.password = text;
    this.setState( { user } );
  };

  handleClickEditButton = () => {
    this.setState({ crudMode: crudMode.edit, showBackButton: false });
  }

  handleClickSaveButton = () => {
    this.setObject(this.state.object);
    this.setState( { crudMode: crudMode.view, showBackButton: true } );
  }

  handleClickCancelButton = () => {
    this.restoreBackupObject();
    this.setState( { crudMode: crudMode.view, showBackButton: true } );
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
          placeholder={"Insira o nome do usuário"}
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
        <ScrollView>
          
          <Text style={styles.inputLabel}>Login</Text>
          <TextInput 
            placeholder={"Insira o login do usuário"}
            style={styles.input}
            value={this.state.object.login}
            onChangeText={this.handleChangeLogin}
            editable={this.state.crudMode == crudMode.edit} />

          <Text style={styles.inputLabel}>Senha</Text>
          <TextInput 
            placeholder={"Insira uma senha para o usuário"}
            style={styles.input} 
            value={this.state.object.password}
            onChangeText={this.handleChangePassword}
            editable={this.state.crudMode == crudMode.edit} />
            
            <TouchableOpacity 
              style={styles.touchButton}
              onPress={this.handleClickSaveButton}>
              <Text style={styles.buttons}>Vincular cartão RF-ID</Text>
            </TouchableOpacity>

        </ScrollView>
    );
  };

}

export default InsertUserScreen
