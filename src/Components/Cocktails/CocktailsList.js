import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getCocktails } from '../../Actions/dataActions'
import PlaceholderListing from '../PlaceholderListing'
import CocktailListing from './CocktailListing'
import Search from '../Search'

const CocktailsList = props => {
    const [query, setQuery] = useState("");
    const { getCocktails, username } = props;

    useEffect(() => {
        getCocktails(username);
    }, [getCocktails, username])

    return (
        <div className="CocktailsList page list">
            {!username && <h2 className="first">Cocktails</h2>}
            <Search getData={getCocktails} fetchData={props.fetchingData} setQuery={setQuery} username={username}/>
            <div className={query.length > 0 ? "search-result-message" : "search-result-message hidden"}>
                {query.length > 0 && `Showing results for "${query}"`}
            </div>
            {props.length > 0 ? <div>{props.error}</div>
            :
            (props.fetchingData ? 
            [...Array(5)].map((e, i) => <PlaceholderListing key={i}>♦</PlaceholderListing>)
            : props.data.map(cocktail => {
                return <CocktailListing cocktail={cocktail} />
            }))
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        data: state.dataReducer.data,
        fetchingData: state.dataReducer.fetchingData,
        error: state.dataReducer.fetchError
    }
}

export default connect(mapStateToProps, { getCocktails })(CocktailsList)
