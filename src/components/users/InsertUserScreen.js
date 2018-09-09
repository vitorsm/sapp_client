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

class InsertUserScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      backupUser: null,
      crudMode: crudMode.view,
      isKeyboardHide: true,
      showBackButton: true
    };

  }

  componentWillMount() {

    if (this.props.crudMode != undefined) {
      this.setState( { crudMode: this.props.crudMode } );
    }
    let user = this.props.navigation.getParam('user', null);
    
    this.setUser(user);
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
    } else if (this.props.user !== nextProps.user) {
      this.setUser(nextProps.user);
    }

  }

  setUser = (userReceived) => {
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
      this.setState( { user, backupUser, crudMode: crudMode.edit } );
    } else {
      this.setState( { user, backupUser } );
    }
  };

  restoreBackupObject = () => {
    let user = {
      id: this.state.backupUser.id,
      name: this.state.backupUser.name,
      login: this.state.backupUser.login,
      password: this.state.backupUser.password
    };

    this.setState({ user });
  };

  getScreenBack = () => {
    let navScreenBack = this.props.navigation.getParam('screenBack', null);

    return navScreenBack !== null ? 
      navScreenBack : constNavigation.users.route;
  };

  getObjectScreenBack = () => {
    return null;
  };

  handleChangeName = (text) => {
    let user = this.state.user;
    user.name = text;
    this.setState( { user } );
  };

  handleChangeLogin = (text) => {
    let user = this.state.user;
    user.login = text;
    this.setState( { user } );
  };

  handleChangePassword = (text) => {
    let user = this.state.user;
    user.password = text;
    this.setState( { user } );
  };

  handleClickEditButton = () => {
    this.setState({ crudMode: crudMode.edit, showBackButton: false });
  }

  handleClickSaveButton = () => {
    this.setUser(this.state.user);
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
          { this.state.user.name }
        </Text>
      );
    } else if (this.state.crudMode == crudMode.edit) {
      return(
        <TextInput 
          style={styles.textNameEdit} 
          value={ this.state.user.name }
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
          { this.state.user.id }
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
          
          <Text style={styles.inputLabel}>Login</Text>
          <TextInput 
            placeholder={"Insira o login do usuário"}
            style={styles.input}
            value={this.state.user.login}
            onChangeText={this.handleChangeLogin}
            editable={this.state.crudMode == crudMode.edit} />

          <Text style={styles.inputLabel}>Senha</Text>
          <TextInput 
            placeholder={"Insira uma senha para o usuário"}
            style={styles.input} 
            value={this.state.user.password}
            onChangeText={this.handleChangePassword}
            editable={this.state.crudMode == crudMode.edit} />
            
            <TouchableOpacity 
              style={styles.touchButton}
              onPress={this.handleClickSaveButton}>
              <Text style={styles.buttons}>Vincular cartão RF-ID</Text>
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
          menuText={"Cadastrar Usuário"}
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

export default InsertUserScreen
