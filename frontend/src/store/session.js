import jwtFetch from "./jwt";

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";
const RECEIVE_USER_CUBBERD_INGREDIENTS =
  "session/RECEIVE_USER_CUBBERD_INGREDIENTS";
const RECEIVE_NEW_USER_CUBBERD_INGREDIENT =
  "session/RECEIVE_NEW_USER_CUBBERD_INGREDIENT";
const REMOVE_USER_CUBBERD_INGREDIENT =
  "session/REMOVE_USER_CUBBERD_INGREDIENT";
const CLEAR_USER_CUBBERD = "session/CLEAR_USER_CUBBERD"

// Dispatch receiveCurrentUser when a user logs in
const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

// Dispatch receiveErrors to show authentication errors on the frontend.
const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

// Dispatch logoutUser to clear the session user when a user logs out.
const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

// Dispatch clearSessionErrors to clear any session errors.
export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS,
});

// Handle User Cubberd actions
const receiveUserCubberdIngredients = (ingredients) => ({
  type: RECEIVE_USER_CUBBERD_INGREDIENTS,
  ingredients,
});

const receiveNewUserCubberdIngredient = (ingredients) => ({
  type: RECEIVE_NEW_USER_CUBBERD_INGREDIENT,
  ingredients,
});

const removeUserCubberdIngredient = (ingredients) => ({
  type: REMOVE_USER_CUBBERD_INGREDIENT,
  ingredients,
});

const clearUserCubberd = () => ({
  type: CLEAR_USER_CUBBERD
})

//Because signup also logs in the newly created user,
// login and signup essentially differ only in their route and user information sent.
// You should accordingly be able to abstract their common elements into a helper function.

export const signup = (user) => startSession(user, "api/users/register");
export const login = (user) => startSession(user, "api/users/login");

const startSession = (userInfo, route) => async (dispatch) => {
  try {
    const res = await jwtFetch(route, {
      method: "POST",
      body: JSON.stringify(userInfo),
    });
    const { user, token } = await res.json();
    localStorage.setItem("jwtToken", token);
    return dispatch(receiveCurrentUser(user));
  } catch (err) {
    const res = await err.json();
    if (res.statusCode === 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  dispatch(logoutUser());
};

export const getCurrentUser = () => async (dispatch) => {
  const res = await jwtFetch("/api/users/current");
  const user = await res.json();
  return dispatch(receiveCurrentUser(user));
};

export const fetchUserCubberdIngredients = (userId) => async (dispatch) => {
  const res = await jwtFetch(`/api/users/${userId}/cubberd`);
  const ingredients = await res.json();
  dispatch(receiveUserCubberdIngredients(ingredients.cubberd));
};

export const composeUserCubberdIngredient =
  (userId, ingredient) => async (dispatch) => {
    const res = await jwtFetch(`/api/users/${userId}/cubberd`, {
      method: "POST",
      body: JSON.stringify(ingredient),
    });
    const newCubberd = await res.json();
    dispatch(receiveNewUserCubberdIngredient(newCubberd));
  };

export const deleteUserCubberdIngredient =
  (userId, ingredient) => async (dispatch) => {
    const res = await jwtFetch(`/api/users/${userId}/cubberd`, {
      method: "DELETE",
      body: JSON.stringify(ingredient),
    });
    const updatedCubberd = await res.json();
    dispatch(removeUserCubberdIngredient(updatedCubberd));
  };

export const deleteUserCubberd = (userId) => async (dispatch) => {
  await jwtFetch(`/api/users/${userId}/clearCubberd`, {
    method: "DELETE"
  })
  dispatch(clearUserCubberd())
}

const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
    case CLEAR_SESSION_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const initialState = {
  user: undefined,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { user: action.currentUser };
    case RECEIVE_USER_LOGOUT:
      return initialState;
    case RECEIVE_USER_CUBBERD_INGREDIENTS:
      state.user.cubberd = action.ingredients; 
      return {...state}
    case RECEIVE_NEW_USER_CUBBERD_INGREDIENT:
      state.user.cubberd = action.ingredients; 
      return {...state};
    case REMOVE_USER_CUBBERD_INGREDIENT:
      state.user.cubberd = action.ingredients; 
      return {...state};
    case CLEAR_USER_CUBBERD:
      state.user.cubberd = {};
      return {...state}
    default:
      return state;
  }
};

export default sessionReducer;
