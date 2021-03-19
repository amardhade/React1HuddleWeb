import { combineReducers, createStore, applyMiddleware } from 'redux';
import authReducer from '../components/auth/AuthReducer';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reduxMiddleware = composeWithDevTools(applyMiddleware(thunkMiddleware));

const configureStore = () => {
    const store = createStore(
        combineReducers({
            authDetails: authReducer
        }),
        reduxMiddleware
    )
    return store;
}

export default configureStore;
