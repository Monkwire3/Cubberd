import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipe } from "../../store/recipes";
import { useEffect } from "react";
import { useState } from "react";
import RecipeShowPageListItem from "../RecipeShowPageListItem/RecipeShowPageListItem";

function RecipeShowPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const recipe = useSelector(state => state.recipes)
    recipe.ingredients ||= [];

    useEffect(() => {
        dispatch(fetchRecipe(id));
    }, [])

    const ingredientsList = recipe.ingredients.map((ingredient) => <RecipeShowPageListItem ingredientData={ingredient} />);

    return (
        <div id="recipe-show-page">
            <h1>{recipe.label}</h1>
            <div id="ingredients-list">
                {ingredientsList}
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default RecipeShowPage;