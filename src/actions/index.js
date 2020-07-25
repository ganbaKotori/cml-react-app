import * as actionTypes from "./types";

export const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentuser: user
        }
    }
}

export const setUserStats = userstats => {
    return {
        type: actionTypes.SET_USER_STATS,
        payload: {
            currentuserstats: userstats
        }
    }
}

export const clearUser = () => {
    return ({
        type: actionTypes.CLEAR_USER
    }
        
    )
}

export const clearUserStats = () => {
    return ({
        type: actionTypes.CLEAR_USER_STATS
    }
        
    )
}