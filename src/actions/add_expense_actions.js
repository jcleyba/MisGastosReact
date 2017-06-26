/**
 * Created by juanleyba on 4/24/17.
 */
import firebase from 'firebase';
import {Alert}from 'react-native';
import {
    EXPENSES_ADD,
    EXPENSES_DELETE,
    EXPENSES_DELETE_SUCCESS,
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

export const selectedCategoryChanged = (text) => {
    return {
        type: EXPENSES_CATEGORY_CHANGED,
        payload: text
    };
};

export const saveExpense = ({userId, category, amount, description}) => {
    return (dispatch) => {
        dispatch({type: EXPENSES_ADD});
        firebase.database().ref(userId + '/compras').push({
            descripcion: description,
            monto: Number(amount),
            fecha: new Date().getTime(),
            tipo: category
        }).then(data => {
            dispatch({type: EXPENSES_ADD_SUCCESS});
            Alert.alert(
                'Gracias',
                'Su pago ha sido registrado.',
                [
                    {
                        text: 'OK', onPress: () => {
                    }
                    }
                ]
            )

        }).catch(error => {
            dispatch({type: EXPENSES_ADD_FAIL, payload: error.message})
        })
    }

};

export const deletePayment = (userId, paymentId) => {
    return (dispatch) => {
        dispatch({type: EXPENSES_DELETE});
        firebase.database().ref(userId + '/compras/' + paymentId).remove()
            .then((data) => {
                dispatch({type: EXPENSES_DELETE_SUCCESS});
            })
    }
};