import React, { useState, useEffect, useRef } from 'react'
import Moment from 'react-moment'
import axios from 'axios'
import axiosWithAuth from '../../utils/axiosWithAuth'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import DataList from '../Cocktails/DataList'
import { Select, Loader, Icon, Button, Dimmer } from 'semantic-ui-react'
import aviPlaceholder from '../../images/placeholders/user.png'
import ErrorPage from '../ErrorPage'
import './UserPage.scss'

const displayOptions = [
    {key: 'cocktails', value: 'cocktails', text: 'Cocktails'},
    {key: 'ingredients', value: 'ingredients', text: 'Ingredients'},
    {key: 'cocktails/liked', value: 'cocktails/liked', text: 'Liked'}
]

const UserPage = () => {
    const uploadInput = useRef(null);
    const [user, updateUser] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [userError, setUserError] = useState("");
    const [uploadError, setUploadError] = useState("");
    const [table, setTable] = useState("cocktails");
    const { username } = useParams();
    const { push } = useHistory();

    const getUser = user => {
        return axiosWithAuth().get(`/api/users/${user}`);
    }

    useEffect(() => {
        getUser(username)
        .then(res => updateUser(res.data))
        .catch(error => setUserError(error.response.data.error))
    }, [username])

    useEffect(() => {
        console.log(table);
    }, [table])

    const uploadImage = async event => {
        setUploadError("");
        setUploading(true);
        const data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('upload_preset', 'avatar');

        await axios.post('https://api.cloudinary.com/v1_1/the-cocktail-compendium/image/upload', data)
        .then(res => {
            console.log(res);
            axiosWithAuth().put(`/api/users/${user.username}`, {
                profile_img_url: res.data.secure_url
            })
            .then(res => {
                setUploadError("")
                setUploading(false);
                getUser(user.username)
                .then(res => updateUser(res.data))
                .catch(error => console.log(error))
            })
            .catch(() => {
                setUploadError("Failed to update user")
                setUploading(false);
                setTimeout(() => {
                    setUploadError("");
                }, [2000])
            })
        })
        .catch(error => {
            console.log(error);
            setUploadError("Failed to upload")
            setUploading(false);
            setTimeout(() => {
                setUploadError("");
            }, [2000])
        })
    }

    return (
        <div className="UserPage">
            {user ?
            <div className="user-page-container page">
                <div className="user-header">
                    <div className="user-picture">
                        <Dimmer.Dimmable as="div" dimmed={uploading} className="user-picture-container">
                            <img src={user.profile_img_url ? user.profile_img_url : aviPlaceholder} alt={user.username} />
                            <Dimmer active={uploading} />
                            <Loader active={uploading} />
                        </Dimmer.Dimmable>
                        {user.same_user && <div 
                            className="link-button"
                            onClick={() => uploadInput.current.click()}>
                            Change profile picture
                        </div>}
                        <div className="upload-error">{uploadError}</div>
                    </div>
                    <div className="user-name">
                        <h2>{user.admin && <Icon name="id badge" />}{user.username}</h2>
                        {(user.cocktail_count <= 0 && user.ingredient_count <= 0) ?
                        <p>
                            <span>{user.username} </span>
                            has been a member since
                            <span> <Moment format="MMMM Do YYYY">{user.date_joined}</Moment> </span>
                            and has yet to upload anything.
                        </p>
                        :
                        <p>
                            <span>{user.username} </span>
                            has been a member since
                            <span> <Moment format="MMMM Do YYYY">{user.date_joined}</Moment> </span>
                            and boasts
                            <span> {user.cocktail_count} </span>
                            {parseInt(user.cocktail_count) === 1 ? 'cocktail ' : 'cocktails '} 
                            and
                            <span> {user.ingredient_count} </span>
                            {parseInt(user.ingredient_count) === 1 ? 'ingredient' : 'ingredients'}.
                        </p>
                        }
                        <Select 
                            options={displayOptions}
                            defaultValue="cocktails"
                            onChange={(e, d) => setTable(d.value)}
                        />
                    </div>
                    <div className="user-buttons">
                        {user.same_user &&
                        <Button primary fluid icon labelPosition="right" onClick={() => push("/cocktails/new")}>
                            Post Cocktail
                            <Icon name="plus"/>
                        </Button>}
                        {user.same_user &&
                        <Button primary fluid icon labelPosition="right" onClick={() => push("/ingredients/new")}>
                            Post Ingredient
                            <Icon name="plus"/>
                        </Button>}
                        {/* {user.same_user &&
                        <Button primary fluid icon>
                            Post Drinkware
                            <Icon name="plus"/>
                        </Button>} */}
                        {user.same_user &&
                        <Button fluid icon labelPosition="right" onClick={() => push("/user/settings")}>
                            Account Settings
                            <Icon name="setting"/>
                        </Button>}
                    </div>
                </div>
                <DataList table={table} username={username} sameUser={user.same_user}/>
                {user.same_user && <input
                    ref={uploadInput}
                    type="file"
                    hidden
                    onChange={uploadImage}
                />}
            </div>
            :
            userError ? <ErrorPage error={userError} />
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

    }
}

export default connect(mapStateToProps, {})(UserPage)