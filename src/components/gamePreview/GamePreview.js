import React, {useReducer} from "react";
import { connect } from "react-redux";
import GameProfile from "../gameProfile/GameProfile";
import GameCategory from "../gameCategory/GameCategory";
import './GamePreview.scss';
import { getPlayer } from "../../utils/StorageUtils";
import { getGameDetails } from './gameManager';
import configureStore from '../../store/ConfigureStore';
import GameContext from "../../context/GameContext";
import Categories from "../gameCategory/Categories";

class GamePreview extends React.Component {

    player = getPlayer();
    storeToUnsubscribe;
    buttonTitle = 'Play';
    constructor(props) {
        super(props);
        this.store = configureStore();
        this.state = {
            game: null,
            creatingGameSession: false,
            fetchingGameDetails: false
        }
        this.subscribeToStore();
    }

    subscribeToStore() {
        this.storeToUnsubscribe = this.store.subscribe(() => {
            const gameDetails = this.store.getState();
            console.log('Subscribe: ', gameDetails);
            if (gameDetails.gameReducer.gameSessionId) {
                this.props.game.gameSessionId = gameDetails.gameReducer.gameSessionId
                this.store.dispatch(getGameDetails(this.props.game,
                    this.player.player_id, this.player.company_id));
            }
            if (gameDetails.gameReducer.catrgories) {
                this.props.game.catrgories = gameDetails.gameReducer.catrgories
            }
            this.setState(() => ({
                creatingGameSession: gameDetails.gameReducer.creatingGameSession,
                fetchingGameDetails: gameDetails.gameReducer.fetchingGameDetails
            }));
        });
    }

    playGame = () => {
        console.log('Play game, player: ', this.player);
        const payload = {
            company_id: this.player.company_id,
            player_id: this.player.player_id,
            timezone: 'Asia/Kolkata',
            game_details: {
                'game_id': this.props.game.game_id,
                'game_type': 1, //Standalone game
            },
            mlg_id: 0,
            contest_id: 0
        }
        // this.store.dispatch(createGameSession(payload));
    }

    getButtonTitle() {
        if (this.state.creatingGameSession || this.state.fetchingGameDetails) {
            return this.buttonTitle = "Fetching game details..";
        }
        return 'Play';
    }

    render() {
        const game = this.props.game;
        console.log('Selected game: ', game);
        if (game && !game.catrgories) {
            game.catrgories = [];
        }
        return (
            <div className="gameWrapper">{game &&
                <div className="gamePreviewWrapper"> {(game.catrgories && !game.catrgories.length) ?
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
                            <button disabled={this.state.creatingGameSession || this.state.fetchingGameDetails} className="playBtn" onClick={this.playGame}>{this.getButtonTitle()}</button>
                        </div>
                    </div> : <GameContext.Provider value={{game}} className="gamePreviewSubWrapper">
                        <Categories></Categories>
                    </GameContext.Provider>
                }</div>
            }</div>

        )
    }

    componentWillUnmount() {
        // if(this.storeToUnsubscribe) {
        //     this.storeToUnsubscribe.unsubscribe();
        // }
    }
}

const mapStateToProps = (state, props) => {
    return {
        game: props.games.find((game) => game.game_id == props.gameId),
        creatingGameSession: state.creatingGameSession,
        fetchingGameDetails: state.fetchingGameDetails
    };
};


export default connect(mapStateToProps)(GamePreview)