import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import NavBar, { buttonView } from '../NavBar';

const img = require('../../../imgs/about.png');
const aboutImg = require('../../../imgs/about_content.png');

class AboutScreen extends Component {
  static navigationOptions = {
    drawerIcon: (
      <Image 
        source={img}
        style={{ height: 24, width: 24}} />
    ),
    title: "Sobre"
};

  render() {
    return (
      <View>
        
        <NavBar 
          navigation={this.props.navigation}
          menuText={"Sobre"}
          buttonView={ buttonView.menuWithoutFilter } />

        <View style={styles.container}>
          <View>
            <Text style={styles.mainText}>
              Aplicativo desenvolvido para TCC
            </Text>
          </View>
        
          {/* <Image style={styles.img}source={aboutImg}>
            <Text style={{ }}>Autor lindão</Text>
          </Image> */}
          <View style={styles.imgView}>
            <Image style={styles.img}source={aboutImg} />
            <Text style={styles.imgLegend}>Autor lindão</Text>
          </View>

          <View>
            <Text>
              Colocar texto explicando o trabalho e as imagens tbm
            </Text>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center'
  },
  mainText: {
    fontSize: 18
  },
  img: {
    height: 180,
    width: 180,
    borderRadius: 90,
    justifyContent: 'flex-end'
  },
  imgView: {
    margin: 30,
    alignItems: 'center'
  },
  imgLegend: {
    margin: 5
  }
});

export default AboutScreen;
