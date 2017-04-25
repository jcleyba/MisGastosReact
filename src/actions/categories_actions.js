/**
 * Created by juanleyba on 4/24/17.
 */
import firebase from 'firebase';
import {
    CATEGORIES_FETCH,
    CATEGORIES_FETCH_SUCCESS,
    CATEGORIES_ADD_SUCCESS,
    CATEGORIES_FETCH_FAIL,
    CATEGORIES_CHANGED,
    CATEGORIES_DELETE_SUCCESS
} from './action_constants';

export const loadCategories = (userId) => {
    return (dispatch) => {
        dispatch({type: CATEGORIES_FETCH});
        firebase.database().ref(userId + '/categorias').on('value', snapshot => {
            dispatch({type: CATEGORIES_FETCH_SUCCESS, payload: snapshot.val()});
        });
    }

};

export const deleteCategory = (userId, categoryId) => {
    return (dispatch) => {
        firebase.database().ref(userId + '/categorias/' + categoryId).remove()
            .then(value => {
                dispatch({type: CATEGORIES_DELETE_SUCCESS});
            })
    }
};

export const categoryChanged = (text) => {
    return {
        type: CATEGORIES_CHANGED,
        payload: text
    };
};

export const categoryAdd = (userId, name) => {
    return (dispatch) => {
        firebase.database().ref(userId + '/categorias/').push(name)
            .then(data => {
                dispatch({type: CATEGORIES_ADD_SUCCESS})
            })
    }
};
