import React from 'react';
import { isAuthenticated } from '../../utils/utilities';
import GameListItem from './GameListItem';
import configureStore from '../../store/ConfigureStore';
import { connect } from 'react-redux';
import { getGames } from './GamesManager';
import GamePreview from '../gamePreview/Preview';
import './Games.scss';
import Grid from '@material-ui/core/Grid';


class Games extends React.Component {
    constructor(props) {
        super(props);

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
        this.store.dispatch(getGames());
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

    navigateToAuthPage() {
        this.props.history.push('/');
    }

    render() {
        console.log('Render from Games: ', this.state);
        if(!this.state) {
            return null
        }
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
                                    <GameListItem game={game} key={game.game_id} history={this.props.history} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    {!this.state.fetchingGames
                        && this.props.match.params.game_id
                        && <div className="gameDetailsWrapper">
                            <GamePreview game={this.state.games.filter((game) => this.props.match.params.game_id == game.game_id )[0]}></GamePreview>
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