import {
    FETCHING_DATA,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    RESET_STATE,
    DELETING_DATA,
    DELETE_SUCCESS,
    DELETE_FAILURE
} from '../Actions/dataActions'

export const initialState = {
    data: [],
    pagination: {},
    fetchingData: false,
    fetchSuccess: false,
    fetchError: "",
    deletingData: false,
    deleteSuccess: false,
    deleteError: ""
}

export const dataReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA:
            return {
                ...state,
                data: [],
                pagination: {},
                fetchingData: true,
                fetchSuccess: false,
                fetchError: ""
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                pagination: action.payload.pagination,
                fetchingData: false,
                fetchSuccess: true,
                fetchError: ""
            }
        case FETCH_FAILURE:
            return {
                ...state,
                data: [],
                pagination: {},
                fetchingData: false,
                fetchSuccess: false,
                fetchError: action.payload
            }
        case DELETING_DATA:
            return {
                ...state,
                deletingData: true,
                deleteSuccess: false,
                deleteError: ""
            }
        case DELETE_SUCCESS:
            return {
                ...state,
                deletingData: false,
                deleteSuccess: true,
                deleteError: ""
            }
        case DELETE_FAILURE:
            return {
                ...state,
                deletingData: false,
                deleteSuccess: false,
                deleteError: action.payload
            }
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}