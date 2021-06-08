import * as OHAxios from '../axios/OHAxios';
import * as APIConstants from '../../variables/APIConstants';
import * as ActionType from '../../variables/ActionType';


// export function verifyEmail(email) {
//     return async function verifyEmailThunk(dispatch, getState) {
//         dispatch({ type: ActionType.EMAIL_VERIFICATION_PROGRESS })
//         const payload = { email };
//         await OHAxios.post(APIConstants.VERIFY_EMAIL, payload, dispatch, ActionType.EMAIL_VERIFICATION_SUCCESS, ActionType.EMAIL_VERIFICATION_FAILED);
//     }
// }

export function doLogin(payload) {
    return async function doLoginHunk(dispatch, getState) {
        dispatch({ type: ActionType.PWD_VERIFICATION_PROGRESS })
        await OHAxios.post(APIConstants.LOGIN, payload, dispatch, ActionType.PWD_VERIFICATION_SUCCESS, ActionType.PWD_VERIFICATION_FAILED)
    }
}


const authReducerDefaultState = {};
const authReducer = (state = authReducerDefaultState, action) => {
    console.log('authReducer STATE: ', state);
    console.log('Action: ', action);
    switch (action.type) {
        case ActionType.EMAIL_VERIFICATION_PROGRESS:
        case ActionType.PWD_VERIFICATION_PROGRESS:
            return {
                ...state,
                isFetchingDetails: true
            }
        case ActionType.EMAIL_VERIFICATION_SUCCESS:
            return {
                ...state,
                data: action.data,
                isFetchingDetails: false,
                isError: false,
                errorMsg: undefined,
                isEmailVerified: true
            }
        case ActionType.EMAIL_VERIFICATION_FAILED:
            return {
                ...state,
                data: null,
                isFetchingDetails: false,
                isError: true,
                errorMsg: "Email not registred"
            }
         case ActionType.PWD_VERIFICATION_SUCCESS:
            return {
                data: action.data,
                player: action.player,
                isFetchingDetails: false,
                isError: false,
                errorMsg: undefined,
                isPasswordVerified: true
            }
        case ActionType.PWD_VERIFICATION_FAILED:
            return {
                ...state,
                data: null,
                isFetchingDetails: false,
                isError: true,
                errorMsg: "Invalid password",
                isPasswordVerified: false
            }
        default:
            return state;
    }
};

export default authReducer;

