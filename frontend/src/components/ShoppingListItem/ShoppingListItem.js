import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TbTrash } from "react-icons/tb";
import { deleteItem, changeItemQuantity } from "../../store/session";
import { useEffect } from "react";

function ShoppingListItem({ item }) {
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(item.quantity);

  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
    dispatch(changeItemQuantity(sessionUser._id, item._id, newQuantity));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteItem(sessionUser._id, item._id));
  };

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  return (
    <div className="shopping-list-item">
      <div className="shopping-list-item-left">
        <input
          className="quantity-input"
          type="number"
          onChange={handleChange}
          value={quantity}
        />
        <h4>{item.ingredient.food}</h4>
      </div>
      <div className="trash-icon">
        <TbTrash onClick={handleDelete} />
      </div>
    </div>
  );
}

export default ShoppingListItem;
