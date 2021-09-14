import * as ActionType from '../variables/ActionType';
// import * as OHAxios from '../axios/OHAxios';
// import * as APIConstants from '../../variables/APIConstants';

const initialState = {
    game: {},
    fetchingGameDetails: false,
    error: null,
};


const initialGameState = { game: {}, fetchingGameDetails: false, error: undefined }
const GameReducer = (gameState = initialGameState, action) => {
    console.log('Game Reducer Action: ', action);
    console.log('Game state: ', gameState);
    switch (action.type) {
        case ActionType.GAME_SELECTED:
            return {
                game: { ...action.selectedGame },
                fetchingGameDetails: false,
                error: undefined
            }
        case ActionType.CREATING_GAME_SESSION:
            console.log('Game State: ', gameState);
            return {
                ...gameState,
                fetchingGameDetails: true
            }
        case ActionType.CREATING_GAME_SESSION_SUCCESS:
            // gameState.game['gameSessionId'] = action.gameSessionId
            // const newGame = { ...gameState.game };
            // console.log('New game before: ', gameState);
            // newGame['gameSessionId'] = action.gameSessionId
            // console.log('Creating game session: ', newGame);
            return {
                ...gameState,
                fetchingGameDetails: false,
                gameSessionId: action.gameSessionId
            }
        case ActionType.CREATING_GAME_SESSION_FAILED:
            return {
                game: { ...gameState, gameSessionId: undefined },
                fetchingGameDetails: false,
                error: action.error
            }
        case ActionType.FETCHINNG_GAME_CATEGORIES:
            return {
                ...gameState,
                fetchingGameDetails: true,
            }
        case ActionType.FETCHINNG_GAME_CATEGORIES_SUCCESS:
            const cat = {
                categories: action.data.game_categories,
                totalCategories: action.data.total_active_category,
                totalPoints: action.data.total_points_for_game,
                totalQuestionsCount: action.data.total_questions_for_game
            }
            console.log('gameState: ', gameState);
            // const newGameState = { ...gameState.game, ...cat }
            // console.log('newGameState: ', newGameState);
            return {
                ...gameState,
                fetchingGameDetails: false,
                categories: action.data.game_categories,
                totalCategories: action.data.total_active_category,
                totalPoints: action.data.total_points_for_game,
                totalQuestionsCount: action.data.total_questions_for_game
            };
            // return { ...gameState }
        case ActionType.FETCHINNG_GAME_CATEGORIES_FAILED:
            return {
                game: { ...gameState, gameCategories: [] },
                fetchingGameDetails: false,
                error: action.error
            }
        case ActionType.REPLAY_GAME:
            return {
                game: { ...action.replayGame },
                fetchingGameDetails: false,
                error: action.error
            }
        case ActionType.RESTART_GAME: {
            return {
                game: { ...action.restartGame },
                fetchingGameDetails: false,
                error: action.error
            }
        }
        case ActionType.GAME_SELECTED:
            return {
                game: { ...action.selectedGame },
                fetchingGameDetails: false,
                error: undefined
            }
        default:
            return { ...gameState };
    }
}

export { GameReducer as default }