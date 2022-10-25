import "./UserPage.css";
import RecipeShowModal from "../RecipeShowModal/RecipeShowModal";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../../store/session";
import RecipeList from "../RecipeList/RecipeList";



function UserPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const savedRecipeLists = useSelector(state => state.session.user.savedRecipes);
    const plannedRecipes = useSelector(state => state.session.user.savedRecipes.planned);

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div id="user-page" className="main-display">
            <nav className="main-display-component"><div id="user-page-search-container"></div><div id="user-page-nav-items"><div className="user-page-nav-item"><Link to="/">Home</Link></div><div className="user-page-nav-item">{sessionUser ? <button onClick={handleLogout}>Log out</button> : <Redirect to="/login" />}</div></div></nav>
            <div id="user-page-columns" className="main-display-component">
                <div id="user-page-saved-recipes-container"className="main-display-component user-page-column">

                </div>
                <div id="user-page-planned-and-shopping" className="main-display-component user-page-column">
                    <div id="user-page-shopping-list" className="main-display-component"></div>
                    <div id="user-page-planned-recipes-container" className="main-display-component">
                        <h3>Planned Recipes</h3>
                        <RecipeList recipes={plannedRecipes} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserPage;