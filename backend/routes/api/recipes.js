const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const mongoose = require('mongoose');
const Ingredient = mongoose.model('Ingredient');
const Recipe = mongoose.model('Recipe')

router.get('/', async (req, res) => {
    const allRecipes = await Recipe.find();
    return res.json(allRecipes);
});

router.get('/:recipeId', async(req, res, next) => {
    const recipe = await Recipe.findById(req.params.recipeId)
    return res.json(recipe)
})

// get by multiple ingredients 
const getRecipes = async query => Recipe.find({"ingredients.food": {$all: query}})

const calculateShoppingScore = (cubberdArr, recipe) => {
    let shoppingScore;
    let numIngredientsinCubberd = 0;
    recipe.ingredients.forEach(ingredient => {
        if (cubberdArr.includes(ingredient.food)) {
            numIngredientsinCubberd += 1
        }
    })
    shoppingScore = Math.round((numIngredientsinCubberd / recipe.ingredients.length) * 100);
    return shoppingScore
}

router.post("/ingredients", async(req, res) => {
    const pot = req.body.pot
    const numQueryIngredients = pot.length;
    const cubberd = req.body.cubberd
        
    let potSubsets = []
    for (let i = 0; i < pot.length; i++) {
        for (let j = i + 1; j <= pot.length; j++) {
            let subset = pot.slice(i,j)
            potSubsets.push(subset)
        }
    }
    potSubsets.sort((a, b) => a.length > b.length ? -1 : 1);
    
    // let ingredientScore;
    let recipesByIngredientScore = []
    let recipesByShoppingScore = []
    let recipesQuery = []
    let recipes = []
    for (let i = 0; i < potSubsets.length; i++) {
        let query = potSubsets[i]
        //recipesQuery = await Recipe.find({"ingredients.food": {$all: query}})
        recipesQuery = await getRecipes(query)

        const ingredientScore = Math.round((query.length / numQueryIngredients) * 100)
        let shoppingScore;
        recipesQuery.forEach(recipe => {

            shoppingScore = calculateShoppingScore(cubberd, recipe)
            if (recipesByIngredientScore.length < 3) {
                recipesByIngredientScore.push({"ingredientsScore": ingredientScore, "shoppingScore": shoppingScore, "recipe": recipe})
            }
            recipesByShoppingScore.push({"ingredientsScore": ingredientScore, "shoppingScore": shoppingScore, "recipe": recipe})
        })
    }
    recipesByShoppingScore.sort((a, b) => a.shoppingScore > b.shoppingScore ? -1 : 1)
    recipes.push(recipesByIngredientScore, recipesByShoppingScore.slice(0,3))
    return res.json(recipes)
})


router.post('/', async (req, res) => {
    const newRecipe = new Recipe({
        uri: req.body.uri,
        label: req.body.label,
        image: req.body.image,
        source: req.body.source,
        url: req.body.url,
        source: req.body.source,
        yield: req.body.yield,
        dietLabels: req.body.dietLabels,
        healthLabels: req.body.healthLabels,
        cautions: req.body.cautions,
        ingredientLines: req.body.ingredientLines,
        ingredients: req.body.ingredients,
        calories: req.body.calories,
        totalWeight: req.body.totalWeight,
        totalTime: req.body.totalTime,
        cuisineType: req.body.cuisineType,
        mealType: req.body.mealType,
        dishType: req.body.dishType,
        totalNutrients: req.body.totalNutrients
    })

    const recipe = await newRecipe.save();
    return res.json(recipe);
})

module.exports = router;