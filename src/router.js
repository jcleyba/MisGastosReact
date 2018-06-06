/**
 * Created by juanleyba on 4/21/17.
 */
import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import AddExpense from './components/add_expense';
import ListExpenses from './components/list_expenses';
import SumComponent from './components/sum';
import Categories from './components/categories_component';
import LoginForm from './components/LoginForm';
import { Scene, Router, Actions } from 'react-native-router-flux';

const HomeIcon = ({ focused, title }) => {
    return (
        <View>
            <Icon name='account-balance-wallet' color={focused ? '#007AFF' : 'grey'}></Icon>
        </View>
    )
};
const SumIcon = ({ focused, title }) => {
    return (
        <View>
            <Icon name='monetization-on' color={focused ? '#007AFF' : 'grey'}></Icon>
        </View>
    )
};

const ListIcon = ({ focused, title }) => {
    return (
        <View>
            <Icon name='shopping-cart' color={focused ? '#007AFF' : 'grey'}></Icon>
        </View>
    )
};

const RouterComponent = () => {
    return (
        <Router navigationBarStyle={styles.header}>
            <Scene key="root">
                <Scene key="tabbar" tabs={true} tabBarStyle={styles.tabs}
                    activeTintColor="#007AFF"
                >
                    <Scene sceneStyle={{ paddingTop: 65 }}
                        onRight={() => Actions.categories()}
                        rightTitle="Categorías"
                        key="add_expense"
                        component={AddExpense}
                        title="Nuevo Pago"
                        icon={HomeIcon}
                        initial
                    />
                    <Scene key="sum" component={SumComponent} sceneStyle={{ paddingTop: 65, paddingBottom: 49 }} title="Totales"
                        icon={SumIcon} />
                    <Scene key="list" component={ListExpenses} sceneStyle={{ paddingTop: 65, paddingBottom: 49 }} title="Pagos"
                        icon={ListIcon} />
                </Scene>
                <Scene key="categories" title="Categorías" component={Categories} sceneStyle={{ paddingTop: 65 }}
                    backTitle="Volver"></Scene>
                <Scene key="login" title="Iniciar sesión" component={LoginForm} sceneStyle={{ paddingTop: 65 }}
                    initial></Scene>
            </Scene>
        </Router>
    );
};

const styles = {
    tabs: {
        backgroundColor: '#FFFFFF',
        borderTopColor: '#CCCCCC',
        borderTopWidth: 1
    },
    header: {
        backgroundColor: '#FFFFFF',
    }
};

export default RouterComponent;

