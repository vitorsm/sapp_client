import React, { Component } from 'react';
import { 
    Text,
    View,
    Image
} from 'react-native';
import ObjectScreen from '../crud/ObjectScreen';
import Constants, { constNavigation } from '../../Constants';

const img = require('../../../imgs/users.png');

class UsersScreen extends ObjectScreen {
    constructor(props) {
        super(props);

        this.state = {
            objects: [],
            objectsFilter: [],
            routeInsertScreen: constNavigation.insertUser.route,
            title: "Usuários"
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
    
        this.setState( { objects: users, objectsFilter: users } );
    }

    static navigationOptions = {
        drawerIcon: (
          <Image 
            source={img}
            style={{ height: 24, width: 24}} />
        ),
        title: "Usuários"
    };
}

export default UsersScreen;