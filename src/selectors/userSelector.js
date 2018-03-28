import { createSelector } from 'reselect';

const userListId = state => state.newsFeed.users.result;
const userList = state => state.newsFeed.users.entities.users;

export const userSelector = createSelector(
    [
        userListId,
        userList
    ],
    ( result, users ) => result.map(userId => users[userId])
);