import * as ActionType from '../../variables/ActionType';

const defaultGamesState = {
    fetchingGames: true,
    fetchingGamesSuccess: false,
    fetchingGamesError: false,
    errorMsg: undefined,
    games: []
};
const initialGamesState = { games: [], fetchingGames: false, errorMsg: undefined };
const gamesReducer = (state = initialGamesState, action) => {
    console.log('Games reducer: ', action);
    switch (action.type) {
        case ActionType.GAMES_FETCHING_PROGRESS:
            return {
                ...state,
                fetchingGames: true,
                errorMsg: undefined,
                games: []
            }
        case ActionType.GAMES_FETCHING_SUCCESS:
            console.log("Success: ", action)
            return {
                ...state,
                games: [...action.games],
                fetchingGames: false,
                errorMsg: undefined
            }
        case ActionType.GAMES_FETCHING_ERROR:
            return {
                ...state,
                fetchingGames: false,
                error: action.error,
                errorMsg: "Something went wrong, while fetching games"
            }
        default:
            return state;
    }
}

export default gamesReducer;