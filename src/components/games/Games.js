import React from 'react';
import { isAuthenticated } from '../../utils/utilities';
import GameListItem from './GameListItem';
import { fetchGames } from './GamesReducer';
import configureStore from '../../store/ConfigureStore';
import { connect } from 'react-redux';
import GamePreview from '../gamePreview/GamePreview';
import './Games.scss';


class Games extends React.Component {
    constructor(props) {
        super(props);
        console.log('Games Ctor');
        if (!isAuthenticated()) {
            this.navigateToAuthPage();
            return;
        }
        this.store = configureStore();
        this.state = {
            games: [],
            selectedGame: null,
            fetchingGames: false,
            fetchingGamesSuccess: false,
            fetchingGamesError: false,
            errorMsg: undefined
        }
        this.onStoreUpdate();
    }

    componentDidMount() {
        this.getGames();
    }

    onStoreUpdate() {
        this.store.subscribe(() => {
            const updateState = this.store.getState();
            console.log('Updated state: ', updateState);
            this.setState(() => ({
                fetchingGames: updateState.gamesReducers.fetchingGames,
                games: updateState.gamesReducers.games
            }));
        });
    }

    getGames() {
        this.store.dispatch(fetchGames())
    }

    navigateToAuthPage() {
        this.props.history.push('/');
    }

    // findGame = () => {
    //     console.log('Find game: ', this.props.match.params.game_id);
    //     return this.state.games.find((game) => game.game_id == this.props.match.params.game_id)
    // }

    render() {
        return (
            <div className="mainWrapper">
                <p className="header">1Huddle Games</p>
                {this.state.fetchingGames && <p>Fetching games..</p>}
                <div className="gamesWrapper">
                    <div className="gameListWrapper">
                        <div>
                            {this.state.games && this.state.games.map((game, gameIndex) =>
                                <GameListItem game={game} key={game.game_id}/>)}
                        </div>
                    </div>
                    {!this.state.fetchingGames 
                        && this.props.match.params.game_id 
                            && <div className="gameDetailsWrapper">
                        <GamePreview games={this.state.games} gameId={this.props.match.params.game_id}></GamePreview>
                    </div>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        games: state.games,
        fetchingGames: state.fetchingGames,
    };
}

export default connect(mapStateToProps)(Games)