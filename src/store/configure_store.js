// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const enhancer = compose(
    applyMiddleware(
        createLogger(),
    ),
);

function configureStore(initialState: any) {
    const store = createStore(rootReducer, initialState, enhancer);
    return store;
}

export default configureStore;
