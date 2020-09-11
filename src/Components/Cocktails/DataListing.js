import React, { useState } from 'react'
import Moment from 'react-moment'
import { deleteCocktail, getData } from '../../Actions/dataActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import cocktailPlaceholder from '../../images/placeholders/cocktail.png'
import ingredientPlaceholder from '../../images/placeholders/ingredient.png'
import drinkwarePlaceholder from '../../images/placeholders/drinkware.png'
import { Button, Loader } from 'semantic-ui-react'

const DataListing = props => {
    const { cocktail, sameUser, table } = props;
    const [verifyDelete, setVerifyDelete] = useState(false);

    const placeholderImage = {
        cocktails: cocktailPlaceholder,
        cocktailsliked: cocktailPlaceholder,
        ingredients: ingredientPlaceholder,
        drinkware: drinkwarePlaceholder
    }

    const handleDelete = async () => {
        await props.deleteCocktail(table, cocktail.id);
        props.getData(table, props.user.username);
    }

    return (
        <div className="CocktailListing listing">
            {!verifyDelete && <div className="listing-image">
                <img src={cocktail.image_url ? cocktail.image_url : placeholderImage[table.toLowerCase().replace("/", "")]} alt={table} />
            </div>}
            <div className={verifyDelete ? "listing-info delete-mode" : "listing-info"}>
                {!verifyDelete && <div className="listing-header">
                    <Link to={`/${table.toLowerCase()}/id/${cocktail.id}`}>{cocktail.name}</Link>
                    {sameUser && !table.includes("cocktails/liked") ?
                    (!verifyDelete && <div className="listing-user-ops">
                        <Link to={`/${table.toLowerCase()}/id/${cocktail.id}/edit`}>Edit</Link>
                        <div>/</div>
                        <div className="link-button danger" onClick={() => setVerifyDelete(true)}>Delete</div>
                    </div>)
                    :
                    <Link to={`/user/${cocktail.posted_by}`}>{cocktail.posted_by}</Link>
                    }
                </div>}
                {verifyDelete ?
                <div className="listing-description">
                    <div>Are you sure you want to delete "{cocktail.name}?"</div>
                    {props.deletingData ?
                    <Loader active inline/>
                    :
                    <div className="buttons">
                        <Button color="red" onClick={handleDelete}>Yes</Button>
                        <Button onClick={() => setVerifyDelete(false)}>No</Button>
                    </div>
                    }
                    <div>{props.deleteError}</div>
                </div>
                :
                <div className="listing-description">{cocktail.description}</div>
                }
                {!verifyDelete && <div className="listing-date">
                    <div>{cocktail.location_origin || cocktail.type || " "}</div>
                    {!cocktail.approved && <div>Pending Approval</div>}
                    <Moment format="MM/DD/YY">{cocktail.date_posted}</Moment>
                </div>}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
     return {
        deletingData: state.dataReducer.deletingData,
        deleteSuccess: state.dataReducer.deleteSuccess,
        deleteError: state.dataReducer.deleteError,
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, { deleteCocktail, getData })(DataListing)
