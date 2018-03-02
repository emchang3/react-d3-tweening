import 'babel-polyfill';

import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'; // eslint-disable-line no-unused-vars
import createSagaMiddleware from 'redux-saga';

import { App } from './app';
import { reducer } from './reducer';
import { tweenDistribution, setSocketStatus } from './actions';
import rootSaga from './sagas';
import socket from './socket';

const sagaMiddleware = createSagaMiddleware();

const initialState = {
    data: [ 4, 8, 12, 16, 20 ],
    targets: [ 4, 8, 12, 16, 20 ],
    radialStati: [ 1, 1, 1, 1, 1 ],
    radialTargets: [ 1, 1, 1, 1, 1 ],
    socketConnected: false
};

export const store = createStore(reducer, initialState, compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

sagaMiddleware.run(rootSaga, store.getState, store.dispatch);

if (socket.connected) store.dispatch(setSocketStatus(true));

socket.on('data', (data) => store.dispatch(tweenDistribution(data)));

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
};

render();