import Pagination from "../layout/Pagination";
import CustomerRow from "./CustomerRow";
import SearchToolbar from "../customers/SearchToolbar";

export default function CustomerTable({
  getCustomers,
  customers = [],
  totalCustomers = 0,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#171717]">
      <SearchToolbar customer={customers.length} />
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="border-b border-zinc-800 bg-[#1C1C1C]">
            <tr className="text-zinc-400 text-sm">
              <th className="px-6 py-5 font-medium">العميل</th>
              <th className="px-6 py-5 font-medium">بيانات الاتصال</th>
              <th className="px-6 py-5 font-medium">إجمالي المشتريات</th>
              <th className="px-6 py-5 font-medium">آخر زيارة</th>
              <th className="px-6 py-5 font-medium">الحالة</th>
              <th className="px-6 py-5 font-medium text-center">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <CustomerRow key={customer.id} customer={customer} />
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
