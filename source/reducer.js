import * as actionTypes from './actionTypes';

export const reducer = (state = {}, action) => {
    const payload = action.payload;

    switch (action.type) {
        case actionTypes.SET__DATA:
            // console.log('SET__DATA in reducer:', payload);

            return { ...state, data: payload };
        case actionTypes.TWEEN__DISTRIBUTION:
            // console.log('TWEEN__DISTRIBUTION in reducer:', payload);

            const index = payload.index;
            const targets = state.targets;

            return {
                ...state,
                targets: [
                    ...targets.slice(0, index),
                    payload.value,
                    ...targets.slice(index + 1)
                ]
            };
        case actionTypes.SET__RADII:
            return { ...state, radialStati: payload };
        case actionTypes.TWEEN__RADII:
            console.log('TWEEN__RADII in reducer:', payload);

            return {
                ...state,
                radialTargets: payload
            };
        default:
            return state;
    }
};