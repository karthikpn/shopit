import axios from "axios";

export const addToCartAction = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: "CART_ADD_ITEM",
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeFromCartAction = (id) => (dispatch, getState) => {
  dispatch({
    type: "CART_REMOVE_ITEM",
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const itemsPriceAction = () => (dispatch, getState) => {
  dispatch({
    type: "CART_PRICE_ITEM",
  });
  localStorage.setItem(
    "itemsPrice",
    JSON.stringify(getState().cart.itemsPrice)
  );
};
