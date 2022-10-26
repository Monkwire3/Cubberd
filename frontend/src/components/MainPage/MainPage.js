import "./MainPage.css";
import { getCurrentUser, logout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RecipeShowModal from "../RecipeShowModal/RecipeShowModal";
import { fetchRecipes } from "../../store/recipes";
import { useEffect } from "react";
import CookingPot from "./CookingPot/CookingPot";
import Cubberd from '../Cubberd/Cubberd';

function MainPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const recipes = useSelector(state => state.recipes);
    const recipe = recipes[0];


    useEffect(() => {
        dispatch(fetchRecipes())
    }, [])


    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div id="main-page" className="main-display">
            <div id="main-page-left">
                <div id="cubberd-search-container" className="main-display-component">
                    <Cubberd />
                </div>
            </div>
            <div id="main-page-right">
                <div id="main-page-top">
                    <div id="main-page-top-right">
                        <div id="navbar-container" className="main-display-component">
                           <nav>{sessionUser && <span>Logged in as <Link to="/profile">{sessionUser.username}</Link> <button onClick={handleLogout}>Logout</button> </span>}</nav>  
                        </div>
                        <div id="main-page-top-right-bottom">
                            <div id="pot-container" className="main-display-component">
                                <CookingPot />
                            </div>
                            <div id="shopping-list-container" className="main-display-component"></div>
                        </div>
                    </div>
                </div>
                <div id="main-page-bottom">
                    <div id="current-cubberd-container" className="main-display-component"></div>
                </div>

            </div>
        </div>
    );
}

export default MainPage;
