import axios from 'axios';
import axiosInstance from './AxiosNetworkInterceptors';


const handleSuccess = (response) => {
    console.log('handleSuccess: ', response);
    return response;
}

const handleError = (error) => {
    console.log('handleError: ', error);
    // ToDo Show error notification
    return error;
}

export const post = (path, payload) => {
    return axiosInstance.post(path, payload)
        .then((response) => {
            if (response.data.success) { return handleSuccess(response.data) }
            else { return handleError({message: response.data.message, messageCode: response.data.message_code}) }
        })
        .catch((error) => { return handleError(error) })
};

export const get = (path) => {
    return axiosInstance.get(path)
        .then((response) => {
            console.log('Server res: ', response);
            if (response.data.success) { return handleSuccess(response.data) }
            else { return handleError({message: response.data.message, messageCode: response.data.message_code}) }
        })
        .catch((error) => { return handleError(error) })
};
