import React from "react";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path="product/:id" element={<ProductScreen />} />
        <Route path="cart" element={<CartScreen />} />
        <Route path="cart/:id" element={<CartScreen />} />
        <Route path="/" index element={<HomeScreen />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
