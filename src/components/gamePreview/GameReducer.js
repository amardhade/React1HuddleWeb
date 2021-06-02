import * as ActionType from '../../variables/ActionType';
import * as OHAxios from '../axios/OHAxios';
import * as APIConstants from '../../variables/APIConstants';


// export function getGameSession(payload) {
//     return async function createGameSessionThunk(dispatch, getState) {
//         dispatch({ type: ActionType.CREATING_GAME_SESSION })
//         await OHAxios.post(APIConstants.CREATING_GAME_SESSION, payload, dispatch,
//             ActionType.CREATING_GAME_SESSION_SUCCESS, ActionType.CREATING_GAME_SESSION_FAILED);
//     }
// }

// export function fetchGameDetails(game, playerId, companyId) {
//     return async function fetchGameDetailsThunk(dispatch, getState) {
//         dispatch({ type: ActionType.FETCHINNG_GAME_CATEGORIES })
//         const path = `${APIConstants.FETCH_QUESTIONS}?game_session_id=${game.gameSessionId}&game_id=${game.game_id}&player_id=${playerId}&company_id=${companyId}`;
//         await OHAxios.get(path, dispatch,
//             ActionType.FETCHINNG_GAME_CATEGORIES_SUCCESS, ActionType.FETCHINNG_GAME_CATEGORIES_FAILED);
//     }
// }


const defaultGame = {
    game: null,
    error: null,
    creatingGameSession: false,
    fetchingGameDetails: false
};
const gameReducer = (game = defaultGame, action) => {
    console.log('Action: ', action);
    switch (action.type) {
        case ActionType.CREATING_GAME_SESSION:
            return {
                creatingGameSession: true,
                gameSessionId: undefined
            }
        case ActionType.CREATING_GAME_SESSION_SUCCESS:
            return {
                creatingGameSession: false,
                gameSessionId: action.gameSessionId,
                error: undefined
            }
        case ActionType.CREATING_GAME_SESSION_FAILED:
            return {
                creatingGameSession: false,
                gameSessionId: undefined,
                error: action.error
            }
        case ActionType.FETCHINNG_GAME_CATEGORIES:
            return {
                fetchingGameDetails: true,
                catrgories: []
            }
        case ActionType.FETCHINNG_GAME_CATEGORIES_SUCCESS:
            return {
                fetchingGameDetails: false,
                catrgories: action.gameCategories
            }
        case ActionType.FETCHINNG_GAME_CATEGORIES_FAILED:
            return {
                fetchingGameDetails: false,
                catrgories: []
            }
        default:
            return game;    
    }
}

export default gameReducer;