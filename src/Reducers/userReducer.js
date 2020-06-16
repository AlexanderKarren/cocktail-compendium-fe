import {
    START_SIGNING_IN,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    START_REGISTERING,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    RESET_STATE
} from '../Actions/userActions'

export const initialState = {
    isSigningIn: false,
    isRegistering: false,
    signInError: "",
    registerError: "",
    signInSuccess: false,
    registerSuccess: false,
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_SIGNING_IN:
            return {
                ...state,
                isSigningIn: true,
                signInError: ""
            }
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                isSigningIn: false,
                signInSuccess: true,
                signInError: ""
            }
        case SIGN_IN_FAILURE:
            return {
                ...state,
                isSigningIn: false,
                signInError: action.payload,
                signInSuccess: false
            }
        case START_REGISTERING:
            return {
                ...state,
                isRegistering: true,
                registerError: ""
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegistering: false,
                registerSuccess: true,
                registerError: ""
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                isRegistering: false,
                registerError: action.payload,
                registerSuccess: false
            }
        case RESET_STATE:
            return {
                ...initialState
            }
        default:
            return state;
    }
}