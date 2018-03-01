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

export const setRadii = (payload) => {
    return {
        type: actionTypes.SET__RADII,
        payload: payload
    };
};

export const tweenRadii = (payload) => {
    return {
        type: actionTypes.TWEEN__RADII,
        payload: payload
    };
};