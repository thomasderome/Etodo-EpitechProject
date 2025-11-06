import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.API_URL,
    timeout: 10000
})

export default instance;