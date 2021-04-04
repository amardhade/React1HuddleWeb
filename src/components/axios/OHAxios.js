import axios from 'axios';
import axiosInstance from './AxiosNetworkInterceptors';


const handleSuccess = (response, dispatch, actionTypeSuccess, actionTypeError) => {
    if (response.data.success) {
        dispatch({ type: actionTypeSuccess, response });
    } else {
        dispatch({ type: actionTypeError, response })
    }
}

const handleError = (error, dispatch, actionTypeError) => {
    dispatch({ type: actionTypeError, error })
}

export const post = (path, payload, dispatch, actionTypeSuccess, actionTypeError) => {
    axiosInstance.post(path, payload)
        .then((response) => { handleSuccess(response, dispatch, actionTypeSuccess, actionTypeError) })
        .catch((error) => { handleError(error, dispatch, actionTypeError) })
};

export const get = (path, dispatch, actionTypeSuccess, actionTypeError) => {
    axiosInstance.get(path)
        .then((response) => { handleSuccess(response, dispatch, actionTypeSuccess, actionTypeError) })
        .catch((error) => { handleError(error, dispatch, actionTypeError) })
};
