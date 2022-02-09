import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  createProductAction,
  productDetailsAction,
} from "../actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import "../views/newproductscreen.css";

const NewProductScreen = () => {
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
  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state) => state.createProduct);
  const { loading, error, product } = productDetails;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductAction({
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/uploads", formData, config);
      console.log(data);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <>
      <h2 style={{ margin: "5vh 0vw 5vh 0vw ", textAlign: "center" }}>
        Create Product
      </h2>
      {loading && <Loader />}
      {error && <Message message={error} />}
      {product.name && <Message message="Product created" bcolor="darkgreen" />}
      <div className="newproduct">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <div style={{ display: "flex", flexDirection: "column", width: "20%" }}>
          <input
            style={{ padding: "1rem 1rem" }}
            type="text"
            id="image-upload"
            placeholder={image || "Image"}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            label="Choose file"
            id="image-upload"
            type="file"
            placeholder="Image"
            onChange={uploadFileHandler}
          />
        </div>
        {uploading && <Loader />}
        <input
          type="text"
          placeholder="Brand"
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="CountInStock"
          onChange={(e) => setCountInStock(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="productScreen__back" style={{ marginRight: "4vw" }}>
          <button className="productScreen__back__link" onClick={submitHandler}>
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default NewProductScreen;
