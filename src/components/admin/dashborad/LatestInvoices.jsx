import { FiEye } from "react-icons/fi";

const invoices = [
  {
    id: "#INV-1001",
    customer: "محمد أحمد",
    date: "20 يوليو 2026",
    amount: "2,450 ر.س",
    status: "مدفوعة",
  },
  {
    id: "#INV-1002",
    customer: "أحمد علي",
    date: "19 يوليو 2026",
    amount: "1,180 ر.س",
    status: "قيد الانتظار",
  },
  {
    id: "#INV-1003",
    customer: "سارة محمد",
    date: "18 يوليو 2026",
    amount: "850 ر.س",
    status: "مدفوعة",
  },
  {
    id: "#INV-1004",
    customer: "خالد حسن",
    date: "17 يوليو 2026",
    amount: "3,620 ر.س",
    status: "ملغاة",
  },
];

export default function LatestInvoices() {
  return (
    <div className="bg-[#181818] border border-gray-800 rounded-2xl p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button className="text-blue-400 hover:text-blue-300 text-sm transition">
          عرض الكل
        </button>

        <div className="text-right">
          <h2 className="text-2xl font-bold text-white">
            آخر الفواتير
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            أحدث الفواتير الصادرة
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full text-right">

          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-sm">
              <th className="py-3">رقم الفاتورة</th>
              <th>العميل</th>
              <th>التاريخ</th>
              <th>المبلغ</th>
              <th>الحالة</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-gray-800 hover:bg-[#222] transition"
              >
                <td className="py-4 text-white">{invoice.id}</td>

                <td className="text-gray-300">
                  {invoice.customer}
                </td>

                <td className="text-gray-400">
                  {invoice.date}
                </td>

                <td className="text-blue-400 font-semibold">
                  {invoice.amount}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      invoice.status === "مدفوعة"
                        ? "bg-green-500/20 text-green-400"
                        : invoice.status === "قيد الانتظار"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>

                <td>
                  <button className="text-gray-400 hover:text-blue-400 transition">
                    <FiEye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}