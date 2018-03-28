export const fetchUsersAction = () => {
    console.log('FETCH_USERS');
    return {type: 'FETCH_USERS'};
};

export const loadMoreAction = (id) => {
    console.log('LOAD_MORE ACTION');
    return { type: 'LOAD_MORE', payload: id };
};