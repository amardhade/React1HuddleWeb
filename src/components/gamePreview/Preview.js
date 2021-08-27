import React, { useState, useReducer, useEffect } from 'react';
import GameProfile from "../gameProfile/GameProfile";
import './GamePreview.scss';
import GameContext from "../../context/GameContext";
import Categories from "../gameCategory/Categories";
import GameReducer from "../../reducer/game";
import { getPlayer } from "../../utils/StorageUtils";
import * as ActionType from "../../variables/ActionType";
import { creatingGameSession, getGameDetails } from "../gamePreview/gameManager";
import { Typography } from '@material-ui/core';

const GamePreview = (props) => {
    const selectedGame = props.game;
    const [gameState, gameDispatch] = useReducer(GameReducer, selectedGame);
    let { game = { ...selectedGame }, fetchingGameDetails, error } = gameState;
    const [btnTitle, setBtnTitle] = useState("Play");
    const [player, setPlayer] = useState({});

    useEffect(() => {
        setPlayer(getPlayer());
    }, [])



    useEffect(() => {
        // On game session created
        console.log('Session Rx useEffect: ', gameState);
        if (game.gameSessionId) {
            game['earnedPoints'] = 0;
            getGameDetails(game, player.player_id, player.company_id, gameDispatch);
        }
    }, [game && game.gameSessionId]);

    useEffect(() => {
        console.log('Session Rx useEffect, categories: ', game.categories);
    }, [game && game.categories])

    const playGame = () => {
        console.log('Play game, creating game session');
        setBtnTitle("Fetching game details..");
        creatingGameSession(player, game, gameDispatch);
    }


    return (
        <div className="gameWrapper">{game &&
            <div className="gamePreviewWrapper"> {(!game.categories || !game.categories.length) ?
                <div className="gamePreviewSubWrapper">
                    <div className="gameWrpper">
                        <div className="gameBasicInfo">
                            <img className="gameLogo" src={game.game_logo} />
                            <p className="gameName">{game.game_name}</p>
                        </div>
                        <div>{error ? <div className="errorWrapper"> <Typography>You are not authoriza to play this game.</Typography>
                        </div> : <div className="gameProfileInfo">{game.game_profile && game.game_profile.length &&
                            <GameProfile profile={game.game_profile[0]}></GameProfile>
                        }</div>}</div>
                    </div>
                    <div className="playButtonWrapper">
                        <button disabled={fetchingGameDetails || error} className="playBtn" onClick={() => playGame()}>{btnTitle}</button>
                    </div>
                </div> : <GameContext.Provider value={{ game, gameDispatch }} className="gamePreviewSubWrapper">
                    <Categories></Categories>
                </GameContext.Provider>
            }</div>
        }</div>
    )
}

export { GamePreview as default }