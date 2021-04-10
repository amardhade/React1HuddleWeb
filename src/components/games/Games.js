import React from 'react';
import { isAuthenticated } from '../../utils/utilities';
import GameListItem from './GameListItem';
import { fetchGames } from './GamesReducer';
import configureStore from '../../store/ConfigureStore';
import { connect } from 'react-redux';


export default class Games extends React.Component {
    constructor(props) {
        super(props);
        if (!isAuthenticated()) {
            this.navigateToAuthPage();
            return;
        }
        this.store = configureStore();
        this.state = {
            games: [],
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

    render() {
        return (
            <div>
                <p>Games Component</p>
                {this.state.fetchingGames && <p>Fetching games..</p>}
                <div className="gamesWrapper">
                    <div className="gameWrapper">
                        {this.state.games && this.state.games.map((game, gameIndex) => <GameListItem {...game} key={game.game_id} />)}
                    </div>
                </div>
            </div>
        )
    }
}