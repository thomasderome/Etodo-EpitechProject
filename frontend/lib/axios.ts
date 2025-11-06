import axios from 'axios';

axios.create({
    baseURL: process.env.API_URL,
    timeout: 10000
})

export default axios;