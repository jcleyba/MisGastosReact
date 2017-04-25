/**
 * Created by juanleyba on 4/21/17.
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import reducers from './reducers';
import Router from './router';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: "AIzaSyDXFZnzQ2zbxrtwzhC5RFX2Q9KsnJgZFVI",
            authDomain: "misgastospormes.firebaseapp.com",
            databaseURL: "https://misgastospormes.firebaseio.com",
            projectId: "misgastospormes",
            storageBucket: "misgastospormes.appspot.com",
            messagingSenderId: "67917001311"
        };
        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}
export default App;