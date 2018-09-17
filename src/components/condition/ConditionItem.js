import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import DropdownSelectItems from '../selectItems/DropdownSelectItems';
import TextButton from '../TextButton';

const defualtBackgroundColor = 'rgba(0, 164, 211, 0.5)';
const operationTypes = [
    {
        id: 1,
        name: "< menor"
    }, {
        id: 2,
        name: "> maior"
    }, {
        id: 3,
        name: "<> diferente"
    }, {
        id: 4,
        name: "= igual"
    }];

class ConditionItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            title: null,
            editable: false,
            condition: null
        };
    }

    componentWillMount() {
        this.setState({
            show: this.props.show !== undefined ? this.props.show : false,
            title: this.props.title,
            editable: this.props.editable !== undefined ? this.props.editable : false,
            condition: this.props.condition !== undefined ? this.props.condition : null
        });
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.show !== this.props.show) {
            this.setState({ show: nextProps.show });
        }
        if (nextProps.title !== this.props.title) {
            this.setState({ title: nextProps.title });
        }
        if (nextProps.editable !== this.props.editable) {
            this.setState({ editable: nextProps.editable });
        }
        if (nextProps.condition !== this.props.condition) {
            this.setState({ condition: nextProps.condition });
        }
    }

    render() {
        if (!this.state.show) {
            return(
                <TouchableOpacity onPress={() => this.setState({ show: true })}>
                    <View style={[styles.containerHide, { backgroundColor: defualtBackgroundColor }]}>
                        <Text style={styles.titleText}>{this.state.title}</Text>
                        <View style={{ justifyContent: "flex-end", marginLeft: 30 }}>
                            <TextButton 
                                text={"Remover"}
                                smallButton={true}
                                onPress={this.props.onPressRemove} />
                        </View>
                    </View>
                </TouchableOpacity>
                
            );
        }

        return( 
            <TouchableOpacity onPress={() => { this.setState({ show: false }) }}>
                <View style={[styles.container, { backgroundColor: defualtBackgroundColor } ]}>

                <Text style={styles.inputLabel}>
                    Entrada
                </Text>
                <View style={styles.dropdown}>
                    <DropdownSelectItems
                        dropdownTitle={"Nenhum instrumento selecionado"}
                        modalTitle={"Selecione um instrumento"}
                        multipleSelection={false}
                        editable={this.state.editable}
                        selectedItems={
                            this.state.condition !== null && this.state.condition.input !== null ? 
                            [this.state.condition.input] : null 
                        } />
                </View>

                <Text style={styles.inputLabel}>
                    Tipo de operação
                </Text>
                <View style={styles.dropdown}>
                    <DropdownSelectItems
                        dropdownTitle={"Nenhuma operação selecionada"}
                        modalTitle={"Selecione uma operação"}
                        multipleSelection={false}
                        items={operationTypes}
                        editable={this.state.editable}
                        selectedItems={
                            this.state.condition != null && this.state.condition.operationType !== null ?
                            [this.state.condition.operationType] :
                            null
                        } />
                </View>
                
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.inputLabel}>
                        Valor
                    </Text>
                    <TextInput 
                        keyboardType={"numeric"}
                        value={this.state.condition.value}
                        onChangeText={null}
                        style={styles.inputNumber}
                        editable={this.state.editable} />
                </View>

                </View>
            </TouchableOpacity>
            
        );
    }

}

const styles = StyleSheet.create({
    containerHide: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 10,
        flexDirection: 'row',
        margin: 5,
        // borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 30,
        paddingBottom: 30
    },
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        margin: 5,
        marginLeft: 20,
        marginRight: 20
    },
    dropdown: {
      marginLeft: 20,
      marginRight: 40
    },
    inputLabel: {
      marginLeft: 20,
      marginTop: 20,
      marginBottom: 10,
      alignSelf: 'flex-start'
    },
    input: {
      marginLeft: 20,
      marginRight: 40,
    },
    inputNumber: {
      width: "20%",
      marginLeft: 10
    //   alignSelf: 'center'
    },
    titleText: {
        fontSize: 14,
        color: 'black'
    },
});

export default ConditionItem;