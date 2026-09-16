import {
  MdEdit,
  MdDelete,
  MdVisibility,
} from "react-icons/md";

const statusStyle = {
  نشط: "bg-green-500/20 text-green-400",
  قليل: "bg-yellow-500/20 text-yellow-400",
  منتهي: "bg-red-500/20 text-red-400",
};

export default function ActivityTable({
  categories = [],
}) {
  return (
    <div
      className="
        mt-6
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#141414]
        sm:mt-8
        sm:rounded-3xl
        lg:mt-10
      "
    >
      {/* ==========================================
          Header
      ========================================== */}
      <div
        className="
          flex
          flex-col
          gap-3
          border-b
          border-white/10
          p-4
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:p-5
          lg:p-6
        "
      >
        <div className="min-w-0">
          <h2
            className="
              text-lg
              font-bold
              text-white
              sm:text-xl
              lg:text-2xl
            "
          >
            نشاط التصنيفات
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-gray-400
              sm:text-sm
            "
          >
            آخر التعديلات على التصنيفات
          </p>
        </div>

        <button
          type="button"
          className="
            w-full
            rounded-xl
            bg-blue-600
            px-4
            py-2
            text-sm
            text-white
            transition
            hover:bg-blue-700
            sm:w-auto
            sm:px-5
            sm:py-2
          "
        >
          عرض الكل
        </button>
      </div>

      {/* ==========================================
          Table
      ========================================== */}
      <div className="w-full overflow-x-auto">
        <table
          className="
            min-w-[760px]
            w-full
            text-right
          "
        >
          {/* Header */}
          <thead className="bg-[#1A1A1A]">
            <tr className="text-xs text-gray-400 sm:text-sm">
              <th className="px-4 py-3 sm:px-6 sm:py-4">
                التصنيف
              </th>

              <th className="px-4 py-3 sm:px-6 sm:py-4">
                عدد المنتجات
              </th>

              <th className="px-4 py-3 sm:px-6 sm:py-4">
                المسؤول
              </th>

              <th className="px-4 py-3 sm:px-6 sm:py-4">
                آخر تحديث
              </th>

              <th className="px-4 py-3 sm:px-6 sm:py-4">
                الحالة
              </th>

              <th className="px-4 py-3 text-center sm:px-6 sm:py-4">
                الإجراءات
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => {
                const managerName =
                  category.manager?.username ||
                  "غير محدد";

                return (
                  <tr
                    key={
                      category.documentId ||
                      category.id
                    }
                    className="
                      border-b
                      border-white/5
                      transition
                      hover:bg-white/5
                    "
                  >
                    {/* Category */}
                    <td
                      className="
                        px-4
                        py-4
                        text-sm
                        font-medium
                        text-white
                        sm:px-6
                        sm:py-5
                      "
                    >
                      {category.name ||
                        "غير محدد"}
                    </td>

                    {/* Products */}
                    <td
                      className="
                        px-4
                        py-4
                        text-sm
                        text-gray-300
                        sm:px-6
                        sm:py-5
                      "
                    >
                      {category.products
                        ?.length || 0}
                    </td>

                    {/* Manager */}
                    <td
                      className="
                        px-4
                        py-4
                        text-sm
                        text-gray-300
                        sm:px-6
                        sm:py-5
                      "
                    >
                      {managerName}
                    </td>

                    {/* Date */}
                    <td
                      className="
                        px-4
                        py-4
                        text-sm
                        text-gray-400
                        sm:px-6
                        sm:py-5
                      "
                    >
                      {category.updatedAt
                        ? new Date(
                            category.updatedAt
                          ).toLocaleDateString(
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
                    <td className="px-4 py-4 sm:px-6 sm:py-5">
                      <span
                        className={`
                          inline-flex
                          rounded-full
                          px-2.5
                          py-1
                          text-[10px]
                          font-semibold
                          sm:px-3
                          sm:text-xs
                          ${statusStyle["نشط"]}
                        `}
                      >
                        نشط
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 sm:px-6 sm:py-5">
                      <div className="flex justify-center gap-2 sm:gap-3">
                        {/* View */}
                        <button
                          type="button"
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            bg-[#1E1E1E]
                            transition
                            hover:bg-blue-600
                            sm:h-10
                            sm:w-10
                            sm:rounded-xl
                          "
                          title="عرض"
                        >
                          <MdVisibility className="text-lg text-white sm:text-xl" />
                        </button>

                        {/* Edit */}
                        <button
                          type="button"
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            bg-[#1E1E1E]
                            transition
                            hover:bg-green-600
                            sm:h-10
                            sm:w-10
                            sm:rounded-xl
                          "
                          title="تعديل"
                        >
                          <MdEdit className="text-lg text-white sm:text-xl" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            bg-[#1E1E1E]
                            transition
                            hover:bg-red-600
                            sm:h-10
                            sm:w-10
                            sm:rounded-xl
                          "
                          title="حذف"
                        >
                          <MdDelete className="text-lg text-white sm:text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="
                    px-4
                    py-10
                    text-center
                    text-sm
                    text-gray-500
                  "
                >
                  لا توجد تصنيفات
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}