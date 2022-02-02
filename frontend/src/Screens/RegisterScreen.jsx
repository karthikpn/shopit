import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { userRegisterAction } from "../actions/userAction";

import "../views/login.css";
import { useDispatch, useSelector } from "react-redux";

import Message from "../Components/Message";
import Loader from "../Components/Loader";
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
    dispatch(userRegisterAction(name, email, password));
  };
  return (
    <>
      {error && <Message message={error} />}
      {loading && <Loader />}
      <div className="login">
        <h2>Register</h2>
        <input
          type="name"
          className="login__name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
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
          Register
        </button>
        <span>
          Have an account ?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>{" "}
        </span>
      </div>
    </>
  );
};

export default RegisterScreen;
