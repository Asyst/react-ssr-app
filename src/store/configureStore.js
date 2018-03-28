import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
// import { connectRoutes } from 'redux-first-router';
// import Raven from 'raven-js';
// import createRavenMiddleware from 'raven-for-redux';

// import { loadState, saveState } from '../localStorage';

// import routesMap from '../routesMap';
// import options from '../options';

import * as reducers from '../reducers';

export default (sagaMiddleware, persistedState) => {
    // const { 
    //     enhancer,
    //     reducer,
    //     middleware
    // } = connectRoutes(history, routesMap, options);
    // const persistedState = loadState();

    console.log('reducers -> ', reducers);

    const rootReducer = combineReducers(reducers);
    const middlewares = applyMiddleware(sagaMiddleware);

    // console.log('persistedState -> ', persistedState);

    return createStore(rootReducer, persistedState, compose(middlewares));
};