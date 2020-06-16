import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { cocktailReducer } from './cocktailReducer'

export default combineReducers({
    userReducer,
    cocktailReducer
});