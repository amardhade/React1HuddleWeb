import React, { useContext } from 'react';
import { useHistory } from "react-router";
import GameContext from '../../context/GameContext';
import { Button } from '@material-ui/core';
import * as ActionType from '../../variables/ActionType';
import './gameEnd.scss';
const GameEnd = () => {
    const { game, gameDispatch } = useContext(GameContext);

    const replayGame = () => {
        const replayGame = { ...game }
        replayGame.attempts_remain = replayGame.attempts_remain - 1;
        replayGame.categories = undefined;
        replayGame.earnedPoints = 0;
        replayGame.fetchingGameDetails = false;
        replayGame.gameSessionId = undefined;
        replayGame['shouldReplay'] = true;
        gameDispatch({ type: ActionType.REPLAY_GAME, replayGame });

    }
    const navigateToHome = () => {
        // const path = `/games/${game.game_id}`
        // console.log('Path: ', path)
        // history.push(path)
    }

    return (
        <div className="endGameWrapper">
            <div className="gameDetailsWrapper">
                <span className="pointsEarnedLabel" >Points earned: {game.earnedPoints}</span>
                <span className="attemptsLeft">Attempts Left: {game.attempts_remain - 1}</span>
            </div>
            <div className="endGameFooter">
                <Button className="replay" onClick={() => replayGame()}>Replay</Button>
                <Button className="homeBtn" onClick={() => navigateToHome()}>Home</Button>
            </div>
        </div>
    )
}

export { GameEnd as default }