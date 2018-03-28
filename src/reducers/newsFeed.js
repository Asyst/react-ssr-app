import { combineReducers } from 'redux';
import { normalize } from 'normalizr';
import * as schema from '../actions/schema';

const initialState = {};

const newsFeed = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_USERS':
            return {
                ...state,
                isLoading: true
            };
        case 'FETCH_USERS_SUCCESS':
            return {
                ...state, 
                // users.entities.users: {...action.payload.entities.users},
                users: {
                    entities: {
                        users: { ...state.users.entities.users, ...action.payload.entities.users }
                    },
                    result: [...state.users.result, ...action.payload.result]
                },
                isLoading: false
            }
        case 'LOAD_MORE':
            return {
                ...state,
                isLoading: true
            };
        case 'LOAD_MORE_SUCCESS':
            console.log('state reducer -> ', state);
            console.log('state reducer -> ', action.payload);
            return {
                ...state, 
                // users.entities.users: {...action.payload.entities.users},
                users: {
                    entities: {
                        users: { ...state.users.entities.users, ...action.payload.entities.users }
                    },
                    result: [...state.users.result, ...action.payload.result]
                },
                isLoading: false
            }
        default:
            return state;
    }
}

export default newsFeed;