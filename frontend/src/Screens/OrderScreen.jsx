import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";

import "../views/cartScreen.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createOrderAction } from "../actions/orderActions";
const OrderScreen = () => {
  const params = useParams();
  let location = useLocation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const { cartItems } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const placeOrderHandler = () => {
    dispatch(
      createOrderAction({
        orderItems: cart.cartItems,
        itemsPrice: cart.itemsPrice,
      })
    );
  };
  console.log(success);
  useEffect(() => {
    if (!userInfo) navigate("/login");
    else {
      if (order) {
        navigate("/?thanks");
      }
    }
  }, [navigate, userInfo, orderCreate]);

  return (
    <div className="order">
      <div className="productScreen__back" style={{ marginTop: "3vh" }}>
        <Link to="/cart" className="productScreen__back__link">
          Go Back
        </Link>
      </div>
      <h3 style={{ marginTop: "5vh", marginLeft: "5vw" }}>Order Summary</h3>

      <div className="order__details">
        <div className="cart__items">
          {cartItems.map((item) => (
            <div className="cart__item" key={item.product}>
              <img src={item.image} alt="" className="cart__item__image" />
              <Link
                className="cart__item__name"
                to={`/products/${item.product}`}
              >
                {item.name}
              </Link>
              <span className="cart__item__price">
                {item.qty} * {item.price} = ${Math.round(item.price * item.qty)}
              </span>
            </div>
          ))}
        </div>
        <div className="order__price">
          <div className="cart__items__finalPrice">
            <h3>
              Total Items : {cartItems.reduce((acc, item) => acc + item.qty, 0)}
            </h3>
            <h3>
              Price :{" "}
              {cartItems.reduce(
                (acc, item) => Math.round(acc + item.price * item.qty),
                0
              )}{" "}
            </h3>
            {error && <Message message={error} />}
            <button
              className="cart__item__checkout"
              disabled={cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
