import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store'; // './store' should be relative to 'src'
import App from './App'; // './App' should also be relative to 'src'

ReactDOM.render( <
    Provider store = { store } >
    <
    App / >
    <
    /Provider>,
    document.getElementById('root')
);