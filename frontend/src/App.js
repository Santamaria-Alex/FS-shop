import React from "react";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import { Container } from "react-bootstrap";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

function App() {
  return (
    <Router>
      <Header />
      <Container className="py-3">
        <Routes>
          <Route path="order/:id" element={<OrderScreen />} />
          <Route path="login/shipping" element={<ShippingScreen />} />
          <Route path="payment" element={<PaymentScreen />} />
          <Route path="placeorder" element={<PlaceOrderScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="profile" element={<ProfileScreen />} />
          <Route path="product/:id" element={<ProductScreen />} />
          <Route path="cart" element={<CartScreen />} />
          <Route path="cart/:id" element={<CartScreen />} />
          <Route path="admin/userlist" element={<UserListScreen />} />
          <Route path="admin/user/:id/edit" element={<UserEditScreen />} />
          <Route
            path="admin/productlist"
            element={<ProductListScreen />}
            exact
          />
          <Route
            path="admin/productlist/:pageNumber"
            element={<ProductListScreen />}
            exact
          />
          <Route
            path="admin/product/:id/edit"
            element={<ProductEditScreen />}
          />
          <Route path="admin/orderlist" element={<OrderListScreen />} />
          <Route path="/search/:search" element={<HomeScreen />} exact />
          <Route path="/page/:pageNumber" element={<HomeScreen />} />
          <Route
            path="/search/:search/page/:pageNumber"
            element={<HomeScreen />}
          />
          <Route path="/" index element={<HomeScreen />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
