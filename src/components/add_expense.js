/**
 * Created by juanleyba on 4/21/17.
 */
import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, Picker} from 'react-native';
import {connect} from 'react-redux';
import {CardSection, Card, Button, Input} from './common';
import {loadCategories, amountChanged, categoryChanged, descriptionChanged, saveExpense} from '../actions';

class AddExpense extends Component {
    componentWillMount() {
        this.props.loadCategories('31357915');
    }

    descriptionChanged(text) {
        this.props.descriptionChanged(text);
    }

    amountChanged(text) {
        this.props.amountChanged(text);
    }

    categoryChanged(text) {
        this.props.categoryChanged(text);
    }

    onButtonPress() {
        const {description, category, amount} = this.props;
        if (!this.validateField(description) || !this.validateField(category) || !this.validateField(amount)) {
            alert('Todos los campos son necesarios!')
        }
        else if (this.valueIsNotNumeric(amount) || !this.valueIsNotNumeric(description)) {
            alert('Revise cada campo!')
        }
        else {
            this.props.saveExpense({category, amount, description});
        }

    }

    validateField(value) {
        return value.length > 0
    }

    valueIsNotNumeric(value) {
        var number = Number(value);
        return isNaN(number);
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large"/>;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Guardar
            </Button>
        );
    }

    render() {
        let categoryItems;
        if (this.props.categoryList) {
            categoryItems = this.props.categoryList.map((s, i) => {
                return <Picker.Item key={i} value={s.val} label={s.val}/>
            });
        }
        return (
            <Card>
                <CardSection>
                    <Input
                        label="En qué gasté?"
                        placeholder="Descripción"
                        onChangeText={this.descriptionChanged.bind(this)}
                        value={this.props.description}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Cuanto gasté?"
                        placeholder="$$$"
                        onChangeText={this.amountChanged.bind(this)}
                        value={this.props.amount}
                    />
                </CardSection>
                <CardSection>
                    <Picker style={{flex:1}}
                            selectedValue={this.props.category}
                            onValueChange={ cat => this.props.categoryChanged(cat)}>
                        {categoryItems}
                    </Picker>
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = state => {
    const {
        error,
        loading,
        description,
        category,
        amount
    } = state.expense_addition;

    const categoryList = _.map(state.categories.categoryList, (val, uid) => {
        return {val, uid}
    });
    return {error, loading, description, category, amount, categoryList};
};

export default connect(mapStateToProps, {
    loadCategories,
    amountChanged,
    categoryChanged,
    descriptionChanged,
    saveExpense
})(AddExpense);