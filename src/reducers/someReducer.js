const initialState = {
    someData: null,
};

const someReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SOME_DATA':
            return {
                ...state,
                someData: action.payload,
            };
        default:
            return state;
    }
};

export default someReducer;