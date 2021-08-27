import React, { useContext } from 'react';
import { useHistory } from "react-router";
import GameContext from '../../context/GameContext';
import { Button } from '@material-ui/core';
import './gameEnd.scss';
const GameEnd = () => {
    const { game } = useContext(GameContext);
    const history = useHistory();
    console.log('Game: ', game);

    const replayGame = () => {}
    const navigateToHome = () => {
        const path = `/games/${game.game_id}`
        console.log('Path: ', path)
        history.push(path)
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