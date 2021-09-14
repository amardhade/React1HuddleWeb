import { combineReducers, createStore, applyMiddleware } from 'redux';
import authReducer from '../components/auth/AuthReducer';
import gamesReducer from '../components/games/GamesReducer';
import gameReducer from '../reducer/game';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reduxMiddleware = composeWithDevTools(applyMiddleware(thunkMiddleware));

const configureStore = () => {
    const store = createStore(
        combineReducers({
            authDetails: authReducer,
            gamesState: gamesReducer,
            gameState: gameReducer
        }), 
        reduxMiddleware
    )
    return store;
}

export default configureStore;
