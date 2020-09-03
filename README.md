# The Cocktail Compendium (Front-End)

Link to deployment: N/A

## Description

The Cocktail Compendium is a community-driven web app that acts as a succinct cocktail recipe book. The app is designed to make not only the recipe submissions as easy as possible, but navigating other users' submissions. No ads or lengthy stories to scroll past to get to the recipes, and of course, the app is free for anyone to use.

Non-admin users will have to submit their cocktails for approval by an admin to be listed on the main page.

## Features

* Custom cocktails can be submitted to the database
    - Users can specify a title
    - Users can specify a description
    - Users can provide instructions for the preparation of their drink
    - Users can utilize a vast ingredient database to choose ingredients for their drinks
    - Users can utilize a drinkware database to choose the appropriate glass for their drinks
    - Users can specify an origin location for their drink
    - Users can specify whether their drink is alcoholic or non-alcoholic
    - Users can upload images to accompany their drinks
    - Users can specify tags for their drinks to make querying easier for others
* Custom ingredients can be submitted to the database
    - Users can specify a title
    - Users can specify a description
    - Users can provide instructions for the preparation of their ingredient
    - Users can specify whether or not their ingredient is a copyrighted brand
    - Users can specify tags for their ingredients to make querying easier for others
    - Users can upload images to accompany their ingredients
* Users can utilize a rating system to leave feedback for recipes
    - Users can view how popular their uploads are
    - A percentage of likes / dislikes is displayed on each drink
* Users are provided a hub for their uploads where they can edit and delete their submissions
* Users can upload a profile picture for their account
* Users can add a brief bio to their account
* User accounts can be accessed to see all of their cocktail / ingredient uploads, and cocktails they've given a "thumbs-up"
* Cocktail submissions have their ingredients and drinkware displayed and can be clicked on for more information
* Users can search for cocktails and ingredients, and sort the lists according to their preferences
    - Optional search tags can be provided for cocktails and ingredients to help other users find them more easily

## Tech

The Cocktail Compendium's front-end is written in React with Redux managing state.

* Axios for API calls to the back-end
* Moment library for upload dates
* Semantic-UI and Sass for styling
* React Router DOM

![app screenshot](/screenshot.png)