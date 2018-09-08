import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
import ObjectScreen from '../crud/ObjectScreen';

const img = require('../../../imgs/door_locks.png');

class DoorLockScreen extends ObjectScreen {
    constructor(props) {
        super(props);

        this.state = {
            
        };

    }

    // TO DO
    // this.state.objects ( deve ter name e id )
    // this.state.objectsFilter ( copia objects )
    // this.state.routeInsertScreen;
    // this.state.title
    static navigationOptions = {
        drawerIcon: (
          <Image 
            source={img}
            style={{ height: 24, width: 24}} />
        ),
        title: "Usuários"
    };
}

export default DoorLockScreen;