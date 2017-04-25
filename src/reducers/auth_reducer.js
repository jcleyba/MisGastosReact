/**
 * Created by juanleyba on 4/21/17.
 */

import {
    ID_CHANGED,
    FETCH_CREDENTIALS,
    FETCH_CREDENTIALS_FAIL,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from '../actions/action_constants';

const INITIAL_STATE = {
    userId: null,
    user: null,
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ID_CHANGED:
            return {...state, userId: action.payload};
        case LOGIN_USER:
            return {...state, loading: true, error: ''};
        case LOGIN_USER_SUCCESS:
            return {...state, ...INITIAL_STATE, userId: action.payload, loading: false};
        case FETCH_CREDENTIALS:
            return {...state, userId: action.payload, loading: true};
        case FETCH_CREDENTIALS_FAIL:
            return {...state, ...INITIAL_STATE, loading: false};
        case LOGIN_USER_FAIL:
            return {...state, error: 'Authentication Failed.', loading: false};
        default:
            return state;
    }
};