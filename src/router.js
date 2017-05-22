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

const HomeIcon = ({selected, title}) => {
    return (
        <View>
            <Icon name='account-balance-wallet' color={selected ? '#007AFF':'grey'}></Icon>
            <Text style={{color:selected ? '#007AFF':'grey', paddingTop:5}}>{title}</Text>
        </View>
    )
};
const SumIcon = ({selected, title}) => {
    return (
        <View>
            <Icon name='monetization-on' color={selected ? '#007AFF':'grey'}></Icon>
            <Text style={{color:selected ? '#007AFF':'grey', paddingTop:5}}>{title}</Text>
        </View>
    )
};

const ListIcon = ({selected, title}) => {
    return (
        <View>
            <Icon name='shopping-cart' color={selected ? '#007AFF':'grey'}></Icon>
            <Text style={{color:selected ? '#007AFF':'grey', paddingTop:5}}>{title}</Text>
        </View>
    )
};

const RouterComponent = () => {
    console.log(this.props);
    return (
        <Router key="root" navigationBarStyle={styles.header}>
            <Scene key="tabbar" tabs tabBarStyle={styles.tabs}>
                <Scene sceneStyle={{ paddingTop: 65 }}
                       onRight={() => Actions.categories()}
                       rightTitle="Categorías"
                       key="add_expense"
                       component={AddExpense}
                       title="Nuevo Pago"
                       icon={HomeIcon}
                       initial
                />
                <Scene key="sum" component={SumComponent} sceneStyle={{ paddingTop: 65, paddingBottom:49 }} title="Totales"
                       icon={SumIcon}/>
                <Scene key="list" component={ListExpenses} sceneStyle={{ paddingTop: 65 }} title="Pagos"
                       icon={ListIcon}/>
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
        borderTopWidth: 1
    },
    header: {
        backgroundColor: '#FFFFFF',
    }
};

export default RouterComponent;

