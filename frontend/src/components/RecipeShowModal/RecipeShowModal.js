import { Modal } from '../../context/Modal';
import React, { useEffect, useState } from 'react';
import RecipeShow from '../RecipeShow/RecipeShow';
import './RecipeShowModal.css';
import { BsCalendarPlus } from 'react-icons/bs';
import { TbTrash } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipeToFavorited, addRecipeToPlanned, deleteRecipeFromFavorited, deleteRecipeFromPlanned } from '../../store/session';

function RecipeShowModal({ recipe, recipeContext }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const currentUser = useSelector(state => state.session.user ? state.session.user : {})
    const currentUserId = currentUser._id;
    const [resultRecipe, setResultRecipe] = useState({})

    useEffect(() => {
        if (recipe.recipe) {
            setResultRecipe(recipe.recipe);
        } else {
            setResultRecipe(recipe)
        }
    }, [recipe])
    

    let favoritedRecipes;
    let plannedRecipes;
    let recipeAlreadyFavorited = false;
    let recipeAlreadyPlanned = false;
    if (currentUserId) {
        favoritedRecipes = currentUser.savedRecipes.favorited;
        plannedRecipes = currentUser.savedRecipes.planned;
        recipeAlreadyFavorited = favoritedRecipes.some(rec => rec.url === resultRecipe.url);
        recipeAlreadyPlanned = plannedRecipes.some(rec => rec.url === resultRecipe.url);
    }

    const handleClick = (e, action) => {
        e.stopPropagation();
        switch (action) {
            case "plan":
                dispatch(addRecipeToPlanned(currentUserId, resultRecipe));
                break;
            case "unfavorite":
                dispatch(deleteRecipeFromFavorited(currentUserId, resultRecipe));
                break;
            case "favorite":
                dispatch(addRecipeToFavorited(currentUserId, resultRecipe));
                break;
            case "unplan":
                dispatch(deleteRecipeFromPlanned(currentUserId, resultRecipe));
                break;
        }
    }

    const addToPlannedButton = <BsCalendarPlus
        className={recipeAlreadyPlanned ? "recipe-menu-button active" : "recipe-menu-button"}
        onClick={e => recipeAlreadyPlanned ? handleClick(e, "unplan") : handleClick(e, "plan")}
    />

    const addToFavoritedButton = <AiOutlineHeart
        className={recipeAlreadyFavorited ? "recipe-menu-button active" : "recipe-menu-button"}
        onClick={e => recipeAlreadyFavorited ? handleClick(e, "unfavorite") : handleClick(e, "favorite")}
    />

    if (recipe) {
        let title;
        let image
        let menuItems;
        if (recipeContext === 'favorited') {
            title = <h4><div className='favorited-title-overlay'>{recipe.label}</div></h4>
            image = recipe.imageUrl ? <img src={recipe.imageUrl} /> : <></>
            menuItems = 
                <div className='menu-items favorited'>
                    {addToPlannedButton}
                    <TbTrash className="recipe-menu-button" onClick={e => handleClick(e, "unfavorite")} />
                </div>
            } else if (recipeContext === 'planned') {
                title = <h4 className='recipe-list-label'>{recipe.label}</h4>
                menuItems = <div className='menu-items planned'>
                    {addToFavoritedButton}
                    <TbTrash className="recipe-menu-button" onClick={e => handleClick(e, "unplan")} />
                </div>
            } else if (recipeContext === 'searchResult') {
                function getScoreColor(score) {
                    let parsedScore = parseInt(score)
                    if (parsedScore < 40) {
                            return 'bad'
                    } else if (parsedScore < 60) {
                            return 'medium'
                    } else {
                            return 'good'
                    }
                }

                title = <p>{recipe.recipe.label}</p>
                menuItems = <div className='menu-items-search-result'>
                    <div className='recipe-score'>
                         Ingredient score:
                        <span className={`${getScoreColor(recipe.ingredientsScore)}-recipe-score`}>{recipe.ingredientsScore}%</span>
                    </div>
                    <div className='recipe-score'>
                        Shopping score: <span className={`${getScoreColor(recipe.shoppingScore)}-recipe-score`}>{recipe.shoppingScore}%</span>
                    </div>

                </div>
            }
        return (
            <>
                <div className="recipe-list-item" onClick={() => setShowModal(true)}>
                    {title}
                    {image}
                    {menuItems}
                </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <RecipeShow 
                            addToPlannedButton={addToPlannedButton}
                            addToFavoritedButton={addToFavoritedButton}
                            recipe={recipeContext === 'searchResult' ? recipe.recipe : recipe}
                        />
                    </Modal>
                )}
            </>
        )
    }

    return (
        <></>
    )
}


export default RecipeShowModal;
