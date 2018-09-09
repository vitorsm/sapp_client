import React, { Component } from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';
import ObjectScreen from '../crud/ObjectScreen';
import Constants, { constNavigation } from '../../Constants';

const img = require('../../../imgs/card.png');

class RfIdCard extends ObjectScreen {
    constructor(props) {
        super(props);

        this.state = {
            objects: [],
            objectsFilter: [],
            routeInsertScreen: constNavigation.insertRfIdCard.route,
            title: "Cartões RF-ID",

        };
    }

    static navigationOptions = {
        drawerIcon: (
          <Image 
            source={img}
            style={{ height: 24, width: 24}} />
        ),
        title: "Cartões RF-ID"
      };
    
}

export default RfIdCard;