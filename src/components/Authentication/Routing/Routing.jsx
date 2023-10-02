import React from "react";
import { Routes, Route } from "react-router-dom";

import ProductsPage from "./../../Products/ProductsPage";
import SingleProductPage from "./../../SingleProduct/SingleProductPage";
import CartPage from "./../../Cart/CartPage";
import MyOrderPage from "./../../MyOrder/MyOrderPage";
import LoginPage from "./../../Authentication/LoginPage";
import SignUpPage from "./../../Authentication/SignUpPage";
import HomePage from "./../../Home/HomePage";
import Logout from "../Logout";

import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/myorders" element={<MyOrderPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  );
};

export default Routing;
