/**
 * Created by juanleyba on 4/24/17.
 */
import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, ListView, TouchableWithoutFeedback, Alert}from 'react-native';
import {connect} from 'react-redux';
import {CardSection, Spinner, Card, Input, Button} from './common'
import {Icon} from 'react-native-elements';

import {loadCategories, deleteCategory, categoryAdd, categoryChanged} from '../actions/'

class Categories extends Component {

    componentWillMount() {
        this.props.loadCategories('31357915');
        this.renderDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.renderDataSource(nextProps)
    }

    renderDataSource({categoryListArr}) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(categoryListArr);
    }

    onCategoryChanged(text) {
        this.props.categoryChanged(text);
    }

    onRowPress(category) {
        const {userId} = this.props;
        Alert.alert(
            'Borrar',
            'Seguro que desea borrar?',
            [
                {
                    text: 'Cancelar', onPress: () => {
                }
                },
                {text: 'Si', onPress: () => this.props.deleteCategory(userId, category.uid)},
            ]
        )
    }

    renderListRow(category) {
        return (
            <TouchableWithoutFeedback>
                <View>
                    <CardSection style={styles.labelsStyle}>
                        <View style={styles.containerWithIcon}>
                            <Text style={styles.labelsFont}>
                                {category.val}
                            </Text>
                            <Icon iconStyle={{paddingLeft:20, alignSelf:'flex-end'}}
                                  name='delete' color='red' onPress={this.onRowPress.bind(this, category)}></Icon>
                        </View>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    saveCategory() {
        const {userId, category} = this.props;
        this.props.categoryAdd(userId, category);
    }

    render() {
        if (this.props.loading)
            return <Spinner size="large"/>;
        return (
            <View>
                <ListView enableEmptySections
                          dataSource={this.dataSource}
                          renderRow={this.renderListRow.bind(this)}/>
                <Card>
                    <CardSection>
                        <Input
                            label="Categoría"
                            placeholder="Ingrese el nombre"
                            onChangeText={this.onCategoryChanged.bind(this)}
                            value={this.props.category}
                        />
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.saveCategory.bind(this)}>Guardar</Button>
                    </CardSection>
                </Card>
            </View>

        )
    }
}


const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    },
    labelsStyle: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50
    },
    labelsFontNormal: {
        fontSize: 16,
        fontWeight: 'normal'
    },
    labelsFont: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    containerWithIcon: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
};

const mapStateToProps = state => {
    const {categoryList, loading, category} = state.categories;
    const categoryListArr = _.map(categoryList, (val, uid) => {
        return {val, uid}
    });

    const {userId} = state.auth;

    return {categoryListArr, userId, loading, category};
};

export default connect(mapStateToProps, {loadCategories, deleteCategory, categoryAdd, categoryChanged})(Categories);