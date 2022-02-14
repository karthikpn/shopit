import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createProductReviewResetAction } from "../actions/productActions";
import { userLogoffAction } from "../actions/userAction";
import "../views/header.css";
import SearchBox from "./SearchBox";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(createProductReviewResetAction());
    dispatch(userLogoffAction());
  };
  console.log(toggle);

  return (
    <>
      <div className="flex h-16 min-w-full items-center justify-around bg-gray-800 sm:hidden md:flex">
        <div className="header__brand">
          <Link to="/" className="text-white">
            <h2>ShopIt</h2>
          </Link>
        </div>
        <SearchBox />
        <div className="flex w-1/4 justify-between">
          <Link to="/cart" className="header__options__cart">
            <i
              className="fas fa-shopping-cart"
              style={{ marginRight: "0.5vw" }}
            ></i>
            <span>Cart</span>
          </Link>
          <div className="w-3/5">
            {userInfo ? (
              <div
                className="header__profile__logout"
                style={{
                  minWidth: "100%",
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
                <span
                  style={{ cursor: "pointer" }}
                  className="text-white hover:text-red-400"
                  onClick={handleLogout}
                >
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
      <div className="sticky top-0 h-16 min-w-full items-center  justify-around bg-gray-800 sm:flex md:hidden lg:hidden xl:hidden ">
        <Link to="/" className="mx-2 text-white">
          <h2>ShopIt</h2>
        </Link>

        <SearchBox />
        <button
          className="mx-4 cursor-pointer text-white"
          onClick={() => setToggle(!toggle)}
        >
          {" "}
          <i className="fas fa-solid fa-equals text-lg text-white"></i>{" "}
        </button>
      </div>
      {toggle && (
        <div className="absolute right-4 top-16 w-40 bg-gray-800">
          {" "}
          <Link
            to="/cart"
            className="flex justify-center  py-1 text-white"
            onClick={() => setToggle(!toggle)}
          >
            <span>Cart</span>
          </Link>
          {userInfo ? (
            <div className="flex flex-col items-center justify-center">
              <Link
                onClick={() => setToggle(!toggle)}
                to="/profile"
                className="py-1"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                Profile
              </Link>
              {userInfo?.isAdmin && (
                <Link
                  to="/userlist"
                  className="py-1 text-white"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  Admin
                </Link>
              )}
              <span
                style={{ cursor: "pointer" }}
                className="py-1 text-white hover:text-red-400"
                onClick={() => {
                  setToggle(!toggle);
                  handleLogout();
                }}
              >
                Logout
              </span>
            </div>
          ) : (
            <Link
              to="/login"
              className="header__options__profile"
              onClick={() => {
                setToggle(!toggle);
                handleLogout();
              }}
            >
              <i class="fas fa-user" style={{ marginRight: "0.5vw" }}></i>
              <span>Login</span>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
