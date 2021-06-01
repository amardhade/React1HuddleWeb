import React from 'react';
import { isAuthenticated } from '../../utils/utilities';
import GameListItem from './GameListItem';
import { fetchGames } from './GamesReducer';
import configureStore from '../../store/ConfigureStore';
import { connect } from 'react-redux';
import GamePreview from '../gamePreview/GamePreview';
import './Games.scss';
import Grid from '@material-ui/core/Grid';


class Games extends React.Component {
    propsCopy;
    constructor(props) {
        super(props);
        console.log('Games Ctor: ', props);
        if(this.props) {
            this.propsCopy = props;
        }
        console.log('propsCopy: ', this.propsCopy);

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
        this.store.dispatch(fetchGames()).then((data) => {
            console.log('Games received: ', data);
        }).catch(error => {
            console.log('Error: ', error);
        })
    }

    navigateToAuthPage() {
        this.props.history.push('/');
    }

    // findGame = () => {
    //     console.log('Find game: ', this.props.match.params.game_id);
    //     return this.state.games.find((game) => game.game_id == this.props.match.params.game_id)
    // }

    handleGameClick(path) {
        console.log('clickedGame: ', path);
        console.log('propsCopy: ', this.propsCopy);
        // this.props.history.push(path);
    }

    render() {
        console.log('Render from Games: ', this.props);
        return (
            <div className="mainWrapper">
                <p className="header">1Huddle Games</p>
                {this.state.fetchingGames && <p>Fetching games..</p>}
                {this.state.games && !this.state.fetchingGames && !this.state.games.length && <p>No games to play.</p>}
                <div className="gamesWrapper">
                    <div className="gameListWrapper">
                        <Grid container spacing={2}>
                            {this.state.games && this.state.games.map((game) => (
                                <Grid key={game.game_id} item>
                                    <GameListItem game={game} key={game.game_id} handleGameClick={this.handleGameClick} />
                                </Grid>
                            ))}
                        </Grid>
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
    console.log('mapStateToProps Games: ', state.games);
    return {
        games: state.games,
        fetchingGames: state.fetchingGames,
    };
}

export default connect(mapStateToProps)(Games)