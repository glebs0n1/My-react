import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Correct import as a named export
import rootReducer from './reducers'; // Make sure this path is correct and rootReducer is exported properly

const store = createStore(
    rootReducer,
    applyMiddleware(thunk) // Use the named import here
);

export default store;