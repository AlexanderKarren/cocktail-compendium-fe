import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import aviPlaceholder from '../../images/placeholders/user.png'
import { Checkbox, Loader, Button, Icon, Dimmer, Form, Message } from 'semantic-ui-react'
import './UserSettings.scss'

const UserSettings = ({ user }) => {
    const [values, updateValues] = useState({});
    const [changesMade, setChangesMade] = useState(false);
    const [uploading, startUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [deleteMode, setDeleteMode] = useState(false);
    const [imageLink, setImageLink] = useState(false);
    const [imageLinkError, setImageLinkError] = useState(null);
    const { goBack } = useHistory();

    const handleChange = event => {
        if (!changesMade) setChangesMade(true);
        updateValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleImageError = event => {
        setImageLinkError("Invalid URL")
        event.target.src = aviPlaceholder;
    }

    useEffect(() => {
        if (user) updateValues(user);
    }, [user])

    return (
        <div className="UserSettings">
            {user ?
            <div className="user-settings-container page">
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
                    <h2 className="first">Account Settings</h2>
                    <div />
                </div>
                <div className="user-header">
                    <div className="user-picture">
                        <Dimmer.Dimmable as="div" dimmed={uploading} className="user-picture-container">
                            <img src={values.profile_img_url ? values.profile_img_url : aviPlaceholder} alt={user.username} onError={handleImageError}/>
                            <Dimmer active={uploading} />
                            <Loader active={uploading} />
                        </Dimmer.Dimmable>
                        <Button primary fluid>Upload Image</Button>
                        <Checkbox label="Use off-site image URL" value={imageLink} onChange={() => setImageLink(!imageLink)}/>
                        <div className="upload-error">{uploadError}</div>
                    </div>
                    <Form className="settings-form">
                        <label>Username</label>
                        <p>{user.username}</p>
                        <Form.TextArea label="Bio" rows={5} name="bio" value={values.bio} onChange={handleChange}/>
                        {imageLink && <Form.Input label="Image URL" name="profile_img_url" value={values.profile_img_url} onChange={handleChange}/>}
                        <Button type="submit" disabled={!changesMade} primary fluid>Save Changes</Button>
                        <Button fluid onClick={() => goBack()}>Cancel</Button>
                        {deleteMode ?
                        <Message negative>
                            <Icon name="exclamation triangle" />
                            <Message.Header>Are you sure you want to delete your account? It will erase all of your uploads, and the action cannot be undone.</Message.Header>
                            <div className="delete-buttons">
                                <Button color="red">Yes</Button>
                                <Button onClick={() => setDeleteMode(false)}>No</Button>
                            </div>
                        </Message>
                        :
                        <Button color="red" fluid onClick={() => setDeleteMode(true)}>Delete Account</Button>
                        }
                    </Form>
                </div>
            </div>
            :
            <div className="page-loading">
                <Loader active />
            </div>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, {})(UserSettings)
