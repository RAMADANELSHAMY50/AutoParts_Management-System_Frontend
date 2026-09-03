import { Route, Routes } from "react-router-dom";

// auth
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";

// admin
import Products from "../pages/admin/Products.jsx";
import Dashborad from "../pages/admin/Dashborad.jsx";
import Categories from "../pages/admin/Categories.jsx";
import Customers from "../pages/admin/Customers.jsx";
import Pos from "../pages/admin/Pos.jsx";
import Invoices from "../pages/admin/Invoice.jsx";
import Reports from "../pages/admin/Reports.jsx";
import Settings from "../pages/admin/Settings.jsx";
import Notifications from "../pages/admin/Notifications.jsx";

// customers
import Home from "../pages/customers/Home";
import ProductDetails from "../pages/customers/ProductDetails";
import Cart from "../pages/customers/Cart";
import Checkout from "../pages/customers/Checkout";
import Orders from "../pages/customers/Orders";

import "../../src/App.css";
import Catalog from "../pages/customers/Catalog.jsx";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/products" element={<Products />} />
        <Route path="/dashboard" element={<Dashborad />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/sales" element={<Pos />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* customers */}

        <Route path="/home" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/myorder" element={<Orders />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}
