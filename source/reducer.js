import { SET__DATA } from './actions';

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case SET__DATA:
            console.log('SET__DATA in reducer: ', action.payload);
            const newData = {}
            newData[`${action.payload.dataSet}data`] = action.payload.data
            return { ...state, data: { ...state.data, ...newData } };
        default:
            return state;
    }
}
