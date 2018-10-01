import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image
} from 'react-native';
import ObjectScreen from '../crud/ObjectScreen';
import Constants, { constNavigation } from '../../Constants';


import { connect } from 'react-redux';
import * as actions from "../../actions";
import { request } from "../../actions";


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

        // let list = [
        //     {
        //         id: 1,
        //         name: "Modulo 1",
        //         description: "controlModule.description",
        //         place: {
        //             id: 2,
        //             name: "Sala 2",
        //             description: "Sala de TV",
        //             area: 45,
        //             parentPlace: {
        //               id: 1,
        //               name: "Apartamento 302",
        //               description: "Sala de TV",
        //               area: 45,
        //               parentPlace: null
        //             }
        //         },
        //         login: 'login1',
        //         password: 'senha1'
        //     }, {
        //         id: 2,
        //         name: "Modulo 2",
        //         description: "controlModule.description",
        //         place: { 
        //             id: 1,
        //             name: "Apartamento 302",
        //             description: "Sala de TV",
        //             area: 45,
        //             parentPlace: null
        //         },
        //         login: "login2",
        //         password: "senha2"
        //     }, {
        //         id: 3,
        //         name: "Modulo 3",
        //         description: "controlModule.description",
        //         place: { 
        //             id: 2,
        //             name: "Sala 2",
        //             description: "Sala de TV",
        //             area: 45,
        //             parentPlace: {
        //               id: 1,
        //               name: "Apartamento 302",
        //               description: "Sala de TV",
        //               area: 45,
        //               parentPlace: null
        //             }
        //         },
        //         login: "login3",
        //         password: "senha3"
        //     }
        // ];
        
        // this.props.fetchControlModules();
        this.props.fetchDefault(request.fetchControlModules);
        this.setState({ showProgress: true });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.controlModules !== this.props.controlModules) {
            if (nextProps.controlModules.erro !== undefined) {
                this.setState({ showProgress: false });
            } else {
                this.setState({ 
                    objects: nextProps.controlModules, 
                    objectsFilter: nextProps.controlModules,
                    showProgress: false
                });
            }
        }
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


function mapStateToProps({ controlModules }) {
    return { controlModules };
}

export default connect(mapStateToProps, actions)(ControlModulesScreen);