import axios from 'axios';
import axiosInstance from './AxiosNetworkInterceptors';


const handleSuccess = (response) => {
    console.log('handleSuccess: ', response);
    return response;
}

const handleError = (response) => {
    console.log('handleError: ', response);
    // ToDo Show error notification
    return response;
}

export const post = (path, payload) => {
    return axiosInstance.post(path, payload)
        .then((response) => {
            if (response.data.success) { return handleSuccess(response.data) }
            else { return handleError(response.data) }
        })
        .catch((error) => { return handleError(error) })
};

export const get = (path) => {
    return axiosInstance.get(path)
        .then((response) => {
            if (response.data.success) { return handleSuccess(response.data) }
            else { return handleError(response.data) }
        })
        .catch((error) => { return handleError(error) })
};
