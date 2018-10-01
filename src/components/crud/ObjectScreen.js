import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import NavBar, { buttonView } from '../NavBar';
import Constants, { constNavigation, addImg, refreshImg } from '../../Constants';
import ObjectListItem from './ObjectListItem';
import FloatActionButton from '../FloatActionButton';

const notImg = require('../../../imgs/not.png');

class ObjectScreen extends Component {

    constructor(props) {
        super(props);
    }
    // TO DO
    // this.state.showProgress
    // this.state.objects ( deve ter name e id )
    // this.state.objectsFilter ( copia objects )
    // this.state.routeInsertScreen;
    // this.state.title
    // static navigationOptions = {
    //     drawerIcon: (
    //       <Image 
    //         source={img}
    //         style={{ height: 24, width: 24}} />
    //     ),
    //     title: "Usuários"
    //};


    filterObject = (text) => {
        let list = [];
    
        if (text === undefined || text === null) {
          this.state.objects.map( obj => { list.push(obj); } );  
        } else {
          this.state.objects.filter( obj => { 
            return obj.name.toUpperCase().includes(text.toUpperCase());
          }).map( obj => {
            list.push(obj);
          });
        }
    
        this.setState( { objectsFilter: list } );
    };

    navigateToInsertScreen = (object) => {
      // { objParent, objEdit, objReturn, value }
      let objectSend = {
        objParent: object
      };

        this.props.navigation.navigate(this.state.routeInsertScreen, { object: objectSend });
    }

    renderListItems = () => {
        if (this.state.objectsFilter === null || 
          this.state.objectsFilter === undefined || 
          this.state.objectsFilter.length === 0 ||
          this.state.objectsFilter.map == undefined) {
          return(
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
              <Image source={notImg}/>
              <Text style={{ fontSize: 24 }}>Nada encontrado</Text>
            </View>
          );
        }
    
        return this.state.objectsFilter.map( object => {
          return(
            <TouchableOpacity activeOpacity={0.7} key={object.id} onPress={ () => { this.navigateToInsertScreen(object); } } >
              <ObjectListItem object={ object }/>
            </TouchableOpacity>
          );
        });
    };

    renderList = () => {
        if (this.state.showProgress) {
          return(
            <ActivityIndicator size="large" />
          );
        }
        
        return(
          <View style={{ flex: 1 }}>
            <ScrollView style={styles.list}>
              { this.renderListItems() }
            </ScrollView>
          </View>
        );
    };

    render() {
        return (
          <View style={{ flex: 1 }}>
            
            <NavBar 
              navigation={this.props.navigation}
              menuText={this.state.title}
              buttonView={ buttonView.menu }
              onChangeText={this.filterObject } />
    
            
            <View style={{ flex: 1 }}>
              { this.renderList() }
    
              <View style={styles.viewButton}>
                <FloatActionButton
                  source={refreshImg} 
                  color={"#00a4d3"}
                  onPress= { () => { alert("clicou no refresh"); } } />
    
                <FloatActionButton
                  source={addImg}
                  color={"#FA8258"}
                  onPress={ () => { this.props.navigation.navigate(this.state.routeInsertScreen, { object: null } ); } } />
              </View>
            </View>
    
          </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
      margin: 10
    },
    viewButton: {
      // flex: 1,
      // alignSelf: 'stretch',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginRight: 10,
      flexDirection: 'row'
    }
});

export default ObjectScreen;