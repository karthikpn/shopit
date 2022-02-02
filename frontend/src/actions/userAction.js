import axios from "axios";

export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAILED",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const userLogoffAction = () => async (dispatch) => {
  try {
    localStorage.removeItem("userInfo");
    dispatch({
      type: "USER_LOGOUT",
    });
  } catch (error) {
    console.log(error);
  }
};
export const userRegisterAction =
  (name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: "USER_REGISTER_REQUEST",
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/",
        { name, email, password },
        config
      );
      dispatch({
        type: "USER_REGISTER_SUCCESS",
        payload: data,
      });
      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: "USER_REGISTER_FAILED",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
