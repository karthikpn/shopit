import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import {
  userDetailsAction,
  userUpdateProfileAction,
} from "../actions/userAction";

import "../views/login.css";
import { useDispatch, useSelector } from "react-redux";

import Message from "../Components/Message";
import Loader from "../Components/Loader";
import axios from "axios";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, userInfo: user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: loadingProfileUpdate, success } = userUpdateProfile;

  const redirect = location.search ? location.search.split("=") : "/";
  const [orders, setOrders] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: useSelector(
        (state) => state.userLogin.userInfo && state.userLogin.userInfo.token
      ),
    },
  };
  useEffect(() => {
    console.log(userInfo, userLogin);
    if (userInfo == null || userLogin == null) {
      navigate("/login");
    } else {
      const getOrders = async () => {
        const { data: order } = await axios.get("/api/orders", config);
        setOrders(order);
        console.log(order);
      };
      if (!user) {
        dispatch(userDetailsAction("profile"));
      } else {
        if (!user.name) setName(user.name);
        if (!user.email) setEmail(user.email);
        getOrders();
      }
    }
  }, [navigate, userInfo, user]);

  const submitHandler = (e) => {
    dispatch(userUpdateProfileAction({ id: user._id, name, email, password }));
  };
  return (
    <>
      {userInfo?.isAdmin && (
        <div className="productScreen__back" style={{ marginTop: "2vh" }}>
          <Link to="/userlist" className="productScreen__back__link">
            Admin
          </Link>
        </div>
      )}
      {error && <Message message={error} />}
      {loadingProfileUpdate && <Loader />}
      {console.log(success)}
      {success && <Message message="Profile Updated" bcolor="lightgreen" />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "50vh",
          marginTop: "10vh",
          alignItems: "center",
        }}
      >
        <h2>Change user details</h2>
        <input
          type="name"
          className="login__name"
          placeholder={userInfo && userInfo.name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="login__email"
          placeholder={userInfo && userInfo.email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="login__password"
          placeholder="Set new Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login__submit" onClick={submitHandler}>
          Update
        </button>
        <span>
          Dont want to change ? <Link to="/">Home</Link>{" "}
        </span>
      </div>
    </>
  );
};

export default ProfileScreen;
