import { isEqual } from 'lodash';

export const redistribute = (
    data: number[],
    setData: (data: number[]) => void,
    targets: number[]
) => {
    const startTime = new Date().getTime();

    const tweenTimer = setInterval(() => {
        const step = Math.min(1, (new Date().getTime() - startTime) / 2000);
        
        const interValues = data.map((d, i) => {
            return d + ((targets[i] - d) * step);
        });

        setData(interValues);

        if (isEqual(interValues, targets)) {
            clearInterval(tweenTimer);
        }
    }, 10);
};

export const setRadius = (
    radii: number[],
    setRadii: (data: number[]) => void,
    radialTargets: number[]
) => {
    const startTime = new Date().getTime();

    const tweenTimer = setInterval(() => {
        const step = Math.min(1, (new Date().getTime() - startTime) / 750);
        
        const interValues = radii.map((d, i) => {
            return d + ((radialTargets[i] - d) * step);
        });

        setRadii(interValues);

        if (isEqual(interValues, radialTargets)) {
            clearInterval(tweenTimer);
        }
    }, 10);

    return tweenTimer;
};