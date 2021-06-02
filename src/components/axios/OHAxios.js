import axios from 'axios';
import axiosInstance from './AxiosNetworkInterceptors';


const handleSuccess = (response) => {
    console.log('handleSuccess: ', response);
    if (response.data.success) {
        return response.data;
    } else {
        return handleError(response)
    }
}

const handleError = (response) => {
    console.log('handleError: ', response);
    return response;
}

export const post = (path, payload) => {
    return axiosInstance.post(path, payload)
        .then((response) => { return handleSuccess(response) })
        .catch((error) => { return handleError(error) })
};

export const get = (path) => {
    return axiosInstance.get(path)
        .then((response) => { return handleSuccess(response) })
        .catch((error) => {  return handleError(error) })
};
