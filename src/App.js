import React, { useEffect } from 'react'
import { getCurrentUser, resetState } from './Actions/userActions'
import { connect } from 'react-redux'
import { Switch, Route, useHistory } from 'react-router-dom'
import Header from './Components/Header-Footer/Header'
import SignIn from './Components/User/SignIn'
import SignUp from './Components/User/SignUp'
import Landing from './Components/Landing'
import UserPage from './Components/User/UserPage'
import CocktailsList from './Components/Cocktails/CocktailsList'

const App = ({ getCurrentUser, resetState, userMatch, user, loggingIn }) => {
  const { push } = useHistory();

  const handleLogOut = () => {
    localStorage.clear();
    resetState();
    push("/");
  }

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
        <Route path="/cocktails"><CocktailsList /></Route>
        <Route path="/user/:username"><UserPage /></Route>
        <Route path="/"><Landing /></Route>
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

export default connect(mapStateToProps, { getCurrentUser, resetState })(App)
