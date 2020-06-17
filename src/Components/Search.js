import React, { useState, useEffect } from 'react'
import { Select, Form, Input, Button, Icon } from 'semantic-ui-react'
import './Search.scss'

const cocktailOptions = [
    { key: 'cocktails.date_posted&dir=desc', value: 'cocktails.date_posted&dir=desc', text: 'Date (newest)' },
    { key: 'cocktails.date_posted', value: 'cocktails.date_posted', text: 'Date (oldest)' },
    { key: 'cocktails.name', value: 'cocktails.name', text: 'Name' },
    { key: 'cocktails.location_origin', value: 'cocktails.location_origin', text: 'Origin' },
    { key: 'users.username', value: 'users.username', text: 'Username' }
]

const Search = ({ getData, fetchingData, setQuery, username }) => {
    const [search, updateSearch] = useState("");
    const [sort, updateSort] = useState("");
    const [clearVisible, updateClear] = useState(false);

    useEffect(() => {
        if (search.length <= 0) {
            updateClear(false);
        };
    }, [search])

    const handleSearchChanges = event => {
        updateClear(true)
        updateSearch(event.target.value);
    }

    const handleSortChange = (e, data) => {
        updateSort(data.value);
        getData(username, null, data.value)
    }

    const handleSubmit = event => {
        event.preventDefault();
        setQuery(search);
        getData(username, search, sort);
    }

    const clearSearch = () => {
        updateSearch("");
        updateClear(false);
        setQuery("");
        getData(username, null, sort);
    }

    return (
        <Form className="Search" onSubmit={handleSubmit}>
            <div className="search-sort">
                <Select 
                    fluid 
                    placeholder="Sort"
                    options={cocktailOptions}
                    onChange={handleSortChange}
                />
            </div>
            <div className="searchbar">
                <Icon
                    className={clearVisible ? "searchbar-clear" : "searchbar-clear hidden"}
                    name="x"
                    onClick={() => clearSearch()}
                />
                <Input 
                    fluid 
                    placeholder="Search..."
                    onChange={handleSearchChanges}
                    value={search}
                    required
                />
            </div>
            <div className="search-button">
                {fetchingData ?
                <Button fluid primary loading disabled>Loading</Button>
                :   
                <Button fluid primary type="submit">Search</Button>}
            </div>
        </Form>
    )
}

export default Search
