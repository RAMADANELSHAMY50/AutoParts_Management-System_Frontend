import { FiArrowUpRight } from "react-icons/fi";

const sales = [
  {
    id: 1,
    customer: "محمد أحمد",
    product: "LED Headlights",
    amount: "1,250 ر.س",
    time: "منذ 5 دقائق",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    customer: "أحمد علي",
    product: "Sport Steering Wheel",
    amount: "890 ر.س",
    time: "منذ 15 دقيقة",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    customer: "سارة محمد",
    product: "Car Cover",
    amount: "620 ر.س",
    time: "منذ 30 دقيقة",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    customer: "خالد حسن",
    product: "Android Screen",
    amount: "2,300 ر.س",
    time: "منذ ساعة",
    image: "https://i.pravatar.cc/150?img=4",
  },
];

export default function RecentSales() {
  return (
    <div className="bg-[#181818] border border-gray-800 rounded-2xl p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <button className="text-blue-400 hover:text-blue-300 transition text-sm">
          عرض الكل
        </button>

        <div className="text-right">
          <h2 className="text-white text-2xl font-bold">
            أحدث المبيعات
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            آخر العمليات التي تمت اليوم
          </p>
        </div>

      </div>

      {/* Sales */}
      <div className="space-y-5">

        {sales.map((sale) => (
          <div
            key={sale.id}
            className="flex items-center justify-between border-b border-gray-800 pb-4 last:border-none"
          >

            {/* Price */}
            <div className="text-left">
              <h4 className="text-green-400 font-bold">
                {sale.amount}
              </h4>

              <p className="text-gray-500 text-xs">
                {sale.time}
              </p>
            </div>

            {/* Customer */}
            <div className="flex items-center gap-3">

              <div className="text-right">
                <h3 className="text-white font-semibold">
                  {sale.customer}
                </h3>

                <p className="text-gray-400 text-sm">
                  {sale.product}
                </p>
              </div>

              <img
                src={sale.image}
                alt={sale.customer}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>

          </div>
        ))}

      </div>

      {/* Footer */}
      <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 text-white font-semibold flex items-center justify-center gap-2">
        <FiArrowUpRight />
        عرض تقرير المبيعات
      </button>

    </div>
  );
}