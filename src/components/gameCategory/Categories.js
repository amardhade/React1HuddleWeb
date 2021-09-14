import React, { useState, useEffect, useContext, useReducer } from 'react';
import GameContext from '../../context/GameContext';
import Questions from '../gameQuestions/Questions';
import './GameCategory.scss';
import questionReducer from "../../reducer/question";
import { Avatar, Button, Paper } from '@material-ui/core';

const Categories = () => {

    const { gameState } = useContext(GameContext);
    console.log('Category Game: ', gameState);
    const [shouldShowQuestions, setshouldShowQuestions] = useState(false);

    const showQuestions = (category) => {
        setshouldShowQuestions(true)
    }

    return (
        <div className="rootSections" >
            <div className="subSections">
                <div className="gameHeaderSection">
                    <Paper elevation={0} className="gameHeaderSectionPage">
                        <div className="gameInfo1">
                            <Avatar className="gameLogo" alt="game_icon" src={gameState.game_logo} />
                            <span className="gameName">{gameState.game_name}</span>
                        </div>
                        <div className="gameInfo2">
                            <span className="normalText">High score: {gameState.high_score}</span>
                            <span className="normalText">Attempt: {gameState.attempts_remain} / {gameState.attempts_count}</span>
                        </div>
                    </Paper>
                </div>
                {!shouldShowQuestions ?
                    <div className="gameCategorySection">
                        {gameState.categories && gameState.categories.map((category, categoryIndex) =>
                            <Paper key={categoryIndex} elevation={6} variant="outlined" className="category" onClick={() => showQuestions(category)}>
                                <span className="categoryName">{category.category_name}</span>
                                <div className="questionCountSection">
                                    <span className="emptyView"></span>
                                    <span className="questionCount">{category.questions.length}</span>
                                </div>
                            </Paper>)}
                    </div> : <div className="gameQuestionSection">
                        <Questions></Questions>
                    </div>
                }
            </div>
        </div>
    )
}

export { Categories as default };