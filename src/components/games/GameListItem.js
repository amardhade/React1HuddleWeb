import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import { Avatar, Typography } from "@material-ui/core";
// import { connect } from "react-redux";
// import { removeExpense } from "../actions/expenses";

class GameListItem extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    // handleGameClick(path) {
    //     console.log('Path: ', path)
    //     // this.props && this.props.history.push(path)
    //     // `/games/${this.props.game.game_id}`
    // }

    render() {
        console.log('Render from GameListItem');
        return (
            <Paper className="gridItem">
                <div className="gridContent">
                    <Avatar src={this.props.game.game_logo}> </Avatar>
                    <Link className="gameName" to={`/games/${this.props.game.game_id}`} variant="subtitle1">{this.props.game.game_name}</Link>
                </div>
            </Paper>
        )
    }
}

export default connect()(GameListItem);