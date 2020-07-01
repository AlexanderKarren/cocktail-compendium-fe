import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import axiosWithAuth from '../../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Button, Icon, Dimmer, Loader, Checkbox } from 'semantic-ui-react'
import cocktailPlaceholder from '../../images/placeholders/cocktail.png'
import ingredientPlaceholder from '../../images/placeholders/ingredient.png'
import drinkwarePlaceholder from '../../images/placeholders/drinkware.png'
import './Add.scss'

const AddCocktail = ({ user }) => {
    const uploadInput = useRef(null);
    const [posting, setPosting] = useState(false);
    const [uploadingImage, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [values, updateValues] = useState({
        name: "",
        description: "",
        preparation: "",
        location_origin: "",
        tags: "",
        image_url: "",
        drinkware: ""
    })
    const [imageLink, setImageLink] = useState(false);
    const [imageLinkError, setImageLinkError] = useState(null);
    const [ingredientOptions, updateIngredientOptions] = useState(null);
    const [ingredients, updateIngredients] = useState([{
        amount: "",
        id: ""
    }]);
    const [drinkwareOptions, updateDrinkwareOptions] = useState(null);
    const { push, goBack } = useHistory();

    const handleChange = event => {
        if (event.target.name === "image_url") setImageLinkError(null);
        updateValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleAmountChange = (event, index) => {
        updateIngredients(ingredients.map((el, i) => {
            return (i === index) ? {
                ...el,
                [event.target.name]: event.target.value
            } : el
        }))
    }

    const handleIngredientChange = (event, data, index) => {
        updateIngredients(ingredients.map((el, i) => {
            return (i === index) ? {
                ...el,
                id: data.value
            } : el
        }))
    }

    const handleDrinkwareChange = (event, data) => {
        updateValues({
            ...values,
            drinkware: data.value
        })
    }

    const dropIngredient = (index) => {
        updateIngredients(ingredients.filter((el, i) => {
            return (i !== index);
        }))
    }

    const newIngredient = () => {
        updateIngredients([
            ...ingredients,
            {
                amount: "",
                id: ""
            }
        ]);
    }

    // get ingredient options
    useEffect(() => {
        axios.get('https://the-cocktail-compendium.herokuapp.com/api/ingredients?sort=name')
        .then(res => {
            console.log(res);
            const newIngredients = [];
            res.data.forEach(element => {
                newIngredients.push({
                    key: element.id,
                    text: element.name,
                    value: element.id,
                    image: {
                        src: (element.image_url ? element.image_url : ingredientPlaceholder)
                    }
                })
            })
            updateIngredientOptions(newIngredients);
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    // get drinkware options
    useEffect(() => {
        axios.get('https://the-cocktail-compendium.herokuapp.com/api/drinkware')
        .then(res => {
            console.log(res);
            const newDrinkware = [];
            res.data.forEach(element => {
                newDrinkware.push({
                    key: element.id,
                    text: element.name,
                    value: element.id,
                    image: {
                        src: (element.image_url ? element.image_url : drinkwarePlaceholder)
                    }
                })
            })
            updateDrinkwareOptions(newDrinkware);
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    const uploadImage = async event => {
        setUploadError("");
        setUploading(true);
        const data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('upload_preset', 'cocktails');

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
        await axiosWithAuth().post('/api/cocktails', {
            ...values,
            location_origin: values.location_origin.length ? values.location_origin : null,
            tags: values.tags ? values.tags : null,
            drinkware: [values.drinkware],
            ingredients: ingredients.map(ingredient => `${ingredient.amount}+${ingredient.id}`),
            image_url: values.image_url ? values.image_url : null
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

    const handleImageError = event => {
        setImageLinkError("Invalid URL")
        event.target.src = cocktailPlaceholder;
    }

    return (
        <div className="page add">
            <h2 className="first">New Cocktail</h2>
            <div className="form-body">
                <div className="image-upload-container">
                    <Dimmer.Dimmable as="div" dimmed={uploadingImage} className="image-upload">
                        <img src={values.image_url ? values.image_url : cocktailPlaceholder} onError={handleImageError} alt="cocktail" />
                        <Dimmer active={uploadingImage} />
                        <Loader active={uploadingImage} />
                    </Dimmer.Dimmable>
                    <Button primary fluid disabled={imageLink} onClick={() => uploadInput.current.click()}>Upload Image</Button>
                    <Checkbox label="Use off-site image URL" value={imageLink} onChange={() => setImageLink(!imageLink)}/>
                    <div>{uploadError}</div>
                </div>
                <Form onSubmit={handleSubmit}>
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
                        error={imageLinkError}
                    />}
                    <Form.TextArea 
                        label="Description" 
                        rows="6"
                        name="description"
                        onChange={handleChange}
                        required
                    />
                    <label>Ingredients</label>
                    {
                    [ingredients.map((el, index) => 
                        (
                        <div className="dropdown-container">
                            <Form.Input 
                                name="amount"
                                className="amount"
                                placeholder="Amount"
                                value={ingredients[index].amount}
                                onChange={e => handleAmountChange(e, index)}
                                required
                            />
                            <Form.Dropdown
                                className="dropdown"
                                fluid
                                selection
                                search
                                options={ingredientOptions}
                                value={ingredients[index].id}
                                onChange={(e, d) => handleIngredientChange(e, d, index)}
                                required
                            />
                            {(ingredients.length > 1) ?
                            <Button 
                                icon 
                                className="drop-button" 
                                type="button" 
                                onClick={() => dropIngredient(index)}
                            >
                                <Icon name="minus" />
                            </Button>
                            :
                            <Button icon disabled className="drop-button">
                                <Icon name="minus" />
                            </Button>
                            }
                        </div>
                    ))]
                    }
                    {ingredientOptions ?
                    (ingredients.length <= 7 ?
                    <Button 
                        className="add-ingredient-btn" 
                        primary 
                        fluid 
                        type="button"
                        onClick={newIngredient}
                    >
                        <Icon name="plus" />
                    </Button>
                    :
                    <Button 
                        className="add-ingredient-btn" 
                        primary 
                        fluid 
                        disabled
                    >
                        <Icon name="plus" />
                    </Button>
                    )
                    :
                    <Button primary loading disabled fluid>
                        <Icon name="plus" />
                    </Button>     
                    }
                    <Form.Dropdown
                        label="Drinkware"
                        className="dropdown"
                        fluid
                        selection
                        search
                        options={drinkwareOptions}
                        onChange={handleDrinkwareChange}
                        required
                    />
                    <Form.TextArea 
                        label="Preparation Instructions" 
                        rows="6"
                        name="preparation"
                        onChange={handleChange}
                        required
                    />
                    <Form.Input 
                        label="Location Origin"
                        name="location_origin"
                        placeholder="City, State / Province, Country"
                        onChange={handleChange}
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
                        Submit Cocktail
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

export default connect(mapStateToProps, {})(AddCocktail)