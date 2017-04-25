/**
 * Created by juanleyba on 4/24/17.
 */
import firebase from 'firebase';
import {EXPENSES_FETCH, EXPENSES_FETCH_FAIL, EXPENSES_FETCH_SUCCESS} from './action_constants';

export const loadPayments = (userId) => {
    return (dispatch) => {
        firebase.database().ref(userId + '/compras').orderByChild("fecha").limitToLast(40).on('value', snapshot => {
            dispatch({type: EXPENSES_FETCH_SUCCESS, payload: snapshot.val()});
        });
    }

};