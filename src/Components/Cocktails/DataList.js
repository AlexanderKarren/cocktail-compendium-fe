import React, { useState, useEffect } from 'react' 
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { getData } from '../../Actions/dataActions'
import PlaceholderListing from '../PlaceholderListing'
import DataListing from './DataListing'
import { Button, Icon } from 'semantic-ui-react'
import Search from '../Search'

const DataList = props => {
    const [query, setQuery] = useState("");
    const { getData, username, user, table } = props;
    const { push } = useHistory();

    useEffect(() => {
        getData(table, username);
    }, [getData, username, table])

    return (
        <div className="DataList page list">
            {!username &&
            <div className="heading">
                    <div />
                    <h2 className="first">{table}</h2>
                    {user ? <Button 
                        primary 
                        icon 
                        labelPosition='right'
                        onClick={() => push(`/${table.toLowerCase()}/new`)}
                    >
                        {`Post ${table.replace("s", "")}`}
                        <Icon name="plus" />
                    </Button>
                    : <div />}
                </div>}
            <Search loading={props.fetchingData} getData={getData} fetchData={props.fetchingData} setQuery={setQuery} username={username} table={table}/>
            <div className={query.length > 0 ? "search-result-message" : "search-result-message hidden"}>
                {query.length > 0 && `Showing results for "${query}"`}
            </div>
            {props.error.length > 0 ? <div>{props.error}</div>
            :
            (props.fetchingData ? 
            [...Array(5)].map((e, i) => <PlaceholderListing key={i}>♦</PlaceholderListing>)
            : props.data.map(element => {
                return <DataListing key={element.id} cocktail={element} sameUser={props.sameUser} table={table}/>
            }))
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        data: state.dataReducer.data,
        fetchingData: state.dataReducer.fetchingData,
        error: state.dataReducer.fetchError,
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, { getData })(DataList)
