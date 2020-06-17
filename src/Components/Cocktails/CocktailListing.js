import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import placeholder from '../../images/placeholders/cocktail.png'

const CocktailListing = ({ cocktail }) => {
    return (
        <div className="CocktailListing listing">
            <div className="listing-image"><img src={placeholder} alt="Cocktail" /></div>
            <div className="listing-info">
                <div className="listing-header">
                    <Link to="">{cocktail.name}</Link>
                    <Link to={`/user/${cocktail.posted_by}`}>{cocktail.posted_by}</Link>
                </div>
                <div className="listing-description">{cocktail.description}</div>
                <div className="listing-date">
                    <div>{cocktail.location_origin ? cocktail.location_origin : " "}</div>
                    <Moment format="MM/DD/YY">{cocktail.date_posted}</Moment>
                </div>
            </div>
        </div>
    )
}

export default CocktailListing
