import { combineReducers, createStore, applyMiddleware } from 'redux';
import authReducer from '../components/auth/AuthReducer';
import gamesReducer from '../components/games/GamesReducer';
import gameReducer from '../components/gamePreview/GameReducer';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reduxMiddleware = composeWithDevTools(applyMiddleware(thunkMiddleware));

const configureStore = () => {
    const store = createStore(
        combineReducers({
            authDetails: authReducer,
            gamesReducers: gamesReducer,
            gameReducer: gameReducer
        }), 
        reduxMiddleware
    )
    return store;
}

export default configureStore;
