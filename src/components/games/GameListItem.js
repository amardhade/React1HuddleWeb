import React from "react";
import { Link } from "react-router-dom"
// import { connect } from "react-redux";
// import { removeExpense } from "../actions/expenses";

const GameListItem = (props) => (
    <div>
        <Link to={`/games/${props.game_id}`}>
            <h4>{props.game_name}</h4>
        </Link>
    </div>
);

export default GameListItem;