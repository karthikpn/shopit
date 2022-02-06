import React from "react";

import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";

import { userDetailsAction } from "../actions/userAction";

import "../views/login.css";
import { useDispatch, useSelector } from "react-redux";

import Message from "../Components/Message";
import Loader from "../Components/Loader";

import axios from "axios";
const OrderByUser = () => {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const params = useParams();
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
    if (userInfo?.isAdmin == false) {
      navigate("/login");
    } else {
      const getOrders = async () => {
        const { data: order } = await axios.get(
          `/api/orders/${params.id}`,
          config
        );
        setOrders(order);
        console.log(order);
      };
      getOrders();
    }
  }, [navigate, userInfo]);
  return (
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
                  <img src={item.image} alt="" className="cart__item__image" />
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
  );
};

export default OrderByUser;
