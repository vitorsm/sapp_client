import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    Image
} from 'react-native';
import Constants, { constNavigation } from '../../Constants';
import ObjectScreen from '../crud/ObjectScreen';

const img = require('../../../imgs/places.png');
class PlacesScreen extends ObjectScreen {
    constructor(props) {
        super(props);

        this.state = {
            objects: [],
            objectsFilter: [],
            routeInsertScreen: constNavigation.insertPlace.route,
            title: "Locais"
        };
    }

    componentWillMount() {
        let objects = [
            {
                id: 1,
                name: "Apartamento 302",
                description: "Meu barraco",
                area: "56",
                parentPlace: null
            },
            {
                id: 2,
                name: "Sala de TV",
                description: "Sala onde fica a TV do barraco",
                area: "12",
                parentPlace: {
                    id: 1,
                    name: "Apartamento 302",
                    description: "Meu barraco",
                    area: "56",
                    parentPlace: null
                }
            },

        ];

        this.setState({ objects, objectsFilter: objects });
    }

    static navigationOptions = {
        drawerIcon: (
          <Image 
            source={img}
            style={{ height: 24, width: 24}} />
        ),
        title: "Locais"
    };
}

export default PlacesScreen;