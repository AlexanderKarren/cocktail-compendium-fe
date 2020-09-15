import React from 'react'
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

const MobileHeader = ({ user, handleLogOut, loggingIn }) => {
    const { push, location } = useHistory();

    return (
        <header className="MobileHeader solid">
            <div className="burger-button">
                <Dropdown
                    className='button icon'
                    floating
                    options={options}
                    trigger={<></>}
                    icon={"bars"}
                    onChange={(e, d) => push(d.value)}
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
                <img src={user.profile_img_url || aviPlaceholder} alt={user.username} onClick={() => push(`/user/${user.username}`)}/>
                :
                <Button onClick={() => push("/sign-in")} className="header-button" fluid primary>Sign&nbsp;In</Button>
                }
            </div>
            }
        </header>
    )
}

export default MobileHeader
