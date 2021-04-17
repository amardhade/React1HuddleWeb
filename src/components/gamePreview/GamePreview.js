import React from "react";
import { connect } from "react-redux";
import GameProfile from "../gameProfile/GameProfile";
import './GamePreview.scss';

class GamePreview extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        const game = this.props.game;
        console.log('Selected game: ', game);
        return (
            <div className="gamePreviewWrapper"> { game &&
                <div className="gamePreviewSubWrapper">
                    <div className="gameWrpper">
                        <div className="gameBasicInfo">
                            <img className="gameLogo" src={game.game_logo} />
                            <p className="gameName">{game.game_name}</p>
                        </div>
                        <div className="gameProfileInfo">{game.game_profile.length &&
                            <GameProfile profile={game.game_profile[0]}></GameProfile>
                        }</div>
                    </div>
                    <div className="playButtonWrapper">
                        <button className="playBtn">Play</button>
                    </div>
                </div>
            }</div>

        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        game: props.games.find((game) => game.game_id == props.gameId)
    };
};


export default connect(mapStateToProps)(GamePreview)