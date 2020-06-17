import {
    FETCHING_DATA,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    RESET_STATE
} from '../Actions/dataActions'

export const initialState = {
    data: [],
    fetchingData: false,
    fetchSuccess: false,
    fetchError: ""
}

export const dataReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA:
            return {
                data: [],
                fetchingData: true,
                fetchSuccess: false,
                fetchError: ""
            }
        case FETCH_SUCCESS:
            return {
                data: action.payload,
                fetchingData: false,
                fetchSuccess: true,
                fetchError: ""
            }
        case FETCH_FAILURE:
            return {
                data: [],
                fetchingData: false,
                fetchSuccess: false,
                fetchError: action.payload
            }
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}