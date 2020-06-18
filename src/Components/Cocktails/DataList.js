import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getData } from '../../Actions/dataActions'
import PlaceholderListing from '../PlaceholderListing'
import DataListing from './DataListing'
import Search from '../Search'

const DataList = props => {
    const [query, setQuery] = useState("");
    const { getData, username, table } = props;

    useEffect(() => {
        getData(table, username);
    }, [getData, username, table])

    return (
        <div className="DataList page list">
            {!username && <h2 className="first">{table}</h2>}
            <Search getData={getData} fetchData={props.fetchingData} setQuery={setQuery} username={username} table={table}/>
            <div className={query.length > 0 ? "search-result-message" : "search-result-message hidden"}>
                {query.length > 0 && `Showing results for "${query}"`}
            </div>
            {props.error.length > 0 ? <div>{props.error}</div>
            :
            (props.fetchingData ? 
            [...Array(5)].map((e, i) => <PlaceholderListing key={i}>♦</PlaceholderListing>)
            : props.data.map(cocktail => {
                return <DataListing key={cocktail.id} cocktail={cocktail} sameUser={props.sameUser} table={table}/>
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

export default connect(mapStateToProps, { getData })(DataList)
