import './GameCategory.scss';
import React from "react";
import { Avatar, Button, Paper } from '@material-ui/core';
class GameCategory extends React.Component {

    state = {
        shouldShowQuestions: false
    }

    constructor(props) {
        super(props)
        console.log('nowPlayingGame: ', this.props.nowPlayingGame);
        this.state = {
            shouldShowQuestions: false
        }
    }

    showQuestions = () => {
        console.log('handleCategoryClick');
        this.setState(() => ({
            shouldShowQuestions: true
        }))
    }

    showCategories = () => {
        this.setState(() => ({
            shouldShowQuestions: false
        }))
    }

    nextQuestion = () => {
        console.log("Next Question")
    }

    endGame = () => {
        console.log("End game")
    }

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
                                <Paper key={categoryIndex} elevation={6} variant="outlined" className="category" onClick={() => this.showQuestions({})}>
                                    <span className="categoryName">{category.category_name}</span>
                                    <div className="questionCountSection">
                                        <span className="emptyView"></span>
                                        <span className="questionCount">{category.questions.length}</span>
                                    </div>
                                </Paper>)}
                        </div> : <div>
                            <span>Show Questions</span>
                        </div>
                    }
                </div>
                <div>
                    {this.state.shouldShowQuestions ?
                        <div className="gameFooter">
                            <div className="__gameFooter">
                                <Button className="back" onClick={() => this.showCategories()}>Back</Button>
                                <Button className="next" onClick={() => this.nextQuestion()}>Next</Button>
                            </div>
                        </div>
                        :
                        <div className="gameFooter">
                            <div className="_gameFooter">
                                <Button className="endGame" onClick={() => this.endGame()}>End Game</Button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default GameCategory;
