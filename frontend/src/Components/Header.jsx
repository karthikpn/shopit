import React from "react";
import { Link } from "react-router-dom";
import "../views/header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header__brand">
        <Link to="/" className="header__brand__link">
          <h2>Brand</h2>
        </Link>
      </div>
      <input type="text" className="header__search" />
      <div className="header__options">
        <Link to="/cart" className="header__options__cart">
          <i class="fas fa-shopping-cart" style={{ marginRight: "0.5vw" }}></i>
          <span>Cart</span>
        </Link>
        <Link to="/profile" className="header__options__profile">
          <i class="fas fa-user" style={{ marginRight: "0.5vw" }}></i>
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
