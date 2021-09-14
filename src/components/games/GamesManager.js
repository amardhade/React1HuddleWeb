import * as ActionType from '../../variables/ActionType';
import * as OHAxios from '../axios/OHAxios';
import * as APIConstants from '../../variables/APIConstants';

export const getGames = (dispatch) => {
    try {
        dispatch({ type: ActionType.GAMES_FETCHING_PROGRESS });
        OHAxios.get(APIConstants.GET_GAMES).then((response) => {
                if (response.success) {
                    const games = response.data.games;
                    console.log('Games fetched: ', games);
                    dispatch({ type: ActionType.GAMES_FETCHING_SUCCESS, games });
                } else {
                    dispatch({ type: ActionType.GAMES_FETCHING_ERROR, games: [] });
                }
            }).error((error) => { dispatch({ type: ActionType.GAMES_FETCHING_ERROR, error: error }); })
    } catch (error) {
        dispatch({ type: ActionType.GAMES_FETCHING_ERROR, games: [], error: error })
    }
}