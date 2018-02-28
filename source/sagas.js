// import { , takeLatest } from 'redux-saga/effects';
import { all, put, takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as actions from './actions';

function* helloSaga() {
    console.log('--- INIT ---');
}

const animate = (index, getState, dispatch) => {
    return new Promise((resolve, reject) => {
        const startTime = new Date().getTime();

        const tweenTimer = setInterval(() => {
            const state = getState();
            const data = state.data;

            const step = Math.min(1, (new Date().getTime() - startTime) / 2000);

            const current = data[index];
            const target = state.targets[index];
            const interValue = current + ((target - current) * step);

            dispatch(actions.setData([
                ...data.slice(0, index),
                interValue,
                ...data.slice(index + 1)
            ]));

            if (current === target) {
                clearInterval(tweenTimer);
                resolve(true);
            }
        }, 0.0001);
    });
};

function* tweener(getState, dispatch, action) {
    // console.log('--- TWEEN ---');
    
    yield* animate(action.payload.index, getState, dispatch);
}

function* watchDistribution(getState, dispatch) {
    yield takeEvery(actionTypes.TWEEN__DISTRIBUTION, tweener, getState, dispatch);
}

export default function* rootSaga(getState, dispatch) {
    yield all([
        helloSaga(),
        watchDistribution(getState, dispatch)
    ]);
}