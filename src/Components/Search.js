import React, { useState, useEffect } from 'react'
import { Select, Form, Input, Button, Icon } from 'semantic-ui-react'
import './Search.scss'

const cocktailOptions = [
    { key: 'cocktails.name', value: 'cocktails.name', text: 'Name' },
    { key: 'cocktails.date_posted', value: 'cocktails.date_posted', text: 'Date' },
    { key: 'cocktails.location_origin', value: 'cocktails.location_origin', text: 'Origin' },
    { key: 'users.username', value: 'users.username', text: 'Username' }
]

const Search = ({ getCocktails, fetchingCocktails }) => {
    const [search, updateSearch] = useState("");
    const [clearVisible, updateClear] = useState(false);

    useEffect(() => {
        if (search.length <= 0) {
            updateClear(false);
        };
    }, [search])

    const handleChanges = event => {
        updateClear(true)
        updateSearch(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        getCocktails(search);
    }

    const clearSearch = () => {
        if (search.length > 0) {
            updateSearch("");
            updateClear(false);
            getCocktails();
        };
    }

    return (
        <Form className="Search" onSubmit={handleSubmit}>
            <div className="search-sort">
                <Select 
                    fluid 
                    placeholder="Sort"
                    options={cocktailOptions}
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
                    onChange={handleChanges}
                    value={search}
                />
            </div>
            <div className="search-button">
                {fetchingCocktails ?
                <Button fluid primary loading disabled>Loading</Button>
                :   
                <Button fluid primary type="submit">Search</Button>}
            </div>
        </Form>
    )
}

export default Search
