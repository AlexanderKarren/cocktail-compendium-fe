import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCocktails } from '../../Actions/cocktailActions'
import PlaceholderListing from '../PlaceholderListing'
import CocktailListing from './CocktailListing'
import Search from '../Search'
import './Cocktails.scss'

const CocktailsList = props => {
    const { getCocktails } = props;

    useEffect(() => {
        getCocktails()
    }, [getCocktails])

    return (
        <div className="CocktailsList page list">
            <h2 className="first">Cocktails</h2>
            <Search getCocktails={getCocktails} fetchingCocktails={props.fetchingCocktails}/>
            {props.length > 0 ? <div>{props.error}</div>
            :
            (props.fetchingCocktails ? 
            [...Array(5)].map((e, i) => <PlaceholderListing key={i}>♦</PlaceholderListing>)
            : props.cocktails.map(cocktail => {
                return <CocktailListing cocktail={cocktail} />
            }))
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cocktails: state.cocktailReducer.cocktails,
        fetchingCocktails: state.cocktailReducer.fetchingCocktails,
        error: state.cocktailReducer.cocktailError
    }
}

export default connect(mapStateToProps, { getCocktails })(CocktailsList)
