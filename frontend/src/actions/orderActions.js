import axios from "axios";

export const createOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_CREATE_REQUEST",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: getState().userLogin.userInfo.token,
      },
    };
    const { data } = await axios.post("/api/orders", order, config);

    dispatch({
      type: "ORDER_CREATE_SUCCESS",
      payload: data,
    });
    dispatch({
      type: "ORDER_CREATE_RESET",
    });
  } catch (error) {
    dispatch({
      type: "ORDER_CREATE_FAILED",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
