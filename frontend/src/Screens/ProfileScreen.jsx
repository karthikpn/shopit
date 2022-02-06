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
  const { success } = userUpdateProfile;

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
    e.preventDefault();
    dispatch(userUpdateProfileAction({ id: user._id, name, email, password }));
  };
  return (
    <>
      {error && <Message message={error} />}
      {loading && <Loader />}
      {success && <Message message="Profile Updated" color="#FF5733" />}
      {userInfo?.isAdmin && (
        <div className="productScreen__back" style={{ marginTop: "2vh" }}>
          <Link to="/userlist" className="productScreen__back__link">
            Admin
          </Link>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "30vh",
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
      <div className="user__order">
        <h2 style={{ margin: "2rem 3rem" }}>Order History</h2>

        {orders ? (
          orders.map((order) => (
            <div className="user__order__items">
              <h3 style={{ margin: "1rem", marginLeft: "5rem" }}>
                Order Value :{" "}
                {Math.round(
                  order.orderItems.reduce(
                    (a, item) => a + item.price * item.qty,
                    0
                  )
                )}{" "}
              </h3>
              <div className="cart__items">
                {order.orderItems.map((item) => (
                  <div className="cart__item" key={item.product}>
                    <img
                      src={item.image}
                      alt=""
                      className="cart__item__image"
                    />
                    <Link
                      className="cart__item__name"
                      to={`/products/${item.product}`}
                    >
                      {item.name}
                    </Link>
                    <span className="cart__item__price">
                      {item.qty} * {item.price} = $
                      {Math.round(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <Message message="No orders yet :(" />
        )}
      </div>
    </>
  );
};

export default ProfileScreen;
