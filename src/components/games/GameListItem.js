import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
// import { connect } from "react-redux";
// import { removeExpense } from "../actions/expenses";

class GameListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Link to={`/games/${this.props.game.game_id}`}>
                    <h4>{this.props.game.game_name}</h4>
                </Link>
            </div>
        )
    }
}

export default connect()(GameListItem);