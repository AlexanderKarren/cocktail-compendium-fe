import axiosWithAuth from '../utils/axiosWithAuth'

export const FETCHING_USER = "FETCHING_USER"
export const USER_MATCH = "USER_MATCH"
export const USER_FAILURE = "USER_FAILURE"

export const RESET_USER_STATE = "RESET_USER_STATE"

export const getCurrentUser = username => async dispatch => {
    dispatch({
        type: FETCHING_USER
    })

    await axiosWithAuth().get(`/api/users/${username}`)
    .then(res => {
        if (res.data.same_user) dispatch({
            type: USER_MATCH,
            payload: res.data
        })
        else dispatch({
            type: USER_FAILURE,
            payload: "Token expired – try logging in again"
        })
    })
    .catch(error => {
        dispatch({
            type: USER_FAILURE,
            payload: error.response ? error.response.data.error : error
        })
    })
}

export const resetUserState = () => dispatch => {
    dispatch({
        type: RESET_USER_STATE
    })
}