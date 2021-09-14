import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory, useRouteMatch } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import { Avatar, Typography } from "@material-ui/core";
import { useLocation } from 'react-router-dom';

// import { connect } from "react-redux";
// import { removeExpense } from "../actions/expenses";

const GameListItem = (props) => {

    console.log('Props: ', props);
    const game = props.game;
    const history = useHistory();
    let { path, url } = useRouteMatch();
    // let location = useLocation();
    // constructor(props) {
    //     super(props);
    // }

    const handleGameClick = (gameId) => {
        // if(history.location.pathname.includes('/play')) {
        //     console.log("Returned");    
        //     return
        // }
        const path = `/games/${gameId}`
        history.push(path);
        console.log('Path: ', history.location);
        props.onGameSelected(gameId);
    }


    return (
        <Paper className="gridItem">
            <div className="gridContent" onClick={() => handleGameClick(game.game_id)}>
                <Avatar src={game.game_logo}> </Avatar>
                <Typography className="gameName" variant="subtitle1">{game.game_name}</Typography>
            </div>
        </Paper>
    )
}

export { GameListItem as default }