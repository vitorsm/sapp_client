import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

class HomeCardItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            description: null,
            textButton: null
        }
    }

    componentWillMount() {
        this.setState({
            // title: this.props.title,
            // description: this.props.description !== undefined ? this.props.description : null,
            // textButton: this.props.textButton !== undefined ? this.props.textButton : null
            title: "Titulo de exemplo",
            description: "20/08/2018",
            textButton: "ABRIR"
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.title !== this.props.title) {
            this.setState( { title: nextProps.title } );
        } else if (nextProps.description !== this.props.description) {
            this.setState( { description: nextProps.description } );
        } else if (nextProps.textButton !== this.props.textButton) {
            this.setState( { textButton: nextProps.textButton } );
        }
    }


    renderDescription = () => {
        if (this.description === null) return null;

        return(
            <View style={styles.descriptionView}>
                <Text style={styles.descriptionText}>{this.state.description}</Text>
            </View>
        );
    };

    renderText = () => {
        return(
            <View style={styles.textsView}>
                <Text style={styles.titleText}>{this.state.title}</Text>
                { this.renderDescription() }
            </View>
        );
    };

    renderActionButton = () => {
        if (this.state.textButton == null) return null;

        return(
            <TouchableOpacity style={styles.buttonView}>
                <Text style={styles.buttonText}>{this.state.textButton}</Text>
            </TouchableOpacity>
        );
    };

    render() {
        return(
            <View style={styles.container}>
                { this.renderText() }
                { this.renderActionButton() }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        margin: 5,
        padding: 10
    },
    textsView: {
        flex: 1
    },
    titleView: {

    },
    descriptionView: {
        // alignSelf: 'flex-end'
        marginTop: 10
    },
    buttonView: {
        backgroundColor: '#00a4d3',
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'flex-end',
        padding: 5,
        margin: 5,
        marginTop: 20,
        marginBottom: 20
    },
    titleText: {
        fontSize: 18
    },
    descriptionText: {
        fontSize: 14
    },
    buttonText: {
        fontSize: 16,
        color: 'white'
    }
});

export default HomeCardItem;
