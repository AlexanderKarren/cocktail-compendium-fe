import React, { useState, useEffect } from 'react'
import axios from 'axios'
import axiosWithAuth from '../../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Button, Icon } from 'semantic-ui-react'
import cocktailPlaceholder from '../../images/placeholders/cocktail.png'
import ingredientPlaceholder from '../../images/placeholders/ingredient.png'
import './Add.scss'

const AddCocktail = ({ user }) => {
    const [posting, setPosting] = useState(false);
    const [values, updateValues] = useState({
        name: "",
        description: "",
        preparation: "",
        location_origin: "",
        img_url: "",
        drinkware: ""
    })
    const [ingredientOptions, updateIngredientOptions] = useState(null);
    const [ingredients, updateIngredients] = useState([{
        amount: "",
        id: ""
    }]);
    const [drinkwareOptions, updateDrinkwareOptions] = useState(null);
    const { push, goBack } = useHistory();

    const handleChange = event => {
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
                        src: (element.image_url ? element.image_url : cocktailPlaceholder)
                    }
                })
            })
            updateDrinkwareOptions(newDrinkware);
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    const handleSubmit = async event => {
        event.preventDefault();
        console.log({
            ...values,
            drinkware: [values.drinkware],
            ingredients: ingredients.map(ingredient => `${ingredient.amount}+${ingredient.id}`)
        })
        setPosting(true);
        await axiosWithAuth().post('/api/cocktails', {
            ...values,
            location_origin: values.location_origin.length > 0 ? values.location_origin : null,
            drinkware: [values.drinkware],
            ingredients: ingredients.map(ingredient => `${ingredient.amount}+${ingredient.id}`)
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

    return (
        <div className="page add">
            <h2 className="first">New Cocktail</h2>
            <div className="form-body">
                <div className="image-upload-container">
                    <div className="image-upload">
                        <img src={cocktailPlaceholder} alt="user upload" />
                    </div>
                    <Button primary fluid>Upload Image</Button>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Input 
                        label="Name"
                        name="name"
                        onChange={handleChange}
                        required
                    />
                    <Form.TextArea 
                        label="Description" 
                        rows="6"
                        name="description"
                        onChange={handleChange}
                        required
                    />
                    <label>Ingredients</label>
                    {
                    [ingredients.map((e, index) => 
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