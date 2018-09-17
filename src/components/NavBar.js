import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import { StackActions } from 'react-navigation';

const searchImg = require('../../imgs/search.png');
const menuImg = require('../../imgs/menu.png');
const filterImg = require('../../imgs/filter.png');
const backImg = require('../../imgs/arrow_back.png');
const closeImg = require('../../imgs/close.png');

export const buttonView = {
  menu: 1,
  back: 2,
  backWithoutFilter: 3,
  menuWithoutFilter: 4
};
const appName = "SAPP Client";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonView: buttonView.menu,
      menuText: undefined,
      showButton: true,
      searchMode: false,
      textSearch: null
    };

  }

  setButtonView = (btView) => {
    if (btView === undefined || btView === null)
      this.setState( { buttonView: buttonView.menu } );
    else
    this.setState( { buttonView: btView } );
  }

  componentWillMount() {
    this.setButtonView(this.props.buttonView);
    this.setState( { 
      menuText: this.props.menuText,
      showButton: this.props.showButton === undefined ? true : this.props.showButton
    } );
  }

  componentWillReceiveProps(nextProps) {
    
    if (nextProps.buttonView !== this.props.buttonView) {
      this.setButtonView(nextProps.buttonView);
    } else if (nextProps.menuText !== this.props.menuText) {
      this.setState( { menuText: nextProps.menuText} );
    } else if (nextProps.showButton !== this.props.showButton) {
      this.setState( { showButton: nextProps.showButton } );
    }
  }

  handleClickSearchButton = () => {
    if (this.state.searchMode && this.props.onChangeText !== undefined)
      this.props.onChangeText(null);
    
    this.setState( { searchMode: !this.state.searchMode } );
  };

  handleClickMenuButton = () => {
    if (this.state.buttonView == buttonView.backWithoutFilter ||
      this.state.buttonView == buttonView.back) {
      
      

      if (this.props.onPressBack !== undefined)
        this.props.onPressBack();
      
      let objectScreenBack = this.props.objectScreenBack;
      if (objectScreenBack !== undefined && objectScreenBack !== null) {
        // { objParent, objEdit, objReturn, value, isEditing } pega o objReturn e trabalha 
        objectScreenBack.objEdit = undefined;
        objectScreenBack.objReturn = this.props.objectBackupReturn;
        
        this.props.navigation.navigate(this.props.screenBack, { object: objectScreenBack } );
      } else {
        this.props.navigation.navigate(this.props.screenBack);
      }

    } else {
      this.props.navigation.openDrawer();
    }
  }

  renderFilterButtonImg = () => {
    if (this.state.searchMode) {
      return(
        <Image 
          source={closeImg}
          style={styles.menuImg} />
      );
    } else {
      return (
        <Image 
          source={searchImg}
          style={styles.menuImg} />
      );
    }
  };

  renderFilterButton = () => {
    if (this.state.buttonView === buttonView.backWithoutFilter || this.state.buttonView === buttonView.menuWithoutFilter) {
      return null;
    } else {
      return(
        <View style={styles.findButtonView}>
          <TouchableOpacity onPress = { this.handleClickSearchButton }>
            { this.renderFilterButtonImg() }
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderButton = () => {
    if (!this.state.showButton) {
      return(
        <View style={styles.menuButtonView}>
          <View style={styles.menuImg}/>
        </View>
      );
    }

    return(
      <View style={styles.menuButtonView}>
        <TouchableOpacity onPress = { this.handleClickMenuButton } disabled={!this.state.showButton}>
          <Image 
            source={ this.state.buttonView === buttonView.menu || this.state.buttonView === buttonView.menuWithoutFilter
              ? menuImg : backImg }
            style={styles.menuImg} />
        </TouchableOpacity>
      </View>
    );
  }

  renderMenuText = () => {

    if (this.state.searchMode) {
      return(
        <TextInput 
          placeholder={"Pesquisa..."} 
          value={this.state.textSearch}
          style={styles.search}
          onChangeText={this.props.onChangeText !== undefined ? this.props.onChangeText : () => {} }
          placeholderTextColor={"white"}
          underlineColorAndroid={"white"} />
      );
    } else {
      return(
        <Text style={styles.text}>
          { this.state.menuText !== undefined ? this.state.menuText : appName }
        </Text>
      );
    }
  }

  render() {
    return(
      <View style={styles.nav}>

        <View style={styles.leftView}>
          { this.renderButton() }

          <View style={styles.menuTextView}>
            { this.renderMenuText() }
          </View>
        </View>

        { this.renderFilterButton() }
        
      </View>
    );
  };
}

const styles = StyleSheet.create({
  leftView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 3
  },
  menuButtonView: {
    padding: 10
  },
  menuImg: {
    height: 36,
    width: 36
  },
  menuTextView: {
    flex: 1,
    padding: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  text: {
    fontSize: 18,
    color: 'white'
  },
  findButtonView: {
    flex: 1,
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    padding: 10,
  },
  nav: {
    backgroundColor: '#00a4d3',
    flexDirection: 'row'
  },
  search: {
    fontSize: 14,
    color: 'white'
  }
});


export default NavBar;
