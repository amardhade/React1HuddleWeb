import * as ActionType from '../../variables/ActionType';
import * as OHAxios from '../axios/OHAxios';
import * as APIConstants from '../../variables/APIConstants';

export function fetchGames() {
    return async function fetchGamesThunk(dispatch, getState) {
        dispatch({ type: ActionType.GAMES_FETCHING_PROGRESS })
        await OHAxios.get(APIConstants.GET_GAMES, dispatch, ActionType.GAMES_FETCHING_SUCCESS, ActionType.GAMES_FETCHING_ERROR);
    }
}


const defaultGames = [];
const gameReducer = (games = defaultGames, action) => {
    switch (action.type) {
        case ActionType.GAMES_FETCHING_PROGRESS:
            return {
                fetchingGames: true,
                fetchingGamesSuccess: false,
                fetchingGamesError: false,
                errorMsg: undefined
            }
        case ActionType.GAMES_FETCHING_SUCCESS:
            return {
                games: action.response.data.data.games,
                fetchingGames: false,
                fetchingGamesSuccess: true,
                fetchingGamesError: false,
                errorMsg: undefined
            }
        case ActionType.GAMES_FETCHING_ERROR:
            return {
                fetchingGames: false,
                fetchingGamesSuccess: false,
                fetchingGamesError: true,
                errorMsg: "Something went wrong, while fetching games"
            }
        default:
            return games;
    }
}

export default gameReducer;