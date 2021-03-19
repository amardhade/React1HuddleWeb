import * as OHAxios from '../axios/OHAxios';
import * as APIConstants from '../../variables/APIConstants'
import thunk from 'redux-thunk';



export function verifyEmail(email) {
    return async function verifyEmailThunk(dispatch, getState) {
        dispatch({ type: 'VERIFYING_EMAIL' })
        const payload = { email };
        await OHAxios.post(APIConstants.VERIFY_EMAIL, payload, dispatch);
    }
}


const authReducerDefaultState = {
    data: {},
    isFetchingDetails: false,
    errorMsg: undefined,
    isError: false
};
const authReducer = (state = authReducerDefaultState, action) => {
    console.log('authReducer STATE: ', state);
    switch (action.type) {
        case 'VERIFYING_EMAIL':
            return {
                ...state,
                isFetchingDetails: true
            }
        case 'EMAIL_VERIFIED_SUCCESS':
            console.log('Email verified succes: ', action);
            return {
                ...state,
                data: action.data,
                isFetchingDetails: false,
                isError: false,
                errorMsg: undefined,
                isEmailVerified: true
            }
        case 'EMAIL_VERIFIED_FAILED':
            console.log('Email verified failed: ', action);
            const response = action.response.data;
            return {
                ...state,
                data: response.data,
                isFetchingDetails: false,
                isError: true,
                errorMsg: response.message
            }
        default:
            return state;
    }
};

export default authReducer;

