const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = Schema({
    label: {
        type: String
    },
    ingredients: {
        type: Array
    },
    source: {
        type: String
    },
    imageUrl: {
        type: String
    },
    url: {
        type: String
    },
    uri: {
        type: String
    },
    yield: {
        type: Number
    },
    dietLabels: {
        type: Array
    },
    healthLabels: {
        type: Array
    },
    cautions: {
        type: Array
    },
    ingredientLines: {
        type: Array
    },
    calories: {
        type: Number
    },
    totalWeight: {
        type: Number
    },
    totalTime: {
        type: Number
    },
    cuisineType: {
        type: Array
    },
    mealType: {
        type: Array
    },
    dishType: {
        type: Array
    },
    totalNutrients: {
        type: Object
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema)