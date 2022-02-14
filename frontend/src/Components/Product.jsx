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
    <div className=" h-fit rounded-lg border border-gray-200  bg-white shadow-md">
      <Link to={`/products/${product._id}`}>
        {" "}
        <img
          src={product.image}
          alt=""
          className="h-2/3 w-full rounded-t-lg object-cover"
        />
      </Link>

      <div className="p-5">
        <h5 className="mb-2 text-lg font-light  tracking-tight text-gray-900 ">
          {product.name}
        </h5>
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
        <div className="mt-4 flex justify-center">
          <Link
            to={`/products/${product._id}`}
            class="inline-flex items-center rounded-lg bg-blue-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 "
          >
            See Product
            <svg
              class="ml-2 -mr-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
