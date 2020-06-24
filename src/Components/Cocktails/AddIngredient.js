import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import axiosWithAuth from '../../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Button, Dimmer, Loader, Checkbox } from 'semantic-ui-react'
import cocktailPlaceholder from '../../images/placeholders/cocktail.png'
import ingredientPlaceholder from '../../images/placeholders/ingredient.png'
import './Add.scss'

const AddIngredient = ({ user }) => {
    const uploadInput = useRef(null);
    const [posting, setPosting] = useState(false);
    const [uploadingImage, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [values, updateValues] = useState({
        type_id: "",
        name: "",
        description: "",
        preparation: "",
        tags: "",
        image_url: "",
        generic: false
    })
    const [imageLink, setImageLink] = useState(false);
    const [typeOptions, updateTypeOptions] = useState(null);
    const { push, goBack } = useHistory();

    const handleChange = event => {
        updateValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleTypeChange = (event, data) => {
        updateValues({
            ...values,
            type_id: data.value
        })
    }

    const handleCheckChange = () => {
        updateValues({
            ...values,
            generic: !values.generic
        })
    }

    const uploadImage = async event => {
        setUploadError("");
        setUploading(true);
        const data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('upload_preset', 'ingredients');

        await axios.post('https://api.cloudinary.com/v1_1/the-cocktail-compendium/image/upload', data)
        .then(res => {
            console.log(res);
            setUploading(false);
            updateValues({
                ...values,
                image_url: res.data.secure_url
            })
            setUploadError("");
        })
        .catch(error => {
            console.log(error);
            setUploadError("Failed to upload")
            setUploading(false);
        })
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setPosting(true);
        await axiosWithAuth().post('/api/ingredients', {
            ...values,
            preparation: values.preparation ? values.preparation : null,
            tags: values.tags ? values.tags : null,
            generic: !values.generic
        })
        .then(res => {
            setPosting(false);
            console.log(res);
            push(`/user/${user.username}`)
        })
        .catch(error => {
            console.log(error.response.data.error);
            setPosting(false);
        })
    }

    // get type options
    useEffect(() => {
        axios.get('https://the-cocktail-compendium.herokuapp.com/api/types')
        .then(res => {
            updateTypeOptions(res.data.map(element => {
                return {
                    key: element.id,
                    text: element.name,
                    value: element.id,
                    image: {
                        src: (element.image_url ? element.image_url : cocktailPlaceholder)
                    }
                }
            }));
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <div className="page add">
            <h2 className="first">New Ingredient</h2>
            <div className="form-body">
                <div className="image-upload-container">
                    <Dimmer.Dimmable as="div" dimmed={uploadingImage} className="image-upload">
                        <img src={values.image_url ? values.image_url : ingredientPlaceholder} alt="user upload" />
                        <Dimmer active={uploadingImage} />
                        <Loader active={uploadingImage} />
                    </Dimmer.Dimmable>
                    <Button primary fluid disabled={imageLink} onClick={() => uploadInput.current.click()}>Upload Image</Button>
                    <Checkbox label="Use off-site image URL" value={imageLink} onChange={() => setImageLink(!imageLink)}/>
                    <div>{uploadError}</div>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Dropdown
                        label="Type"
                        className="dropdown"
                        fluid
                        selection
                        search
                        options={typeOptions}
                        onChange={handleTypeChange}
                        required
                    />
                    <Form.Input 
                        label="Name"
                        name="name"
                        onChange={handleChange}
                        required
                    />
                    {imageLink && <Form.Input 
                        label="Image URL"
                        name="image_url"
                        onChange={handleChange}
                        value={values.image_url}
                        required
                    />}
                    <Form.TextArea 
                        label="Description" 
                        rows="6"
                        name="description"
                        onChange={handleChange}
                        required
                    />
                    <Form.TextArea 
                        label="Preparation Instructions" 
                        rows="6"
                        name="preparation"
                        onChange={handleChange}
                    />
                    <Form.Checkbox
                        label="Ingredient is a specific brand"
                        name="generic"
                        onChange={handleCheckChange}
                        value={values.generic}
                    />
                    <Form.Input 
                        label="Search Tags"
                        name="tags"
                        placeholder="Separate tags with commas"
                        onChange={handleChange}
                    />
                    {posting ?
                    <Button primary fluid disabled loading>
                        Loading
                    </Button>
                    :
                    <Button primary fluid type="submit">
                        Submit Ingredient
                    </Button>
                    }
                    <Button fluid type="button" onClick={goBack}>
                        Cancel
                    </Button>
                </Form>
                <input
                    ref={uploadInput}
                    type="file"
                    hidden
                    onChange={uploadImage}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, {})(AddIngredient)