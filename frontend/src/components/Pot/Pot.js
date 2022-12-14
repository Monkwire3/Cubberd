import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PotContext } from "../../context/PotContext";
import { fetchRecipesFromPot, removeRecipeResults } from "../../store/recipeResults";
import RecipeResults from "../RecipeResults/RecipeResults";
import CookingPot from "./CookingPot/CookingPot";
import "./Pot.css";
import { CustomToolTipBottom } from "../ToolTip/ToolTip";

const Pot = () => {
  const { potContents } = useContext(PotContext);
  const userCubberd = useSelector((state) => state.session.user.cubberd);
  const dispatch = useDispatch();
  const recipeResultsTotalArr =  useSelector((state) => state.recipeResults);
  const [displayByShoppingScore, setDisplayByShoppingScore] = useState(false);
  const [recipesObtained, setRecipesObtained] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [flameOne, setFlameOne] = useState(false);
  const [flameTwo, setFlameTwo] = useState(false);
  const [flameThree, setFlameThree] = useState(false);
  const [flameFour, setFlameFour] = useState(false);
  const [flameFive, setFlameFive] = useState(false);
  const [blueflameOne, setBlueFlameOne] = useState(false);
  const [blueflameTwo, setBlueFlameTwo] = useState(false);
  const [blueflameThree, setBlueFlameThree] = useState(false);
  const [blueflameFour, setBlueFlameFour] = useState(false);
  const [blueflameFive, setBlueFlameFive] = useState(false);
  const [loadingResult, setLoadingResult] = useState(true);
  const [recipeResults, setRecipeResults] = useState([[], []]);
  const { setOpenDoor, setAnimateRack } = useContext(PotContext);
  const [toggled, setToggled] = useState(false);
  const [showRecipes, setShowRecipes] = useState(false);
  const [potIsEmpty, setPotIsEmpty] = useState(false);
  
  const displayNotifications = [
    "Turn on the stove to search for recipes!",
    "Searching...",
    "Done! Ranked by ingredient score.",
    "Please add an item to the pot before searching!",
    "Done! Ranked by shopping score.",
    "Please wait a little longer..."
  ]

  const [displayNotification, setDisplayNotification] = useState([displayNotifications[0]])

  useEffect(() => {
    if (potIsEmpty) {
      setDisplayNotification([displayNotifications[3]]);
    } else if ( rotate && loadingResult) {
      setDisplayNotification([displayNotifications[1]]);
    } else if ( !rotate && !loadingResult && recipeResults[0].length === 0 && showRecipes) {
      setDisplayNotification([displayNotifications[5]]);
    } else if ( !rotate && !loadingResult && recipeResults[0].length > 0) {
      setDisplayNotification([displayNotifications[2]]);
    } else {
      setDisplayNotification([displayNotifications[0]]);
    }
  
    return () => {
      setDisplayNotification([displayNotifications[0]])
    }
  }, [rotate, potIsEmpty, loadingResult, recipeResults, showRecipes])
  

  const searchForRecipes = () => {
    const cubberd = [];
    const pot = [];

    userCubberd.forEach(ing => cubberd.push(ing.food))
    potContents.forEach(ing => pot.push(ing.food))
    dispatch(fetchRecipesFromPot(cubberd, pot))
  }

  useEffect(() => {
    if (recipeResultsTotalArr.length > 0 ) {
      if (recipeResultsTotalArr[0].length > 0 && recipeResultsTotalArr[1].length > 0) {
        setRecipesObtained(true)
        setRecipeResults([...recipeResultsTotalArr])
      }
    } else {
      setRecipeResults([[], []])
    }
  
    return () => {
      setRecipeResults([[], []])
    }
  }, [recipeResultsTotalArr])
  
  useEffect(() => {
    if (recipeResults && recipeResults.length > 0 && showRecipes) {
      if (recipeResults[0].length > 0 && recipeResults[1].length > 0) {
        setAnimateRack(true)
      } else {
        setAnimateRack(false)
      }
    } else {
      setAnimateRack(false)
    }
  
    return () => {
      setAnimateRack(false)
    }
  }, [recipeResults, showRecipes])
  

  const toggleRecipeScore = (e) => {
    e.preventDefault();

    if (!showRecipes) {
      return;
    } else if (recipeResults[0].length === 0) {
      return;
    }

    if (!displayByShoppingScore) {
      setDisplayByShoppingScore(true)
      setToggled(true)
      setDisplayNotification([displayNotifications[4]]);
    } else {
      setDisplayByShoppingScore(false)
      setToggled(false)
      setDisplayNotification([displayNotifications[2]]);
    }
  }
  
  useEffect(() => {
    if (rotate) {
      let flameOneTimeout = setTimeout(() => {
        setFlameOne(true);
        if (!rotate) {
          clearTimeout(flameOneTimeout);
        }
      }, 100);
  
      let flameTwoTimeout = setTimeout(() => {
        setFlameTwo(true);
        if (!rotate) {
          clearTimeout(flameTwoTimeout);
        }
      }, 200);
  
      let flameThreeTimeout = setTimeout(() => {
        setFlameThree(true);
        setBlueFlameOne(true);
        if (!rotate) {
          clearTimeout(flameThreeTimeout);
        }
      }, 300);
  
      let flameFourTimeout = setTimeout(() => {
        setFlameFour(true);
        setBlueFlameTwo(true);
        if (!rotate) {
          clearTimeout(flameFourTimeout);
        }
      }, 400);
  
      let flameFiveTimeout = setTimeout(() => {
        setFlameFive(true);
        setBlueFlameThree(true)
        if (!rotate) {
          clearTimeout(flameFiveTimeout);
        }
      }, 500);

      let blueFlameLastTimeout = setTimeout(() => {
        setBlueFlameFour(true)
        setBlueFlameFive(true)
        if (!rotate) {
          clearTimeout(blueFlameLastTimeout);
        }
      }, 500);

      let knobTimeout = setTimeout(() => {
        setRotate(false);
        setLoadingResult(false);
        setOpenDoor(true);
        setShowRecipes(true);
        if (!rotate) {
          clearTimeout(knobTimeout)
        }
      }, 3000);
    } else {
      setFlameOne(false)
      setFlameTwo(false)
      setFlameThree(false)
      setFlameFour(false)
      setFlameFive(false)
      setBlueFlameOne(false)
      setBlueFlameTwo(false)
      setBlueFlameThree(false)
      setBlueFlameFour(false)
      setBlueFlameFive(false)
    }
  
  }, [rotate])
  

  const handleClick = (e) => {
    e.preventDefault();
    setRecipeResults([[], []])

    if (potContents.length === 0) {
      setPotIsEmpty(true);
      return
    } else {
      setPotIsEmpty(false);
    }

    if (!rotate) {
      setRotate(true)
      setLoadingResult(true)
      setOpenDoor(false)
      setToggled(false)
      searchForRecipes();
      setShowRecipes(false);
    } 
  }

  const clearRecipes = (e) => {
    e.preventDefault();

    if (recipeResults[0].length === 0) {
      return;
    }

    setDisplayNotification([displayNotifications[0]]);
    dispatch(removeRecipeResults());
    setShowRecipes(false);
  }

  return (
    <>
      <div className="pot-component-wrapper">
        {recipesObtained && showRecipes &&
          <div className="pot-recipe-results-wrapper">
            <RecipeResults displayByShoppingScore={displayByShoppingScore} recipeResultsTotalArr={recipeResults} />
          </div>
        }
        <div className="pot-container-clickable">
          <CookingPot loadingResult={loadingResult} />
        </div>
        <div className="stove-container">
          <div className="stove-top">
            <div className="left-burner-platform"></div>
            <div className="center-burner-platform"></div>
            <div className="right-burner-platform"></div>
            <div className="burner-center">
              {flameOne && !blueflameOne && 
                <div className="flame" id="flame-one"></div>
              }
              {flameTwo && !blueflameTwo && 
                <div className="flame" id="flame-two"></div>
              }
              {flameThree && !blueflameThree && 
                <div className="flame" id="flame-three"></div>
              }
              {flameFour && !blueflameFour && 
                <div className="flame" id="flame-four"></div>
              }
              {flameFive && !blueflameFive && 
                <div className="flame" id="flame-five"></div>
              }

              {flameOne && blueflameOne && 
                <div className="flame blue-flame" id="flame-one"></div>
              }
              {flameTwo && blueflameTwo && 
                <div className="flame blue-flame" id="flame-two"></div>
              }
              {flameThree && blueflameThree && 
                <div className="flame blue-flame" id="flame-three"></div>
              }
              {flameFour && blueflameFour && 
                <div className="flame blue-flame" id="flame-four"></div>
              }
              {flameFive && blueflameFive && 
                <div className="flame blue-flame" id="flame-five"></div>
              }
            </div>
          </div>
          <div className="stove-button-container">
            <CustomToolTipBottom
              title="Clear Recipe Results?"
              arrow
              placement="bottom"
            >
              <div 
                className="recipe-clear-btn" 
                onClick={clearRecipes}
              > 
                <div className="clear-btn-inside"></div>
                <div className="x-sign"></div>
                <div className="x-sign alt-sign"></div>
              </div>
            </CustomToolTipBottom>
            <CustomToolTipBottom
              title="Toggle Recipe Score"
              arrow
              placement="bottom"
            >
              <div 
                className="toggle-btn-container"
                onClick={toggleRecipeScore}
              >
                <div 
                  className="toggle-btn-wrap"
                >
                  <div className={toggled ? "toggle toggled" : "toggle"}></div>
                </div>
              </div>
            </CustomToolTipBottom>
            <div className="stove-display">
              {displayNotification}
            </div>

            <div 
              className="stove-on-btn"
              id={rotate ? "stove-is-on" : ""}
            ></div>
            <CustomToolTipBottom
              title="Search for recipes?"
              arrow
              placement="bottom"
            >
              <div 
                className={rotate ? "stove-knob-container rotate" : "stove-knob-container"}
                onClick={handleClick}
              >
                <div className="knob-on">ON</div>
                <div className="knob-off">OFF</div>
                <div className="stove-knob"></div>
              </div>
            </CustomToolTipBottom>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pot;
