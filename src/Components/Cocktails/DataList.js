import React, { useState, useEffect } from 'react' 
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { getData } from '../../Actions/dataActions'
import PlaceholderListing from '../PlaceholderListing'
import DataListing from './DataListing'
import { Button, Icon, Pagination } from 'semantic-ui-react'
import Search from '../Search'

const sortOptions = {
    cocktails: "cocktails.name",
    ingredients: "ingredient_types.name",
    drinkware: ""
}

const DataList = props => {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState(localStorage.getItem("sort-options") ? (JSON.parse(localStorage.getItem("sort-options"))[props.table.toLowerCase()] || sortOptions[props.table.toLowerCase()]) : sortOptions[props.table.toLowerCase()]);
    const [page, setPage] = useState(1);
    const { getData, username, user, table } = props;
    const { push, listen } = useHistory();

    // resets state
    useEffect(() => {
       return listen(location => {
            const route = location.pathname.replace("/", "");
            setQuery("");
            setSort(localStorage.getItem("sort-options") ? (JSON.parse(localStorage.getItem("sort-options"))[route] || sortOptions[route]) : sortOptions[route]);
       }) 
    },[listen])

    useEffect(() => {
        setPage(1)
    }, [props.table])

    useEffect( () => {
        const newSort = localStorage.getItem("sort-options") ? (JSON.parse(localStorage.getItem("sort-options"))[props.table.toLowerCase()] || sortOptions[props.table.toLowerCase()]) : sortOptions[props.table.toLowerCase()];
        setSort(newSort);
        console.log("now on", props.table)
        getData(table, username, page, query, newSort);
    // eslint-disable-next-line
    }, [getData, username, table, page])

    const handlePageChange = (event, { activePage }) => {
        console.log(activePage)
        setPage(activePage)
    }

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
                        {`New ${table.replace("s", "")}`}
                        <Icon name="plus" />
                    </Button>
                    : <div />}
                </div>}
            <Search 
                loading={props.fetchingData} 
                getData={getData} 
                fetchData={props.fetchingData} 
                setQuery={setQuery} 
                username={username} 
                table={table} 
                page={page}
                setPage={setPage}
                sort={sort}
                setSort={setSort}
            />
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
            {props.data.length > 0 && <Pagination
                onPageChange={handlePageChange}
                defaultActivePage={page}
                totalPages={props.pagination.lastPage} 
                ellipsisItem={null}
            />}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        data: state.dataReducer.data,
        pagination: state.dataReducer.pagination,
        fetchingData: state.dataReducer.fetchingData,
        error: state.dataReducer.fetchError,
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, { getData })(DataList)
