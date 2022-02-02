import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screens/Home";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import NotFound from "./Screens/NotFound";
import RegisterScreen from "./Screens/RegisterScreen";

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
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
