import axios from 'axios';
import axiosInstance from './AxiosNetworkInterceptors';


const handleSuccess = (response) => {
    console.log('handleSuccess Response: ', response);
}

const handleError = (error) => {
    console.log('handleError Error: ', error);
}

export const post = (path, payload) => {
    axiosInstance.post(path, payload)
        .then((response) => { handleSuccess(response) })
        .catch((error) => { handleError(error) })
};
