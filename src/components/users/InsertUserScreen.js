import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import NavBar, { buttonView } from '../NavBar';
import Constants, { constNavigation } from '../../Constants';
import InsertObjectScreen, { crudMode, styles } from '../crud/InsertObjectScreen';
import { connect } from 'react-redux';
import * as actions from "../../actions";
import { request } from '../../actions';
import DropdownSelectItems from '../selectItems/DropdownSelectItems';

class InsertUserScreen extends InsertObjectScreen {

  constructor(props) {
    super(props);

    this.state = {
      object: null,
      backupObject: null,
      crudMode: crudMode.view,
      isKeyboardHide: true,
      showBackButton: true,
      objectBack: null,
      showProgress: false,
      description: "do usuário",
      title: "Usuário",
      permissions: [],
      showProgress: false
    };

  }

  componentWillMount() {
    super.componentWillMount();
    this.props.fetchDefault(request.fetchPermissions);
    // this.props.fetchPermissions();
    // this.setState({ sendObject: this.props.sendUser, showProgress: true });
    this.setState({ saveRequest: request.sendUser, showProgress: true });
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.crudMode !== nextProps.crudMode) {
      this.setState( { crudMode: nextProps.crudMode } );
    } 
    if (this.props.users !== nextProps.users) {
      if (nextProps.users.error !== undefined) {
        this.setState({ showProgress: false });
        alert("Erro http: " + nextProps.users.error);
      } else {
        this.setObject(nextProps.users);
      }
    } else if (this.props.permissions !== nextProps.permissions) {
      this.setState({ permissions: nextProps.permissions, showProgress: false });
    }
  }

  setObject = (userReceived) => {
    let user;
    let isNull = false;
    if (userReceived === undefined || userReceived === null || userReceived.createdAt === undefined) {
      isNull = true;
      user = {
        id: 0,
        name: null,
        login: null,
        password: null,
        permissions: []
      };
    } else {
      user = userReceived;
      if (user.permissions === null || user.permissions === undefined)
        user.permissions = [];
    }
    let backupUser = {
      id: user.id,
      name: user.name,
      login: user.login,
      password: user.password,
      createdAt: user.createdAt,
      modifiedAt: user.modifiedAt,
      permissions: user.permissions
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
      password: this.state.backupObject.password,
      createdAt: this.state.backupObject.createdAt,
      modifiedAt: this.state.backupObject.modifiedAt,
      permissions: this.state.backupObject.permissions
    };

    this.setState({ object: user });
  };

  getDeleteMessage = () => {
    return "Deseja realmente deletar o usuário?";
  };

  deleteObject = (object) => {
    if (this.state.object)
      this.props.fetchDefault(request.deleteUser, {id: this.state.object.id});
  };

  getDefaultScreenBack = () => {
    return constNavigation.users.route;
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

  handleChangePermissions = (permissions) => {
    let user = this.state.object;
    user.permissions = permissions !== undefined && permissions !== null ? permissions : [];
    this.setState( { user } );
  }

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
            
            <View style={styles.dropdown}>
                <DropdownSelectItems
                    dropdownTitle={"Nenhuma permissão selecionado"}
                    modalTitle={"Selecione uma permissão"}
                    multipleSelection={true}
                    editable={this.state.crudMode == crudMode.edit}
                    items={this.state.permissions}
                    selectedItems={this.state.object.permissions}
                    handleChangeSelectedItems={this.handleChangePermissions} />
            </View>
                
            <TouchableOpacity 
              style={styles.touchButton}
              onPress={this.handleClickSaveButton}>
              <Text style={styles.buttons}>Vincular cartão RF-ID</Text>
            </TouchableOpacity>

        </ScrollView>
    );
  };

}

// export default InsertUserScreen

function mapStateToProps({ users, permissions }) {
  return { users, permissions };
}

export default connect(mapStateToProps, actions)(InsertUserScreen);
