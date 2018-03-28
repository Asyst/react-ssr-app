import { call, put, all, takeEvery } from 'redux-saga/effects';

import { watchUsers, watchLoadMore } from './usersSaga';

// console.log('watchUsers -> ', watchUsers);

export default function* rootSaga () {
    yield all([
        watchUsers(),
        watchLoadMore()
    ]);
}