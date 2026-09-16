import {
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCreditCard,
} from "react-icons/fi";

export default function CustomerCard() {
  return (
    <div
      dir="rtl"
      className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-6"
    >
      {/* Customer Information */}
      <div className="rounded-xl border border-zinc-800 bg-[#181818] p-4 sm:rounded-2xl sm:p-6">
        <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-500/20 sm:h-14 sm:w-14">
            <FiUser className="text-xl text-blue-400 sm:text-2xl" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-white sm:text-xl">
              محمد عبدالله
            </h2>

            <p className="text-xs text-zinc-400 sm:text-sm">
              عميل منذ مايو 2022
            </p>
          </div>
        </div>

        <div className="space-y-2.5 sm:space-y-4">
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
      <div className="rounded-xl border border-zinc-800 bg-[#181818] p-4 sm:rounded-2xl sm:p-6">
        <div className="mb-4 flex items-center gap-3 sm:mb-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/20 sm:h-12 sm:w-12">
            <FiCreditCard className="text-lg text-green-400 sm:text-xl" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white sm:text-xl">
              معلومات الدفع
            </h2>

            <p className="text-xs text-zinc-400 sm:text-sm">
              تفاصيل عملية الدفع
            </p>
          </div>
        </div>

        <div className="space-y-2.5 sm:space-y-4">
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
              <span className="inline-flex rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-400 sm:text-sm">
                تم الدفع
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl bg-[#202020] p-3 sm:gap-4 sm:p-4">
      {icon && (
        <div className="mt-1 shrink-0 text-base text-zinc-400 sm:text-lg">
          {icon}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-xs text-zinc-500 sm:text-sm">
          {label}
        </p>

        <div className="mt-1 break-words text-sm font-medium text-white sm:text-base">
          {value}
        </div>
      </div>
    </div>
  );
}