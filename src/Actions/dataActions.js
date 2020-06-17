import axios from 'axios'

export const FETCHING_DATA = "FETCHING_DATA"
export const FETCH_SUCCESS = "FETCH_SUCCESS"
export const FETCH_FAILURE = "FETCH_FAILURE"

export const RESET_STATE = "RESET_STATE"

export const getCocktails = (username, search, sort) => async dispatch => {
    dispatch({
        type: FETCHING_DATA
    })

    console.log(search, sort);

    await axios.get(`https://the-cocktail-compendium.herokuapp.com/api/cocktails/${username ? username : ""}?${search ? `search=${search}&` : ""}${sort ? `sort=${sort}` : ""}`)
    .then(res => {
        console.log(res);
        dispatch({
            type: FETCH_SUCCESS,
            payload: res.data
        })
    })
    .catch(error => {
        console.log(error.response.data.error);
        dispatch({
            type: FETCH_FAILURE,
            payload: error.response.data.error
        })
    })
}