import React from 'react'
import { useHistory } from 'react-router-dom'
import errorImage from '../images/error-image.jpg'
import './ErrorPage.scss'

const ErrorPage = ({ code, error }) => {
    const { goBack } = useHistory();
    return (
        <div className="user-error">
            <h2 className="first">{code}</h2>
            <div className="error-image"><img src={errorImage} alt="spilled drink" /></div>
            <div>Something went wrong!</div>
            <div className="error-message">{error}</div>
            <div className="link-button" onClick={() => goBack()}>Take me back</div>
        </div>
    )
}

export default ErrorPage
