import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToShoppingList, changeItemQuantity } from "../../store/session";
import ShoppingListItem from "../ShoppingListItem/ShoppingListItem";
import "./ShoppingList.css";
import { BiSearchAlt } from "react-icons/bi";

function ShoppingList({ items }) {
  const currentUser = useSelector((state) => state.session.user);
  const [shoppingSearchResults, setShoppingSearchResults] = useState([]);
  const [shoppingSearchQuery, setShoppingSearchQuery] = useState("");
  const allIngredients = useSelector((state) => state.ingredients);
  const [selectedLi, setSelectedLi] = useState(0);
  const ref = useRef();
  const node = useRef();
  const node2 = useRef();
  const searchRef = useRef();
  const dispatch = useDispatch();

  const shoppingListItems = items.map((item) => (
    <ShoppingListItem item={item} />
  ));

  const searchItem = (query) => {
    if (!query) {
      setShoppingSearchResults([]);
      setShoppingSearchQuery("");
      return;
    }
    setShoppingSearchQuery(query);
    query = query.toLowerCase();

    const results = [];

    allIngredients.forEach((ing) => {
      if (ing.food.toLowerCase().indexOf(query) !== -1) {
        results.push(ing);
      }
    });

    if (results.length === 0) {
      results.push({ food: "No matching results" });
    }
    setShoppingSearchResults(results);
  };

  const handleResultFoodClick = (e, result) => {
    e.preventDefault();
    if (result.food === "No matching results") {
      return;
    }
    setShoppingSearchResults([]);
    setShoppingSearchQuery("");
    let obj = { food: result.food };

    if (items.length > 0) {
      let existingArr = items.filter(
        (ele) => ele.ingredient._id === result._id
      );
      if (existingArr.length === 0) {
        dispatch(addToShoppingList(currentUser._id, obj));
      } else {
        let item = existingArr[0];
        let newQuantity = item.quantity + 1;
        dispatch(changeItemQuantity(currentUser._id, item._id, newQuantity));
        return;
      }
    } else {
      dispatch(addToShoppingList(currentUser._id, obj));
    }
  };

  useEffect(() => {
    setSelectedLi(0);

    return () => {
      setSelectedLi(0);
    };
  }, [shoppingSearchResults]);

  const handleKeyDown = (e) => {
    let last = shoppingSearchResults.length - 1;
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
      if (shoppingSearchResults[selectedLi]) {
        if (shoppingSearchResults[selectedLi]._id) {
          let selectedFood = shoppingSearchResults[selectedLi];

          let existingArr = items.filter(
            (ele) => ele.ingredient._id === selectedFood._id
          );
          if (existingArr.length === 0) {
            let obj = { food: selectedFood.food };
            dispatch(addToShoppingList(currentUser._id, obj));
          } else {
            let item = existingArr[0];
            let newQuantity = item.quantity + 1;
            dispatch(
              changeItemQuantity(currentUser._id, item._id, newQuantity)
            );
          }
        } else {
          return;
        }
      }
      setShoppingSearchResults([]);
      setShoppingSearchQuery("");
    }
    let selectedEle = document.getElementsByClassName("selected")[0];
    if (selectedEle) {
      selectedEle.scrollIntoView({
        block: "nearest",
        inline: "start",
      });
    }
  };

  const handleFocus = (e) => {
    e.preventDefault();

    searchItem(shoppingSearchQuery);
  };

  const handleSearchBtn = (e) => {
    e.preventDefault();
    if (shoppingSearchResults[selectedLi]) {
      if (shoppingSearchResults[selectedLi]._id) {
        let obj = { food: shoppingSearchResults[selectedLi].food };
        dispatch(addToShoppingList(currentUser._id, obj));
      }
    } else {
      searchRef.current.focus();
    }
    setShoppingSearchResults([]);
    setShoppingSearchQuery("");
  };

  const clickOutside = (e) => {
    if (node.current) {
      if (node.current.contains(e.target) || node2.current.contains(e.target)) {
        return;
      }
    }
    setShoppingSearchResults([]);
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [dispatch]);

  return (
    <>
      <div className="shopping-list-search-container">
        <div className="shopping-list-search-bar-container">
          <input
            type="text"
            className="shopping-list-search-bar"
            placeholder="Add to shopping list"
            onChange={(e) => searchItem(e.target.value)}
            value={shoppingSearchQuery}
            onKeyDown={(e) => handleKeyDown(e)}
            onFocus={handleFocus}
            ref={searchRef}
          />
          <div
            className="shopping-list-search-btn"
            onClick={handleSearchBtn}
            ref={node2}
          >
            <BiSearchAlt />
          </div>
          {shoppingSearchResults && shoppingSearchResults.length > 0 && (
            <ul className="shopping-list-search-results" ref={node}>
              {shoppingSearchResults.map((result, i) => {
                return (
                  <li
                    onClick={(e) => handleResultFoodClick(e, result)}
                    ref={i === selectedLi ? ref : null}
                    className={
                      i === selectedLi ? "shopping-list-search-selected" : ""
                    }
                    key={`shoppingSearchResult ${result} ${i}`}
                  >
                    {result.food}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div id="shopping-list">{shoppingListItems}</div>
    </>
  );
}

export default ShoppingList;
