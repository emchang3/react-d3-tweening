import * as actionTypes from './actionTypes';

export const setData = (payload) => {
    return {
        type: actionTypes.SET__DATA,
        payload: payload
    };
};

export const tweenDistribution = (payload) => {
    return {
        type: actionTypes.TWEEN__DISTRIBUTION,
        payload: payload
    };
};