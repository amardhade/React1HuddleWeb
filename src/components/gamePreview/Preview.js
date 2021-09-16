import React, { useState, useReducer, useEffect } from 'react';
import GameProfile from "../gameProfile/GameProfile";
import './GamePreview.scss';
import { useHistory } from "react-router-dom";
import GameContext from "../../context/GameContext";
import Categories from "../gameCategory/Categories";
import GameReducer from "../../reducer/game";
import { getPlayer } from "../../utils/StorageUtils";
import * as ActionType from "../../variables/ActionType";
import { creatingGameSession, getGameDetails } from "../gamePreview/gameManager";
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';


const GamePreview = (props) => {

    const gameInfo = useSelector((state) => state.gameState);
    const [gameState, gameDispatch] = useReducer(GameReducer, gameInfo.game);
    const [btnTitle, setBtnTitle] = useState("Play");
    const [player, setPlayer] = useState({});
    let [ game, setSelectedGame ] = useState(gameInfo.game);
    const history = useHistory()

    useEffect(() => {
        game['earnedPoints'] = 0;
        setPlayer(getPlayer());
    }, [])

    useEffect(() => {
        console.log("Game info updated: ", gameInfo);
        setSelectedGame(gameInfo.game);
    }, [gameInfo])


    useEffect(() => {
        // On game session created
        console.log('Session Rx useEffect: ', gameInfo);
        if (gameInfo.game) {
            game = gameInfo.game;
            // if (game.shouldReplay) {
            //     game.shouldReplay = false;
            //     // const path = `/games/${game.game_id}`;
            //     // history.push(path);
            //     playGame();
            // } else {
            //     setBtnTitle("Play");
            // }
            if(!game.hasOwnProperty('gameSessionId') || !game.gameSessionId) {
                game['gameSessionId'] = gameState.gameSessionId
            }
            if (game.gameSessionId) {
                game['earnedPoints'] = 0;
                getGameDetails(game, player.player_id, player.company_id, gameDispatch);
                // const path = `/games/${game.game_id}/play`;
                // history.push(path);
            }
        }
    }, [gameState.gameSessionId]);

    const playGame = () => {
        console.log('Play game, creating game session');
        setBtnTitle("Fetching game details..");
        creatingGameSession(player, game, gameDispatch);
    }


    return (
        <div className="gameWrapper">{game &&
            <div className="gamePreviewWrapper"> {(!gameState.categories || !gameState.categories.length) ?
                <div className="gamePreviewSubWrapper">
                    <div className="gameWrpper">
                        <div className="gameBasicInfo">
                            <img className="gameLogo" src={game.game_logo} />
                            <p className="gameName">{game.game_name}</p>
                        </div>
                        <div>{gameInfo.error ? <div className="errorWrapper"> <Typography>You are not authoriza to play this game.</Typography>
                        </div> : <div className="gameProfileInfo">{game.game_profile && game.game_profile.length &&
                            <GameProfile profile={game.game_profile[0]}></GameProfile>
                        }</div>}</div>
                    </div>
                    <div className="playButtonWrapper">
                        <button disabled={gameInfo.fetchingGameDetails || gameInfo.error} className="playBtn" onClick={() => playGame()}>{btnTitle}</button>
                    </div>
                </div> : <GameContext.Provider value={{ gameState, gameDispatch }} className="gamePreviewSubWrapper">
                    <Categories></Categories>
                </GameContext.Provider>
            }</div>
        }</div>
    )
}

export { GamePreview as default }