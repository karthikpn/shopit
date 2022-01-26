import React, { useEffect, useState } from "react";
import Product from "../Components/Product.jsx";
import "../views/home.css";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      console.log(data);
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <div className="home">
      <div className="home__products">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
