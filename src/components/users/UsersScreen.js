import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import NavBar, {buttonView} from '../NavBar';
import Constants, { constNavigation, addImg, refreshImg } from '../../Constants';
// import UserListItem from './UserListItem';
import ObjectListItem from '../ObjectListItem';
import FloatActionButton from '../FloatActionButton';


const img = require('../../../imgs/users.png');


class UsersScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      usersFilter: []
    };
  }

  componentWillMount() {
    let users = [
      {
        id: 15,
        name: "Vítor de Sousa Moreira",
        login: "vitorsm",
        password: null
      },{
        id: 16,
        name: "Geraldo Cristino Moreira",
        login: "geraldocm",
        password: null
      },{
        id: 17,
        name: "Erica Silva Sousa",
        login: "ericass",
        password: null
      },
      {
        id: 18,
        name: "Vítor de Sousa Moreira",
        login: "vitorsm",
        password: null
      },{
        id: 19,
        name: "Geraldo Cristino Moreira",
        login: "geraldocm",
        password: null
      },{
        id: 20,
        name: "Erica Silva Sousa",
        login: "ericass",
        password: null
      },
      {
        id: 21,
        name: "Vítor de Sousa Moreira",
        login: "vitorsm",
        password: null
      },{
        id: 22,
        name: "Geraldo Cristino Moreira",
        login: "geraldocm",
        password: null
      },{
        id: 23,
        name: "Erica Silva Sousa",
        login: "ericass",
        password: null
      }
    ];

    this.setState( { users, usersFilter: users } );
  }
  
  componentWillReceiveProps(nextProps) {

    if (nextProps.users !== this.props.users) {
      this.setState( { users: nextProps.users } );
    }

  }

  static navigationOptions = {
    drawerIcon: (
      <Image 
        source={img}
        style={{ height: 24, width: 24}} />
    ),
    title: "Usuários"
  };

  filterUsers = (text) => {
    let list = [];

    if (text === undefined || text === null) {
      this.state.users.map( user => { list.push(user); } );  
    } else {
      this.state.users.filter( user => { 
        return user.name.toUpperCase().includes(text.toUpperCase());
      }).map( user => {
        list.push(user);
      });
    }

    this.setState( { usersFilter: list } );
  };

  navigateToInsertUserScreen = (user) => {
    this.props.navigation.navigate(constNavigation.insertUser.route, { user: user});
  }

  renderListItems = () => {
    if (this.state.usersFilter === null || this.state.usersFilter === undefined) return null;

    return this.state.usersFilter.map( user => {
      return(
        <TouchableOpacity key={user.id} onPress={ () => { this.navigateToInsertUserScreen(user); } } >
          <ObjectListItem object={{
            id: user.id,
            description: user.name,
            name: user.login
          }}/>
        </TouchableOpacity>
      );
    });
  };

  renderList = () => {
    return(
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.list}>
          { this.renderListItems() }
        </ScrollView>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        
        <NavBar 
          navigation={this.props.navigation}
          menuText={"Usuários"}
          buttonView={ buttonView.menu }
          onChangeText={this.filterUsers } />

        
        <View style={{ flex: 1 }}>
          { this.renderList() }

          <View style={styles.viewButton}>
            <FloatActionButton
              source={refreshImg} 
              color={"#00a4d3"}
              onPress= { () => { alert("clicou no refresh"); } } />

            <FloatActionButton
              source={addImg}
              color={"#FA8258"}
              onPress={ () => { this.props.navigation.navigate(constNavigation.insertUser.route, { user: null } ); } } />
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    margin: 10
  },
  viewButton: {
    // flex: 1,
    // alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 10,
    flexDirection: 'row'
  }
});

export default UsersScreen;
