import CustomerRow from "./CustomerRow";
import SearchToolbar from "../customers/SearchToolbar";

export default function CustomerTable({
  getCustomers,
  customers = [],
  totalCustomers = 0,
}) {
  return (
    <div className="w-full min-w-0 overflow-hidden">
      <SearchToolbar customer={customers.length} />

      {/* Table Scroll */}
      <div
        className="
          w-full
          overflow-x-auto
          overscroll-x-contain
        "
      >
        <table
          className="
            w-full
            min-w-[760px]
            text-right
          "
        >
          <thead
            className="
              border-b
              border-zinc-800
              bg-[#1C1C1C]
            "
          >
            <tr className="text-xs text-zinc-400 sm:text-sm">
              <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-5 sm:py-4 lg:px-6 lg:py-5">
                العميل
              </th>

              <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-5 sm:py-4 lg:px-6 lg:py-5">
                بيانات الاتصال
              </th>

              <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-5 sm:py-4 lg:px-6 lg:py-5">
                إجمالي المشتريات
              </th>

              <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-5 sm:py-4 lg:px-6 lg:py-5">
                آخر زيارة
              </th>

              <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-5 sm:py-4 lg:px-6 lg:py-5">
                الحالة
              </th>

              <th className="whitespace-nowrap px-3 py-3 text-center font-medium sm:px-5 sm:py-4 lg:px-6 lg:py-5">
                الإجراءات
              </th>
            </tr>
          </thead>

          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="
                    px-4
                    py-10
                    text-center
                    text-sm
                    text-zinc-500
                  "
                >
                  لا يوجد عملاء لعرضهم
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}