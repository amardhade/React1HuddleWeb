import * as ActionType from '../../variables/ActionType';
import * as OHAxios from '../axios/OHAxios';
import * as APIConstants from '../../variables/APIConstants';

export const fetchingGamesSuccess = (games) => ({
    type: ActionType.GAMES_FETCHING_SUCCESS,
    games,
    error: null
})

export const fetchingGames = () => ({
    type: ActionType.GAMES_FETCHING_PROGRESS,
    games: null,
    error: null
})

export const fetchingGamesError = (error) => ({
    type: ActionType.GAMES_FETCHING_ERROR,
    games: null,
    error
})

export const getGames = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchingGames());
            await OHAxios.get(APIConstants.GET_GAMES, null, null, null)
            .then((response) => {
                console.log('Data: ', response);
                const games = response.data.games;
                dispatch(fetchingGamesSuccess(games));
            })
            .error((error) => { dispatch(fetchingGamesError(error)); })
        } catch(error) {}
    }
}