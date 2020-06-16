import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Components/Header-Footer/Header'
import SignIn from './Components/User/SignIn'
import SignUp from './Components/User/SignUp'
import Landing from './Components/Landing'
import CocktailsList from './Components/Cocktails/CocktailsList'
import './App.scss'

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/sign-in"><SignIn /></Route>
        <Route path="/sign-up"><SignUp /></Route>
        <Route path="/cocktails"><CocktailsList /></Route>
        <Route path="/"><Landing /></Route>
      </Switch>
    </div>
  )
}

export default App
