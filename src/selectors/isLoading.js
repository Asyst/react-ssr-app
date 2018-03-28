import { createSelector } from 'reselect';

export const isLoading = createSelector(
    [
        state => state.newsFeed.isLoading
    ],
    isLoading => isLoading
);