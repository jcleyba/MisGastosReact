/**
 * Created by juanleyba on 4/24/17.
 */
import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Spinner} from './common'
import {connect} from 'react-redux';
import {loadLastMonthPayments, loadMonthlyPayments} from '../actions';


class SumComponent extends Component {

    componentWillMount() {
        this.props.loadLastMonthPayments(this.props.userId);
        this.props.loadMonthlyPayments(this.props.userId);
    }

    sumMonth(array) {
        var sum = 0;
        array.map(function (item) {
            sum += item.monto;
        });
        return Number(sum).toFixed(2);
    }

    sumCategory(array, category) {
        var sum = 0;
        array.map(function (item) {
            if (item.tipo === category) {
                sum += Number(item.monto);
                if (category === 'Almuerzo')
                    console.log(sum);
            }
        });
        if (this.props.loading) {
            return (
                <View key={category} style={styles.sectionStyles}>
                    <Text style={styles.categoryTextStyle}>{category}</Text>
                    <Spinner size="large"/>
                </View>
            )
        }
        return (
            <View key={category} style={styles.sectionStyles}>
                <Text style={styles.categoryTextStyle}>{category}</Text>
                <Text style={styles.amountTextStyle}>${ Number(sum).toFixed(2)}</Text>
            </View>

        )
    }

    sumAllCategories(array, categories) {
        var self = this;
        var jsx = categories.map(function (item) {
            return self.sumCategory(array, item.val);
        });

        return jsx;
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.sectionStyles}>
                    <Text style={styles.categoryTextStyle}>
                        Mensual
                    </Text>
                    <Text style={styles.amountTextStyle}>
                        ${this.sumMonth(this.props.monthExpensesListArray)}
                    </Text>
                </View>
                <View style={styles.sectionStyles}>
                    <Text style={styles.categoryTextStyle}>
                        Mes Pasado
                    </Text>
                    <Text style={styles.amountTextStyle}>
                        ${this.sumMonth(this.props.lastMonthExpensesListArray)}
                    </Text>
                </View>
                {this.sumAllCategories(this.props.monthExpensesListArray, this.props.categoryList)}
            </ScrollView>
        )
    }
}

const styles = {
    sectionStyles: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1
    },
    categoryTextStyle: {
        fontSize: 20,
        color: 'black'
    },
    amountTextStyle: {
        fontSize: 30,
        color: 'black'
    }
};

const mapStateToProps = state => {
    const {monthExpensesList, lastMonthExpensesList, loading} = state.expenses;
    const monthExpensesListArray = _.map(monthExpensesList, (val, uid) => {
        return {...val, uid}
    });
    const lastMonthExpensesListArray = _.map(lastMonthExpensesList, (val, uid) => {
        return {...val, uid}
    });
    const categoryList = _.map(state.categories.categoryList, (val, uid) => {
        return {val, uid}
    });
    const {userId}  = state.auth;
    return {monthExpensesListArray, lastMonthExpensesListArray, categoryList, userId, loading};
};

export default connect(mapStateToProps, {loadLastMonthPayments, loadMonthlyPayments})(SumComponent)