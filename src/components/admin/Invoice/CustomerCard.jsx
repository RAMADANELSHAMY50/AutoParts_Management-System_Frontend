import React from "react";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCreditCard,
} from "react-icons/fi";

export default function CustomerCard() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Customer Information */}
      <div className="rounded-2xl border border-zinc-800 bg-[#181818] p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/20">
            <FiUser className="text-2xl text-blue-400" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              محمد عبدالله
            </h2>

            <p className="text-sm text-zinc-400">
              عميل منذ مايو 2022
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <InfoRow
            icon={<FiPhone />}
            label="رقم الهاتف"
            value="+966 50 123 4567"
          />

          <InfoRow
            icon={<FiMail />}
            label="البريد الإلكتروني"
            value="mohamed@gmail.com"
          />

          <InfoRow
            icon={<FiMapPin />}
            label="العنوان"
            value="الرياض، المملكة العربية السعودية"
          />
        </div>
      </div>

      {/* Payment Information */}
      <div className="rounded-2xl border border-zinc-800 bg-[#181818] p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20">
            <FiCreditCard className="text-xl text-green-400" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              معلومات الدفع
            </h2>

            <p className="text-sm text-zinc-400">
              تفاصيل عملية الدفع
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <InfoRow
            label="طريقة الدفع"
            value="بطاقة مدى"
          />

          <InfoRow
            label="رقم العملية"
            value="TXN-98451236"
          />

          <InfoRow
            label="العملة"
            value="ريال سعودي (SAR)"
          />

          <InfoRow
            label="الحالة"
            value={
              <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm font-semibold text-green-400">
                تم الدفع
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------- */

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4 rounded-xl bg-[#202020] p-4">
      {icon && (
        <div className="mt-1 text-lg text-zinc-400">
          {icon}
        </div>
      )}

      <div className="flex-1">
        <p className="text-sm text-zinc-500">
          {label}
        </p>

        <div className="mt-1 text-white font-medium">
          {value}
        </div>
      </div>
    </div>
  );
}