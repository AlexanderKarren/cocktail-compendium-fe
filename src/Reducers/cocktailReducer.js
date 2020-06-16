import {
    FETCHING_COCKTAILS,
    COCKTAIL_SUCCESS,
    COCKTAIL_FAILURE,
    RESET_STATE
} from '../Actions/cocktailActions'

export const initialState = {
    cocktails: [],
    fetchingCocktails: false,
    cocktailSuccess: false,
    cocktailError: ""
}

export const cocktailReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_COCKTAILS:
            return {
                cocktails: [],
                fetchingCocktails: true,
                cocktailSuccess: false,
                cocktailError: ""
            }
        case COCKTAIL_SUCCESS:
            return {
                cocktails: action.payload,
                fetchingCocktails: false,
                cocktailSuccess: true,
                cocktailError: ""
            }
        case COCKTAIL_FAILURE:
            return {
                cocktails: [],
                fetchingCocktails: false,
                cocktailSuccess: false,
                cocktailError: action.payload
            }
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}