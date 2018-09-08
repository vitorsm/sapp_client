import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import NavBar, { buttonView } from '../NavBar';
import Constants, { constNavigation, addImg, refreshImg } from '../../Constants';

class ObjectScreen extends Component {

    constructor(props) {
        super(props);
    }
    // TO DO
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
    //   };


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

    navigateToInsertUserScreen = (object) => {
        this.props.navigation.navigate(this.state.routeInsertScreen, { object: object});
    }

    renderListItems = () => {
        if (this.state.objectsFilter === null || this.state.objectsFilter === undefined) return null;
    
        return this.state.objectsFilter.map( object => {
          return(
            <TouchableOpacity key={object.id} onPress={ () => { this.navigateToInsertUserScreen(object); } } >
              <ObjectListItem object={{
                id: object.id,
                description: object.name,
                name: object.login
              }}/>
            </TouchableOpacity>
          );
        });
    };

    renderList = () => {
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

export default ObjectScreen;