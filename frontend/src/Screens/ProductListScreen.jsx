import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { listProductsAction } from "../actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Paginate from "../Components/Paginate";
import Product from "../Components/Product";

const ProductListScreen = () => {
  const navigate = useNavigate();
  const params = useParams();

  const pageNumber = params.pageNumber || 1;
  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productList
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userInfo, products);
    if (!userInfo?.isAdmin) navigate("/login");
    dispatch(listProductsAction("", pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <>
      <div
        className="w-full"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          marginBottom: "5vh",
          marginTop: "4vh",
        }}
      >
        <h1>Products</h1>
        <div className="productScreen__back">
          <Link to="/addproduct" className="productScreen__back__link">
            New Product
          </Link>
        </div>
        <div className="productScreen__back">
          <Link to="/userlist" className="productScreen__back__link">
            Users
          </Link>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message message={error} />
      ) : (
        <>
          <div className="mx-2 grid gap-5 sm:grid-cols-1 sm:grid-rows-2 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-3 xl:grid-cols-3">
            {products &&
              products.map((p) => <Product product={p} deleteOption={true} />)}
          </div>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
