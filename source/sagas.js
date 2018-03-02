// import { , takeLatest } from 'redux-saga/effects';
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as actions from './actions';

import { redistribute, setRadius } from './animations';

function* helloSaga() {
    console.log('--- INIT ---');
}

function* tweenDist(getState, dispatch, action) {
    const args = action.payload.map((val, idx) => {
        return [ idx, getState, dispatch ];
    });

    yield all([
        call(redistribute, ...args[0]),
        call(redistribute, ...args[1]),
        call(redistribute, ...args[2]),
        call(redistribute, ...args[3]),
        call(redistribute, ...args[4])
    ]);
}

function* tweenRad(getState, dispatch, action) {
    const args = action.payload.map((val, idx) => {
        return [ idx, getState, dispatch ];
    });

    yield all([
        call(setRadius, ...args[0]),
        call(setRadius, ...args[1]),
        call(setRadius, ...args[2]),
        call(setRadius, ...args[3]),
        call(setRadius, ...args[4])
    ]);
}

function* watchDistribution(getState, dispatch) {
    yield takeEvery(
        actionTypes.TWEEN__DISTRIBUTION,
        tweenDist,
        getState,
        dispatch
    );
}

function* watchRadii(getState, dispatch) {
    yield takeEvery(
        actionTypes.TWEEN__RADII,
        tweenRad,
        getState,
        dispatch
    );
}

export default function* rootSaga(getState, dispatch) {
    yield all([
        helloSaga(),
        watchDistribution(getState, dispatch),
        watchRadii(getState, dispatch)
    ]);
}