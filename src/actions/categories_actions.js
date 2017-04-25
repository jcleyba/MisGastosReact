/**
 * Created by juanleyba on 4/24/17.
 */
import firebase from 'firebase';
import {CATEGORIES_FETCH, CATEGORIES_FETCH_SUCCESS, CATEGORIES_FETCH_FAIL} from './action_constants';

export const loadCategories = (userId) => {
    return (dispatch) => {
        firebase.database().ref(userId + '/categorias').on('value', snapshot => {
            dispatch({type: CATEGORIES_FETCH_SUCCESS, payload: snapshot.val()});
        });
    }

};
