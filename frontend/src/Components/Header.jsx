import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createProductReviewResetAction } from "../actions/productActions";
import { userLogoffAction } from "../actions/userAction";
import "../views/header.css";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(createProductReviewResetAction());
    dispatch(userLogoffAction());
  };

  return (
    <div className="header">
      <div className="header__brand">
        <Link to="/" className="header__brand__link">
          <h2>ShopIt</h2>
        </Link>
      </div>
      <input type="text" className="header__search" />
      <div className="header__options">
        <Link to="/cart" className="header__options__cart">
          <i class="fas fa-shopping-cart" style={{ marginRight: "0.5vw" }}></i>
          <span>Cart</span>
        </Link>
        <div>
          {userInfo ? (
            <div
              className="header__profile__logout"
              style={{
                minWidth: "10vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ cursor: "pointer" }}>
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  Profile
                </Link>
              </span>
              <span style={{ cursor: "pointer" }} onClick={handleLogout}>
                Logout
              </span>
            </div>
          ) : (
            <Link to="/login" className="header__options__profile">
              <i class="fas fa-user" style={{ marginRight: "0.5vw" }}></i>
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
