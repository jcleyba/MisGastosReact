/**
 * Created by juanleyba on 4/24/17.
 */
import firebase from 'firebase';
import {
    EXPENSES_ADD,
    EXPENSES_ADD_FAIL,
    EXPENSES_ADD_SUCCESS,
    EXPENSES_DESCRIPTION_CHANGED,
    EXPENSES_AMOUNT_CHANGED,
    EXPENSES_CATEGORY_CHANGED
} from './action_constants';

export const descriptionChanged = (text) => {
    return {
        type: EXPENSES_DESCRIPTION_CHANGED,
        payload: text
    };
};

export const amountChanged = (text) => {
    return {
        type: EXPENSES_AMOUNT_CHANGED,
        payload: text
    };
};

export const categoryChanged = (text) => {
    return {
        type: EXPENSES_CATEGORY_CHANGED,
        payload: text
    };
};

export const saveExpense = ({category, amount, description}) => {
    return (dispatch) => {
        dispatch({type: EXPENSES_ADD});
        firebase.database().ref('31357915' + '/compras').push({
            descripcion: description,
            monto: amount,
            fecha: new Date().getTime(),
            tipo: category
        }).then(data => {
            dispatch({type: EXPENSES_ADD_SUCCESS});
        }).catch(error => {
            dispatch({type: EXPENSES_ADD_FAIL, payload: error.message})
        })
    }

};
