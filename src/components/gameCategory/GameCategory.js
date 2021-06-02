import './GameCategory.scss';
import React from "react";
import { Avatar, Paper } from '@material-ui/core';
class GameCategory extends React.Component {

    constructor(props) {
        super(props)
        console.log('nowPlayingGame: ', this.props.nowPlayingGame);
    }

    render() {
        return (
            <div className="rootSections">
                <div className="subSections">
                    <div className="gameHeaderSection">
                        <Paper elevation={0} className="gameHeaderSectionPage" squared>
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
                    <div className="gameCategorySection">
                        {this.props.nowPlayingGame.catrgories && this.props.nowPlayingGame.catrgories.map((category, categoryIndex) =>
                            <Paper key={categoryIndex} elevation={6} variant="outlined" squared className="category">
                                <span className="categoryName">{category.category_name}</span>
                                <div className="questionCountSection">
                                    <span className="emptyView"></span>
                                    <span className="questionCount">{category.questions.length}</span>
                                </div>
                            </Paper>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default GameCategory;
