import axiosWithAuth from '../utils/axiosWithAuth'

export const FETCHING_USER = "FETCHING_USER"
export const USER_MATCH = "USER_MATCH"
export const USER_FAILURE = "USER_FAILURE"

export const RESET_USER_STATE = "RESET_USER_STATE"

export const getCurrentUser = username => async dispatch => {
    console.log("should be setting state")
    dispatch({
        type: FETCHING_USER
    })

    await axiosWithAuth().get(`/api/users/${username}`)
    .then(res => {
        dispatch({
            type: USER_MATCH,
            payload: res.data
        })
    })
    .catch(error => {
        dispatch({
            type: USER_FAILURE,
            payload: error.response.data.error
        })
    })
}

export const resetUserState = () => dispatch => {
    dispatch({
        type: RESET_USER_STATE
    })
}