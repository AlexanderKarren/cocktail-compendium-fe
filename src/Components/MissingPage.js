import React from 'react'
import { useHistory } from 'react-router-dom'
import errorImage from '../images/404-image.jpg'
import './ErrorPage.scss'

const MissingPage = () => {
    const { goBack, location } = useHistory();
    return (
        <div className="user-error">
            <h2 className="first">404</h2>
            <div className="error-image"><img src={errorImage} alt="spilled drink" /></div>
            <div className="error-message">Couldn't find a page with the URL "{location.pathname}"</div>
            <div className="link-button" onClick={() => goBack()}>Take me back</div>
        </div>
    )
}

export default MissingPage
