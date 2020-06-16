import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import logo from './logo.png'
import './Header.scss'

const Header = () => {
    const { push } = useHistory();
    const { pathname } = useLocation();

    return (
        <header className={((pathname === "/sign-in") || (pathname === "/sign-up")) ? "Header" : "Header solid"}>
            <div onClick={() => push("/")} className="header-logo-container">
                <img src={logo} alt="The Cocktail Compendium Logo"/>
            </div>
            <nav className="header-links">
                <div onClick={() => push("/cocktails")} className="header-link">Cocktails</div>
                <div className="header-link">Ingredients</div>
                <div className="header-link">Drinkware</div>
                <div onClick={() => push("/sign-up")} className="header-link">Sign Up</div>
            </nav>
            <div className="header-button-container">
                <Button onClick={() => push("/sign-in")} className="header-button" fluid primary>Sign In</Button>
            </div>
        </header>
    )
}

export default Header