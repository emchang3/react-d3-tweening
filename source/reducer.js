export const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'expression':
            return { ...state, attribute: action.payload };
        default:
            return state;
    }
}
