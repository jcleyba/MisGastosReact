/**
 * Created by juanleyba on 4/21/17.
 */
import firebase from 'firebase';
import {AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
    ID_CHANGED,
    FETCH_CREDENTIALS,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    FETCH_CREDENTIALS_FAIL
} from './action_constants';

export const idChanged = (text) => {
    return {
        type: ID_CHANGED,
        payload: text
    };
};

export const fetchCredentials = () => {
    return (dispatch) => {
        dispatch({type: FETCH_CREDENTIALS});
        try {
            const value = AsyncStorage.getItem('@AsyncStorageExample:userId');
            if (value !== null) {
                value.then((res) => {
                    if (res) {
                        loginUserSuccess(dispatch, res)
                    }
                    else {
                        fetchCredentialsFail(dispatch);
                    }
                })
            }
        } catch (error) {
            loginUserFail(dispatch);
        }
    }

};

export const loginUser = ({userId}) => {
    return (dispatch) => {
        try {
            AsyncStorage.setItem('@AsyncStorageExample:userId', userId, (user) => {
                loginUserSuccess(dispatch, userId);

            });
        } catch (error) {
            loginUserFail(dispatch)
        }
    }
};

const fetchCredentialsFail = (dispatch) => {
    dispatch({type: FETCH_CREDENTIALS_FAIL})
}
const loginUserFail = (dispatch) => {
    dispatch({type: LOGIN_USER_FAIL});
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    Actions.tabbar({type: 'reset'})
};
