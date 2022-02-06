import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  addToCartAction,
  itemsPriceAction,
  removeFromCartAction,
} from "../actions/cartActions";
import Message from "../Components/Message";
import "../views/cartScreen.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CartScreen = () => {
  const params = useParams();
  let location = useLocation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const { cartItems } = cart;
  const productId = params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCartAction(id));
  };
  const handleCheckOut = () => {
    if (userInfo) {
      dispatch(itemsPriceAction());
      navigate("/order");
    } else navigate("/login");
  };
  useEffect(() => {
    if (productId) {
      dispatch(addToCartAction(productId, qty));
    }
  }, [dispatch, productId, qty]);
  return (
    <div className="cart">
      <h2 style={{ marginLeft: "1vw", marginTop: "2vh" }}>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <Message message="No Items available" bcolor="#add8e6" />
      ) : (
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
                ${Math.round(item.price * item.qty)}
              </span>
              <div>
                <select
                  style={{ padding: "0.4rem" }}
                  id="qty"
                  name="qty"
                  value={item.qty}
                  onChange={(e) =>
                    dispatch(
                      addToCartAction(item.product, Number(e.target.value))
                    )
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="cart__item__delete"
                onClick={() => removeFromCartHandler(item.product)}
                style={{
                  border: "none",
                  outline: "none",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                <i
                  className="fas fa-trash"
                  style={{
                    fontSize: "2rem",
                    color: "#ec4332",
                  }}
                ></i>
              </button>
            </div>
          ))}
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
            <button
              className="cart__item__checkout"
              disabled={cartItems.length === 0}
              onClick={handleCheckOut}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
