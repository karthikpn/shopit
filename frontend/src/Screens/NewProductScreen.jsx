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
    console.log(countInStock);
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
      {error ? (
        <Message message={error} />
      ) : (
        product.name && <Message message="Product created" bcolor="darkgreen" />
      )}
      <form className="newproduct">
        <input
          className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          placeholder="Name"
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          placeholder="Price"
          required
          onChange={(e) => setPrice(e.target.value)}
        />
        <div style={{ display: "flex", flexDirection: "column", width: "20%" }}>
          <input
            style={{ padding: "1rem 1rem" }}
            className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            type="text"
            id="image-upload"
            required
            placeholder={image || "Image"}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            label="Choose file"
            id="image-upload"
            type="file"
            required
            placeholder="Image"
            onChange={uploadFileHandler}
          />
        </div>
        {uploading && <Loader />}
        <input
          type="text"
          placeholder="Brand"
          className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          required
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          placeholder="Category"
          required
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="CountInStock"
          className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          required
          onChange={(e) => setCountInStock(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          required
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="productScreen__back__link"
          type="submit"
          onClick={submitHandler}
        >
          Create
        </button>
      </form>
    </>
  );
};

export default NewProductScreen;
