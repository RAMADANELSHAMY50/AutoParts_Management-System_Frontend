import React from "react";
import { HiOutlineCog6Tooth, HiOutlineGlobeAlt } from "react-icons/hi2";
import { MdOutlineAttachMoney } from "react-icons/md";
import { TbReceiptTax } from "react-icons/tb";
import InputField from "./InputField";

export default function SystemSettings() {
  return (
    <div className="bg-[#171717] border border-zinc-800 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-right">
          <h2 className="text-xl font-semibold text-white">إعدادات النظام</h2>

          <p className="text-sm text-zinc-400 mt-1">
            تخصيص الإعدادات العامة الخاصة بالنظام
          </p>
        </div>

        <HiOutlineCog6Tooth className="text-3xl text-indigo-300" />
      </div>

      {/* Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Currency */}
        <div className="space-y-2">
          <label className="flex items-center justify-end gap-2 text-zinc-300">
            <span>العملة الافتراضية</span>
            <MdOutlineAttachMoney className="text-indigo-300 text-xl" />
          </label>

          <select
            className="
              w-full
              bg-[#1F1F1F]
              border border-zinc-700
              rounded-xl
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-indigo-400
              focus:ring-2
              focus:ring-indigo-400/20
            "
          >
            <option>الجنيه المصري (EGP)</option>
            <option>الدولار الأمريكي (USD)</option>
            <option>اليورو (EUR)</option>
            <option>الريال السعودي (SAR)</option>
          </select>
        </div>

        {/* VAT */}
        <div>
          <InputField
            label="ضريبة القيمة المضافة (%)"
            type="number"
            value="14"
          />

          <TbReceiptTax className="text-indigo-300 text-xl mt-2 ml-auto" />
        </div>

        {/* Language */}
        <div className="md:col-span-2 space-y-2">
          <label className="flex items-center gap-2 text-zinc-300">
            <span>لغة النظام</span>
            <HiOutlineGlobeAlt className="text-indigo-300 text-xl" />
          </label>

          <select
            className="
              w-full
              bg-[#1F1F1F]
              border border-zinc-700
              rounded-xl
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-indigo-400
              focus:ring-2
              focus:ring-indigo-400/20
            "
          >
            <option>العربية</option>
            <option>English</option>
            <option>Français</option>
          </select>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          className="
            px-8
            py-3
            rounded-xl
            bg-indigo-300
            hover:bg-indigo-200
            text-[#181818]
            font-semibold
            transition-all
            duration-300
            shadow-lg
            shadow-indigo-400/20
          "
        >
          حفظ الإعدادات
        </button>
      </div>
    </div>
  );
}
