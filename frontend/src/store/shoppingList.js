import jwtFetch from "./jwt";

const RECEIVE_SHOPPING_LIST = "shoppingList/RECEIVE_SHOPPING_LIST";
const ADD_TO_SHOPPING_LIST = "shoppingList/ADD_TO_SHOPPING_LIST";
const EDIT_SHOPPING_LIST_ITEM = "shoppingList/EDIT_SHOPPING_LIST_ITEM";
const DELETE_FROM_SHOPPING_LIST = "shoppingList/DELETE_FROM_SHOPPING_LIST";

const receiveShoppingList = (shoppingList) => ({
    type: RECEIVE_SHOPPING_LIST,
    shoppingList
});

const addShoppingListItem = (shoppingListItem) => ({
    type: ADD_TO_SHOPPING_LIST,
    shoppingListItem
});

const removeFromShoppingList = (shoppingListItem) => ({
    type: DELETE_FROM_SHOPPING_LIST,
    shoppingListItem
})

const editShoppingListItem = (shoppingListItemId, shoppingListItem) => ({
        type: EDIT_SHOPPING_LIST_ITEM,
        shoppingListItemId,
        shoppingListItem
})


export const fetchShoppingList = (currentUserId) => async (dispatch) => {
    const res = await jwtFetch(`/api/users/${currentUserId}/shoppingList`);
    const shoppingList = await res.json();
    dispatch(receiveShoppingList(shoppingList));
};

export const addToShoppingList = (currentUserId, shoppingListItem) => async (dispatch) => {
    const res = await jwtFetch(`/api/users/${currentUserId}/shoppingList`, {
        method: "POST",
        body: JSON.stringify(shoppingListItem)
    })

    const newShoppingListItem = await res.json();
    dispatch(addShoppingListItem(newShoppingListItem));
}

export const editShoppingList = (currentUserId, shoppingListItem, quantity) => async (dispatch) => {
    const res = await jwtFetch(`/api/users/${currentUserId}/shoppingList`, {
        method: "PUT",
        body: JSON.stringify({
            quantity: quantity,
            shoppingListItem
        })
    })



    const newShoppingListItem = await res.json();
    dispatch(editShoppingListItem(newShoppingListItem));
}

const shoppingListReducer = (state = {}, action) => {
    const nextState = {...state}
    switch (action.type) {
        case RECEIVE_SHOPPING_LIST:
            return {...state, ...action.shoppingList}
        case ADD_TO_SHOPPING_LIST:
            return {...state, ...action.shoppingListItem}
        case EDIT_SHOPPING_LIST_ITEM:
            // nextState.filter((shoppingListItem) => shoppingListItem.id === action.shoppingListItemId)[0] = action.shoppingListItem;
            return nextState
        default:
            return state;
    };
};

export default shoppingListReducer;