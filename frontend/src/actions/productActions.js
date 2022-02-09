import axios from "axios";

export const listProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });
    const { data } = await axios.get("/api/products");
    dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "PRODUCT_LIST_FAILED",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });

    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "PRODUCT_DETAILS_FAILED",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductAction = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_CREATE_REQUEST" });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: getState().userLogin.userInfo.token,
      },
    };

    const { data } = await axios.post(`/api/products/`, product, config);

    dispatch({ type: "PRODUCT_CREATE_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "PRODUCT_CREATE_FAILED",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
