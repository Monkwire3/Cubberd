import { useContext, useEffect, useState } from "react";
import { CustomToolTipBottom } from "../ToolTip/ToolTip";
import { GiCookingPot } from "react-icons/gi";
import { MdOutlineRemoveCircle } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { PotContext } from "../../context/PotContext";
import {
  addToShoppingList,
  changeItemQuantity,
  deleteUserCubberdIngredient,
} from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./CubberdRow.css";

const CubberdRow = ({ ing, currentUser, addAllAnimation, i, length }) => {
  const [showOptions, setShowOptions] = useState(false);
  const { potContents, setPotContents, setAddingIngredient } =
    useContext(PotContext);
  const [animateItemName, setAnimateItemName] = useState(
    "cubberd-ingredient-image-item"
  );
  const shoppingList = useSelector((state) => state.session.user.shoppingList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (addAllAnimation) {
      setAddingIngredient(true);

      let itemIdx = length - 1 - i;

      switch (itemIdx) {
        case 0:
          setAnimateItemName("cubberd-ingredient-image-item animate-one");
          break;
        case 1:
          setAnimateItemName("cubberd-ingredient-image-item animate-two");
          break;
        case 2:
          setAnimateItemName("cubberd-ingredient-image-item animate-three");
          break;
        case 3:
          setAnimateItemName("cubberd-ingredient-image-item animate-four");
          break;
        case 4:
          setAnimateItemName("cubberd-ingredient-image-item animate-five");
          break;
        case 5:
          setAnimateItemName("cubberd-ingredient-image-item animate-six");
          break;
        case 6:
          setAnimateItemName("cubberd-ingredient-image-item animate-seven");
          break;
        case 7:
          setAnimateItemName("cubberd-ingredient-image-item animate-eight");
          break;
        case 8:
          setAnimateItemName("cubberd-ingredient-image-item animate-nine");
          break;
        case 9:
          setAnimateItemName("cubberd-ingredient-image-item animate-ten");
          break;
        case 10:
          setAnimateItemName("cubberd-ingredient-image-item animate-eleven");
          break;
        default:
          setAnimateItemName("cubberd-ingredient-image-item animate-eleven");
          break;
      }

      setTimeout(() => {
        setAnimateItemName("cubberd-ingredient-image-item");
        setAddingIngredient(false);
      }, 1000);
    }
  }, [addAllAnimation]);

  const handleMouseOver = (e) => {
    e.preventDefault();

    if (!showOptions) {
      setShowOptions(true);
    }
  };

  const handleMouseOut = (e) => {
    e.preventDefault();

    if (showOptions) {
      setShowOptions(false);
    }
  };

  const addToPot = (e, ingredient) => {
    e.preventDefault();

    let includedItems = potContents.filter((ele) => ele._id === ingredient._id);

    if (includedItems.length === 0) {
      setPotContents((old) => [...old, ingredient]);
      setAddingIngredient(true);

      switch (true) {
        case e.clientY < 170:
          setAnimateItemName("cubberd-ingredient-image-item animate-one");
          break;
        case e.clientY < 230:
          setAnimateItemName("cubberd-ingredient-image-item animate-two");
          break;
        case e.clientY < 290:
          setAnimateItemName("cubberd-ingredient-image-item animate-three");
          break;
        case e.clientY < 350:
          setAnimateItemName("cubberd-ingredient-image-item animate-four");
          break;
        case e.clientY < 410:
          setAnimateItemName("cubberd-ingredient-image-item animate-five");
          break;
        case e.clientY < 470:
          setAnimateItemName("cubberd-ingredient-image-item animate-six");
          break;
        case e.clientY < 530:
          setAnimateItemName("cubberd-ingredient-image-item animate-seven");
          break;
        case e.clientY < 590:
          setAnimateItemName("cubberd-ingredient-image-item animate-eight");
          break;
        case e.clientY < 650:
          setAnimateItemName("cubberd-ingredient-image-item animate-nine");
          break;
        case e.clientY < 720:
          setAnimateItemName("cubberd-ingredient-image-item animate-ten");
          break;
        case e.clientY < 780:
          setAnimateItemName("cubberd-ingredient-image-item animate-eleven");
          break;
        default:
          break;
      }

      setTimeout(() => {
        setAnimateItemName("cubberd-ingredient-image-item");
        setAddingIngredient(false);
      }, 1000);
    }
  };

  const removeFromUserCubberd = (e, ingredient) => {
    e.preventDefault();

    const removedFromPotArr = potContents.filter(
      (ing) => ing._id !== ingredient._id
    );
    setPotContents(removedFromPotArr);
    dispatch(deleteUserCubberdIngredient(currentUser._id, ingredient));
  };

  const postToShoppingList = (e, ing) => {
    e.preventDefault();

    let obj = { food: ing.food };
    let existingArr = shoppingList.filter(
      (ele) => ele.ingredient._id === ing._id
    );

    if (existingArr.length === 0) {
      dispatch(addToShoppingList(currentUser._id, obj));
    } else {
      let item = existingArr[0];
      let newQuantity = item.quantity + 1;
      dispatch(changeItemQuantity(currentUser._id, item._id, newQuantity));
    }
  };

  return (
    <div
      className="cubberd-ingredient-row"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseOut}
    >
      <div>
        <img src={ing.image} onClick={(e) => addToPot(e, ing)} />
        {animateItemName && (
          <div className={animateItemName}>
            <img src={ing.image} onClick={(e) => addToPot(e, ing)} />
          </div>
        )}
        <div className="cubberd-food-name" onClick={(e) => addToPot(e, ing)}>
          {ing.food}
        </div>
      </div>
      {showOptions && (
        <div id="cubberd-ingredient-row-right">
          <CustomToolTipBottom
            title="Add to pot?"
            arrow
            placement="bottom-start"
          >
            <div
              className="cubberd-shelving-option-one"
              onClick={(e) => addToPot(e, ing)}
            >
              <GiCookingPot />
            </div>
          </CustomToolTipBottom>
          <CustomToolTipBottom
            title="Remove from cubberd?"
            arrow
            placement="bottom"
          >
            <div
              className="cubberd-shelving-option-two"
              onClick={(e) => removeFromUserCubberd(e, ing)}
            >
              <MdOutlineRemoveCircle />
            </div>
          </CustomToolTipBottom>
          <CustomToolTipBottom
            title="Add to shopping list?"
            arrow
            placement="bottom-end"
          >
            <div
              className="cubberd-shelving-option-two"
              onClick={(e) => postToShoppingList(e, ing)}
            >
              <FaCartPlus />
            </div>
          </CustomToolTipBottom>
        </div>
      )}
    </div>
  );
};

export default CubberdRow;
