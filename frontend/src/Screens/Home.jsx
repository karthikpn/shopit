import React, { useEffect, useState } from "react";
import Product from "../Components/Product.jsx";
import "../views/home.css";
import { listProductsAction } from "../actions/productActions.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProductsAction());
  }, [dispatch]);
  return (
    <div className="home">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message error={error} />
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
