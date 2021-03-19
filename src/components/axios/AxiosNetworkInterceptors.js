import axios from "axios";
import * as APIConstants from '../../variables/APIConstants';

const TIMEOUT = 5000
const isHandlerEnabled = (config = {}) => {
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ?
        false : true
}

//Success handler
const successHandler = (response) => {
    if (isHandlerEnabled(response.config)) {
        console.log("Request Successss: " + response);
    }
    return response
}

//Error handler
const errorHandler = (error) => {
    if (isHandlerEnabled(error.config)) {
        console.log("Request error: " + error.config);
    }
    return Promise.reject({ ...error })
}

//Request handler
const requestHandler = (request) => {
    console.log('isHandlerEnabled: ', isHandlerEnabled(request))
    if (isHandlerEnabled(request)) {
        //   request.headers['X-CodePen'] = 'https://codepen.io/teroauralinna/full/vPvKWe'
        console.log("Sending request");
    }
    return request
}

const axiosInstance = axios.create({
    baseURL: APIConstants.BASE_URL,
    timeout: TIMEOUT,
    headers: {
        'user-type': 'player',
        'Content-Type': 'application/json',
        'api-key': 'G9w0BAQsFADAxMS8wLQYDVQQDEyZREFF',
        'api-secret': 'FADA0MTIwMAYDVQQDEylBREZTITEDCVB',
        'locale': 'en',
        'platform': 'WebApp'
    }
});

// Request interceptors]
axiosInstance.interceptors.request.use(
    request => requestHandler(request)
)

// Response interceptor
axiosInstance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
)


export default axiosInstance;