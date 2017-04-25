/**
 * Created by juanleyba on 4/21/17.
 */
import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {Icon} from 'react-native-elements';
import AddExpense from './components/add_expense';
import ListExpenses from './components/list_expenses';
import SumComponent from './components/sum';
import Categories from './components/categories_component';
import LoginForm from './components/LoginForm';
import {Scene, Router, Actions} from 'react-native-router-flux';

const TabIcon = ({selected, title}) => {
    return (
        <Text style={{color:selected ? 'black':'grey'}}>{title}</Text>
    )
};

const RouterComponent = () => {
    return (
        <Router key="root" navigationBarStyle={styles.tabs}>
            <Scene key="tabbar" tabs tabBarStyle={{backgroundColor:'#FFFFFF'}} >
                <Scene sceneStyle={{ paddingTop: 65 }}
                       onRight={() => Actions.categories()}
                       rightTitle="Categorías"
                       key="add_expense"
                       component={AddExpense}
                       title="Nuevo Pago"
                       icon={TabIcon}
                       initial
                />
                <Scene key="sum" component={SumComponent} sceneStyle={{ paddingTop: 65 }} title="Totales"
                       icon={TabIcon}/>
                <Scene key="list" component={ListExpenses} sceneStyle={{ paddingTop: 65 }} title="Pagos"
                       icon={TabIcon}/>
            </Scene>
            <Scene key="categories" title="Categorías" component={Categories} sceneStyle={{ paddingTop: 65 }}
                   backTitle="Volver"></Scene>
            <Scene key="login" title="Iniciar sesión" component={LoginForm} sceneStyle={{ paddingTop: 65 }}
                   initial></Scene>
        </Router>
    );
};

const styles = {
    tabs: {
        backgroundColor: '#FFFFFF',
        borderTopColor: '#CCCCCC',
        borderTopWidth: 3
    }
};

export default RouterComponent;

