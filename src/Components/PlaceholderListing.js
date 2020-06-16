import React from 'react'
import { Placeholder } from 'semantic-ui-react'

const PlaceholderListing = () => {
    return (
        <div className="listing">
            <div className="listing-image">
                <Placeholder></Placeholder>
            </div>
            <div className="listing-info">
                <Placeholder>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder>
            </div>
        </div>
    )
}

export default PlaceholderListing
