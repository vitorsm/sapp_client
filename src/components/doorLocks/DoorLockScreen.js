import React, { Component } from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';
import ObjectScreen from '../crud/ObjectScreen';
import Constants, { constNavigation } from '../../Constants';

const img = require('../../../imgs/door_locks.png');

class DoorLockScreen extends ObjectScreen {
    constructor(props) {
        super(props);

        this.state = {
            title: "Portas",
            routeInsertScreen: constNavigation.insertDoorLock.route,
            objects: [],
            objectsFilter: []
        };
    }


    componentWillMount() {
        let list = [
            {
                id: 10,
                name: "Porta 2",
                description: "porta da sala 1",
                keepOpen: false,
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
                createdBy: null,
                createdAt: null 
            },{
                id: 11,
                name: "Porta 4",
                description: "porat da sala",
                keepOpen: true,
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
                createdBy: null,
                createdAt: null 
            }
        ];

        this.setState( { objects: list, objectsFilter: list } );
    }
    
    static navigationOptions = {
        drawerIcon: (
          <Image 
            source={img}
            style={{ height: 24, width: 24}} />
        ),
        title: "Portas"
    };
}

export default DoorLockScreen;