import * as actionTypes from './actionTypes';

export const reducer = (state = {}, action) => {
    const payload = action.payload;

    switch (action.type) {
        case actionTypes.SET__DATA:
            return { ...state, data: payload };
        case actionTypes.TWEEN__DISTRIBUTION:
            return { ...state, targets: payload };
        case actionTypes.SET__RADII:
            return { ...state, radialStati: payload };
        case actionTypes.TWEEN__RADII:
            return { ...state, radialTargets: payload };
        case actionTypes.SET__SOCKET_STATUS:
            return { ...state, socketConnected: payload };
        default:
            return state;
    }
};