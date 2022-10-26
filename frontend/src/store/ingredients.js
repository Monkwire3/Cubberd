import jwtFetch from "./jwt";

const RECEIVE_INGREDIENTS = "ingredients/RECEIVE_INGREDIENTS";

const receiveIngredients = (ingredients) => ({
  type: RECEIVE_INGREDIENTS,
  ingredients,
});

export const fetchIngredients = () => async (dispatch) => {
  const res = await jwtFetch("/api/ingredients");
  const ingredients = await res.json();
  dispatch(receiveIngredients(ingredients));
};

const ingredientsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_INGREDIENTS:
      return action.ingredients;
    default:
      return state;
  }
};

export default ingredientsReducer;
