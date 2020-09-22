import axios from 'axios'

export const START_SIGNING_IN = "START_SIGNING_IN"
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS"
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE"

export const START_REGISTERING = "START_REGISTERING"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAILURE = "REGISTER_FAILURE"

export const RESET_STATE = "RESET_STATE"

export const userSignIn = user => async dispatch => {
    dispatch({
        type: START_SIGNING_IN
    })
    await axios.post('https://the-cocktail-compendium.herokuapp.com/api/users/login', user)
    .then(res => {
        // console.log(res.data);
        localStorage.setItem('user-token', JSON.stringify({
            token: res.data.token,
            username: res.data.username
        }));
        dispatch({
            type: SIGN_IN_SUCCESS,
            payload: res.data.username
        })
    })
    .catch(error => {
        // console.log(error);
        dispatch({
            type: SIGN_IN_FAILURE,
            payload: error.response.data.error
        })
    });
}

export const userRegister = user => async dispatch => {
    // console.log((user.email.length > 0));
    dispatch({
        type: START_REGISTERING
    })
    await axios.post('https://the-cocktail-compendium.herokuapp.com/api/users/register', {
        ...user,
        email: (user.email.length > 0) ? user.email : null
    })
    .then(res => {
        localStorage.setItem('user-token', JSON.stringify(res.data.token));
        dispatch({
            type: REGISTER_SUCCESS
        })
    })
    .catch(error => {
        // console.log(error.response.data.error);
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response.data.error
        })
    });
}

export const resetUserState = () => async dispatch => {
    dispatch({
        type: RESET_STATE
    })
}