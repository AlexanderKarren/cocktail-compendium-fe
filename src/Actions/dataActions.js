import axios from 'axios'
import axiosWithAuth from '../utils/axiosWithAuth'

export const FETCHING_DATA = "FETCHING_DATA"
export const FETCH_SUCCESS = "FETCH_SUCCESS"
export const FETCH_FAILURE = "FETCH_FAILURE"

export const DELETING_DATA = "DELETING_DATA"
export const DELETE_SUCCESS = "DELETE_SUCCESS"
export const DELETE_FAILURE = "DELETE_FAILURE"

export const RESET_STATE = "RESET_STATE"

// getData's only required argument is 'table'. 
export const getData = (table, username, search, sort) => async dispatch => {
    dispatch({
        type: FETCHING_DATA
    })

    await axios.get(`https://the-cocktail-compendium.herokuapp.com/api/${table}/${username ? username : ""}?${search ? `search=${search}&` : ""}${sort ? `sort=${sort}` : ""}`)
    .then(res => {
        console.log(res.data);
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

export const deleteCocktail = (table, id) => async dispatch => {
    dispatch({
        type: DELETING_DATA
    })

    await axiosWithAuth().delete(`/api/${table}/id/${id}`)
    .then(() => {
        dispatch({
            type: DELETE_SUCCESS
        })
    })
    .catch(error => {
        dispatch({
            type: DELETE_FAILURE,
            payload: error.response.data.message
        })
    })
}