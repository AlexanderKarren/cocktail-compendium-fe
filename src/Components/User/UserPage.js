import React, { useState, useEffect, useRef } from 'react'
import Moment from 'react-moment'
import axios from 'axios'
import axiosWithAuth from '../../utils/axiosWithAuth'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import DataList from '../Cocktails/DataList'
import { Select, Loader, Icon, Button } from 'semantic-ui-react'
import aviPlaceholder from '../../images/placeholders/user.png'
import './UserPage.scss'

const displayOptions = [
    {key: 'cocktails', value: 'cocktails', text: 'Cocktails'},
    {key: 'ingredients', value: 'ingredients', text: 'Ingredients'}
]

const UserPage = () => {
    const uploadInput = useRef(null);
    const [user, updateUser] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);
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
        .catch(error => console.log(error))
    }, [username])

    useEffect(() => {
        console.log(table);
    }, [table])

    const uploadImage = async event => {
        setUploadError("");
        setUploadLoading(true);
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
                setUploadLoading(false);
                getUser(user.username)
                .then(res => updateUser(res.data))
                .catch(error => console.log(error))
            })
            .catch(() => {
                setUploadError("Failed to update user")
                setUploadLoading(false);
            })
        })
        .catch(error => {
            console.log(error);
            setUploadError("Failed to upload")
            setUploadLoading(false);
        })
    }

    return (
        <div className="UserPage">
            {user ?
            <div className="user-page-container page">
                <div className="user-header">
                    <div className="user-picture">
                        {uploadLoading && <Loader active className="uploading"/>}
                        <img src={user.profile_img_url ? user.profile_img_url : aviPlaceholder} alt={user.username} />
                        {user.same_user && <div 
                            className="link-button"
                            onClick={() => uploadInput.current.click()}>
                            Change profile picture
                        </div>}
                        <div className="upload-error">{uploadError}</div>
                    </div>
                    <div className="user-name">
                        <h2>{user.username}</h2>
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
                            {user.cocktail_count === 1 ? 'cocktails ' : 'cocktail '} 
                            and
                            <span> {user.ingredient_count} </span>
                            {user.ingredient_count === 1 ? 'ingredient' : 'ingredients'}.
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
                        <Button primary fluid icon onClick={() => push("/new-cocktail")}>
                            Post Cocktail
                            <Icon name="plus"/>
                        </Button>}
                        {user.same_user &&
                        <Button primary fluid icon>
                            Post Ingredient
                            <Icon name="plus"/>
                        </Button>}
                        {user.same_user &&
                        <Button primary fluid icon>
                            Account Settings
                            <Icon name="setting"/>
                        </Button>}
                    </div>
                </div>
                <DataList table={table} username={username} sameUser={user.same_user}/>
            </div>
            :
            <div className="page-loading">
                <Loader active />
            </div>
            }
            <input
                ref={uploadInput}
                type="file"
                hidden
                onChange={uploadImage}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps, {})(UserPage)