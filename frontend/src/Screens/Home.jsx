import React, { useEffect, useState } from "react";
import Product from "../Components/Product.jsx";
import "../views/home.css";
import { listProductsAction } from "../actions/productActions.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useLocation } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const location = useLocation();

  const { loading, error, products } = productList;
  const redirect = location.search ? location.search.split("?")[1] : "/";

  useEffect(() => {
    dispatch(listProductsAction());
  }, [dispatch]);
  return (
    <div className="home">
      {redirect == "thanks" && (
        <Message
          message="Thanks for Shopping"
          style={{ opacity: "0.5", color: "green" }}
        />
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message message={error} />
      ) : (
        <div className="home__products">
          {products.map((product) => (
            <Product product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
