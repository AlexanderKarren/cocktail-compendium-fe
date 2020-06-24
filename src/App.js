import React, { useEffect } from 'react'
import { getCurrentUser, resetUserState } from './Actions/userActions'
import { connect } from 'react-redux'
import { Switch, Route, useHistory } from 'react-router-dom'
import Header from './Components/Header-Footer/Header'
import SignIn from './Components/User/SignIn'
import SignUp from './Components/User/SignUp'
import Landing from './Components/Landing'
import UserPage from './Components/User/UserPage'
import DataList from './Components/Cocktails/DataList'
import AddCocktail from './Components/Cocktails/AddCocktail'
import AddIngredient from './Components/Cocktails/AddIngredient'
import DetailedCocktail from './Components/Cocktails/DetailedCocktail'
import DetailedIngredient from './Components/Cocktails/DetailedIngredient'
import DetailedType from './Components/Cocktails/DetailedType'

const App = ({ getCurrentUser, resetUserState, userMatch, user, loggingIn }) => {
  const { push } = useHistory();

  const handleLogOut = () => {
    localStorage.clear();
    resetUserState();
    push("/");
  }

  useEffect(() => {
    console.log(user);
  }, [user])

  useEffect(() => {
    if (localStorage.getItem("user-token")) {
      console.log("getting user");
      const username = JSON.parse(localStorage.getItem("user-token")).username
      getCurrentUser(username);
    }
  }, [getCurrentUser])

  return (
    <div className="App">
      <Header user={user} handleLogOut={handleLogOut} loggingIn={loggingIn}/>
      <Switch>
        <Route path="/sign-in"><SignIn /></Route>
        <Route path="/sign-up"><SignUp /></Route>
        <Route path="/cocktails/id/:id"><DetailedCocktail /></Route>
        <Route path="/cocktails/new"><AddCocktail /></Route>
        <Route path="/cocktails"><DataList table="Cocktails"/></Route>
        <Route path="/ingredients/id/:id"><DetailedIngredient /></Route>
        <Route path="/ingredients/new"><AddIngredient /></Route>
        <Route path="/ingredients"><DataList table="Ingredients"/></Route>
        <Route path="/types/id/:id"><DetailedType /></Route>
        <Route path="/drinkware"><DataList table="Drinkware"/></Route>
        <Route path="/user/:username"><UserPage /></Route>
        <Route exact path="/"><Landing /></Route>
      </Switch>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    userMatch: state.userReducer.userMatch,
    loggingIn: state.userReducer.fetchingUser
  }
}

export default connect(mapStateToProps, { getCurrentUser, resetUserState })(App)
