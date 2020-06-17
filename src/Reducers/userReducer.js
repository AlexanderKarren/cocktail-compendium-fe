import {
    FETCHING_USER,
    USER_MATCH,
    USER_FAILURE,
    RESET_STATE
} from '../Actions/userActions'

export const initialState = {
    user: null,
    fetchingUser: false,
    userMatch: false,
    userError: ""
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_USER:
            return {
                ...state,
                fetchingUser: true,
                userError: ""
            }
        case USER_MATCH:
            return {
                ...state,
                fetchingUser: false,
                userMatch: true,
                user: action.payload
            }
        case USER_FAILURE:
            return {
                ...state,
                user: null,
                fetchingUser: false,
                userMatch: false,
                userError: action.payload
            }
        case RESET_STATE:
            return initialState
        default:
            return state;
    }
}