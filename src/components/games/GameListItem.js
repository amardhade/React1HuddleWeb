import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import { Avatar, Typography } from "@material-ui/core";
// import { connect } from "react-redux";
// import { removeExpense } from "../actions/expenses";

class GameListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    handleGameClick(path) {
        console.log('Path: ', this.props);
        this.props && this.props.history.push(path);
    }

    render() {
        console.log('Render from GameListItem');
        return (
            <Paper className="gridItem">
                <div className="gridContent" onClick={() => this.handleGameClick(`/games/${this.props.game.game_id}`)}>
                    <Avatar src={this.props.game.game_logo}> </Avatar>
                    <Typography className="gameName" variant="subtitle1">{this.props.game.game_name}</Typography>
                </div>
            </Paper>
        )
    }
}

export default connect()(GameListItem);