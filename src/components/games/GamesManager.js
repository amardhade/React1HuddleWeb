

export const setGames = (games) => {
    type: 'SET_GAMES',
    expense
}

export const getGames = () => {
    return(dispatch, getState) => {
        dispatch({ type: ActionType.GAMES_FETCHING_PROGRESS })
        OHAxios.get(APIConstants.GET_GAMES, dispatch, ActionType.GAMES_FETCHING_SUCCESS, ActionType.GAMES_FETCHING_ERROR);

    }
}