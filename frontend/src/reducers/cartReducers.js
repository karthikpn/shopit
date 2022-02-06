export const cartReducers = (
  state = { cartItems: [], itemsPrice: 0 },
  action
) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product == item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case "CART_REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case "CART_PRICE_ITEM":
      return {
        ...state,
        itemsPrice: Math.round(
          state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        ),
      };

    default:
      return { ...state };
  }
};
