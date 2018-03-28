import React from 'react';
import { connect } from 'react-redux';

import './DevTools.css';

const devStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
};

const DevTools = () =>
    <div className='container'>
        <div className='titleBar' style={{ textAlign: 'center' }}>
            <span>ACTIONS</span>
            <span>DEV-TOOLS</span>
            <span>STATE</span>
        </div>

        <div className='devTools' style={ devStyle }>
            <ActionsBox />
            <StateBox />
        </div>
    </div>;

const ActionsBoxComponent = ({ actions }) =>
    <div className='actionsBox'>
        <h5>Actions</h5>
        <pre>{JSON.stringify(actions, null, 1)}</pre>
    </div>;

const mapState1 = ({ actions }) => ({ actions });
const ActionsBox = connect(mapState1)(ActionsBoxComponent);

const StateBoxComponent = state =>
    <div className='stateBox'>
        <h5>State</h5>
        <pre>{JSON.stringify(state, null, 1)}</pre>
    </div>;

const mapState2 = state => ({ ...state, actions: undefined });
const StateBox = connect(mapState2)(StateBoxComponent);

export default DevTools;
