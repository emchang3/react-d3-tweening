import * as actions from './actions';

export const redistribute = (index, getState, dispatch) => {
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

export const setRadius = (index, getState, dispatch) => {
    return new Promise((resolve, reject) => {
        const startTime = new Date().getTime();

        const tweenTimer = setInterval(() => {
            const state = getState();
            const radialStati = state.radialStati;

            const step = Math.min(1, (new Date().getTime() - startTime) / 750);

            const current = radialStati[index];
            const target = state.radialTargets[index];
            const interValue = current + ((target - current) * step);

            dispatch(actions.setRadii([
                ...radialStati.slice(0, index),
                interValue,
                ...radialStati.slice(index + 1)
            ]));

            if (current === target) {
                clearInterval(tweenTimer);
                resolve(true);
            }
        }, 0.0001);
    });
};