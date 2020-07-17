import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axiosWithAuth from '../../utils/axiosWithAuth'
import drinkwarePlaceholder from '../../images/placeholders/drinkware.png'
import { Loader, Icon, Button } from 'semantic-ui-react'
import ErrorPage from '../ErrorPage'
import './DetailedListing.scss'

const DetailedDrinkware = () => {
    const [glass, updateGlass] = useState(null);
    const [glassError, updateTypeError] = useState("");
    const { id } = useParams();
    const { goBack } = useHistory();

    useEffect(() => {
        axiosWithAuth().get(`https://the-cocktail-compendium.herokuapp.com/api/drinkware/id/${id}`)
        .then(res => {
            updateGlass(res.data);
        })
        .catch(error => {
            updateTypeError(error.response.data.error);
        })
    }, [id])

    return (
        <div className="DetailedListing">
            {glass ?
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
                    <h2 className={glass.name.length > 20 ? "first small" : "first"}>{glass.name}</h2>
                    <div />
                </div>
                <div className="top-panel">
                    <div className="nested-panel">
                        <div className="listing-image">
                            <img src={glass.image_url || drinkwarePlaceholder} alt={glass.name} />
                        </div>
                    </div>
                    <div className="nested-panel">
                        <div className="label">Description</div>
                        <p>{glass.description}</p>
                    </div>
                </div>
            </div>
            :
            glassError ? 
            <ErrorPage error={glassError} />
            :
            <div className="page-loading">
                <Loader active />
            </div>
            }
        </div>
    )
}

export default DetailedDrinkware
