import React from "react";
import {
  FiTruck,
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";

export default function InvoicePreview() {
  const products = [
    {
      id: 1,
      name: "نظام إضاءة LED أمامي - الفئة السابعة",
      desc: "تركيب احترافي مع ضمان لمدة سنتين",
      qty: 1,
      price: 850,
    },
    {
      id: 2,
      name: "مجموعة أغطية مقاعد مخمل - أسود ملكي",
      desc: "مقاوم للسوائل وسهل التنظيف",
      qty: 1,
      price: 350,
    },
    {
      id: 3,
      name: 'معطر جو فاخر - "نسيم الصحراء"',
      desc: "إصدار محدود للسيارات الفاخرة",
      qty: 2,
      price: 25,
    },
  ];

  const total = products.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#181818] p-8">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-zinc-800 pb-8">
        {/* Company */}
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
            <FiTruck className="text-3xl text-white" />
          </div>

          <div className="text-right">
            <h1 className="text-4xl font-bold text-white">
              APEX AUTO
            </h1>

            <p className="mt-1 text-zinc-400">
              للإكسسوارات وقطع الغيار
            </p>

            <p className="mt-4 flex items-center justify-end gap-2 text-sm text-zinc-500">
              <FiMapPin />
              الرياض - المملكة العربية السعودية
            </p>

            <p className="mt-2 flex items-center justify-end gap-2 text-sm text-zinc-500">
              <FiPhone />
              +966500000000
            </p>

            <p className="mt-2 flex items-center justify-end gap-2 text-sm text-zinc-500">
              <FiMail />
              info@apexauto.com
            </p>
          </div>
        </div>

        {/* Invoice */}
        <div className="text-right">
          <h2 className="text-5xl font-bold text-zinc-700">
            فاتورة
          </h2>

          <div className="mt-8 space-y-3 text-sm">
            <div className="flex justify-between gap-10">
              <span className="text-zinc-400">رقم الفاتورة</span>
              <span className="font-semibold text-white">
                INV-2024-001
              </span>
            </div>

            <div className="flex justify-between gap-10">
              <span className="text-zinc-400">تاريخ الإصدار</span>
              <span className="text-white">
                15 مايو 2024
              </span>
            </div>

            <div className="flex justify-between gap-10">
              <span className="text-zinc-400">الاستحقاق</span>
              <span className="text-white">
                30 مايو 2024
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer & Payment */}
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="rounded-2xl border border-zinc-700 bg-[#222222] p-6">
          <h3 className="mb-4 font-semibold text-zinc-400">
            الفاتورة مرسلة إلى
          </h3>

          <h2 className="text-2xl font-bold text-white">
            محمد عبدالله العتيبي
          </h2>

          <p className="mt-2 text-zinc-400">
            شركة العتيبي للمقاولات العامة
          </p>

          <p className="mt-1 text-zinc-500">
            الرياض - حي الخليج
          </p>

          <p className="text-zinc-500">
            m.otibi@domain.com
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-700 bg-[#222222] p-6">
          <h3 className="mb-4 font-semibold text-zinc-400">
            تفاصيل الدفع
          </h3>

          <p className="text-white">
            <span className="font-bold">
              طريقة الدفع:
            </span>{" "}
            بطاقة مدى
          </p>

          <p className="mt-2 text-white">
            <span className="font-bold">
              العملة:
            </span>{" "}
            ريال سعودي
          </p>

          <span className="mt-5 inline-flex rounded-full bg-green-600/20 px-4 py-1 text-sm font-semibold text-green-400">
            تم التحصيل
          </span>
        </div>
      </div>

      {/* Products */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-800">
        <table className="w-full">
          <thead className="bg-[#202020]">
            <tr className="text-right">
              <th className="p-4 text-zinc-400">المنتج</th>
              <th className="p-4 text-zinc-400">الكمية</th>
              <th className="p-4 text-zinc-400">سعر الوحدة</th>
              <th className="p-4 text-zinc-400">الإجمالي</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr
                key={item.id}
                className="border-t border-zinc-800"
              >
                <td className="p-5">
                  <h3 className="font-semibold text-white">
                    {item.name}
                  </h3>

                  <p className="text-sm text-zinc-500">
                    {item.desc}
                  </p>
                </td>

                <td className="p-5 text-white">
                  {item.qty}
                </td>

                <td className="p-5 text-white">
                  {item.price} ر.س
                </td>

                <td className="p-5 font-semibold text-white">
                  {item.qty * item.price} ر.س
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-8 flex justify-end">
        <div className="w-80 rounded-2xl bg-[#202020] p-6">
          <div className="flex justify-between text-lg">
            <span className="text-zinc-400">
              الإجمالي
            </span>

            <span className="font-bold text-white">
              {total} ر.س
            </span>
          </div>

          <div className="mt-4 border-t border-zinc-700 pt-4">
            <div className="flex justify-between text-2xl font-bold text-blue-400">
              <span>المبلغ المستحق</span>

              <span>{total} ر.س</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}