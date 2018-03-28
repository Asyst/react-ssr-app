import axios from 'axios';

const host = 'http://localhost:3001';
const host2 = 'http://localhost:3000';

export const api = {
    users: {
        get() {
            return axios({
                method: 'GET',
                url: `${host2}/people?_start=1&_limit=10`
            });
        },
        loadMore(id) {
            return axios({
                method: 'GET',
                url: `${host2}/people?_start=${++id}&_limit=10`
            });
        }
    }
};