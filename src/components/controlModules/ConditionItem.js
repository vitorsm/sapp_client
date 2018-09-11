import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet
} from 'react-native';
import DropdownSelectItems from '../selectItems/DropdownSelectItems';

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
    }

    render() {
        return( 
            <View style={styles.container}>

                <Text style={styles.inputLabel}>
                    Instrumento
                </Text>
                <View style={styles.dropdown}>
                    <DropdownSelectItems
                        dropdownTitle={"Nenhum instrumento selecionado"}
                        modalTitle={"Selecione um instrumento"}
                        multipleSelection={false}
                        editable={false} />
                </View>

                <Text style={styles.inputLabel}>
                    Tipo de operação
                </Text>
                <View style={styles.dropdown}>
                    <DropdownSelectItems
                        dropdownTitle={"Nenhuma operação selecionada"}
                        modalTitle={"Selecione uma operação"}
                        multipleSelection={false}
                        editable={false}
                        items={operationTypes} />
                </View>

                <Text style={styles.inputLabel}>
                    Valor
                </Text>
                <TextInput placeholder={"Valor"} style={styles.inputNumber}/>

            </View>
            
        );
    }

}

const styles = StyleSheet.create({
    container: {

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
      width: "20%"
    }
});

export default ConditionItem;