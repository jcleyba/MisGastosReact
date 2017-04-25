/**
 * Created by juanleyba on 4/24/17.
 */
import firebase from 'firebase';
import {
    EXPENSES_FETCH,
    EXPENSES_FETCH_FAIL,
    EXPENSES_FETCH_SUCCESS,
    MONTHLY_EXPENSES_FETCH,
    LAST_MONTH_EXPENSES_FETCH
} from './action_constants';

export const loadPayments = (userId) => {
    return (dispatch) => {
        dispatch({type: EXPENSES_FETCH});
        firebase.database().ref(userId + '/compras').orderByChild("fecha").limitToLast(40).on('value', snapshot => {
            dispatch({type: EXPENSES_FETCH_SUCCESS, payload: snapshot.val()});
        });
    }

};

export const loadMonthlyPayments = (userId) => {
    var start = new Date().setDate(1);
    return (dispatch) => {
        dispatch({type: EXPENSES_FETCH});
        firebase.database().ref(userId + '/compras').orderByChild("fecha").startAt(new Date(start).setHours(0, 0, 0, 0)).endAt(new Date().getTime()).on('value', snapshot => {
            dispatch({type: MONTHLY_EXPENSES_FETCH, payload: snapshot.val()});
        });
    }

};

export const loadLastMonthPayments = (userId) => {
    var start: Date = new Date();
    start.setMonth((new Date().getMonth()) - 1, 1);
    var finish = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
    return (dispatch) => {
        dispatch({type: EXPENSES_FETCH})
        firebase.database().ref(userId + '/compras').orderByChild("fecha").startAt(start.setHours(0, 0, 0, 0)).endAt(finish.setHours(23, 59, 59, 0)).on('value', snapshot => {
            dispatch({type: LAST_MONTH_EXPENSES_FETCH, payload: snapshot.val()});
        });
    }

};