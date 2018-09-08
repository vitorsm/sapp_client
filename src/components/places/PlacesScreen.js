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
import NavBar, {buttonView} from '../NavBar';
import Constants, { constNavigation, addImg, refreshImg } from '../../Constants';
import FloatActionButton from '../FloatActionButton';
import PlaceListItem from './PlaceListItem';


const img = require('../../../imgs/places.png');


class PlacesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      placesFilters: []
    };

  }

  componentWillMount() {
    let places =  [
      {
        id: 1,
        name: "Apartamento 302",
        description: "Meu barraco",
        area: 45,
        parentPlace: null
      },
      {
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
    ];

    this.setState( { places, placesFilters: places } );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.places !== this.props.places) {
      this.setState( { places: nextProps.places } );
    }
  }

  static navigationOptions = {
    drawerIcon: (
      <Image 
        source={img}
        style={{ height: 24, width: 24}} />
    ),
    title: "Locais"
  };

  filterPlaces = (text) => {
    let list = [];

    if (text === undefined || text === null) {
      this.state.places.map( place => { list.push(place); } );  
    } else {
      this.state.places.filter( place => { 
        return place.name.toUpperCase().includes(text.toUpperCase());
      }).map( place => {
        list.push(place);
      });
    }

    this.setState( { placesFilter: list } );
  };

  navigateToInsertPlaceScreen = (place) => {
    this.props.navigation.navigate(constNavigation.insertPlace.route, { place: place});
  }

  renderListItems = () => {
    if (this.state.placesFilters === null || this.state.placesFilters === undefined) return null;

    return this.state.placesFilters.map( place => {
      return(
        <TouchableOpacity key={place.id} onPress={ () => { this.navigateToInsertPlaceScreen(place, { place: null} ); } } >
          <PlaceListItem place={place}/>
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
          menuText={"Locais"}
          buttonView={ buttonView.menu }
          onChangeText={this.filterPlaces } />

        
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
              onPress={ () => { this.props.navigation.navigate(constNavigation.insertPlace.route, { user: null } ); } } />
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 10,
    flexDirection: 'row'
  }
});

export default PlacesScreen;
