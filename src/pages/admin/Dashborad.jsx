import React, { useEffect, useState } from "react";
import StatCard from "../../components/admin/layout/StatCard";
import SalesChart from "../../components/admin/dashborad/SalesChart";
import DonutChart from "../../components/admin/dashborad/DonutChart";
import Header from "../../components/admin/dashborad/Header";
import Sidebar from "../../components/admin/layout/Sidebar";

import {
  FiPackage,
  FiShoppingCart,
  FiDollarSign,
  FiAlertTriangle,
} from "react-icons/fi";

import axios from "axios";

export default function Dashborad() {
  // =========================
  // States
  // =========================

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  const [loading, setLoading] = useState(true);

  // =========================
  // Mobile Sidebar
  // =========================

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // =========================
  // Get Products
  // =========================

  const getProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1337/api/products?populate=*"
      );

      setProducts(res.data.data || []);

      console.log("Products:", res.data.data);
    } catch (error) {
      console.log(
        "Products Error:",
        error.response?.data || error.message
      );
    }
  };

  // =========================
  // Get Orders
  // =========================

  const getOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1337/api/orders?populate=*"
      );

      setOrders(res.data.data || []);

      console.log("Orders:", res.data.data);
    } catch (error) {
      console.log(
        "Orders Error:",
        error.response?.data || error.message
      );
    }
  };

  // =========================
  // Get Order Items
  // =========================

  const getOrderItems = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1337/api/order-items?populate=*"
      );

      setOrderItems(res.data.data || []);

      console.log("Order Items:", res.data.data);
    } catch (error) {
      console.log(
        "Order Items Error:",
        error.response?.data || error.message
      );
    }
  };

  // =========================
  // Fetch All Data
  // =========================

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);

      await Promise.all([
        getProducts(),
        getOrders(),
        getOrderItems(),
      ]);

      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  // =========================
  // Date Helpers
  // =========================

  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const previousMonthDate = new Date(
    currentYear,
    currentMonth - 1,
    1
  );

  const previousMonth = previousMonthDate.getMonth();
  const previousMonthYear =
    previousMonthDate.getFullYear();

  // =========================
  // Check Completed Order
  // =========================

  const isCompletedOrder = (order) => {
    return (
      order?.State === "مكتمل" ||
      order?.state === "مكتمل" ||
      order?.attributes?.State === "مكتمل" ||
      order?.attributes?.state === "مكتمل"
    );
  };

  // =========================
  // Get Order Date
  // =========================

  const getOrderDate = (order) => {
    return new Date(
      order?.createdAt ||
        order?.attributes?.createdAt
    );
  };

  // =========================
  // Current Month Orders
  // =========================

  const currentMonthOrders = orders.filter((order) => {
    const date = getOrderDate(order);

    return (
      isCompletedOrder(order) &&
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  });

  // =========================
  // Previous Month Orders
  // =========================

  const previousMonthOrders = orders.filter((order) => {
    const date = getOrderDate(order);

    return (
      isCompletedOrder(order) &&
      date.getMonth() === previousMonth &&
      date.getFullYear() === previousMonthYear
    );
  });

  // =========================
  // Helper: Get Value
  // =========================

  const getValue = (object, field) => {
    return Number(
      object?.[field] ??
        object?.attributes?.[field] ??
        0
    );
  };

  // =========================
  // Total Products
  // =========================

  const totalProduct = products.length;

  // =========================
  // Low Stock Products
  // =========================

  const lowStockProducts = products.filter((product) => {
    const stock = getValue(product, "stock");
    const minimumStock = getValue(
      product,
      "minimumStock"
    );

    return stock <= minimumStock;
  });

  const lowStockCount = lowStockProducts.length;

  // =========================
  // Current Month Sales
  // =========================

  const currentMonthSales = currentMonthOrders.reduce(
    (total, order) => {
      return total + getValue(order, "total");
    },
    0
  );

  // =========================
  // Previous Month Sales
  // =========================

  const previousMonthSales =
    previousMonthOrders.reduce(
      (total, order) => {
        return total + getValue(order, "total");
      },
      0
    );

  // =========================
  // Sales Growth
  // =========================

  const salesGrowth =
    previousMonthSales === 0
      ? currentMonthSales > 0
        ? 100
        : 0
      : ((currentMonthSales - previousMonthSales) /
          previousMonthSales) *
        100;

  // =========================
  // Get Product From Order Item
  // =========================

  const getProductFromOrderItem = (item) => {
    return (
      item?.product ||
      item?.attributes?.product ||
      null
    );
  };

  // =========================
  // Current Month Profit
  // =========================

  const currentMonthProfit = orderItems.reduce(
    (profit, item) => {
      const order =
        item?.order ||
        item?.attributes?.order ||
        null;

      if (!order) return profit;

      const orderDate = getOrderDate(order);

      if (
        !isCompletedOrder(order) ||
        orderDate.getMonth() !== currentMonth ||
        orderDate.getFullYear() !== currentYear
      ) {
        return profit;
      }

      const product =
        getProductFromOrderItem(item);

      const quantity = getValue(item, "quantity");
      const salePrice = getValue(item, "price");
      const costPrice = getValue(
        product,
        "costPrice"
      );

      const itemProfit =
        (salePrice - costPrice) * quantity;

      return profit + itemProfit;
    },
    0
  );

  // =========================
  // Previous Month Profit
  // =========================

  const previousMonthProfit = orderItems.reduce(
    (profit, item) => {
      const order =
        item?.order ||
        item?.attributes?.order ||
        null;

      if (!order) return profit;

      const orderDate = getOrderDate(order);

      if (
        !isCompletedOrder(order) ||
        orderDate.getMonth() !== previousMonth ||
        orderDate.getFullYear() !== previousMonthYear
      ) {
        return profit;
      }

      const product =
        getProductFromOrderItem(item);

      const quantity = getValue(item, "quantity");
      const salePrice = getValue(item, "price");
      const costPrice = getValue(
        product,
        "costPrice"
      );

      const itemProfit =
        (salePrice - costPrice) * quantity;

      return profit + itemProfit;
    },
    0
  );

  // =========================
  // Profit Growth
  // =========================

  const profitGrowth =
    previousMonthProfit === 0
      ? currentMonthProfit > 0
        ? 100
        : 0
      : ((currentMonthProfit -
          previousMonthProfit) /
          previousMonthProfit) *
        100;

  // =========================
  // Product Growth
  // =========================

  const currentMonthProducts = products.filter(
    (product) => {
      const date = new Date(
        product?.createdAt ||
          product?.attributes?.createdAt
      );

      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    }
  ).length;

  const previousMonthProducts = products.filter(
    (product) => {
      const date = new Date(
        product?.createdAt ||
          product?.attributes?.createdAt
      );

      return (
        date.getMonth() === previousMonth &&
        date.getFullYear() === previousMonthYear
      );
    }
  ).length;

  const productGrowth =
    previousMonthProducts === 0
      ? currentMonthProducts > 0
        ? 100
        : 0
      : ((currentMonthProducts -
          previousMonthProducts) /
          previousMonthProducts) *
        100;

  // =========================
  // Format Number
  // =========================

  const formatNumber = (number) => {
    return new Intl.NumberFormat("ar-EG").format(
      Math.round(number)
    );
  };

  // =========================
  // Stat Cards
  // =========================

  const statCardDashborad = [
    {
      icons: <FiPackage />,
      Name: "إجمالي المنتجات",

      value: loading
        ? "..."
        : formatNumber(totalProduct),

      percentage:
        productGrowth >= 0
          ? `+${productGrowth.toFixed(1)}%`
          : `${productGrowth.toFixed(1)}%`,

      description: "عن الشهر الماضي",

      color: "text-blue-500",
      bg: "bg-blue-500/20",
    },

    {
      icons: <FiShoppingCart />,
      Name: "إجمالي المبيعات",

      value: loading
        ? "..."
        : formatNumber(currentMonthSales),

      percentage:
        salesGrowth >= 0
          ? `+${salesGrowth.toFixed(1)}%`
          : `${salesGrowth.toFixed(1)}%`,

      description: "عن الشهر الماضي",

      color: "text-orange-500",
      bg: "bg-orange-500/20",
    },

    {
      icons: <FiDollarSign />,
      Name: "أرباح الشهر",

      value: loading
        ? "..."
        : formatNumber(currentMonthProfit),

      percentage:
        profitGrowth >= 0
          ? `+${profitGrowth.toFixed(1)}%`
          : `${profitGrowth.toFixed(1)}%`,

      description: "عن الشهر الماضي",

      color: "text-green-500",
      bg: "bg-green-500/20",
    },

    {
      icons: <FiAlertTriangle />,
      Name: "منتجات منخفضة المخزون",

      value: loading
        ? "..."
        : formatNumber(lowStockCount),

      percentage: "تنبيه",

      description: "تحتاج إلى إعادة التزويد",

      color: "text-red-500",
      bg: "bg-red-500/20",
    },
  ];

  // =========================
  // Debug
  // =========================

  console.log("========== DASHBOARD ==========");
  console.log("Total Products:", totalProduct);
  console.log("Low Stock:", lowStockCount);
  console.log(
    "Current Month Sales:",
    currentMonthSales
  );
  console.log(
    "Previous Month Sales:",
    previousMonthSales
  );
  console.log("Sales Growth:", salesGrowth);
  console.log(
    "Current Month Profit:",
    currentMonthProfit
  );
  console.log(
    "Previous Month Profit:",
    previousMonthProfit
  );
  console.log("Profit Growth:", profitGrowth);
  console.log("================================");

  // =========================
  // JSX
  // =========================

  return (
    <div
      dir="rtl"
      className="flex min-h-screen w-full overflow-x-hidden bg-black"
    >
      {/* ==========================================
          Sidebar
      ========================================== */}

      <Sidebar
        isMobileOpen={isSidebarOpen}
        setIsMobileOpen={setIsSidebarOpen}
      />

      {/* ==========================================
          Main Content
      ========================================== */}

      <main className="min-w-0 flex-1 p-2 sm:p-4 lg:p-5">
        <div className="w-full min-w-0 space-y-4 sm:space-y-5 lg:space-y-6">

          {/* ==========================================
              Header
          ========================================== */}

          <Header
            onMenuClick={() => setIsSidebarOpen(true)}
          />

          {/* ==========================================
              Statistics
          ========================================== */}

          <section className="w-full min-w-0">
            <StatCard
              status={statCardDashborad}
            />
          </section>

          {/* ==========================================
              Charts
          ========================================== */}

          <section
            className="
              grid
              w-full
              min-w-0
              grid-cols-1
              gap-4
              sm:gap-5
              lg:grid-cols-12
              lg:gap-6
            "
          >
            {/* Sales Chart */}

            <div
              className="
                min-w-0
                w-full
                lg:col-span-8
              "
            >
              <SalesChart />
            </div>

            {/* Donut Chart */}

            <div
              className="
                min-w-0
                w-full
                lg:col-span-4
              "
            >
              <DonutChart />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}