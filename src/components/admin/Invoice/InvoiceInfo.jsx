import React from "react";
import StatusBadge from "./StatusBadge";

export default function InvoiceInfo() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#181818] p-6">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-zinc-800 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-white">
            فاتورة ضريبية
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Tax Invoice
          </p>
        </div>

        <StatusBadge status="paid" />
      </div>

      {/* Information */}
      <div className="mt-6 grid grid-cols-2 gap-5">
        <InfoItem
          title="رقم الفاتورة"
          value="INV-2024-001"
        />

        <InfoItem
          title="رقم الطلب"
          value="#ORD-30215"
        />

        <InfoItem
          title="تاريخ الإصدار"
          value="15 مايو 2024"
        />

        <InfoItem
          title="تاريخ الاستحقاق"
          value="30 مايو 2024"
        />

        <InfoItem
          title="طريقة الدفع"
          value="بطاقة مدى"
        />

        <InfoItem
          title="العملة"
          value="SAR (ر.س)"
        />

        <InfoItem
          title="البائع"
          value="Apex Auto"
        />

        <InfoItem
          title="الرقم الضريبي"
          value="300123456700003"
        />
      </div>

      {/* Notes */}
      <div className="mt-8 rounded-xl border border-zinc-700 bg-[#202020] p-5">
        <h3 className="mb-2 font-semibold text-white">
          ملاحظات
        </h3>

        <p className="text-sm leading-7 text-zinc-400">
          شكراً لتعاملكم معنا.
          <br />
          جميع المنتجات تشمل الضمان حسب سياسة الشركة.
          <br />
          للاستفسارات يرجى التواصل مع خدمة العملاء.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------ */

function InfoItem({ title, value }) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-[#202020] p-4">
      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <h4 className="mt-2 text-base font-semibold text-white">
        {value}
      </h4>
    </div>
  );
}