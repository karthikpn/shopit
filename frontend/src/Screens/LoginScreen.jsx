import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { userLoginAction } from "../actions/userAction";

import "../views/login.css";
import { useDispatch, useSelector } from "react-redux";

import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { Helmet } from "react-helmet";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=") : "/";

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginAction(email, password));
  };
  return (
    <>
      <Helmet>
        <title>Login to Shopit</title>
      </Helmet>
      {error && <Message message={error} />}
      {loading && <Loader />}
      <div className="login">
        <h2>Sign In</h2>
        <input
          type="email"
          className="login__email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login__password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login__submit" onClick={submitHandler}>
          Login
        </button>
        <span>
          New Customer ?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>{" "}
        </span>
      </div>
    </>
  );
};

export default LoginScreen;
