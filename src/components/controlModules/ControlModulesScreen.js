import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image
} from 'react-native';
import ObjectScreen from '../crud/ObjectScreen';
import Constants, { constNavigation } from '../../Constants';

const img = require('../../../imgs/control_modules.png');

class ControlModulesScreen extends ObjectScreen {
    constructor(props) {
        super(props);

        this.state = {
            objects: [],
            objectsFilter: [],
            routeInsertScreen: constNavigation.insertControlModule.route,
            title: "Módulos de controle"
        };
    }
    
    componentWillMount() {

        let list = [
            {
                id: 1,
                name: "Modulo 1",
                description: "controlModule.description",
                place: {
                    id: 2,
                    name: "Sala 2",
                    description: "Sala de TV",
                    area: 45,
                    parentPlace: {
                      id: 1,
                      name: "Apartamento 302",
                      description: "Sala de TV",
                      area: 45,
                      parentPlace: null
                    }
                },
                login: 'login1',
                password: 'senha1'
            }, {
                id: 2,
                name: "Modulo 2",
                description: "controlModule.description",
                place: { 
                    id: 1,
                    name: "Apartamento 302",
                    description: "Sala de TV",
                    area: 45,
                    parentPlace: null
                },
                login: "login2",
                password: "senha2"
            }, {
                id: 3,
                name: "Modulo 3",
                description: "controlModule.description",
                place: { 
                    id: 2,
                    name: "Sala 2",
                    description: "Sala de TV",
                    area: 45,
                    parentPlace: {
                      id: 1,
                      name: "Apartamento 302",
                      description: "Sala de TV",
                      area: 45,
                      parentPlace: null
                    }
                },
                login: "login3",
                password: "senha3"
            }
        ];

        this.setState( { objects: list,  objectsFilter: list } );
    }

    static navigationOptions = {
        drawerIcon: (
          <Image 
            source={img}
            style={{ height: 24, width: 24}} />
        ),
        title: "Módulos de controle"
    };

}

export default ControlModulesScreen;