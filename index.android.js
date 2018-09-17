import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import reducers from "./src/reducers";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import InitScreen from './src/components/init/InitScreen';

const store = createStore(reducers, {}, compose(applyMiddleware(reduxThunk)));

export default class sapp_client extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return(
      <Provider store={store}>
        <InitScreen />
      </Provider>
    );

  }
}

AppRegistry.registerComponent('sapp_client', () => sapp_client);
