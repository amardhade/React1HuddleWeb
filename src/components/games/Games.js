import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '../../utils/utilities';
import GameListItem from './GameListItem';
import { getGames } from './GamesManager';
import GamePreview from '../gamePreview/Preview';
import './Games.scss';
import Grid from '@material-ui/core/Grid';
import { Route, useHistory } from 'react-router-dom';
import * as ActionType from '../../variables/ActionType';


const Games = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [selectedGame, updateSelectedGame] = useState(undefined);
    const gamesInfo = useSelector((state) => state.gamesState);
    console.log("Remounting Games Component");
    useEffect(() => {
        if (!isAuthenticated()) {
            navigateToAuthPage();
            return;
        }
        // Get games
        getGames(dispatch);
        console.log('gamesInfo: ', gamesInfo);
    }, [])

    const onGameSelected = (gameId) => {
        console.log('GameID: ', gameId);
        const gameSelected = gamesInfo.games.filter((game) => gameId == game.game_id)[0];
        console.log('gameSelected: ', gameSelected);
        if (gameSelected) {
            updateSelectedGame(gameSelected)
            dispatch({ type: ActionType.GAME_SELECTED, selectedGame: gameSelected });
        }
    }

    const navigateToAuthPage = () => {
        history.push('/');
    }


    return (
        <div className="mainWrapper">
            <p className="header">1Huddle Games</p>
            {gamesInfo.fetchingGames && <p>Fetching games..</p>}
            {gamesInfo.games && !gamesInfo.fetchingGames && !gamesInfo.games.length && <p>No games to play.</p>}
            <div className="gamesWrapper">
                <div className="gameListWrapper">
                    <Grid container spacing={2}>
                        {gamesInfo.games && gamesInfo.games.length && gamesInfo.games.map((game) => (
                            <Grid key={game.game_id} item>
                                <GameListItem game={game} key={game.game_id} onGameSelected={onGameSelected} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
                {selectedGame && <div className="gameDetailsWrapper">
                    <GamePreview></GamePreview>
                </div>}

            </div>
        </div>
    )
}

export { Games as default }