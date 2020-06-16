import React from 'react'
import { Link } from 'react-router-dom'
import landingImage from '../images/landing-image.jpg'
import './Landing.scss'

const Landing = () => {
    return (
        <div className="Landing page">
            <h2 className="first">Making the art of mixology accessible to everyone.</h2>
            <div className="segment image-segment">
                <div className="image-container"><img src={landingImage} alt="Three tasty drinks" /></div>
                <div className="info-container">
                    <p>Hey, there! Welcome to The Cocktail Compendium – a community-driven effort to teach people how to make a tasty drink or two.</p>
                    <p><Link to="/sign-up">Once you have an account</Link> (don't worry – it's a <Link to="/">breeze</Link>,) you can get to posting new cocktail recipes for the world to see. It doesn't stop there, though. Cocktails can contain elaborate homemade syrups or uncommon spirits and liquers you might not know too much about, so users can also post new ingredients with detailed information on origin and preparation.</p>
                </div>
            </div>
            <div className="segment">
                <h2>More Stuff</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
    )
}

export default Landing
