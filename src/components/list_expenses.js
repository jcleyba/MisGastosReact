/**
 * Created by juanleyba on 4/24/17.
 */
import _ from 'lodash';
import React, {Component} from 'react';
import {ListView} from 'react-native';
import {connect} from 'react-redux';
import {loadPayments} from '../actions/'
import ListItem from './list_item'

class ListExpenses extends Component {
    componentWillMount() {
        this.props.loadPayments('31357915');
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

    render() {
        return (
            <ListView enableEmptySections
                      dataSource={this.dataSource}
                      renderRow={this.renderListRow}/>
        )
    }
}

const mapStateToProps = state => {
    const expensesList = _.map(state.expenses.expensesList, (val, uid) => {
        return {...val, uid}
    });

    expensesList.reverse();
    return {expensesList};
};

export default connect(mapStateToProps, {loadPayments})(ListExpenses);