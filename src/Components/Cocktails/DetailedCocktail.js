import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import axiosWithAuth from '../../utils/axiosWithAuth'
import Moment from 'react-moment'
import cocktailPlaceholder from '../../images/placeholders/cocktail.png'
import ingredientPlaceholder from '../../images/placeholders/ingredient.png'
import drinkwarePlaceholder from '../../images/placeholders/drinkware.png'
import { Loader, Icon, Button, Message } from 'semantic-ui-react'
import DataOpButtons from './DataOpButtons'
import ErrorPage from '../ErrorPage'
import './DetailedListing.scss'

const DetailedCocktail = ({ user }) => {
    const [cocktail, updateCocktail] = useState(null);
    const [cocktailError, updateCocktailError] = useState("");
    const [rating, updateRating] = useState(null);
    const [ratingCount, updateRatingCount] = useState(null);
    const [loadingRating, setLoadingRating] = useState({
        thumbsDown: false,
        thumbsUp: false
    });
    const { id } = useParams();
    const { goBack } = useHistory();

    // get cocktail info
    useEffect(() => {
        axiosWithAuth().get(`/api/cocktails/id/${id}`)
        .then(res => {
            updateCocktail(res.data);
        })
        .catch(error => {
            updateCocktailError(error.response.data.error);
        })
    }, [id])

    // get rating info
    useEffect(() => {
        if (cocktail) axiosWithAuth().get(`/api/cocktails/rating/id/${id}`)
        .then(res => {
            updateRating(res.data);
        })
        .catch(error => {
            console.log(error);
        })
    }, [cocktail, id])

    // get rating count
    useEffect(() => {
        if (cocktail) axiosWithAuth().get(`/api/cocktails/rating-count/id/${id}`)
        .then(res => {
            updateRatingCount(res.data);
        })
        .catch(error => {
            console.log(error);
        })
    }, [cocktail, id, rating])

    const handleRating = async (liked, button) => {
        setLoadingRating({
            ...loadingRating,
            [button]: true
        });
        if (rating.liked === liked) await axiosWithAuth().delete(`/api/cocktails/rating/id/${id}`)
        .then(res => {
            updateRating({
                rated: false,
                liked: null
            })
            setLoadingRating({
                thumbsDown: false,
                thumbsUp: false
            });
        })
        .catch(error => {
            console.log(error.response.data.error);
            setLoadingRating({
                thumbsDown: false,
                thumbsUp: false
            });
        })
        else if (rating.rated) await axiosWithAuth().put(`/api/cocktails/rating/id/${id}`, {
            liked: liked
        })
        .then(res => {
            updateRating({
                rated: true,
                liked: liked
            })
            setLoadingRating({
                thumbsDown: false,
                thumbsUp: false
            });
        })
        .catch(error => {
            console.log(error.response.data.error);
            setLoadingRating({
                thumbsDown: false,
                thumbsUp: false
            });
        })
        else await axiosWithAuth().post(`/api/cocktails/rating/`, {
            cocktail_id: cocktail.id,
            liked: liked
        })
        .then(res => {
            updateRating({
                rated: true,
                liked: liked
            })
            setLoadingRating({
                thumbsDown: false,
                thumbsUp: false
            });
        })
        .catch(error => {
            console.log(error.response.data.error);
            setLoadingRating({
                thumbsDown: false,
                thumbsUp: false
            });
        })
    }

    return (
        <div className="DetailedListing">
            {cocktail ?
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
                    <h2 className={cocktail.name.length > 20 ? "first small" : "first"}>{cocktail.name}</h2>
                    <div />
                </div>
                <div className="top-panel">
                    <div className="nested-panel">
                        <div className="listing-image">
                            <img src={cocktail.image_url || cocktailPlaceholder} alt={cocktail.name} />
                            {user && <div className="rating-buttons">
                                {rating && <div className={(rating.rated && !rating.liked) ? "rating-button thumbs-down selected" : "rating-button thumbs-down"} onClick={() => handleRating(false, "thumbsDown")}>
                                    {loadingRating.thumbsDown ?
                                    <Loader active inline />
                                    :
                                    (rating.rated ? <Icon flipped="horizontally" name={rating.liked ? "thumbs down outline" : "thumbs down"} />
                                    : <Icon flipped="horizontally" name="thumbs down outline" />)
                                    }
                                </div>}
                                {rating && <div className={(rating.rated && rating.liked) ? "rating-button thumbs-up selected" : "rating-button thumbs-up"} onClick={() => handleRating(true, "thumbsUp")}>
                                {loadingRating.thumbsUp ?
                                <Loader active inline />
                                :
                                (rating.rated ? <Icon name={rating.liked ? "thumbs up" : "thumbs up outline"} />
                                    : <Icon name="thumbs up outline"/>)
                                }
                                </div>}
                                <Loader active={!rating} inline />
                            </div>}
                        </div>
                    </div>
                    <div className="nested-panel">
                        <div className="label">
                            <div>Posted by</div>
                            <div>Date</div>
                        </div>
                        <div className="label metadata">
                            <Link to={`/user/${cocktail.posted_by}`}>{cocktail.posted_by}</Link>
                            <div className="date">
                                <Moment format="MM/DD/YY HH:mm">{cocktail.date_posted}</Moment>
                            </div>
                        </div>
                        {ratingCount ?
                        <div className="rating">
                            <div className="dislikes">
                                <Icon name="thumbs down" />
                                {ratingCount.dislikes}
                            </div>
                            <div className="likes">
                                <Icon name="thumbs up" />
                                {ratingCount.likes}
                            </div>
                            <div className="percentage">
                                {parseInt((parseInt(ratingCount.likes) / (parseInt(ratingCount.likes) + parseInt(ratingCount.dislikes)) * 100)) || 0}%
                            </div>
                        </div>
                        :
                        <div className="rating"><Loader size="mini" active inline /></div>}
                        {!cocktail.alcoholic && <div className="label alcoholic">Non-Alcoholic</div>}
                        <div className="label">Description</div>
                        <p>{cocktail.description}</p>
                        {cocktail.location_origin && <div className="label">Location Origin</div>}
                        {cocktail.location_origin && <p>{cocktail.location_origin}</p>}
                        {(cocktail.same_user && !cocktail.approved) && <Message warning>
                            <Message.Header>This drink is not approved yet</Message.Header>
                            <p>Users can see this drink if they go to your page, but it won't appear on the site's communal list.</p>
                        </Message>}
                        {(cocktail.same_user)  && <DataOpButtons table="cocktails" data={cocktail}/>}
                    </div>
                </div>
                <div className="top-panel">
                    <div className="nested-panel">
                        <div className="label centered">Ingredients</div>
                        <div className="ingredients-container">
                            {cocktail.ingredients.map(ingredient => (
                                <div className="ingredient">
                                    <div className="ingredient-image">
                                        <img src={ingredient.image_url || ingredientPlaceholder} alt={ingredient.name} />
                                    </div>
                                    <div className="ingredient-info">
                                        <div>{ingredient.amount}</div>
                                        <Link to={`/ingredients/id/${ingredient.id}`}>{ingredient.name}</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="label centered">Drinkware</div>
                        <div className="drinkware">
                            <div className="drinkware-image">
                                <img src={cocktail.drinkware[0].image_url || drinkwarePlaceholder} alt={cocktail.drinkware[0].name}/>
                            </div>
                            <div className="drinkware-name"><Link to={`/drinkware/id/${cocktail.drinkware[0].id}`}>{cocktail.drinkware[0].name}</Link></div>
                        </div>
                    </div>
                    <div className="nested-panel">
                        <div className="label">Preparation</div>
                        <p>{cocktail.preparation}</p>
                    </div>
                </div>
            </div>
            :
            cocktailError ? 
            <ErrorPage error={cocktailError} />
            :
            <div className="page-loading">
                <Loader active />
            </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, null)(DetailedCocktail)
