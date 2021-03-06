import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screens/Home";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import NotFound from "./Screens/NotFound";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import OrderScreen from "./Screens/OrderScreen";
import UserListScreen from "./Screens/UserListScreen";
import OrderByUser from "./Screens/OrderByUser";
import ProductListScreen from "./Screens/ProductListScreen";
import NewProductScreen from "./Screens/NewProductScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/products/:id" element={<ProductScreen />} />
          <Route path="/cart/">
            <Route path=":id" element={<CartScreen />} />
            <Route path="" element={<CartScreen />} />
          </Route>
          <Route path="/login" element={<LoginScreen />} />

          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/order" element={<OrderScreen />} />
          <Route path="/order/:id" element={<OrderByUser />} />
          <Route path="/userlist" element={<UserListScreen />} />

          <Route path="/changeproducts" element={<ProductListScreen />} />
          <Route
            path="/changeproducts/:pageNumber"
            element={<ProductListScreen />}
          />

          <Route path="/addproduct" element={<NewProductScreen />} />

          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/page/:pageNumber" element={<Home />} />
          <Route path="/search/:keyword/page/:pageNumber" element={<Home />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
