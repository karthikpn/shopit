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
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "5vh",
          marginTop: "4vh",
          marginLeft: "4vw",
        }}
      >
        <h1>Products</h1>
        <div className="productScreen__back" style={{ marginRight: "4vw" }}>
          <Link to="/addproduct" className="productScreen__back__link">
            Create New Product
          </Link>
        </div>
        <div className="productScreen__back" style={{ marginRight: "4vw" }}>
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
          <div className="home__products">
            {products &&
              products.map((p) => <Product product={p} deleteOption={true} />)}
          </div>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
