/**
 * Created by juanleyba on 4/24/17.
 */
import React, {Component} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {CardSection} from './common';
import moment from 'moment';

class ListItem extends Component {
    onRowPress() {

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
                        <View>
                            <Text style={styles.titleStyle}>
                                ${monto}
                            </Text>
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
    }
};

export default ListItem;