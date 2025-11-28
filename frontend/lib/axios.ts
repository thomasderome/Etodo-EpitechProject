import axios from 'axios';

const host = process.env.NEXT_PUBLIC_HOST_API || 'http://127.0.0.1:3001';
const instance = axios.create({
    baseURL: host,
    timeout: 10000,
});

instance.interceptors.request.use(
    function (request) {
        const token = localStorage.getItem('token');
        if (token) {
            request.headers['Authorization'] = `Bearer ${token}`;
        }
        return request;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        const token = response.data.token;
        if (token) {
            localStorage.setItem('token', token);
        }

        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;
