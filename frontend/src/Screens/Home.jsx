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
      <div className="m-8">
        {keyword && (
          <button
            type="button"
            className=" ml-14 mb-2 rounded-lg bg-gray-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 "
          >
            <Link to="/">Go Back</Link>
          </button>
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
            {keyword ? (
              <h1 className="mt-6 ml-14">Found {products.length} products</h1>
            ) : (
              <h1 className=" ml-14 mb-10 inline-block">Top Products</h1>
            )}
            <div className="grid gap-5 sm:grid-cols-1 sm:grid-rows-2 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-3 xl:grid-cols-3">
              {products.length > 0 ? (
                products.map((product) => <Product product={product} />)
              ) : (
                <></>
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
