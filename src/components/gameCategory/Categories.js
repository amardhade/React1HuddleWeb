import React, { useState, useEffect, useContext } from 'react';
import GameContext from '../../context/GameContext';
import Questions from '../gameQuestions/Questions';
import './GameCategory.scss';
import { Avatar, Button, Paper } from '@material-ui/core';

const Categories = () => {

    const { game } = useContext(GameContext);
    console.log('game: ', game);
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
                            <Avatar className="gameLogo" alt="game_icon" src={game.game_logo} />
                            <span className="gameName">{game.game_name}</span>
                        </div>
                        <div className="gameInfo2">
                            <span className="normalText">High score: {game.high_score}</span>
                            <span className="normalText">Attempt: {game.attempts_remain} / {game.attempts_count}</span>
                        </div>
                    </Paper>
                </div>
                {!shouldShowQuestions ?
                    <div className="gameCategorySection">
                        {game.catrgories && game.catrgories.map((category, categoryIndex) =>
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