import React from 'react';
import { isAuthenticated } from '../../utils/utilities';
import GameListItem from './GameListItem';
import { fetchGames } from './GamesReducer';
import configureStore from '../../store/ConfigureStore';


export default class Games extends React.Component {
    constructor(props) {
        super(props);
        if (!isAuthenticated()) {
            this.navigateToAuthPage();
        }
        this.store = configureStore();
        this.state = {
            games: this.props ? this.props.games : [],
            fetchingGames: this.props ? this.props.fetchingGames : false,
            fetchingGamesSuccess: this.props ? this.props.fetchingGamesSuccess : false,
            fetchingGamesError: this.props ? this.props.fetchingGamesError : false,
            errorMsg: this.props ? this.props.errorMsg : undefined
        }
        this.onStoreUpdate();
        this.getGames();
    }

    onStoreUpdate() {
        this.store.subscribe(() => {
            const updateState = this.store.getState();
            console.log('Updated state: ', updateState);
            this.setState(() => ({
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
                <div className="gamesWrapper">
                    <div className="gameWrapper">
                        {this.state.games && this.state.games.map((game, gameIndex) => <GameListItem {...game} key={game.game_id} />)}
                    </div>
                </div>
            </div>


        )
    }
}