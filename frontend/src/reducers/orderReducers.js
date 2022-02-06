export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_CREATE_REQUEST":
      return { loading: true };
    case "ORDER_CREATE_SUCCESS":
      return { loading: false, sucesss: true, order: action.payload };
    case "ORDER_CREATE_FAILED":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
