import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import * as reducers from './ducks';

export function configureStore( initialState = { }) {

    return createStore(
        combineReducers( reducers ),
        initialState,
        applyMiddleware(thunk)
    );

}