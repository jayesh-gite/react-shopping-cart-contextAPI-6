import { createContext, useReducer } from "react";

import { DUMMY_PRODUCTS } from "../dummy-products.js";

export const CartContext = createContext({
  items: [],
  addToCart: () => {},
  updateItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({ ...product, quantity: 1 });
    }
    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );
    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };
    updatedItem.quantity += action.payload.amount;
    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }
    return {
      ...state,
      items: updatedItems,
    };
  }
  return state;
}

export default function CartContextProvider({ children }) {
  const [shoppingCartstate, ShoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  function handleAddItemToCart(id) {
    ShoppingCartDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    ShoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: { productId, amount },
    });
  }
  const ctxValue = {
    items: shoppingCartstate.items,
    addToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };
  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
