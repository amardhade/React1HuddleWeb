import * as ActionType from '../../variables/ActionType';
import * as OHAxios from '../axios/OHAxios';
import * as APIConstants from '../../variables/APIConstants';

export const verifyingEmailInProgress = () => ({
    type: ActionType.EMAIL_VERIFICATION_PROGRESS
})

export const verifyingEmailSuccess = (response) => ({
    type: ActionType.EMAIL_VERIFICATION_SUCCESS,
    data: response
})

export const verifyingEmailFailed = (error) => ({
    type: ActionType.EMAIL_VERIFICATION_FAILED
})

export const verifyEmail = (email) => {
    return async (dispatch, getState) => {
        try {
            dispatch(verifyingEmailInProgress());
            const payload = { email };
            await OHAxios.post(APIConstants.VERIFY_EMAIL, payload)
                .then((response) => { dispatch(verifyingEmailSuccess(response.data)); })
                .error((error) => { dispatch(verifyingEmailFailed(error)); })
        } catch {

        }
    }
}

export const doLoginInProgress = () => ({
    type: ActionType.PWD_VERIFICATION_PROGRESS
})

export const doLoginSuccess = (data) => ({
    type: ActionType.PWD_VERIFICATION_SUCCESS,
    data,
    player: data.player
})

export const doLoginFailed = () => ({
    type: ActionType.PWD_VERIFICATION_FAILED
})

export const doLogin = (payload) => {
    return async (dispatch, getState) => {
        try {
            dispatch(doLoginInProgress());
            await OHAxios.post(APIConstants.LOGIN, payload)
                .then((response) => { dispatch(doLoginSuccess(response.data)); })
                .error((error) => { dispatch(doLoginFailed(error)); })
        } catch {

        }
    }
}