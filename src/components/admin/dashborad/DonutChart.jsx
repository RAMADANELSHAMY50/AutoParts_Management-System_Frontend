import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const API_URL = "http://localhost:1337";

const COLORS = ["#AEB8FF", "#FFB79C", "#D9D9D9"];

export default function DonutChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Fetch Top Selling Products
  // ==========================================
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/api/order-items?populate[product]=true&populate[order]=true&pagination[pageSize]=1000`,
          {
            headers: token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {},
          }
        );

        const orderItems = response.data?.data || [];

        // ==========================================
        // Get only completed orders
        // ==========================================
        const completedItems = orderItems.filter((item) => {
          const order = item.order;

          if (!order) return false;

          const orderData = order.attributes || order;

          return orderData.State === "مكتمل";
        });

        // ==========================================
        // Calculate quantity for each product
        // ==========================================
        const productSales = {};

        completedItems.forEach((item) => {
          const product = item.product;

          if (!product) return;

          const productData = product.attributes || product;

          const productName =
            productData.name ||
            productData.title ||
            "منتج بدون اسم";

          const quantity = Number(item.quantity || 1);

          if (!productSales[productName]) {
            productSales[productName] = 0;
          }

          productSales[productName] += quantity;
        });

        // ==========================================
        // Sort products by sales
        // ==========================================
        const sortedProducts = Object.entries(productSales)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3);

        // ==========================================
        // Convert to chart data
        // ==========================================
        const chartData = sortedProducts.map(([name, value]) => ({
          name,
          value,
        }));

        setData(chartData);
      } catch (error) {
        console.error(
          "GET TOP PRODUCTS ERROR:",
          error.response?.data || error.message
        );

        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  // ==========================================
  // Loading
  // ==========================================
  if (loading) {
    return (
      <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-gray-800 bg-[#181818] p-4 sm:p-5 lg:p-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
          الأكثر مبيعًا
        </h2>

        <div className="flex h-[300px] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500" />
        </div>
      </div>
    );
  }

  // ==========================================
  // Empty Data
  // ==========================================
  if (!data.length) {
    return (
      <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-gray-800 bg-[#181818] p-4 sm:p-5 lg:p-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
          الأكثر مبيعًا
        </h2>

        <div className="flex h-[300px] items-center justify-center">
          <p className="text-sm text-gray-500 sm:text-base">
            لا توجد بيانات مبيعات حتى الآن
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // Total Sales Quantity
  // ==========================================
  const totalSales = data.reduce((total, item) => total + item.value, 0);

  const firstProduct = data[0];

  const percentage =
    totalSales > 0
      ? Math.round((firstProduct.value / totalSales) * 100)
      : 0;

  return (
    <div
      dir="rtl"
      className="w-full min-w-0 overflow-hidden rounded-2xl border border-gray-800 bg-[#181818] p-3 sm:p-4 lg:p-6 lg:h-[430px]"
    >
      {/* ==========================================
          Header
      ========================================== */}
      <div className="mb-2 flex items-center justify-between sm:mb-3">
        <h2 className="min-w-0 truncate text-xl font-bold text-white sm:text-2xl lg:text-3xl">
          الأكثر مبيعًا
        </h2>
      </div>

      {/* ==========================================
          Donut Chart
      ========================================== */}
      <div className="relative h-[190px] w-full sm:h-[210px] lg:h-[225px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="75%"
              paddingAngle={2}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#202020",
                border: "1px solid #374151",
                borderRadius: "10px",
                color: "#fff",
                direction: "rtl",
              }}
              itemStyle={{
                color: "#fff",
              }}
              formatter={(value) => [`${value}`, "الكمية"]}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* ==========================================
            Center Text
        ========================================== */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white sm:text-4xl">
            {percentage}%
          </span>

          <span className="mt-1 max-w-[120px] truncate text-center text-xs text-gray-400 sm:max-w-[150px] sm:text-sm">
            {firstProduct.name}
          </span>
        </div>
      </div>

      {/* ==========================================
          Products Legend
      ========================================== */}
      <div className="mt-3 space-y-2 sm:mt-4">
        {data.map((item, index) => {
          const itemPercentage =
            totalSales > 0
              ? Math.round((item.value / totalSales) * 100)
              : 0;

          return (
            <div
              key={`${item.name}-${index}`}
              className="flex min-w-0 items-center justify-between gap-2 rounded-lg px-1 py-1"
            >
              {/* Product */}
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />

                <span className="truncate text-xs text-gray-300 sm:text-sm">
                  {item.name}
                </span>
              </div>

              {/* Percentage */}
              <span className="shrink-0 text-xs font-semibold text-white sm:text-sm">
                {itemPercentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}