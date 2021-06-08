import * as ActionType from '../../variables/ActionType';

const defaultGames = [];
const gamesReducer = (games = defaultGames, action) => {
    console.log('Games reducer: ', action);
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
                games: action.games,
                fetchingGames: false,
                fetchingGamesSuccess: true,
                fetchingGamesError: false,
                errorMsg: undefined
            }
        case ActionType.GAMES_FETCHING_ERROR:
            return {
                games: action.games,
                fetchingGames: false,
                fetchingGamesSuccess: false,
                fetchingGamesError: true,
                error: action.error,
                errorMsg: "Something went wrong, while fetching games"
            }
        default:
            return games;
    }
}

export default gamesReducer;