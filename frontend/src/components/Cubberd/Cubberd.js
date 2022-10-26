import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  composeUserCubberdIngredient,
  deleteUserCubberd,
  fetchUserCubberdIngredients,
} from "../../store/session";
import "./Cubberd.css";
import { BiSearchAlt } from "react-icons/bi";
import { SiCodechef } from "react-icons/si";
import { TbTrash } from "react-icons/tb";
import woodBackground from "../../assets/retina_wood.png";
import CubberdRow from "./CubberdRow";
import { CustomToolTipTop } from "../ToolTip/ToolTip";
import { PotContext } from "../../context/PotContext";
import { fetchIngredients } from "../../store/ingredients";

const Cubberd = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const userCubberd = useSelector((state) => state.session.user.cubberd);
  const allIngredients = useSelector((state) => state.ingredients);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLi, setSelectedLi] = useState(0);
  const [openDoor, setOpenDoor] = useState(false);
  const [nonCubberdIngredients, setNonCubberdIngredients] = useState([]);
  const [cubberdIngIds, setCubberdIngIds] = useState([]);
  const { setPotContents } = useContext(PotContext);
  const [loading, setLoading] = useState(false);
  const [completedAnimation, setCompletedAnimation] = useState(false);
  const ref = useRef();
  const node = useRef();

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

  const clickOutside = (e) => {
    if (node.current) {
      if (node.current.contains(e.target)) {
        return
      } 
    }
    setSearchResults(false)
  }

  useEffect(() => {
    dispatch(fetchIngredients());

    let doorTimeOut = setTimeout(() => {
      if (openDoor === false) {
        setOpenDoor(true);
      } else if (openDoor === true) {
        clearTimeout(doorTimeOut);
      }
    }, 2000);

    document.addEventListener("mousedown", clickOutside)

    return () => {
      clearTimeout(doorTimeOut);
      document.removeEventListener("mousedown", clickOutside)
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

  useEffect(() => {
    if (userCubberd && userCubberd.length > 0) {
      const idArr = [];
      userCubberd.forEach((ing) => {
        idArr.push(ing._id);
      });
      setCubberdIngIds([...idArr]);
    }

    return () => {
      setCubberdIngIds([]);
    };
  }, [userCubberd]);

  useEffect(() => {
    if (allIngredients.length > 0) {
      const notInCubberdArr = allIngredients.filter(
        (ing) => !cubberdIngIds.includes(ing._id)
      );
      setNonCubberdIngredients([...notInCubberdArr]);
    }
  }, [cubberdIngIds]);

  const searchItem = (query) => {
    if (!query) {
      setSearchResults([]);
      setSearchQuery("");
      return;
    }
    setSearchQuery(query);
    query = query.toLowerCase();

    const results = [];

    nonCubberdIngredients.forEach((ing) => {
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

    if (userCubberd.length > 0) {
      let existingArr = userCubberd.filter((ele) => ele._id === result._id);
      if (existingArr.length === 0) {
        addToUserCubberd(result);
      } else {
        return;
      }
    } else {
      addToUserCubberd(result)
    }
  };

  const addToUserCubberd = (result) => {
    dispatch(composeUserCubberdIngredient(currentUser._id, result));
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
      addToUserCubberd(searchResults[selectedLi]);
      setSearchResults([]);
      setSearchQuery("");
    }
    let selectedEle = document.getElementsByClassName("selected")[0];
    if (selectedEle) {
      selectedEle.scrollIntoView({
        block: "nearest",
        inline: "start",
      });
    }
  };

  const handleEmptyCubberd = (e) => {
    e.preventDefault();

    setLoading(true)

    dispatch(deleteUserCubberd(currentUser._id))

    setTimeout(() => {
      setLoading(false)
      setCompletedAnimation(true)
    }, 500);
    
    setTimeout(() => {
      setCompletedAnimation(false);
    }, 1200);

    setPotContents([]);
  };

  const handleAddAll = (e) => {
    e.preventDefault();

    setPotContents([...userCubberd]);
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
              <ul className="search-results" ref={node}>
                {searchResults.map((result, i) => {
                  return (
                    <li
                      onClick={(e) => handleResultFoodClick(e, result)}
                      ref={i === selectedLi ? ref : null}
                      className={i === selectedLi ? "selected" : ""}
                      key={`searchResult ${result} ${i}`}
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
                  setNonCubberdIngredients={setNonCubberdIngredients}
                  key={`cubberd ${ing} ${i}`}
                />
              ))}
          </div>
          <div className="cubberd-footer">
            {!loading && !completedAnimation && userCubberd.length > 0 && (
              <CustomToolTipTop
                title="Empty your cubberd?"
                arrow
                placement="top"
              >
                <div
                  className="cubberd-footer-options"
                  onClick={handleEmptyCubberd}
                >
                  <TbTrash />
                </div>
              </CustomToolTipTop>
            )}
            {loading && (
              <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
            {completedAnimation && (
              <div className="checkmark"></div>
            )}
            <CustomToolTipTop title="Add all to pot?" arrow placement="top-end">
              <div className="cubberd-footer-options" onClick={handleAddAll}>
                <SiCodechef />
              </div>
            </CustomToolTipTop>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cubberd;
