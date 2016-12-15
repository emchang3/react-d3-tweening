export const SET__DATA = 'SET__DATA';

export const setData = (payload) => {
    return {
        type: SET__DATA,
        payload: payload
    }
}
