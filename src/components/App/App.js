import React from 'react';
import Header from '../Header/Header';
import NewsFeedCotainer from '../../containers/NewsFeedContainer';
import DevTools from '../DevTools/DevTools';

import chalk from 'chalk';

import 'semantic-ui-css/semantic.min.css';
import 'loaders.css/loaders.min.css';
import './App.css';

const mainBlockStyle = props => ({
    display: 'flex',
    justifyContent: 'space-between'
});

const App = () => (
    <div className="App">
        <Header />
        <NewsFeedCotainer />
    </div>
);

export default App;