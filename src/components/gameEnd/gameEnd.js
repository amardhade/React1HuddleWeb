import React, { useContext } from 'react';
import { useHistory } from "react-router";
import GameContext from '../../context/GameContext';
import { Button } from '@material-ui/core';
import * as ActionType from '../../variables/ActionType';
import './gameEnd.scss';
import { resetGameToDefaultState } from '../gamePreview/gameManager';

const GameEnd = () => {
    const { game, gameDispatch } = useContext(GameContext);

    const replayGame = () => {
        const replayGame = resetGameToDefaultState(game, true);
        gameDispatch({ type: ActionType.REPLAY_GAME, replayGame });

    }
    const navigateToHome = () => {
        const restartGame = resetGameToDefaultState(game, false);
        gameDispatch({ type: ActionType.RESTART_GAME, restartGame });
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