import React, { useState, useEffect } from 'react'
import { Select, Form, Input, Button, Icon } from 'semantic-ui-react'
import './Search.scss'

const cocktailOptions = [
    { key: 'cocktails.date_posted&dir=desc', value: 'cocktails.date_posted&dir=desc', text: 'Date (newest)' },
    { key: 'cocktails.date_posted', value: 'cocktails.date_posted', text: 'Date (oldest)' },
    { key: 'cocktails.name', value: 'cocktails.name', text: 'Name (a - z)' },
    { key: 'cocktails.name&dir=desc', value: 'cocktails.name&dir=desc', text: 'Name (z - a)' },
    { key: 'cocktails.location_origin', value: 'cocktails.location_origin', text: 'Origin' },
    { key: 'users.username', value: 'users.username', text: 'User' }
]

const ingredientOptions = [
    { key: 'ingredients.date_posted&dir=desc', value: 'ingredients.date_posted&dir=desc', text: 'Date (newest)' },
    { key: 'ingredients.date_posted', value: 'ingredients.date_posted', text: 'Date (oldest)' },
    { key: 'ingredients.name', value: 'ingredients.name', text: 'Name (a - z)' },
    { key: 'ingredients.name&dir=desc', value: 'ingredients.name&dir=desc', text: 'Name (z - a)' },
    { key: 'ingredient_types.name', value: 'ingredient_types.name', text: 'Type' },
    { key: 'users.username', value: 'users.username', text: 'User' }
]

const Search = ({ getData, fetchingData, setQuery, username, table, loading, page, setPage, sort, setSort }) => {
    const [search, updateSearch] = useState("");
    const [clearVisible, updateClear] = useState(false);

    const options = {
        cocktails: cocktailOptions,
        ingredients: ingredientOptions
    }

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
        localStorage.setItem("sort-options", JSON.stringify({
            ...JSON.parse(localStorage.getItem("sort-options")),
            [table.toLowerCase()]: data.value
        }))
        console.log("handleSortChange() called")
        setSort(data.value);
        getData(table, username, page, null, data.value)
    }

    const handleSubmit = event => {
        setPage(1)
        event.preventDefault();
        setQuery(search);
        getData(table, username, 1, search, sort);
    }

    const clearSearch = () => {
        setPage(1)
        updateSearch("");
        updateClear(false);
        setQuery("");
        getData(table, username, 1, null, sort);
    }

    return (
        <Form className="Search" onSubmit={handleSubmit}>
            <div className="search-sort">
                <Select 
                    fluid 
                    placeholder="Sort"
                    options={options[table.toLowerCase()]}
                    onChange={handleSortChange}
                    value={sort}
                    disabled={table === "cocktails/liked"}
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
                    icon
                    iconPosition="left"
                    loading={loading}
                    disabled={table === "cocktails/liked"}
                >
                    <input />
                    <Icon name="search" />
                </Input>
            </div>
            <div className="search-button">
                {fetchingData ?
                <Button fluid primary loading disabled>Loading</Button>
                :   
                <Button fluid primary type="submit" disabled={table === "cocktails/liked"}>
                    Search    
                </Button>}
            </div>
        </Form>
    )
}

export default Search
