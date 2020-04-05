import './styles.css'
import {applyMiddleware, createStore, compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import {rootReducer} from './redux/rootReducer';
import {increment, decrement, asyncIncrement, changeTheme} from './redux/actions';

const counter = document.getElementById('counter'); 
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');


function logger(middlewareAPI) {
    return function(next) {
        return function(action) {
            console.log('Logger', middlewareAPI, next, action)
            return next(action);
        }
    }
}

function asyncMiddleware(middlewareAPI) {
    return function(next) {
        return function(action) {
            return typeof action === 'function'
                ? action(store.dispatch, store.getState)
                : next(action);
        }
    }
}

const timeoutMiddleware = store => next => action => {
    if (!action.meta && !(action.meta || {}).delay) {
        return next(action);
    }

    const timerId = setTimeout(() => next(action), action.meta.delay);

    return function() {
        clearTimeout(timerId);
    };
}


// If redux-dev-tools are not installed
/* const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
); */


const store = createStore(
    rootReducer,
    composeWithDevTools(
        // applyMiddleware(thunk, logger), // (createStore) => () => {}
        applyMiddleware(asyncMiddleware, timeoutMiddleware, logger),
    ),
);

// 1. createStore() - вызвали createStore
// 2. applyMiddleware(createStore) - под капотом вызываем улучщатели, чтобы затем пройти с ними createStore. 
// Возвращается функция fn();, которую позднее вызовем с параметрами reducer, preloadedState
// 3. fn() = [thunk, logger].map(f => f(middlewareAPI)) - внутри applyMiddleware проходимся по списку улучшателей
// и вызываем их на middlewareAPI - усеченной версии stor'a (по сути здесь цепочка функций, которые должны быть применены последовательно)
//  [function(thunkNext){}, function(loggerNext){}]
// 4. Проходимся по этому массиву и возвращаем функицю, которая последовательно применит next'ы из списка
// 5. Это наш новый dispatch - прежде чем вызвать function(action) {}, он будет каждый раз при вызове store.dispatch ходить по массиву улучшателей и вызывать их

addBtn.addEventListener('click', () => {
    store.dispatch(increment());
});
subBtn.addEventListener('click', () => {
    store.dispatch(decrement());
});
asyncBtn.addEventListener('click', ()=> {
    store.dispatch(asyncIncrement());
});
themeBtn.addEventListener('click', () => {
    const state = store.getState();
    const theme = state.theme.value === 'light' ? 'dark' : 'light';
    store.dispatch(changeTheme(theme));
});

store.subscribe(() => {
    const state = store.getState();

    counter.textContent = state.counter;
    document.body.classList.remove('light', 'dark');
    document.body.classList.toggle(state.theme.value);

    [addBtn, subBtn, themeBtn, asyncBtn].forEach(
        btn => btn.disabled = state.theme.disabled
    )
});
store.dispatch({type: 'INIT_APPLICATION'});