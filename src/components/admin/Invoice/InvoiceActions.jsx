import {
  FiPrinter,
  FiShare2,
  FiEye,
  FiTruck,
  FiCheckCircle,
} from "react-icons/fi";
import { MdMenu } from "react-icons/md";

export default function InvoiceActions({
  invoice,
  onPreview,
  onUpdateStatus,
  updatingStatus = false,
  onMenuClick,
}) {
  // ==========================================
  // Get Order Items
  // ==========================================
  const getOrderItems = () => {
    if (!invoice) return [];

    return (
      invoice.order_items?.data ||
      invoice.order_items ||
      invoice.orderItems ||
      []
    );
  };

  // ==========================================
  // Get Product Name
  // ==========================================
  const getProductName = (item) => {
    const product =
      item?.product?.data ||
      item?.product ||
      null;

    if (!product) {
      return "منتج";
    }

    return (
      product.name ||
      product.attributes?.name ||
      "منتج"
    );
  };

  // ==========================================
  // Get Customer
  // ==========================================
  const getCustomer = () => {
    if (!invoice) return null;

    return (
      invoice.users_permissions_user?.data ||
      invoice.users_permissions_user ||
      null
    );
  };

  // ==========================================
  // Customer Name
  // ==========================================
  const getCustomerName = () => {
    const customer = getCustomer();

    if (!customer) {
      return "عميل";
    }

    return (
      customer.username ||
      customer.name ||
      customer.email ||
      customer.attributes?.username ||
      customer.attributes?.name ||
      "عميل"
    );
  };

  // ==========================================
  // Customer Email
  // ==========================================
  const getCustomerEmail = () => {
    const customer = getCustomer();

    if (!customer) {
      return "";
    }

    return (
      customer.email ||
      customer.attributes?.email ||
      ""
    );
  };

  // ==========================================
  // Print
  // ==========================================
  const handlePrint = () => {
    if (!invoice) {
      alert("من فضلك اختر فاتورة أولاً");
      return;
    }

    const orderItems = getOrderItems();

    const itemsHTML = orderItems
      .map((item, index) => {
        const quantity = Number(
          item.quantity || 1
        );

        const price = Number(
          item.price || 0
        );

        const total = Number(
          item.total ||
            price * quantity
        );

        return `
          <tr>
            <td>${index + 1}</td>
            <td>${getProductName(item)}</td>
            <td>${quantity}</td>
            <td>${price.toFixed(2)}</td>
            <td>${total.toFixed(2)}</td>
          </tr>
        `;
      })
      .join("");

    const subtotal = Number(
      invoice.subtotal || 0
    );

    const tax = Number(
      invoice.tax || 0
    );

    const discount = Number(
      invoice.discount || 0
    );

    const total = Number(
      invoice.total || 0
    );

    const printWindow = window.open(
      "",
      "_blank",
      "width=1000,height=800"
    );

    if (!printWindow) {
      alert(
        "تعذر فتح نافذة الطباعة. تأكد من السماح بالنوافذ المنبثقة."
      );
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <title>
          فاتورة ${invoice.orderNumber || ""}
        </title>

        <style>
          * {
            box-sizing: border-box;
          }

          body {
            font-family: Arial, Tahoma, sans-serif;
            margin: 0;
            padding: 40px;
            color: #222;
            background: #fff;
          }

          .invoice {
            max-width: 900px;
            margin: auto;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 30px;
            padding-bottom: 25px;
            border-bottom: 2px solid #222;
          }

          .company h1 {
            margin: 0 0 8px;
            font-size: 28px;
          }

          .company p {
            margin: 4px 0;
            color: #666;
          }

          .invoice-info {
            text-align: left;
          }

          .invoice-info h2 {
            margin: 0 0 10px;
            font-size: 24px;
          }

          .invoice-info p {
            margin: 5px 0;
          }

          .customer {
            margin-top: 30px;
            padding: 20px;
            background: #f5f5f5;
            border-radius: 10px;
          }

          .customer h3 {
            margin-top: 0;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
          }

          th,
          td {
            padding: 12px;
            border: 1px solid #ddd;
            text-align: center;
          }

          th {
            background: #222;
            color: white;
          }

          .summary {
            width: 350px;
            max-width: 100%;
            margin-top: 30px;
            margin-right: auto;
          }

          .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
          }

          .total {
            margin-top: 10px;
            padding-top: 15px;
            border-top: 2px solid #222;
            font-size: 20px;
            font-weight: bold;
          }

          .status {
            margin-top: 30px;
            padding: 12px;
            text-align: center;
            border: 1px solid #ddd;
            border-radius: 8px;
          }

          @media print {
            body {
              padding: 20px;
            }
          }
        </style>
      </head>

      <body>
        <div class="invoice">

          <div class="header">

            <div class="company">
              <h1>APEX AUTO</h1>

              <p>
                قطع غيار وإكسسوارات السيارات
              </p>

              <p>
                Riyadh
              </p>

              <p>
                info@apexauto.com
              </p>
            </div>

            <div class="invoice-info">
              <h2>فاتورة</h2>

              <p>
                رقم الطلب:
                <strong>
                  ${invoice.orderNumber || "---"}
                </strong>
              </p>

              <p>
                التاريخ:
                ${new Date(
                  invoice.createdAt || Date.now()
                ).toLocaleDateString("ar-EG")}
              </p>

              <p>
                الحالة:
                <strong>
                  ${invoice.State || "---"}
                </strong>
              </p>
            </div>

          </div>

          <div class="customer">
            <h3>بيانات العميل</h3>

            <p>
              الاسم:
              ${getCustomerName()}
            </p>

            ${
              getCustomerEmail()
                ? `
                  <p>
                    البريد الإلكتروني:
                    ${getCustomerEmail()}
                  </p>
                `
                : ""
            }
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>المنتج</th>
                <th>الكمية</th>
                <th>السعر</th>
                <th>الإجمالي</th>
              </tr>
            </thead>

            <tbody>
              ${
                itemsHTML ||
                `
                  <tr>
                    <td colspan="5">
                      لا توجد منتجات
                    </td>
                  </tr>
                `
              }
            </tbody>
          </table>

          <div class="summary">

            <div class="summary-row">
              <span>الإجمالي الفرعي</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>

            <div class="summary-row">
              <span>الخصم</span>
              <strong>${discount.toFixed(2)}</strong>
            </div>

            <div class="summary-row">
              <span>الضريبة</span>
              <strong>${tax.toFixed(2)}</strong>
            </div>

            <div class="summary-row total">
              <span>الإجمالي</span>
              <strong>${total.toFixed(2)}</strong>
            </div>

          </div>

          <div class="status">
            حالة الطلب:
            <strong>
              ${invoice.State || "---"}
            </strong>
          </div>

        </div>

        <script>
          window.onload = function () {
            window.print();

            setTimeout(function () {
              window.close();
            }, 500);
          };
        </script>

      </body>
      </html>
    `);

    printWindow.document.close();
  };

  // ==========================================
  // Share
  // ==========================================
  const handleShare = async () => {
    if (!invoice) {
      alert("من فضلك اختر فاتورة أولاً");
      return;
    }

    const shareText = `
APEX AUTO
فاتورة طلب

رقم الطلب:
${invoice.orderNumber || "---"}

العميل:
${getCustomerName()}

الحالة:
${invoice.State || "---"}

الإجمالي:
${Number(invoice.total || 0).toFixed(2)}
    `.trim();

    try {
      if (navigator.share) {
        await navigator.share({
          title: `فاتورة ${
            invoice.orderNumber || ""
          }`,
          text: shareText,
        });

        return;
      }

      await navigator.clipboard.writeText(
        shareText
      );

      alert("تم نسخ بيانات الفاتورة");
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  // ==========================================
  // Status
  // ==========================================
  const currentStatus =
    invoice?.State || "";

  const canStartShipping =
    currentStatus === "قيد التنفيذ";

  const canDeliver =
    currentStatus === "جاري الشحن";

  const isDelivered =
    currentStatus === "تم التوصيل";

  const isCancelled =
    currentStatus === "ملغى";

  return (
    <header
      dir="rtl"
      className="border-b border-zinc-800 bg-[#151515] p-3 sm:p-4 lg:p-5"
    >
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        {/* ======================================
            Top / Main Actions
        ====================================== */}
        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-[#232323] text-white transition hover:border-blue-500 hover:bg-[#292929] lg:hidden"
            aria-label="فتح القائمة"
          >
            <MdMenu size={23} />
          </button>

          {/* Page Title */}
          <div className="ml-auto min-w-0 xl:ml-0">
            <h1 className="truncate text-lg font-bold text-white sm:text-xl">
              الفواتير
            </h1>

            <p className="hidden text-xs text-zinc-500 sm:block">
              إدارة ومتابعة الفواتير والطلبات
            </p>
          </div>
        </div>

        {/* ======================================
            Actions
        ====================================== */}
        <div className="flex w-full flex-wrap gap-2 sm:gap-3 xl:w-auto">
          {/* Print */}
          <button
            type="button"
            onClick={handlePrint}
            disabled={!invoice}
            className="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#232323] px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-4 sm:text-sm lg:px-5 lg:py-3"
          >
            <FiPrinter size={17} />
            <span>طباعة</span>
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            disabled={!invoice}
            className="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#232323] px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-4 sm:text-sm lg:px-5 lg:py-3"
          >
            <FiShare2 size={17} />
            <span>مشاركة</span>
          </button>

          {/* Preview */}
          <button
            type="button"
            onClick={onPreview}
            disabled={!invoice}
            className="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#232323] px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-4 sm:text-sm lg:px-5 lg:py-3"
          >
            <FiEye size={17} />
            <span>معاينة</span>
          </button>

          {/* Start Shipping */}
          {canStartShipping && (
            <button
              type="button"
              onClick={() =>
                onUpdateStatus?.("جاري الشحن")
              }
              disabled={
                !invoice || updatingStatus
              }
              className="flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:text-sm lg:px-5 lg:py-3"
            >
              <FiTruck size={17} />

              {updatingStatus
                ? "جاري التحديث..."
                : "بدء الشحن"}
            </button>
          )}

          {/* Deliver */}
          {canDeliver && (
            <button
              type="button"
              onClick={() =>
                onUpdateStatus?.(
                  "تم التوصيل"
                )
              }
              disabled={
                !invoice || updatingStatus
              }
              className="flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:text-sm lg:px-5 lg:py-3"
            >
              <FiCheckCircle size={17} />

              {updatingStatus
                ? "جاري التحديث..."
                : "تم تسليم الطلب"}
            </button>
          )}

          {/* Delivered */}
          {isDelivered && (
            <div className="flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400 sm:w-auto sm:px-5 sm:py-3">
              <FiCheckCircle size={18} />
              تم التوصيل
            </div>
          )}

          {/* Cancelled */}
          {isCancelled && (
            <div className="flex min-h-10 w-full items-center justify-center rounded-xl bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 sm:w-auto sm:px-5 sm:py-3">
              الطلب ملغي
            </div>
          )}
        </div>
      </div>
    </header>
  );
}