import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { productDetailsAction } from "../actions/productActions";
import Loader from "../Components/Loader";
import "../views/updateProductScreen.css";
const UpdateProductScreen = () => {
  const params = useParams();
  const productId = params.id;
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, er, product } = productDetails;
  const navigate = useNavigate();
  useEffect(() => {
    if (!product.name || product._id !== productId)
      dispatch(productDetailsAction(product._id));
    else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="updateproduct">
      <div className="updateproduct__details">
        <label>Name : </label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Enter Name"
        />
      </div>

      <div className="updateproduct__details">
        <label>Price : </label>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          type="number"
          placeholder="Enter price"
        />
      </div>

      <div className="updateproduct__details">
        <label>Brand :</label>
        <input
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
          type="text"
          placeholder="Enter Brand"
        />
      </div>

      <div className="updateproduct__details">
        <label>Image :</label>
        <input
          onChange={(e) => setImage(e.target.value)}
          value={image}
          type="text"
          placeholder="Image"
        />
      </div>

      <div className="updateproduct__details">
        <label>Category : </label>
        <input
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          type="text"
          placeholder="Enter category"
        />
      </div>

      <div className="updateproduct__details">
        {" "}
        <label>Count In Stock : </label>
        <input
          onChange={(e) => setCountInStock(e.target.value)}
          value={countInStock}
          type="number"
          placeholder="Enter Count in Stock"
        />
      </div>

      <div className="updateproduct__details">
        {" "}
        <label>Description :</label>
        <input
          onChange={(e) => setDescription()}
          value={description}
          type="text"
          placeholder="Enter Description"
        />
      </div>
      <div className="productScreen__back" style={{ marginRight: "4vw" }}>
        <button className="productScreen__back__link" onClick={submitHandler}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default UpdateProductScreen;
