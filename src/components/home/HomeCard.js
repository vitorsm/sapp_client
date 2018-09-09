import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Image
} from 'react-native';
import Contants, { constNavigation } from '../../Constants';
import HomeCardItem from './HomeCardItem';

class HomeCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            footerText: null
        };
    }

    componentWillMount() {
        this.setState({
            title: this.props.title,
            footerText: this.props.footerText
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.title !== this.props.title) {
            this.setState( { title: nextProps.title } );
        }
    }

    renderFooter = () => {
        if (this.state.footerText === null) return null;

        return(
            <View style={styles.footer}>
            <Text style={styles.footerText}>{this.state.footerText}</Text>
        </View>
        );
    };

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>{this.state.title}</Text>  
                </View>

                <ScrollView {...this.props.panHandlers}
                    onScrollEndDrag={() => this.props.panHandlers.onResponderRelease() } >

                    <HomeCardItem />
                    <HomeCardItem />

                </ScrollView>

                { this.renderFooter() }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        height: 170,
        backgroundColor: 'rgba(0, 164, 211, 0.5)',
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10
        // borderRadius: 5,
        // flexDirection: 'row',
    },
    titleView: {
        marginBottom: 10
    },
    titleText: {
        fontSize: 18,
        color: 'rgba(105,105,105, 0.5)'
    },
    footer: {
        alignItems: 'flex-end',
        margin: 5
    },
    footerText: {
        color: 'rgba(105,105,105, 0.5)'
    }
});

export default HomeCard;
