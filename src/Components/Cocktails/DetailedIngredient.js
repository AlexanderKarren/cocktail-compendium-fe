import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import axiosWithAuth from '../../utils/axiosWithAuth'
import Moment from 'react-moment'
import ingredientPlaceholder from '../../images/placeholders/ingredient.png'
import { Loader, Icon, Button, Message } from 'semantic-ui-react'
import DataOpButtons from './DataOpButtons'
import ErrorPage from '../ErrorPage'
import './DetailedListing.scss'

const DetailedIngredient = () => {
    const [ingredient, updateIngredient] = useState(null);
    const [ingredientError, updateIngredientError] = useState("");
    const { id } = useParams();
    const { goBack } = useHistory();

    useEffect(() => {
        axiosWithAuth().get(`https://the-cocktail-compendium.herokuapp.com/api/ingredients/id/${id}`)
        .then(res => {
            updateIngredient(res.data);
        })
        .catch(error => {
            updateIngredientError(error.response.data.error);
        })
    }, [id])

    return (
        <div className="DetailedListing">
            {ingredient ?
            <div className="detailed-listing-container page">
                <div className="heading">
                    <Button 
                        primary 
                        className="return-button" 
                        icon 
                        labelPosition="left"
                        onClick={() => goBack()}
                    >
                        Return
                        <Icon name="left arrow" />
                    </Button>
                    <h2 className={ingredient.name.length > 20 ? "first small" : "first"}>{ingredient.name}</h2>
                    <div />
                </div>
                <div className="top-panel">
                    <div className="nested-panel">
                        <div className="listing-image">
                            <img src={ingredient.image_url || ingredientPlaceholder} alt={ingredient.name} />
                        </div>
                    </div>
                    <div className="nested-panel">
                        <div className="label">
                            <div>Posted by</div>
                            <div>Date</div>
                        </div>
                        <div className="label metadata">
                            <Link to={`/user/${ingredient.posted_by}`}>{ingredient.posted_by}</Link>
                            <div className="date">
                                <Moment format="MM/DD/YY HH:mm">{ingredient.date_posted}</Moment>
                            </div>
                        </div>
                        <div className="label">Type</div>
                        <p><Link to={`/types/id/${ingredient.type_id}`}>{ingredient.type}</Link></p>
                        <div className="label">Description</div>
                        <p>{ingredient.description}</p>
                        {ingredient.preparation && <div className="label">Preparation</div>}
                        {ingredient.preparation && <p>{ingredient.preparation}</p>}
                        {(ingredient.same_user && !ingredient.approved) && <Message warning>
                            <Message.Header>This ingredient is not approved yet</Message.Header>
                            <p>Users can see this ingredient if they go to your page, but it won't appear on the site's communal list.</p>
                        </Message>}
                        {ingredient.same_user && <DataOpButtons table="ingredients" data={ingredient} />}
                    </div>
                </div>
            </div>
            :
            ingredientError ? 
            <ErrorPage error={ingredientError} />
            :
            <div className="page-loading">
                <Loader active />
            </div>
            }
        </div>
    )
}

export default DetailedIngredient
