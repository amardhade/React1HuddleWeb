import './GameCategory.scss';
import React from "react";
import { Avatar, Button, Paper } from '@material-ui/core';
import GameQuestion from '../gameQuestions/GameQuestions';
class GameCategory extends React.Component {

    state = {
        shouldShowQuestions: false,
        selectedCategory: null
    }

    constructor(props) {
        super(props)
        console.log('nowPlayingGame: ', this.props.nowPlayingGame);
        this.state = {
            shouldShowQuestions: false,
            selectedCategory: null
        }
    }

    showQuestions = (category) => {
        console.log('handleCategoryClick: ' + category);
        this.setState(() => ({
            shouldShowQuestions: true,
            selectedCategory: category
        }))
    }

    showCategories = () => {
        this.setState(() => ({
            shouldShowQuestions: false
        }))
    }

    // nextQuestion = () => {
    //     console.log("Next Question")
    // }

    // endGame = () => {
    //     console.log("End game")
    // }

    render() {
        return (
            <div className="rootSections" >
                <div className="subSections">
                    <div className="gameHeaderSection">
                        <Paper elevation={0} className="gameHeaderSectionPage">
                            <div className="gameInfo1">
                                <Avatar className="gameLogo" alt="game_icon" src={this.props.nowPlayingGame.game_logo} />
                                <span className="gameName">{this.props.nowPlayingGame.game_name}</span>
                            </div>
                            <div className="gameInfo2">
                                <span className="normalText">High score: {this.props.nowPlayingGame.high_score}</span>
                                <span className="normalText">Attempt: {this.props.nowPlayingGame.attempts_remain} / {this.props.nowPlayingGame.attempts_count}</span>
                            </div>
                        </Paper>
                    </div>
                    {!this.state.shouldShowQuestions ?
                        <div className="gameCategorySection">
                            {this.props.nowPlayingGame.catrgories && this.props.nowPlayingGame.catrgories.map((category, categoryIndex) =>
                                <Paper key={categoryIndex} elevation={6} variant="outlined" className="category" onClick={() => this.showQuestions(category)}>
                                    <span className="categoryName">{category.category_name}</span>
                                    <div className="questionCountSection">
                                        <span className="emptyView"></span>
                                        <span className="questionCount">{category.questions.length}</span>
                                    </div>
                                </Paper>)}
                        </div> : <div className="gameQuestionSection">
                            <GameQuestion game={this.props.nowPlayingGame} clickedCategory={this.state.selectedCategory}></GameQuestion>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default GameCategory;
