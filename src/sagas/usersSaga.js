import { call, put, takeEvery } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import * as schema from '../actions/schema';

import { api } from '../api';

export function* fetchUsers (action) {
    // console.log('api.users.get 1 -> ', api.users.get);

    try {
        // console.log('api.users.get -> ', api.users.get);
        const response = yield call(api.users.get);
        // console.log('saga response -> ', response);
        if (response.status === 200) {
            const normalizedResponse = normalize(response.data, schema.userListSchema);
            yield put({ type: 'FETCH_USERS_SUCCESS', payload: normalizedResponse});
        }
        else {
            yield put({ type: 'FETCH_USERS_FAILED', payload: response.error});
        }
        
    }
    catch(e) {
        yield put({ type: 'FETCH_USERS_FAILED', message: e.message});
    }
}

export function* watchUsers() {
    yield takeEvery('FETCH_USERS', fetchUsers);
}

function* loadMoreSaga(action) {
    console.log('load more -> ', action);
    try {
        console.log('load more api -> ', api.users.loadMore);
        const response = yield call(api.users.loadMore, action.payload);
        
        if (response.status === 200) {
            console.log('load more 200 -> ', response);

            const normalizedResponse = normalize(response.data, schema.userListSchema);

            yield put({ type: 'LOAD_MORE_SUCCESS', payload: normalizedResponse });
        }
        else {
            yield put({ type: 'LOAD_MORE_FAILED', payload: response.error });
        }
    }
    catch(e) {
        yield put({ type: 'LOAD_MORE_FAILED', message: e.message });
    }
}

export function* watchLoadMore() {
    yield takeEvery('LOAD_MORE', loadMoreSaga);
}