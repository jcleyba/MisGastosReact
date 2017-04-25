/**
 * Created by juanleyba on 4/21/17.
 */
import {combineReducers} from 'redux';
import AuthReducer from './auth_reducer';
import CategoriesReducer from './categories_reducer';
import ListReducer from './list_reducer';
import ExpensesReducer from './expenses_reducer';

export default combineReducers({
    userId: '31357915',
    auth: AuthReducer,
    categories: CategoriesReducer,
    expenses: ListReducer,
    expense_addition: ExpensesReducer
});