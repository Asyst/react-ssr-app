import fs from 'fs';
import path from 'path';
import React from 'react';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import { renderToString } from 'react-dom/server';
import ignoreStyles from 'ignore-styles';
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import router from './api';

import { api } from '../src/api';

// Normalizr
import { normalize } from 'normalizr';
import * as schema from '../src/actions/schema';

// App Components
import App from '../src/components/App/App';
import configureStore from '../src/store/configureStore';

import createSagaMiddleware from 'redux-saga';
import rootSaga from '../src/sagas';

const sagaMiddleware = createSagaMiddleware();

import chalk from 'chalk';


// import initialData from '../db-1521454816842.json';

const app = express();

app.set('port', 3001);

global.React = React;

// const normalizedData = normalize(initialData, schema.userListSchema);

let initialState = {
    newsFeed: {
        users: {}
    }
};

api.users.get().then((resp) => {
    const normalizedData = normalize(resp.data, schema.userListSchema);
    initialState.newsFeed.users = normalizedData;

    const serverStore = configureStore(sagaMiddleware, initialState);

    sagaMiddleware.run(rootSaga);

    serverStore.subscribe(() =>
        fs.writeFile(
        path.join(__dirname, './db-1520118402996.json'),
        JSON.stringify(serverStore.getState()),
        error => (error) 
                ? console.log("Error saving state!", error) 
                : null
        )
    )

    const logger = (req, res, next) => {
        console.log(`${req.method} request for '${req.url}'`);
        next();
    }

    const staticCSS = fs.readFileSync(path.join(__dirname, '../build/assets/css/bundle.css'));

    const templateSpec = renderToString(
        <Provider store={ serverStore }>
            <App />
        </Provider>
    );

    const renderFullPage = (html, staticCSS, preloadedState) => {
        return `
            <!doctype>
            <html>
                <head>
                    <title>React SSR</title>

                    <style>${ staticCSS }</style>
                    <link rel="stylesheet" href="assets/css/bundle.css" />
                </head>
                <body>
                    <div id="root">${html}</div>

                    <script>
                        // WARNING: See the following for security issues around embedding JSON in HTML:
                        // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
                        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
                    </script>
                    <script src="bundle.js"></script>
                </body>
            </html>
        `;
    };

    const addStoreToRequestPipeline = (req, res, next) => {
        req.store = serverStore
        next()
    }

    const handleRender = (req, res) => {

        res.send(renderFullPage(templateSpec, staticCSS, initialState));
    };


    app
        .use(logger)
        .use(express.static('./build'))
        .use(bodyParser.json())
        .use(addStoreToRequestPipeline)
        .use('/api', router)
        .use(handleRender)

    app.listen(app.get('port'), () =>  console.log(`Recipe app running at http://localhost:${app.get('port')}`))
});