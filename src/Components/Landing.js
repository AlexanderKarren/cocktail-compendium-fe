import React from 'react'
import { Link } from 'react-router-dom'
import landingImage from '../images/landing-image.jpg'
import './Landing.scss'

const Landing = () => {
    return (
        <div className="Landing page">
            <h2 className="first">Making the art of mixology accessible to everyone.</h2>
            <section className="image-segment">
                <div className="image-container"><img src={landingImage} alt="Three tasty drinks" /></div>
                <div className="info-container">
                    <p>Hey, there! Welcome to The Cocktail Compendium – a community-driven effort to teach people how to make a tasty drink or two.</p>
                    <p><Link to="/sign-up">Once you have an account</Link> (don't worry – it's a <Link to="/">breeze</Link>,) you can get to posting new cocktail recipes for the world to see. It doesn't stop there, though. Cocktails can contain elaborate homemade syrups or uncommon spirits and liqueurs you might not know too much about, so users can also post new ingredients with detailed information on origin and preparation.</p>
                </div>
            </section>
            <section>
                <h2>About</h2>
                <p><span>The Cocktail Compendium</span> is a full-stack indie student project. The site you see in front of you is a single-page <a href="https://reactjs.org/">React app</a> built with <a href="https://redux.js.org/">Redux.</a> The back-end API is written in Nodejs and Express and is deployed on Heroku.</p>
            </section>
        </div>
    )
}

export default Landing
