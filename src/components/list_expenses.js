/**
 * Created by juanleyba on 4/24/17.
 */
import _ from 'lodash';
import React, {Component} from 'react';
import {ListView} from 'react-native';
import {connect} from 'react-redux';
import {loadPayments} from '../actions/'
import ListItem from './list_item'
import {Spinner} from './common'

class ListExpenses extends Component {
    componentWillMount() {
        this.props.loadPayments(this.props.userId);
        this.renderDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.renderDataSource(nextProps)
    }

    renderDataSource({expensesList}) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(expensesList);
    }

    renderListRow(expense) {
        return <ListItem expense={expense}/>
    }

    renderFullList() {
        if (this.props.loading) {
            return <Spinner size="large"/>
        }
        return (
            <ListView enableEmptySections
                      dataSource={this.dataSource}
                      renderRow={this.renderListRow}/>
        )
    }

    render() {
        return this.renderFullList();
    }
}

const mapStateToProps = state => {
    const expensesList = _.map(state.expenses.expensesList, (val, uid) => {
        return {...val, uid}
    });
    const {loading} = state.expenses;
    expensesList.reverse();
    const {userId}  = state.auth;

    return {expensesList, loading, userId};
};

export default connect(mapStateToProps, {loadPayments})(ListExpenses);