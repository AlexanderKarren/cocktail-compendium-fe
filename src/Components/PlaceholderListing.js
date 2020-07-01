import React from 'react'
import { Placeholder } from 'semantic-ui-react'

const PlaceholderListing = () => {
    return (
        <div className="listing">
            <div className="placeholder-listing-image">
                <Placeholder>
                    <Placeholder.Image square />
                </Placeholder>
            </div>
            <div className="listing-info">
                <Placeholder>
                    <Placeholder.Line />
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
