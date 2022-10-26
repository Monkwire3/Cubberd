import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  composeUserCubberdIngredient,
  fetchIngredients,
  fetchUserCubberdIngredients,
} from "../../store/ingredients";
import "./Cubberd.css";
import { BiSearchAlt } from "react-icons/bi";
import woodBackground from "../../assets/retina_wood.png";
import CubberdRow from "./CubberdRow";

const Cubberd = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const userCubberd = useSelector((state) => state.ingredients.userCubberd);
  const allIngredients = useSelector((state) => state.ingredients.all);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLi, setSelectedLi] = useState(0);
  const [openDoor, setOpenDoor] = useState(false);
  const ref = useRef();

  const handleDoorClick = () => {
    if (openDoor) {
      setOpenDoor(false);
    }
  };

  const handleDoorKnobClick = () => {
    if (openDoor) {
      setOpenDoor(false);
    } else {
      setOpenDoor(true);
    }
  };

  useEffect(() => {
    dispatch(fetchIngredients());

    let doorTimeOut = setTimeout(() => {
      if (openDoor === false) {
        setOpenDoor(true);
      } else if (openDoor === true) {
        clearTimeout(doorTimeOut);
      }
    }, 2000);

    return () => {
      clearTimeout(doorTimeOut);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserCubberdIngredients(currentUser._id));
  }, [currentUser, dispatch]);

  useEffect(() => {
    setSelectedLi(0);

    return () => {
      setSelectedLi(0);
    };
  }, [searchResults]);

  const searchItem = (query) => {
    if (!query) {
      setSearchResults([]);
      setSearchQuery("");
      return;
    }
    setSearchQuery(query);
    query = query.toLowerCase();

    const results = [];

    allIngredients.forEach((ing) => {
      if (ing.food.toLowerCase().indexOf(query) !== -1) {
        results.push(ing);
      }
    });

    setSearchResults(results);
  };

  const handleResultFoodClick = (e, result) => {
    e.preventDefault();
    setSearchResults([]);
    setSearchQuery("");

    let existingArr = userCubberd.filter((ele) => ele._id === result._id);
    if (existingArr.length === 0) {
    } else {
    }
  };

  const addToUserCubberd = () => {
    dispatch(composeUserCubberdIngredient(currentUser._id));
  };

  const handleKeyDown = (e) => {
    let last = searchResults.length - 1;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (selectedLi === 0) {
        setSelectedLi(last);
      } else {
        setSelectedLi(selectedLi - 1);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (selectedLi === last) {
        setSelectedLi(0);
      } else {
        setSelectedLi(selectedLi + 1);
      }
    } else if (e.key === "Enter") {
      handleResultFoodClick(e, searchResults[selectedLi]);
    }
    let selectedEle = document.getElementsByClassName("selected")[0];
    selectedEle.scrollIntoView({
      block: "nearest",
      inline: "start",
    });
  };

  return (
    <>
      <div
        className="cubberd-container"
        style={{ backgroundImage: `url(${woodBackground})` }}
      >
        <div
          className={
            openDoor ? "cubberd-door cubberd-door-open" : "cubberd-door"
          }
          onClick={handleDoorClick}
        >
          <div className="cubberd-door-pattern">
            <div className="cubberd-inner-door-pattern"></div>
          </div>
          <div
            className="cubberd-door-knob"
            onClick={handleDoorKnobClick}
          ></div>
        </div>
        <div className="cubberd-content-container">
          <div className="cubberd-search-bar-container">
            <input
              type="text"
              className="cubberd-search-bar"
              placeholder="Search for ingredients..."
              onChange={(e) => searchItem(e.target.value)}
              value={searchQuery}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <div className="cubberd-search-btn">
              <BiSearchAlt />
            </div>
          </div>
          <div className="cubberd-ingredients-container-wrapper">
            {searchResults && searchResults.length > 0 && (
              <ul className="search-results">
                {searchResults.map((result, i) => {
                  return (
                    <li
                      onClick={(e) => handleResultFoodClick(e, result)}
                      ref={i === selectedLi ? ref : null}
                      className={i === selectedLi ? "selected" : ""}
                    >
                      {result.food}
                    </li>
                  );
                })}
              </ul>
            )}
            {userCubberd &&
              userCubberd.length > 0 &&
              userCubberd.map((ing, i) => (
                <CubberdRow
                  ing={ing}
                  currentUser={currentUser}
                  key={`cubberd ${ing} ${i}`}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cubberd;
