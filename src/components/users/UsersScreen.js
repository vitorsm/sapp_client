import React, { Component } from 'react';
import { 
    Text,
    View,
    Image
} from 'react-native';
import ObjectScreen from '../crud/ObjectScreen';
import Constants, { constNavigation } from '../../Constants';
import { connect } from 'react-redux';
import * as actions from "../../actions";
import { request } from '../../actions';

const img = require('../../../imgs/users.png');

class UsersScreen extends ObjectScreen {
    constructor(props) {
        super(props);

        this.state = {
            objects: [],
            objectsFilter: [],
            routeInsertScreen: constNavigation.insertUser.route,
            title: "Usuários",
            showProgress: false
        };
    }

    componentWillMount() {

        // this.props.fetchUsers();
        this.props.fetchDefault(request.fetchUsers);
        this.setState({ showProgress: true });
    }

    componentWillReceiveProps(nextProps) {

      if (nextProps.users !== this.props.users) {
        if (nextProps.users.error !== undefined) {
          this.setState({ showProgress: false });
          alert("Erro http: " + nextProps.users.error);
        } else {
          this.setState({ 
            objects: nextProps.users,
            objectsFilter: nextProps.users,
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
        title: "Usuários"
    };
}


function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps, actions)(UsersScreen);
