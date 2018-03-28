import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

import { loadState, saveState } from './localStorage';

import App from './components/App/App';

// import inititalState from '../db.json';

window.React = React;

const sagaMiddleware = createSagaMiddleware();

const persistedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

export const store = configureStore(sagaMiddleware, persistedState);

sagaMiddleware.run(rootSaga);

ReactDOM.hydrate(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);