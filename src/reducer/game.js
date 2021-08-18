import * as ActionType from '../variables/ActionType';
// import * as OHAxios from '../axios/OHAxios';
// import * as APIConstants from '../../variables/APIConstants';

const initialState = {
    game: {},
    fetchingGameDetails: false,
    error: null,
};

const GameReducer = (game, action) => {
    console.log('Action: ', action);
    switch (action.type) {
        case ActionType.CREATING_GAME_SESSION:
            return {
                ...game,
                fetchingGameDetails: true
            }
        case ActionType.CREATING_GAME_SESSION_SUCCESS:
            return {
                game: {
                    ...game,
                    gameSessionId: action.gameSessionId
                },
                fetchingGameDetails: false,
                error: undefined
            }
        case ActionType.CREATING_GAME_SESSION_FAILED:
            return {
                game: { ...game, gameSessionId: undefined },
                fetchingGameDetails: false,
                error: action.error
            }
        case ActionType.FETCHINNG_GAME_CATEGORIES:
            return {
                ...game,
                fetchingGameDetails: true,
            }
        case ActionType.FETCHINNG_GAME_CATEGORIES_SUCCESS:
            const cat = { categories: action.data.game_categories,
                    totalCategories: action.data.total_active_category,
                    totalPoints: action.data.total_points_for_game,
                    totalQuestionsCount: action.data.total_questions_for_game 
            }
            console.log('Cat: ', cat);
            console.log('Game: ', game);
            const newGameState = {...game.game, ...cat}
            console.log('newGameState: ', newGameState);
            return {
                game: {...newGameState},
                error: undefined,
                fetchingGameDetails: false
            };
        // const obj1 = {
        //     fetchingGameDetails: false,
        //     error: undefined
        // }
        // const obj2 = {
        //     catrgories: action.data.game_categories,
        //     totalCategories: action.data.total_active_category,
        //     totalPoints: action.data.total_points_for_game,
        //     totalQuestionsCount: action.data.total_questions_for_game
        // }

        // totalCategories: action.data.total_active_category,
        // totalPoints: action.data.total_points_for_game,
        // totalQuestionsCount: action.data.total_questions_for_game
        case ActionType.FETCHINNG_GAME_CATEGORIES_FAILED:
            return {
                game: { ...game, gameCategories: [] },
                fetchingGameDetails: false,
                error: action.error
            }
        default:
            return { ...game };
    }
}

export { GameReducer as default }