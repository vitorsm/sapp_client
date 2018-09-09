import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import NavBar from '../NavBar'
import ObjectScreen from '../crud/ObjectScreen';
import Contants, { constNavigation } from '../../Constants'

const img = require('../../../imgs/events.png');


class EventsScreen extends ObjectScreen {
  constructor(props) {
    super(props);

    this.state = {
      objects: [],
      objectsFilter: [],
      routeInsertScreen: constNavigation.insertEvent.route,
      title: "Eventos"
    };
  }

  componentWillMount = () => {
    let events = [
      {
        id: 1,
        name: "Abriu a porta",
        description: "Evento ativo quando a porta abre",
        groupType: { value: 1 },
        active: true,
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
        }
      }  
    ];

    this.setState( { objects: events, objectsFilter: events } );
  }

  static navigationOptions = {
    drawerIcon: (
      <Image 
        source={img}
        style={{ height: 24, width: 24}} />
    ),
    title: "Eventos"
};

}

export default EventsScreen;
