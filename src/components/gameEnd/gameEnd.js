import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import GameContext from '../../context/GameContext';
import { Button } from '@material-ui/core';
import * as ActionType from '../../variables/ActionType';
import './gameEnd.scss';
import { resetGameToDefaultState } from '../gamePreview/gameManager';

const GameEnd = () => {
    const { gameState, gameDispatch } = useContext(GameContext);
    const history = useHistory();

    const replayGame = () => {
        const replayGame = resetGameToDefaultState(gameState, true);
        gameDispatch({ type: ActionType.REPLAY_GAME, replayGame });

    }
    const navigateToHome = () => {
        const restartGame = resetGameToDefaultState(gameState, false);
        gameDispatch({ type: ActionType.RESTART_GAME, restartGame });
        history.push(`/games/${gameState.game_id}`);
    }

    return (
        <div className="endGameWrapper">
            <div className="gameDetailsWrapper">
                <span className="pointsEarnedLabel" >Points earned: {gameState.earnedPoints}</span>
                <span className="attemptsLeft">Attempts Left: {gameState.attempts_remain - 1}</span>
            </div>
            <div className="endGameFooter">
                <Button className="replay" onClick={() => replayGame()}>Replay</Button>
                <Button className="homeBtn" onClick={() => navigateToHome()}>Home</Button>
            </div>
        </div>
    )
}

export { GameEnd as default }