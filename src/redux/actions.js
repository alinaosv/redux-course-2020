import {INCREMENT, DECREMENT} from './types';

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