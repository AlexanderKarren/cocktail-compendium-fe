import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown, Button, Loader } from 'semantic-ui-react'
import logoImage from '../../images/logo_mobile.png'
import aviPlaceholder from '../../images/placeholders/user.png'
import './Header.scss'

const options = [
    { key: "cocktails", value: "/cocktails", text: "Cocktails"},
    { key: "ingredients", value: "/ingredients", text: "Ingredients"},
    { key: "drinkware", value: "/drinkware", text: "Drinkware"},
]

const burgerOptions = [
    ...options,
    { key: "sign-up", value: "sign-up", text: "Sign Up"}
]

const userOptions = [
    ...options,
    { key: "sign-out", value: "sign-out", text: "Sign Out"}
]

const MobileHeader = ({ user, handleLogOut, loggingIn }) => {
    const { push, location, listen } = useHistory();
    const [currentPage, setCurrentPage] = useState(location.pathname);

    useEffect(() => {
        return listen(location => {
             setCurrentPage(location.pathname);
        }) 
     },[listen]) 

    const handleMenuChange = (event, data) => {
        if (data.value === "sign-out") handleLogOut();
        else push(data.value);
    }

    console.log(location.pathname);

    return (
        <header className="MobileHeader solid">
            <div className="burger-button">
                <Dropdown
                    className='button icon'
                    floating
                    options={user ? userOptions : burgerOptions}
                    trigger={<></>}
                    icon={"bars"}
                    onChange={handleMenuChange}
                    value={currentPage}
                />
            </div>
            <div className="home-button">
                <Link to="/"><img src={logoImage} alt="logo" /></Link>
            </div>
            {loggingIn ?
            <div className="account-button"><Loader active inverted inline/></div>
            :
            <div className="account-button">
                {user ?
                <div><img src={user.profile_img_url || aviPlaceholder} alt={user.username} onClick={() => push(`/user/${user.username}`)}/></div>
                :
                <Button onClick={() => push("/sign-in")} className="header-button" fluid primary>Sign&nbsp;In</Button>
                }
            </div>
            }
        </header>
    )
}

export default MobileHeader
