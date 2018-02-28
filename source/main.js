import 'babel-polyfill';

import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'; // eslint-disable-line no-unused-vars
import createSagaMiddleware from 'redux-saga';

import { App } from './app';
import { reducer } from './reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const initialState = {
    data: [ 4, 8, 12, 16, 20 ],
    targets: [ 4, 8, 12, 16, 20 ]
};

export const store = createStore(reducer, initialState, compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

sagaMiddleware.run(rootSaga, store.getState, store.dispatch);

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
};

render();