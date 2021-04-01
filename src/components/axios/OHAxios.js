import axios from 'axios';
import axiosInstance from './AxiosNetworkInterceptors';


const handleSuccess = (response, dispatch, actionTypeSuccess, actionTypeError) => {
    console.log('Handle sucess');
    if (response.data.success) {
        dispatch({ type: actionTypeSuccess, response });
    } else {
        dispatch({ type: actionTypeError, response })
    }
}

const handleError = (error, dispatch, actionTypeError) => {
    console.log('Handle error');
    dispatch({ type: actionTypeError, error })
}

export const post = (path, payload, dispatch, actionTypeSuccess, actionTypeError) => {
    console.log('Posting details')
    axiosInstance.post(path, payload)
        .then((response) => { handleSuccess(response, dispatch, actionTypeSuccess, actionTypeError) })
        .catch((error) => { handleError(error, dispatch, actionTypeError) })
};
