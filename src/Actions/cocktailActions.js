import axios from 'axios'

export const FETCHING_COCKTAILS = "FETCHING_COCKTAILS"
export const COCKTAIL_SUCCESS = "COCKTAIL_SUCCESS"
export const COCKTAIL_FAILURE = "COCKTAIL_FAILURE"

export const RESET_STATE = "RESET_STATE"

export const getCocktails = search => async dispatch => {
    dispatch({
        type: FETCHING_COCKTAILS
    })

    await axios.get(`https://the-cocktail-compendium.herokuapp.com/api/cocktails${search ? `?search=${search}` : ""}`)
    .then(res => {
        console.log(res);
        dispatch({
            type: COCKTAIL_SUCCESS,
            payload: res.data
        })
    })
    .catch(error => {
        console.log(error.response.data.error);
        dispatch({
            type: COCKTAIL_FAILURE,
            payload: error.response.data.error
        })
    })
}