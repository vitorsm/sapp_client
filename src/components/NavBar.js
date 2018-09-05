import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  View,
  Text
} from 'react-native';


const searchImg = require('../../imgs/search.png');
const buttonImg = require('../../imgs/menu.png');
const buttonView = {
  menu: 1,
  back: 2
};
const appName = "SAPP Client";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonView: buttonView.menu,
      menuText: undefined
    };

  }

  setButtonView = (btView) => {
    if (btView === undefined || btView === null)
      this.setState( { buttonView: buttonView.menu } );
    else
    this.setState( { btView } );
  }

  componentWillMount() {
    this.setButtonView(this.props.buttonView);
    this.setState( { menuText: this.props.menuText } );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.buttonView !== this.props.buttonView) {
      this.setButtonView(nextProps.buttonView);
    } else if (nextProps.menuText !== this.props.menuText) {
      this.setState( { menuText: nextProps.menuText} );
    }
  }

  render() {
    return(
      <View style={styles.nav}>

        <View style={styles.menuButtonView}>
          <TouchableOpacity onPress = { () => { this.props.navigation.openDrawer(); } }>
            <Image 
              source={buttonImg}
              style={styles.menuImg} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuTextView}>
          <Text style={styles.text}>
            { this.state.menuText !== undefined ? this.state.menuText : appName }
          </Text>
        </View>

        <View style={styles.findButtonView}>
          <TouchableOpacity onPress = { () => { alert("clicou na busca") } }>
            <Image 
              source={searchImg}
              style={styles.menuImg} />
          </TouchableOpacity>
        </View>

      </View>
    );
  };
}

const styles = StyleSheet.create({
  menuButtonView: {
    flex: 1,
    alignItems: 'flex-start'
  },
  menuImg: {
    height: 36,
    width: 36
  },
  menuTextView: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 10,
    justifyContent: 'flex-start'
  },
  text: {
    fontSize: 15
  },
  findButtonView: {
    flex: 1,
    alignItems: 'flex-end'
  },
  nav: {
    backgroundColor: '#CCC',
    padding: 10,
    flexDirection: 'row'
  }
});


export default NavBar;
