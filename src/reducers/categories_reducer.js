/**
 * Created by juanleyba on 4/24/17.
 */

import {
    CATEGORIES_FETCH,
    CATEGORIES_CHANGED,
    CATEGORIES_FETCH_SUCCESS,
    CATEGORIES_ADD_SUCCESS,
    CATEGORIES_DELETE_SUCCESS_SUCCESS,
    CATEGORIES_FETCH_FAIL
} from '../actions/action_constants';

const INITIAL_STATE = {
    loading: false,
    error: '',
    categoryList: null,
    category: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CATEGORIES_FETCH:
            return {...state, loading: true};
        case CATEGORIES_CHANGED:
            return {...state, category: action.payload};
        case CATEGORIES_DELETE_SUCCESS_SUCCESS:
            return {...state, loading: false};
        case CATEGORIES_FETCH_SUCCESS:
            return {...state, categoryList: action.payload, loading: false};
        case CATEGORIES_ADD_SUCCESS:
            return {...state, loading: false, category: ''};
        case CATEGORIES_FETCH_FAIL:
            return {...state, error: 'Error de Firebase', loading: false};
        default:
            return state;
    }
};