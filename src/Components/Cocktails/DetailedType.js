import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axiosWithAuth from '../../utils/axiosWithAuth'
import cocktailPlaceholder from '../../images/placeholders/cocktail.png'
import { Loader, Icon, Button } from 'semantic-ui-react'
import ErrorPage from '../ErrorPage'
import './DetailedListing.scss'

const DetailedType = () => {
    const [type, updateType] = useState(null);
    const [typeError, updateTypeError] = useState("");
    const { id } = useParams();
    const { goBack } = useHistory();

    useEffect(() => {
        axiosWithAuth().get(`https://the-cocktail-compendium.herokuapp.com/api/types/id/${id}`)
        .then(res => {
            updateType(res.data);
        })
        .catch(error => {
            updateTypeError(error.response.data.error);
        })
    }, [id])

    return (
        <div className="DetailedListing">
            {type ?
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
                    <h2 className={type.name.length > 20 ? "first small" : "first"}>{type.name}</h2>
                    <div />
                </div>
                <div className="top-panel">
                    <div className="nested-panel">
                        <div className="listing-image">
                            <img src={type.image_url || cocktailPlaceholder} alt={type.name} />
                        </div>
                    </div>
                    <div className="nested-panel">
                        <div className="label">Description</div>
                        <p>{type.description}</p>
                    </div>
                </div>
            </div>
            :
            typeError ? 
            <ErrorPage error={typeError} />
            :
            <div className="page-loading">
                <Loader active />
            </div>
            }
        </div>
    )
}

export default DetailedType
