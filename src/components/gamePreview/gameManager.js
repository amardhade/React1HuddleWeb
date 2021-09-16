import * as ActionType from '../../variables/ActionType';
import * as OHAxios from '../axios/OHAxios';
import * as APIConstants from '../../variables/APIConstants';
import { getPlayer } from "../../utils/StorageUtils";

export const creatingGameSession = (player, game, dispatch) => {
    const payload = {
        company_id: player.company_id,
        player_id: player.player_id,
        timezone: 'Asia/Kolkata',
        game_details: {
            'game_id': game.game_id,
            'game_type': 1, //Standalone game
        },
        mlg_id: 0,
        contest_id: 0
    }
    try {
        dispatch({ type: ActionType.CREATING_GAME_SESSION });
        OHAxios.post(APIConstants.CREATING_GAME_SESSION, payload)
            .then((response) => {
                console.log('Data: ', response);
                if (response.success) {
                    const gameSessionId = response.data.game_session_id;
                    dispatch({ type: ActionType.CREATING_GAME_SESSION_SUCCESS, gameSessionId });
                } else {
                    dispatch({ type: ActionType.CREATING_GAME_SESSION_FAILED, response });
                }
            })
            .error((error) => {
                dispatch({ type: ActionType.CREATING_GAME_SESSION_FAILED, error });
            })
    } catch { }
}

export const getGameDetails = (game, playerId, companyId, dispatch) => {
    try {
        dispatch({ type: ActionType.FETCHINNG_GAME_CATEGORIES });
        const path = `${APIConstants.FETCH_QUESTIONS}?game_session_id=${game.gameSessionId}&game_id=${game.game_id}&player_id=${playerId}&company_id=${companyId}`;
        OHAxios.get(path).then((response) => {
            console.log('Response: ', response);
            if (response.success) {
                const data = response.data;
                dispatch({ type: ActionType.FETCHINNG_GAME_CATEGORIES_SUCCESS, data });
            } else {
                dispatch({ type: ActionType.FETCHINNG_GAME_CATEGORIES_FAILED, response });
            }
        }).error((error) => {
            dispatch({ type: ActionType.FETCHINNG_GAME_CATEGORIES_FAILED, error });
        })
    } catch {

    }
}

export const endGame = (game) => {
    try {
        // dispatch({ type: ActionType.FETCHINNG_GAME_CATEGORIES });
        const path = APIConstants.END_GAME
        const payload = preparePayloadForEndGame(game);
        OHAxios.post(path, payload).then((response) => {
            console.log('Response: ', response);
            if (response.success) {
                const data = response.data;
            } else {
                // create pool for the not submitted questions    
            }
        }).error((error) => {
            // create pool for the not submitted questions
        })
    } catch {

    }
}

const preparePayloadForEndGame = (game) => {
    const player = getPlayer();
    return {
        "game_session_id": game.gameSessionId,
        "user_information": {
            "company_id": player.company_id,
            "player_id": player.player_id,
            "game_id": game.game_id
        },
        "answered_questions": [],
        "time_taken": 60
    }
}

export const resetGameToDefaultState = (game, shouldReplay) => {
    console.log('Restart gameState: ', game);
    game.attempts_remain = game.attempts_remain - 1;
    game.categories = undefined;
    game.earnedPoints = 0;
    game.gameSessionId = undefined;
    game['shouldReplay'] = shouldReplay;
    return game;
}