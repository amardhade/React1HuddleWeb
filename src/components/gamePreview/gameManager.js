import * as ActionType from '../../variables/ActionType';
import * as OHAxios from '../axios/OHAxios';
import * as APIConstants from '../../variables/APIConstants';


export const createGameSessionInprogress = () => ({
    type: ActionType.CREATING_GAME_SESSION
})

export const createGameSessionSuccess = (gameSessionId) => ({
    type: ActionType.CREATING_GAME_SESSION_SUCCESS,
    gameSessionId
})

export const createGameSessionFailed = (error) => ({
    type: ActionType.CREATING_GAME_SESSION_FAILED,
    error
})


export const createGameSession = (payload) => {
    return async (dispatch, getState) => {
        try {
            dispatch(createGameSessionInprogress());
            await OHAxios.post(APIConstants.CREATING_GAME_SESSION, payload)
                .then((response) => {
                    console.log('Data: ', response);
                    const gameSessionId = response.data.game_session_id;
                    dispatch(createGameSessionSuccess(gameSessionId));
                })
                .error((error) => {
                    dispatch(createGameSessionFailed(error));
                })
        } catch {

        }
    }
}

export const getGameDetailsInprogress = () => ({
    type: ActionType.FETCHINNG_GAME_CATEGORIES,
    gameCategories: undefined
})

export const getGameDetailsSuccess = (gameCategories) => ({
    type: ActionType.FETCHINNG_GAME_CATEGORIES_SUCCESS,
    gameCategories,
    error: undefined
})

export const getGameDetailsFailed = (error) => ({
    type: ActionType.FETCHINNG_GAME_CATEGORIES_FAILED,
    gameCategories: undefined,
    error
})


export const getGameDetails = (game, playerId, companyId) => {
    return async (dispatch, getState) => {
        try {
            dispatch(getGameDetailsInprogress());
            const path = `${APIConstants.FETCH_QUESTIONS}?game_session_id=${game.gameSessionId}&game_id=${game.game_id}&player_id=${playerId}&company_id=${companyId}`;
            await OHAxios.get(path).then((response) => {
                console.log('Response: ', response);
                const gameCategories = response.data.game_categories;
                dispatch(getGameDetailsSuccess(gameCategories));
            })
            .error((error) => { 
                dispatch(getGameDetailsFailed(error));
            })
        } catch {

        }
    }
}