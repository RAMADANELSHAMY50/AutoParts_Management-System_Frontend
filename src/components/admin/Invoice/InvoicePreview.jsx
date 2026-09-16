import {
  FiTruck,
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";

export default function InvoicePreview({
  invoice,
  loading,
}) {
  // =========================================================
  // Loading
  // =========================================================
  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-[#181818] p-5 sm:rounded-2xl sm:p-8">
        <p className="text-sm text-zinc-400">
          جاري تحميل الفاتورة...
        </p>
      </div>
    );
  }

  // =========================================================
  // No invoice
  // =========================================================
  if (!invoice) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-[#181818] p-6 sm:rounded-2xl sm:p-8">
        <p className="text-center text-sm text-zinc-500">
          اختر فاتورة لعرض التفاصيل
        </p>
      </div>
    );
  }

  // =========================================================
  // Customer
  // =========================================================
  const customer =
    invoice.users_permissions_user
      ?.data ||
    invoice.users_permissions_user ||
    null;

  // =========================================================
  // Order Items
  // =========================================================
  const orderItems = Array.isArray(
    invoice.orderItems
  )
    ? invoice.orderItems
    : Array.isArray(invoice.order_items)
    ? invoice.order_items
    : invoice.order_items?.data || [];

  return (
    <div className="min-w-0 rounded-xl border border-zinc-800 bg-[#181818] p-3 sm:rounded-2xl sm:p-5 lg:p-8">
      {/* =========================
          Header
      ========================= */}
      <div className="flex flex-col gap-6 border-b border-zinc-800 pb-6 sm:pb-8 lg:flex-row lg:items-start lg:justify-between">
        {/* Company */}
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 sm:h-16 sm:w-16 sm:rounded-2xl">
            <FiTruck className="text-2xl text-white sm:text-3xl" />
          </div>

          <div className="min-w-0 text-right">
            <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              APEX AUTO
            </h1>

            <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
              للإكسسوارات وقطع الغيار
            </p>

            <p className="mt-3 flex items-center justify-end gap-2 text-xs text-zinc-500 sm:mt-4 sm:text-sm">
              <FiMapPin className="shrink-0" />
              الرياض - المملكة العربية السعودية
            </p>

            <p className="mt-2 flex items-center justify-end gap-2 text-xs text-zinc-500 sm:text-sm">
              <FiPhone className="shrink-0" />
              +966500000000
            </p>

            <p className="mt-2 flex items-center justify-end gap-2 text-xs text-zinc-500 sm:text-sm">
              <FiMail className="shrink-0" />
              <span className="truncate">
                info@apexauto.com
              </span>
            </p>
          </div>
        </div>

        {/* Invoice Info */}
        <div className="w-full text-right lg:w-auto">
          <h2 className="text-3xl font-bold text-zinc-700 sm:text-4xl lg:text-5xl">
            فاتورة
          </h2>

          <div className="mt-4 space-y-2 text-xs sm:mt-8 sm:space-y-3 sm:text-sm">
            <div className="flex justify-between gap-5 sm:gap-10">
              <span className="text-zinc-400">
                رقم الفاتورة
              </span>

              <span className="font-semibold text-white">
                {invoice.orderNumber ||
                  "---"}
              </span>
            </div>

            <div className="flex justify-between gap-5 sm:gap-10">
              <span className="text-zinc-400">
                تاريخ الإصدار
              </span>

              <span className="text-white">
                {invoice.createdAt
                  ? new Date(
                      invoice.createdAt
                    ).toLocaleDateString(
                      "ar-EG"
                    )
                  : "---"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          Customer + Payment
      ========================= */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-2 lg:gap-6">
        {/* Customer */}
        <div className="rounded-xl border border-zinc-700 bg-[#222222] p-4 sm:rounded-2xl sm:p-6">
          <h3 className="mb-3 text-sm font-semibold text-zinc-400 sm:mb-4">
            الفاتورة مرسلة إلى
          </h3>

          <h2 className="break-words text-xl font-bold text-white sm:text-2xl">
            {customer?.username ||
              "عميل"}
          </h2>

          {customer?.email && (
            <p className="mt-2 break-all text-xs text-zinc-400 sm:text-sm">
              {customer.email}
            </p>
          )}

          {!customer && (
            <p className="mt-2 text-xs text-zinc-400 sm:text-sm">
              عملية بيع من نقطة البيع
            </p>
          )}
        </div>

        {/* Payment */}
        <div className="rounded-xl border border-zinc-700 bg-[#222222] p-4 sm:rounded-2xl sm:p-6">
          <h3 className="mb-3 text-sm font-semibold text-zinc-400 sm:mb-4">
            تفاصيل الدفع
          </h3>

          <p className="text-sm text-white">
            <span className="font-bold">
              طريقة الدفع:
            </span>{" "}
            {invoice.paymentMethod ||
              "---"}
          </p>

          <p className="mt-2 text-sm text-white">
            <span className="font-bold">
              الحالة:
            </span>{" "}
            {invoice.State || "---"}
          </p>

          <span className="mt-4 inline-flex rounded-full bg-green-600/20 px-3 py-1 text-xs font-semibold text-green-400 sm:mt-5 sm:px-4 sm:text-sm">
            تم التحصيل
          </span>
        </div>
      </div>

      {/* =========================
          Products
      ========================= */}
      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800 sm:mt-10 sm:rounded-2xl">
        {/* Horizontal Scroll */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead className="bg-[#202020]">
              <tr className="text-right">
                <th className="p-3 text-xs text-zinc-400 sm:p-4 sm:text-sm">
                  المنتج
                </th>

                <th className="p-3 text-xs text-zinc-400 sm:p-4 sm:text-sm">
                  الكمية
                </th>

                <th className="p-3 text-xs text-zinc-400 sm:p-4 sm:text-sm">
                  سعر الوحدة
                </th>

                <th className="p-3 text-xs text-zinc-400 sm:p-4 sm:text-sm">
                  الإجمالي
                </th>
              </tr>
            </thead>

            <tbody>
              {orderItems.length > 0 ? (
                orderItems.map(
                  (item, index) => {
                    const product =
                      item.product?.data ||
                      item.product ||
                      {};

                    const quantity = Number(
                      item.quantity || 0
                    );

                    const price = Number(
                      item.price || 0
                    );

                    const total = Number(
                      item.total ||
                        price * quantity
                    );

                    return (
                      <tr
                        key={
                          item.documentId ||
                          item.id ||
                          index
                        }
                        className="border-t border-zinc-800"
                      >
                        {/* Product */}
                        <td className="p-3 sm:p-5">
                          <h3 className="max-w-[250px] truncate text-sm font-semibold text-white sm:text-base">
                            {product.name ||
                              "منتج"}
                          </h3>

                          {product.sku && (
                            <p className="mt-1 text-[10px] text-zinc-500 sm:text-xs">
                              SKU:{" "}
                              {product.sku}
                            </p>
                          )}
                        </td>

                        {/* Quantity */}
                        <td className="p-3 text-sm text-white sm:p-5">
                          {quantity}
                        </td>

                        {/* Price */}
                        <td className="p-3 text-sm text-white sm:p-5">
                          {price.toFixed(2)} ر.س
                        </td>

                        {/* Total */}
                        <td className="p-3 text-sm font-semibold text-white sm:p-5">
                          {total.toFixed(2)} ر.س
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-center text-sm text-zinc-500"
                  >
                    لا توجد منتجات في هذه الفاتورة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================
          Totals
      ========================= */}
      <div className="mt-5 flex justify-stretch sm:mt-8 sm:justify-end">
        <div className="w-full rounded-xl bg-[#202020] p-4 sm:w-80 sm:rounded-2xl sm:p-6">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">
              المجموع الفرعي
            </span>

            <span className="font-bold text-white">
              {Number(
                invoice.subtotal || 0
              ).toFixed(2)}{" "}
              ر.س
            </span>
          </div>

          <div className="mt-3 flex justify-between text-sm">
            <span className="text-zinc-400">
              الخصم
            </span>

            <span className="text-white">
              {Number(
                invoice.discount || 0
              ).toFixed(2)}{" "}
              ر.س
            </span>
          </div>

          <div className="mt-3 flex justify-between text-sm">
            <span className="text-zinc-400">
              الضريبة
            </span>

            <span className="text-white">
              {Number(
                invoice.tax || 0
              ).toFixed(2)}{" "}
              ر.س
            </span>
          </div>

          <div className="mt-4 border-t border-zinc-700 pt-4">
            <div className="flex justify-between text-lg font-bold text-blue-400 sm:text-2xl">
              <span>الإجمالي</span>

              <span>
                {Number(
                  invoice.total || 0
                ).toFixed(2)}{" "}
                ر.س
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}