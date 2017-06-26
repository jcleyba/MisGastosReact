/**
 * Created by juanleyba on 4/21/17.
 */
import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, Picker, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {CardSection, Card, Button, Input, Spinner} from './common';
import {
    loadCategories,
    amountChanged,
    selectedCategoryChanged,
    descriptionChanged,
    saveExpense,
    fetchCredentials
} from '../actions';

class AddExpense extends Component {
    componentWillMount() {
        this.props.loadCategories(this.props.userId);
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
        const {userId, description, category, amount} = this.props;
        if (!this.validateField(description) || !this.validateField(category) || !this.validateField(amount)) {
            alert('Todos los campos son necesarios!')
        }
        else if (this.valueIsNotNumeric(amount) || !this.valueIsNotNumeric(description)) {
            alert('Revise cada campo!')
        }
        else {
            this.props.saveExpense({userId, category, amount, description});
        }

    }

    validateField(value) {
        return value.length > 0
    }

    valueIsNotNumeric(value) {
        var number = Number(value);
        return isNaN(number);
    }

    renderPicker() {
        let categoryItems;
        if (this.props.categoryList) {
            categoryItems = this.props.categoryList.map((s, i) => {
                return <Picker.Item key={i} value={s.val} label={s.val}/>
            });
        }
        if (this.props.loading) {
            return <Spinner size="large"/>;
        }
        return (<Picker style={{flex:1}}
                        selectedValue={this.props.category}
                        onValueChange={ cat => this.props.selectedCategoryChanged(cat)}>
            {categoryItems}
        </Picker>)
    }

    renderButton() {
        if (this.props.loading) {
            return null
        }

        return (
            <CardSection>
                <Button onPress={this.onButtonPress.bind(this)}>
                    Guardar
                </Button>
            </CardSection>

        );
    }

    render() {
        return (
            <ScrollView style={{backgroundColor:'#EEEEEE'}}>
                <View >
                    <Card >
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
                            {this.renderPicker()}
                        </CardSection>
                        <Text style={styles.errorTextStyle}>
                            {this.props.error}
                        </Text>
                        {this.renderButton()}
                    </Card>
                </View>
            </ScrollView>
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
        description,
        category,
        amount
    } = state.expense_addition;

    const {userId} = state.auth;

    const categoryList = _.map(state.categories.categoryList, (val, uid) => {
        return {val, uid}
    });
    const {loading} = state.categories;

    return {error, loading, description, category, amount, categoryList, userId};
};

export default connect(mapStateToProps, {
    loadCategories,
    amountChanged,
    selectedCategoryChanged,
    descriptionChanged,
    fetchCredentials,
    saveExpense
})(AddExpense);