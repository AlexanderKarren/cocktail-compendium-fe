import React from 'react'
import landingImage from '../images/landing-image.jpg'
import './Landing.scss'

const Landing = () => {
    return (
        <div className="Landing page">
            <h2>Making the art of mixology accessible to everyone.</h2>
            <segment className="image-segment">
                <div className="image-container"><img src={landingImage} alt="Three tasty drinks" /></div>
                <div className="info-container">
                    <p>Hey, there! Welcome to The Cocktail Compendium – a community-driven effort to teach people how to make a tasty drink or two.</p>
                    <p><a href="">Once you have an account</a> (don't worry – it's a <a href="">breeze</a>,) you can get to posting new cocktail recipes for the world to see. It doesn't stop there, though. Cocktails can contain elaborate homemade syrups or uncommon spirits and liquers you might not know too much about, so users can also post new ingredients with detailed information on origin and preparation.</p>
                </div>
            </segment>
            <segment>
                <h2>More Stuff</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </segment>
        </div>
    )
}

export default Landing
