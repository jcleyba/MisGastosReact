/**
 * Created by juanleyba on 4/24/17.
 */
import React, {Component} from 'react';
import {
    Text, TouchableWithoutFeedback, View, Alert,
    TouchableHighlight,
} from 'react-native';
import {Icon} from 'react-native-elements';

import {CardSection} from './common';
import moment from 'moment';
import {deletePayment} from '../actions'
import {connect} from 'react-redux';

class ListItem extends Component {
    onRowPress() {
        console.log(this.props);
        const {userId, expense} = this.props;
        Alert.alert(
            'Borrar',
            'Seguro que desea borrar?',
            [
                {
                    text: 'Cancelar', onPress: () => {
                }
                },
                {text: 'Si', onPress: () => this.props.deletePayment(userId, expense.uid)},
            ]
        )
    }

    render() {
        const {descripcion, monto, fecha} = this.props.expense;
        const fechaFormatted = moment(fecha).format('DD/MM/YY');

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection style={styles.labelsStyle}>
                        <View>
                            <Text style={styles.labelsFont}>
                                {descripcion}
                            </Text>
                            <Text style={styles.labelsFontNormal}>
                                {fechaFormatted}
                            </Text>
                        </View>
                        <View style={styles.hasButton}>
                            <Text style={styles.titleStyle}>
                                ${monto}
                            </Text>
                            <Icon iconStyle={{paddingLeft:20}}
                                  name='delete' color='red' onPress={this.onRowPress.bind(this)}></Icon>
                        </View>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    },
    labelsStyle: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    labelsFontNormal: {
        fontSize: 16,
        fontWeight: 'normal'
    },
    labelsFont: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    hasButton: {
        alignItems: 'center',
        flexDirection: 'row'
    }
};
const mapStateToProps = ({auth}) => {
    const {userId} = auth;
    return {userId}
}
export default connect(mapStateToProps, {deletePayment})(ListItem);