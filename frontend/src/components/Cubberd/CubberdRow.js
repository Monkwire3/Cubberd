import { useContext, useState } from "react";
import { CustomToolTipBottom } from "../ToolTip/ToolTip";
import { GiCookingPot } from "react-icons/gi";
import { MdOutlineRemoveCircle } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { PotContext } from "../../context/PotContext";
import { deleteUserCubberdIngredient } from "../../store/session";
import { useDispatch } from "react-redux";

const CubberdRow = ({ ing, currentUser }) => {
  const [showOptions, setShowOptions] = useState(false);
  const { potContents, setPotContents } = useContext(PotContext);
  const dispatch = useDispatch();

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
    }
  };

  const removeFromUserCubberd = (e, ingredient) => {
    e.preventDefault();

    const removedFromPotArr = potContents.filter(ing => ing._id !== ingredient._id)
    setPotContents(removedFromPotArr)
    dispatch(deleteUserCubberdIngredient(currentUser._id, ingredient));
  };

  return (
    <div
      className="cubberd-ingredient-row"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseOut}
    >
      <img src={ing.image} onClick={(e) => addToPot(e, ing)} />
      <div className="cubberd-food-name" onClick={(e) => addToPot(e, ing)}>
        {ing.food}
      </div>
      {showOptions && (
        <>
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
            <div className="cubberd-shelving-option-two">
              <FaCartPlus />
            </div>
          </CustomToolTipBottom>
        </>
      )}
    </div>
  );
};

export default CubberdRow;
