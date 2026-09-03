import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = ["#AEB8FF", "#FFB79C", "#D9D9D9"];

export default function DonutChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب وتحضير بيانات الأكثر مبيعًا
  const getBestSellingProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:1337/api/order-items",
        {
          params: {
            "populate[product]": true,
            "populate[order]": true,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "ORDER ITEMS RAW:",
        JSON.stringify(res.data.data, null, 2)
      );

      const orderItems = res.data.data;

      const productSales = {};

      orderItems.forEach((item) => {
        console.log("CURRENT ITEM:", item);

        const product = item.product;
        const order = item.order;

        console.log("PRODUCT:", product);
        console.log("ORDER:", order);

        if (!product) {
          console.log("❌ NO PRODUCT");
          return;
        }

        if (!order) {
          console.log("❌ NO ORDER");
          return;
        }

        console.log("ORDER STATE:", order.state);

        if (order.state !== "مكتمل") {
          console.log("❌ ORDER NOT COMPLETED");
          return;
        }

        const productId = product.id;

        if (!productSales[productId]) {
          productSales[productId] = {
            id: productId,
            name: product.name,
            value: 0,
          };
        }

        productSales[productId].value += Number(item.quantity) || 0;
      });

      const bestSelling = Object.values(productSales)
        .sort((a, b) => b.value - a.value)
        .slice(0, 3)
        .map((item, index) => ({
          ...item,
          color: COLORS[index % COLORS.length],
        }));

      console.log("🔥 BEST SELLING:", bestSelling);

      setData(bestSelling);
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("ERROR:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBestSellingProducts();
  }, []);

  // إجمالي مبيعات المنتجات الظاهرة في الـ Donut
  const total = data.reduce(
    (acc, item) => acc + item.value,
    0
  );

  // نسبة المنتج الأول
  const percentage =
    total > 0
      ? Math.round((data[0].value / total) * 100)
      : 0;

  return (
    <div className="bg-[#181818] border border-gray-800 rounded-2xl p-6 h-[430px]">

      {/* Header */}
      <div className="text-right mb-6">
        <h2 className="text-white text-3xl font-bold">
          الأكثر مبيعًا
        </h2>
      </div>

      {loading ? (
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          جاري تحميل البيانات...
        </div>
      ) : data.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          لا توجد مبيعات مكتملة حتى الآن
        </div>
      ) : (
        <>
          {/* Donut */}
          <div className="relative h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={2}
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [
                    `${value} مبيعة`,
                    "المبيعات",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-5xl font-bold text-white">
                {percentage}%
              </span>

              <span className="text-gray-400 text-sm mt-1 text-center max-w-[120px]">
                {data[0]?.name}
              </span>
            </div>
          </div>

          {/* Products List */}
          <div className="mt-8 space-y-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between"
              >
                <span className="text-white font-bold">
                  {item.value} مبيعة
                </span>

                <div className="flex items-center gap-3">
                  <span className="text-gray-300 text-sm">
                    {item.name}
                  </span>

                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}