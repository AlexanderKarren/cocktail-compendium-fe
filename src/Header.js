import React from 'react'
import { Button } from 'semantic-ui-react'
import logo from './logo.png'
import './Header.scss'

const Header = () => {
    return (
        <div className="Header solid">
            <div className="header-logo-container"><img src={logo} alt="The Cocktail Compendium Logo"/></div>
            <div className="header-links">
                <div className="header-link">Cocktails</div>
                <div className="header-link">Ingredients</div>
                <div className="header-link">Drinkware</div>
                <div className="header-link">Sign Up</div>
            </div>
            <div className="header-button-container"><Button className="header-button" fluid primary>Sign In</Button></div>
        </div>
    )
}

export default Header