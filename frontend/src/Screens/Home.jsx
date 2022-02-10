import React, { useEffect, useState } from "react";
import Product from "../Components/Product.jsx";
import { Helmet } from "react-helmet";
import "../views/home.css";
import { listProductsAction } from "../actions/productActions.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { Link, useLocation, useParams } from "react-router-dom";
import Paginate from "../Components/Paginate.jsx";

const Home = () => {
  const params = useParams();
  const keyword = params.keyword;

  const pageNumber = params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const location = useLocation();

  const { loading, error, products, page, pages } = productList;
  const redirect = location.search ? location.search.split("?")[1] : "/";

  useEffect(() => {
    dispatch(listProductsAction(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Helmet>
        <title>Welcome to Shopit</title>
      </Helmet>
      <div className="home">
        {keyword && (
          <div className="productScreen__back">
            <Link to="/" className="productScreen__back__link">
              Go Back
            </Link>
          </div>
        )}
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
          <>
            <div className="home__products">
              {products.length > 0 ? (
                products.map((product) => <Product product={product} />)
              ) : (
                <h3 style={{ margin: "3rem" }}>No Products Found</h3>
              )}
            </div>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
