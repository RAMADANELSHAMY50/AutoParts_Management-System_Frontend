
import { Route, Routes } from "react-router-dom";

import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

// ==========================================
// Admin Pages
// ==========================================
import Products from "../pages/admin/Products.jsx";
import Dashborad from "../pages/admin/Dashborad.jsx";
import Categories from "../pages/admin/Categories.jsx";
import Customers from "../pages/admin/Customers.jsx";
import Pos from "../pages/admin/Pos.jsx";
import Invoices from "../pages/admin/Invoice.jsx";
import Settings from "../pages/admin/Settings.jsx";
import Notifications from "../pages/admin/Notifications.jsx";
import AdminSupport from "../pages/admin/Support.jsx";

// ==========================================
// Customer Pages
// ==========================================
import Home from "../pages/customers/Home";
import ProductDetails from "../pages/customers/ProductDetails";
import Cart from "../pages/customers/Cart";
import Checkout from "../pages/customers/Checkout";
import Orders from "../pages/customers/Orders";
import OrderTracking from "../pages/customers/OrderTracking.jsx";
import Catalog from "../pages/customers/Catalog.jsx";
import NotificationCustomer from "../pages/customers/NotificationCustomer.jsx";
import CustomerSettings from "../pages/customers/CustomerSettings.jsx";
import CustomerSupport from "../pages/customers/ٍSupport.jsx";

import "../../src/App.css";

export default function AppRouter() {
  return (
    <Routes>

      {/* ======================================
          PUBLIC ROUTES
      ====================================== */}

      <Route
        path="/"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      {/* ======================================
          ADMIN ROUTES
      ====================================== */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={["admin"]}
          />
        }
      >
        <Route
          path="/dashboard"
          element={<Dashborad />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/customers"
          element={<Customers />}
        />

        <Route
          path="/sales"
          element={<Pos />}
        />

        <Route
          path="/invoices"
          element={<Invoices />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/admin/support"
          element={<AdminSupport />}
        />
      </Route>

      {/* ======================================
          CUSTOMER ROUTES
      ====================================== */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={["customer"]}
          />
        }
      >
        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/catalog"
          element={<Catalog />}
        />

        <Route
          path="/myorder"
          element={<Orders />}
        />

        <Route
          path="/myorder/:orderId"
          element={<OrderTracking />}
        />

        <Route
          path="/productdetails/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/customer/notifications"
          element={<NotificationCustomer />}
        />

        <Route
          path="/customer/settings"
          element={<CustomerSettings />}
        />

        <Route
          path="/support"
          element={<CustomerSupport />}
        />
      </Route>

    </Routes>
  );
}

