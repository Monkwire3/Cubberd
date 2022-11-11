import "./UserPage.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import RecipeList from "../RecipeList/RecipeList";
import { useEffect, useState } from "react";
import ShoppingList from "../ShoppingList/ShoppingList";

function UserPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [render, setRender] = useState(true);
  const favoritedRecipes = useSelector(
    (state) => state.session.user.savedRecipes.favorited
  );
  const plannedRecipes = useSelector(
    (state) => state.session.user.savedRecipes.planned
  );
  const shoppingList = useSelector((state) => state.session.user.shoppingList);
  const history = useHistory();

  useEffect(() => {
    setRender((ren) => !ren);
  }, [favoritedRecipes, shoppingList]);

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <div id="user-page" className="main-display">
      <nav className="main-display-component">
        <div className="nav-bar-link">
          <Link className="nav-bar-link" to="/">
            Back to Cubberd
          </Link>
        </div>
        <div className="nav-bar-link">
          <Link className="nav-bar-link" to="/about">
            About
          </Link>
        </div>
        {sessionUser ? (
          <div className="nav-bar-link" onClick={handleLogout}>
            Log out
          </div>
        ) : (
          <Redirect to="/login" />
        )}
      </nav>
      <div id="user-page-columns">
        <div
          id="user-page-favorited-recipes-container"
          className="main-display-component user-page-column"
        >
          <h3>Favorited Recipes</h3>
          <RecipeList recipes={favoritedRecipes} recipeContext={"favorited"} />
        </div>
        <div id="user-page-planned-and-shopping" className="user-page-column">
          <div id="user-page-shopping-list" className="main-display-component">
            <h3>Shopping List</h3>
            <ShoppingList items={shoppingList} />
          </div>
          <div
            id="user-page-planned-recipes-container"
            className="main-display-component"
          >
            <h3>Planned Recipes</h3>
            <RecipeList recipes={plannedRecipes} recipeContext={"planned"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
