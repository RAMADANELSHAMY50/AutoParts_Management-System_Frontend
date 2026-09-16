import React, {
  useEffect,
  useState,
} from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import axios from "axios";

const months = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

export default function SalesChart() {
  const [orders, setOrders] = useState([]);
  const [view, setView] =
    useState("monthly");
  const [loading, setLoading] =
    useState(true);

  // =========================
  // Get Orders
  // =========================

  const getOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1337/api/orders?pagination[pageSize]=1000"
      );

      const data = res.data?.data || [];

      setOrders(data);

      console.log(
        "📊 Sales Chart Orders:",
        data
      );
    } catch (error) {
      console.log(
        "❌ Sales Chart Error:",
        error.response?.data ||
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // =========================
  // Completed Orders
  // =========================

  const completedOrders =
    orders.filter(
      (order) =>
        order?.State === "مكتمل" ||
        order?.state === "مكتمل" ||
        order?.attributes?.State ===
          "مكتمل" ||
        order?.attributes?.state ===
          "مكتمل"
    );

  // =========================
  // Current Year
  // =========================

  const currentYear =
    new Date().getFullYear();

  // =========================
  // Monthly Data
  // =========================

  const monthlyData = months.map(
    (month, index) => {
      const monthSales =
        completedOrders
          .filter((order) => {
            const date = new Date(
              order.createdAt
            );

            return (
              date.getFullYear() ===
                currentYear &&
              date.getMonth() === index
            );
          })
          .reduce((total, order) => {
            return (
              total +
              Number(
                order.subtotal || 0
              )
            );
          }, 0);

      return {
        month,
        sales: monthSales,
      };
    }
  );

  // =========================
  // Yearly Data
  // =========================

  const years = [
    ...new Set(
      completedOrders.map(
        (order) =>
          new Date(
            order.createdAt
          ).getFullYear()
      )
    ),
  ].sort();

  const yearlyData = years.map(
    (year) => {
      const sales =
        completedOrders
          .filter((order) => {
            const date = new Date(
              order.createdAt
            );

            return (
              date.getFullYear() ===
              year
            );
          })
          .reduce((total, order) => {
            return (
              total +
              Number(
                order.subtotal || 0
              )
            );
          }, 0);

      return {
        month: year.toString(),
        sales,
      };
    }
  );

  // =========================
  // Chart Data
  // =========================

  const chartData =
    view === "monthly"
      ? monthlyData
      : yearlyData;

  // =========================
  // Format Number
  // =========================

  const formatNumber = (value) => {
    return new Intl.NumberFormat(
      "ar-EG"
    ).format(value);
  };

  // =========================
  // Total Sales
  // =========================

  const totalSales =
    completedOrders.reduce(
      (total, order) => {
        return (
          total +
          Number(
            order.subtotal || 0
          )
        );
      },
      0
    );

  // =========================
  // JSX
  // =========================

  return (
    <div className="
      w-full
      min-w-0
      overflow-hidden
      rounded-2xl
      border
      border-gray-800
      bg-[#181818]
      p-3
      sm:p-4
      lg:p-6
      min-h-[390px]
      sm:min-h-[410px]
      lg:h-[430px]
    ">

      {/* Header */}

      <div className="
        mb-4
        flex
        flex-col
        gap-3
        sm:mb-6
        sm:flex-row
        sm:items-start
        sm:justify-between
        lg:mb-8
      ">

        {/* Buttons */}

        <div className="
          order-2
          flex
          w-full
          gap-2
          sm:order-1
          sm:w-auto
        ">

          <button
            onClick={() =>
              setView("monthly")
            }
            className={`
              flex-1
              rounded-xl
              px-3
              py-2
              text-xs
              font-medium
              transition
              sm:flex-none
              sm:px-4
              sm:text-sm
              lg:px-5
              ${
                view === "monthly"
                  ? "bg-indigo-300 text-black"
                  : "bg-[#262626] text-gray-300 hover:bg-[#333]"
              }
            `}
          >
            شهري
          </button>

          <button
            onClick={() =>
              setView("yearly")
            }
            className={`
              flex-1
              rounded-xl
              px-3
              py-2
              text-xs
              font-medium
              transition
              sm:flex-none
              sm:px-4
              sm:text-sm
              lg:px-5
              ${
                view === "yearly"
                  ? "bg-indigo-300 text-black"
                  : "bg-[#262626] text-gray-300 hover:bg-[#333]"
              }
            `}
          >
            سنوي
          </button>

        </div>

        {/* Title */}

        <div className="
          order-1
          min-w-0
          text-right
          sm:order-2
        ">

          <h2 className="
            break-words
            text-xl
            font-bold
            leading-tight
            text-white
            sm:text-2xl
            lg:text-3xl
          ">
            {view === "monthly"
              ? "تحليلات المبيعات الشهرية"
              : "تحليلات المبيعات السنوية"}
          </h2>

          <p className="
            mt-1
            text-xs
            leading-relaxed
            text-gray-400
            sm:mt-2
            sm:text-sm
          ">
            {view === "monthly"
              ? `أداء المبيعات خلال عام ${currentYear}`
              : "مقارنة إجمالي المبيعات حسب السنة"}
          </p>

        </div>
      </div>

      {/* Total */}

      <div className="
        mb-3
        text-right
      ">
        <span className="
          text-xs
          text-gray-400
          sm:text-sm
        ">
          إجمالي المبيعات
        </span>

        <span className="
          mr-1
          text-base
          font-bold
          text-white
          sm:mr-2
          sm:text-lg
        ">
          {formatNumber(totalSales)}
        </span>
      </div>

      {/* Chart */}

      <div className="
        h-[235px]
        w-full
        min-w-0
        sm:h-[250px]
        lg:h-[265px]
      ">
        {loading ? (
          <div className="
            flex
            h-full
            items-center
            justify-center
            text-sm
            text-gray-400
          ">
            جاري تحميل البيانات...
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={chartData}
              barGap={8}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid
                stroke="#2d2d2d"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{
                  fill: "#888",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
                interval={
                  view === "monthly"
                    ? 0
                    : "preserveStartEnd"
                }
                tickMargin={8}
              />

              <Tooltip
                cursor={{
                  fill: "#222",
                }}
                formatter={(value) => [
                  `${formatNumber(value)}`,
                  "المبيعات",
                ]}
                contentStyle={{
                  background:
                    "#1F1F1F",
                  border:
                    "1px solid #333",
                  borderRadius:
                    "12px",
                  color: "#fff",
                }}
              />

              <Bar
                dataKey="sales"
                fill="#9FA8FF"
                radius={[
                  8,
                  8,
                  0,
                  0,
                ]}
                maxBarSize={42}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}