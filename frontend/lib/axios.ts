import axios from 'axios';

const instance = axios.create({
    baseURL: "http://10.73.188.140:3001",
    timeout: 10000
})

instance.interceptors.request.use(function (request) {
    const token = localStorage.getItem("token")
    if(token) {
        request.headers["Authorization"] = `Bearer ${token}`
    }
    return request;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    const token = response.data.token;
    if (token) {
        localStorage.setItem("token", token);
    }

    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance;