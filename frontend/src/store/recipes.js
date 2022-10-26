import jwtFetch from "./jwt";

const RECEIVE_RECIPES = "recipes/RECEIVE_RECIPES";
const RECEIVE_RECIPE = "recipes/RECIEVE_RECIPE";
const RECEIVE_RECIPE_RESULTS = "recipes/RECEIVE_RECIPE_RESULTS"

const receiveRecipes = (recipes) => ({
    type: RECEIVE_RECIPES,
    recipes
})

const receiveRecipe = (recipe) => ({
    type: RECEIVE_RECIPE,
    recipe
})

const receiveRecipeResults = (recipes) => ({
    type: RECEIVE_RECIPE_RESULTS,
    recipes
})

export const fetchRecipes = () => async (dispatch) => {
    const res = await jwtFetch("/api/recipes");
    const recipes = await res.json();
    dispatch(receiveRecipes(recipes));
}

export const fetchRecipe = (id) => async (dispatch) => {
    const res = await jwtFetch(`/api/recipes/${id}`)
    const recipe = await res.json();
    dispatch(receiveRecipe(recipe));
}

export const fetchRecipesFromPot = (cubberd, pot) => async (dispatch) => {
    const res = await jwtFetch('/api/recipes/ingredients', {
        method: "POST",
        body: JSON.stringify({ cubberd: cubberd, pot: pot })
    })
    const recipes = await res.json();
    dispatch(receiveRecipeResults(recipes))
}


const recipesReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_RECIPES:
            return {...state, ...action.recipes}
        case RECEIVE_RECIPE:
            return {...state, ...action.recipe}
        case RECEIVE_RECIPE_RESULTS:
            return {...state, recipeResults: action.recipes}
        default:
            return state;
    }
};

export default recipesReducer;