import {combineReducers} from 'redux';
import {INCREMENT, DECREMENT, CHANGE_THEME, ENABLE_BUTTONS, DISABLE_BUTTONS} from './types';

function counterReducer(state = 0, action) {
    if (action.type === INCREMENT) return state + 1;

    if (action.type === DECREMENT) return state - 1;

    return state;
}

const initialThemeState = {
    value: 'light',
    disabled: false,
};

function themeReducer(state = initialThemeState, action) {
    if (action.type === CHANGE_THEME) return {
        ...state,
        value: action.payload,
    }

    if (action.type === ENABLE_BUTTONS) return {
        ...state,
        disabled: false,
    }

    if (action.type === DISABLE_BUTTONS) return {
        ...state,
        disabled: true,
    }
    
    return state;
}

export const rootReducer = combineReducers({
    counter: counterReducer,
    theme: themeReducer,
});
