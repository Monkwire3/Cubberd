import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PotContext } from "../../context/PotContext";
import { fetchRecipesFromPot } from "../../store/recipes";
import CookingPot from "./CookingPot/CookingPot";
import "./Pot.css";

const Pot = () => {
  const { potContents } = useContext(PotContext);
  const userCubberd = useSelector((state) => state.session.user.cubberd);
  const dispatch = useDispatch();

  const searchForRecipes = (e) => {
    e.preventDefault();
    const cubberd = [];
    const pot = [];

    userCubberd.forEach(ing => cubberd.push(ing.food))
    potContents.forEach(ing => pot.push(ing.food))
    dispatch(fetchRecipesFromPot(cubberd, pot))
  }

  const toggleRecipeScore = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <div className="pot-component-wrapper">
        <div className="pot-container">
          <CookingPot />
        </div>
        <div onClick={searchForRecipes}>Adina press here</div>
        <div onClick={toggleRecipeScore}>Toggle Recipe Score</div>
      </div>
    </>
  );
};

export default Pot;
