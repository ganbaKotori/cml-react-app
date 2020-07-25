import {combineReducers} from "redux"
import * as actionTypes from "../actions/types";

const initialUserState = {
    currentuser: null,
    isLoading: true
}

const initialUserStatsState = {
    currentuserstats: null,
    isLoading: true
}



const user_reducer = (state = initialUserState,action) => {
    switch(action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentuser,
                isLoading: false
            }
        case actionTypes.CLEAR_USER:
            return {
                ...initialUserState,
                isLoading: false
            }
        default:
            return state;
    }
}

const user_stats_reducer = (state = initialUserStatsState,action) => {
    switch(action.type) {
        case actionTypes.SET_USER_STATS:
            return {
                currentUserStats: action.payload.currentuserstats,
                isLoading: false
            }
        case actionTypes.CLEAR_USER_STATS:
            return {
                ...initialUserStatsState,
                isLoading: false
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user: user_reducer,
    userStats: user_stats_reducer
})

export default rootReducer;