import axiosWithAuth from '../utils/axiosWithAuth'

export const FETCHING_USER = "FETCHING_USER"
export const USER_MATCH = "USER_MATCH"
export const USER_FAILURE = "USER_FAILURE"

export const RESET_STATE = "RESET_STATE"

export const getCurrentUser = username => async dispatch => {
    dispatch({
        type: FETCHING_USER
    })

    await axiosWithAuth().get(`/api/users/${username}`)
    .then(res => {
        console.log("success, userMatch should update");
        dispatch({
            type: USER_MATCH,
            payload: res.data
        })
    })
    .catch(error => {
        console.log("failure, userMatch remains false");
        dispatch({
            type: USER_FAILURE,
            payload: error.response.data.error
        })
    })
}

export const resetState = () => dispatch => {
    dispatch({
        type: RESET_STATE
    })
}