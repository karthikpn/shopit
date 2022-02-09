import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProductsAction } from "../actions/productActions";
import "../views/product.css";
import Rating from "./Rating";

const Product = ({ product, deleteOption = false }) => {
  const dispatch = useDispatch();
  const config = {
    headers: {
      Authorization: useSelector(
        (state) => state.userLogin.userInfo && state.userLogin.userInfo.token
      ),
    },
  };
  const deleteProduct = async () => {
    await axios.delete(`api/products/${product._id}`, config);
    dispatch(listProductsAction());
  };

  return (
    <div className="product__item">
      <Link to={`/products/${product._id}`}>
        <img src={product.image} alt="" className="product__item__image" />
      </Link>
      <h4 className="product__item__title">{product.name}</h4>
      <div className="product__item__details">
        <i>
          <Rating rating={product.rating} color="#152238" />
        </i>
        <h4>${product.price}</h4>
        {deleteOption && (
          <button
            style={{
              border: "none",
              outline: "none",
              background: "white",
              cursor: "pointer",
            }}
            onClick={deleteProduct}
          >
            <i
              className="fas fa-trash"
              style={{
                fontSize: "1.5rem",
                color: "#ec4332",
              }}
            ></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
