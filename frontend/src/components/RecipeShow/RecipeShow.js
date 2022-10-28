import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './RecipeShow.css';

function RecipeShow({recipe, favorited, planned, addToPlannedButton, addToFavoritedButton}) {

    const currentUser = useSelector((state) => state.session.user);
    // const [linkFavorite, setLinkFavorite] = useState("")
    // const [linkPlanned, setLinkPlanned] = useState("")

    const ingredients = recipe.ingredients.map(
        (ingredient) => <div className='ingredient-list-item'>
            - {ingredient.text}
            </div>
    )

    return (
        <div id="recipe">
            <div id="recipe-title-container">
                <h3><a href={recipe.url}>{recipe.label}</a></h3>
            </div>
            <div id="recipe-middle-third">
                <img id="recipe-image" src={recipe.imageUrl} />
                <div id="recipe-ingredients-list">
                    <h3>Ingredients</h3>
                    {ingredients}
                </div>
            </div>
            <div id="recipe-show-links">
                {favorited ? "" : <span>{addToFavoritedButton}</span>}
                {planned ? "" : <span>{addToPlannedButton}</span>}
                <span><a href={recipe.url} target={"_blank"} rel="noreferrer">Source</a></span>
            </div>

        </div>
    )

}

export default RecipeShow;