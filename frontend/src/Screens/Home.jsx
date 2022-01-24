import React from "react";
import Product from "../Components/Product.jsx";
import products from "../products.js";
import "../views/home.css";

const Home = () => {
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
