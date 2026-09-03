import {
  MdEdit,
  MdDelete,
  MdVisibility,
} from "react-icons/md";

const statusStyle = {
  "نشط": "bg-green-500/20 text-green-400",
  "قليل": "bg-yellow-500/20 text-yellow-400",
  "منتهي": "bg-red-500/20 text-red-400",
};

export default function ActivityTable({ categories = [] }) {
  return (
    <div className="mt-10 bg-[#141414] border border-white/10 rounded-3xl overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div>
          <h2 className="text-2xl font-bold text-white">
            نشاط التصنيفات
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            آخر التعديلات على التصنيفات
          </p>
        </div>

        <button className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white">
          عرض الكل
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-right">

          <thead className="bg-[#1A1A1A]">
            <tr className="text-gray-400 text-sm">

              <th className="px-6 py-4">
                التصنيف
              </th>

              <th className="px-6 py-4">
                عدد المنتجات
              </th>

              <th className="px-6 py-4">
                المسؤول
              </th>

              <th className="px-6 py-4">
                آخر تحديث
              </th>

              <th className="px-6 py-4">
                الحالة
              </th>

              <th className="px-6 py-4 text-center">
                الإجراءات
              </th>

            </tr>
          </thead>

          <tbody>

            {categories.map((category) => {

              const managerName =
                category.manager?.username || "غير محدد";

              return (
                <tr
                  key={category.documentId}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >

                  {/* Category */}
                  <td className="px-6 py-5 text-white font-medium">
                    {category.name}
                  </td>

                  {/* Products */}
                  <td className="px-6 py-5 text-gray-300">
                    {category.products?.length || 0}
                  </td>

                  {/* Manager */}
                  <td className="px-6 py-5 text-gray-300">
                    {managerName}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-gray-400">
                    {category.updatedAt
                      ? new Date(category.updatedAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "غير محدد"}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusStyle["نشط"]
                      }`}
                    >
                      نشط
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-3">

                      <button
                        className="w-10 h-10 rounded-xl bg-[#1E1E1E] hover:bg-blue-600 transition flex items-center justify-center"
                      >
                        <MdVisibility className="text-white text-xl" />
                      </button>

                      <button
                        className="w-10 h-10 rounded-xl bg-[#1E1E1E] hover:bg-green-600 transition flex items-center justify-center"
                      >
                        <MdEdit className="text-white text-xl" />
                      </button>

                      <button
                        className="w-10 h-10 rounded-xl bg-[#1E1E1E] hover:bg-red-600 transition flex items-center justify-center"
                      >
                        <MdDelete className="text-white text-xl" />
                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>
      </div>
    </div>
  );
}