import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Button, Loader } from 'semantic-ui-react'
import logo from '../../images/logo.png'
import aviPlaceholder from '../../images/placeholders/user.png'
import './Header.scss'

const Header = ({ user, handleLogOut, loggingIn }) => {
    const { push } = useHistory();
    const { pathname } = useLocation();

    return (
        <header className={((pathname === "/sign-in") || (pathname === "/sign-up")) ? "Header" : "Header solid"}>
            <div onClick={() => push("/")} className="header-logo-container">
                <img src={logo} alt="The Cocktail Compendium Logo"/>
            </div>
            <nav className="header-links">
                <div onClick={() => push("/cocktails")} className="header-link">Cocktails</div>
                <div className="header-link">Ingredients</div>
                <div className="header-link">Drinkware</div>
                {user ?
                <div onClick={handleLogOut} className="header-link">Sign Out</div>
                :
                <div onClick={() => push("/sign-up")} className="header-link">Sign Up</div>
                }
            </nav>
            {loggingIn ?
            <div className="header-button-container"><Loader active inverted inline/></div>
            :
            <div className="header-button-container">
                {user ?
                <div className="header-user-avi" onClick={() => push(`/user/${user.username}`)}>
                    <img src={user.profile_img_url || aviPlaceholder} alt={user.username} />
                </div>
                :
                <Button onClick={() => push("/sign-in")} className="header-button" fluid primary>Sign In</Button>
                }
            </div>
            }
        </header>
    )
}

export default Header