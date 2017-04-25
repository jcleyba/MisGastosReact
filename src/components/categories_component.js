/**
 * Created by juanleyba on 4/24/17.
 */
import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback}from 'react-native';
import {ListView} from 'react-native';
import {connect} from 'react-redux';
import {CardSection} from './common'
import {loadCategories} from '../actions/'

class Categories extends Component {

    componentWillMount() {
        this.props.loadCategories('31357915');
        this.renderDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.renderDataSource(nextProps)
    }

    renderDataSource({categoryList}) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(categoryList);
    }

    renderListRow(category) {
        return (
            <TouchableWithoutFeedback>
                <View>
                    <CardSection style={styles.labelsStyle}>
                        <View>
                            <Text style={styles.labelsFont}>
                                {category.val}
                            </Text>

                        </View>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        return (
            <ListView enableEmptySections
                      dataSource={this.dataSource}
                      renderRow={this.renderListRow}/>
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
    }
};

const mapStateToProps = state => {
    const categoryList = _.map(state.categories.categoryList, (val, uid) => {
        return {val, uid}
    });

    return {categoryList};
};

export default connect(mapStateToProps, {loadCategories})(Categories);