import axios from 'axios';
import axiosInstance from './AxiosNetworkInterceptors';


const handleSuccess = (response) => {
    console.log('handleSuccess: ', response);
    if (response.data.success) {
        return response
    } else {
        return handleError(response)
    }
}

const handleError = (response) => {
    console.log('handleError: ', response);
    return response;
}

export const post = (path, payload, dispatch, actionTypeSuccess, actionTypeError) => {
    axiosInstance.post(path, payload)
        .then((response) => { handleSuccess(response) })
        .catch((error) => { handleError(error) })
};

export const get = (path, dispatch, actionTypeSuccess, actionTypeError) => {
    return axiosInstance.get(path)
        .then((response) => { return handleSuccess(response) })
        .catch((error) => {  return handleError(error) })
};
