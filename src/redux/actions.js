import {INCREMENT, DECREMENT, CHANGE_THEME} from './types';

export function increment() {
    return {
        type: INCREMENT,
    }
}

export function decrement() {
    return {
        type: DECREMENT,
    }
}

export function asyncIncrement() {
    return dispatch => {
        setTimeout(
            () => dispatch({type: INCREMENT}), 
            1500
        )
    };
}

export function changeTheme(theme) {
    return {
        type: CHANGE_THEME,
        payload: theme,
    };
}