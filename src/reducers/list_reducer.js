/**
 * Created by juanleyba on 4/24/17.
 */
import {
    EXPENSES_FETCH,
    EXPENSES_FETCH_SUCCESS,
    EXPENSES_FETCH_FAIL,
    MONTHLY_EXPENSES_FETCH,
    LAST_MONTH_EXPENSES_FETCH
} from '../actions/action_constants';

const INITIAL_STATE = {
    error: '',
    loading: false,
    expensesList: null,
    monthExpensesList: null,
    lastMonthExpensesList: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EXPENSES_FETCH_SUCCESS:
            return {...state, expensesList: action.payload, loading: false};
        case EXPENSES_FETCH:
            return {...state, expensesList: action.payload, loading: true};
        case MONTHLY_EXPENSES_FETCH:
            return {...state, monthExpensesList: action.payload, loading: false};
        case LAST_MONTH_EXPENSES_FETCH:
            return {...state, lastMonthExpensesList: action.payload, loading: false};
        case EXPENSES_FETCH_SUCCESS:
            return {...state, expensesList: action.payload, loading: false};
        case EXPENSES_FETCH_FAIL:
            return {...state, error: 'Error de Firebase', loading: false};
        default:
            return state;
    }
};