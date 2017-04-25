/**
 * Created by juanleyba on 4/24/17.
 */

import {
    CATEGORIES_FETCH,
    CATEGORIES_FETCH_SUCCESS,
    CATEGORIES_FETCH_FAIL
} from '../actions/action_constants';

const INITIAL_STATE = {
    error: '',
    categoryList: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CATEGORIES_FETCH_SUCCESS:
            return {...state, categoryList: action.payload};
        case CATEGORIES_FETCH_FAIL:
            return {...state, error: 'Error de Firebase'};
        default:
            return state;
    }
};