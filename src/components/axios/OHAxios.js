import axios from 'axios';
import axiosInstance from './AxiosNetworkInterceptors';


const handleSuccess = (response, dispatch) => {
    console.log('Global handle success response: ', response);
    if(response.data.success){
        dispatch({ type: 'EMAIL_VERIFIED_SUCCESS', response});
    } else {
        dispatch({ type: 'EMAIL_VERIFIED_FAILED', response})
    }
}

const handleError = (error, dispatch) => {
    console.log('Global handle error response: ', error);
    dispatch({ type: 'EMAIL_VERIFIED_FAILED', error})
}

export const post = (path, payload, dispatch) => {
    axiosInstance.post(path, payload)
        .then((response) => { handleSuccess(response, dispatch) })
        .catch((error) => { handleError(error, dispatch) })
};
