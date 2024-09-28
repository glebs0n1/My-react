import { combineReducers } from 'redux';
import someReducer from './someReducer'; // Example reducer

const rootReducer = combineReducers({
    someState: someReducer,
    // Add more reducers here
});

export default rootReducer;