import * as ActionType from '../../variables/ActionType';
import { getGameSession } from './GameReducer';

export function createGameSession(game, player) {
    console.log('Payload: ', payload);
     return {
        type: ActionType.CREATING_GAME_SESSION,
        payload,
        game
     }
}

export const createGameSessionSuccess = (gameSessionId) => ({
    type: ActionType.CREATING_GAME_SESSION,
    gameSessionId
})

export const createGameSessionFailed = (error) => ({
    type: ActionType.CREATING_GAME_SESSION,
    error
})

export const fetchCategories = (game) => ({
    type: ActionType.FETCHINNG_GAME_CATEGORIES,
    game_id: game.game_id,
    game_session_id: 464654,
    player_id:45,
    company_id:456 
})