import {INCREMENT, DECREMENT, CHANGE_THEME, ENABLE_BUTTONS, DISABLE_BUTTONS} from './types';

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
        dispatch({type: DISABLE_BUTTONS});

        setTimeout(
            () => {
                dispatch({type: INCREMENT});
                dispatch({type: ENABLE_BUTTONS});
            },
            1500
        )
    };
}

export function disableButtons() {
    return {
        type: DISABLE_BUTTONS,
    };
}

export function enableButtons() {
    return {
        type: ENABLE_BUTTONS
    };
}

export function changeTheme(theme) {
    return {
        type: CHANGE_THEME,
        payload: theme,
    };
}