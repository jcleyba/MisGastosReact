/**
 * Created by juanleyba on 4/24/17.
 */
import _ from 'lodash';
import {
    EXPENSES_DESCRIPTION_CHANGED,
    EXPENSES_CATEGORY_CHANGED,
    EXPENSES_ADD,
    CATEGORIES_FETCH_SUCCESS,
    EXPENSES_ADD_FAIL,
    EXPENSES_ADD_SUCCESS,
    EXPENSES_AMOUNT_CHANGED
} from '../actions/action_constants';

const INITIAL_STATE = {
    error: '',
    loading: false,
    description: '',
    category: '',
    amount: ''
};

const objectToArray = (object) => {
    const arr = _.map(object, (val, key) => {
        return {val, key}
    });
    return arr;
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EXPENSES_DESCRIPTION_CHANGED:
            return {...state, description: action.payload};
        case CATEGORIES_FETCH_SUCCESS:
            return {...state, category: objectToArray(action.payload)[0].val};
        case EXPENSES_CATEGORY_CHANGED:
            return {...state, category: action.payload};
        case EXPENSES_AMOUNT_CHANGED:
            return {...state, amount: action.payload};
        case EXPENSES_ADD_FAIL:
            return {...state, error: 'Intente nuevamente'};
        case EXPENSES_ADD:
            return {...state, error: '', loading: true};
        case EXPENSES_ADD_SUCCESS:
            return INITIAL_STATE;
        default:
            return state;
    }
};