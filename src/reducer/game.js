import * as ActionType from '../variables/ActionType';
// import * as OHAxios from '../axios/OHAxios';
// import * as APIConstants from '../../variables/APIConstants';

const initialState = {
    game: {},
    fetchingGameDetails: false,
    error: null,
};

const GameReducer = (gameState, action) => {
    console.log('Action: ', action);
    switch (action.type) {
        case ActionType.CREATING_GAME_SESSION:
            return {
                ...gameState,
                fetchingGameDetails: true
            }
        case ActionType.CREATING_GAME_SESSION_SUCCESS:
            gameState.game['gameSessionId'] = action.gameSessionId
            return { ...gameState }
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
            const newGameState = { ...gameState.game, ...cat }]
            return {
                game: { ...newGameState },
                error: undefined,
                fetchingGameDetails: false
            };
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
        default:
            return { ...gameState };
    }
}

export { GameReducer as default }