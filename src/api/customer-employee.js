import axios from "axios";

const instance = axios.create({
    baseURL: 'https://6582a30f02f747c83679c3ee.mockapi.io/api/v1',
});

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance