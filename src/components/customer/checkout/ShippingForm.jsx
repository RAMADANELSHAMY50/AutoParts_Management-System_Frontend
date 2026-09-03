// ShippingForm.jsx

import React from "react";
import { Truck } from "lucide-react";

const ShippingForm = () => {
  return (
    <div className="bg-[#171717] border border-zinc-800 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-end gap-2 mb-8">
        <Truck className="w-6 h-6 text-[#B7C9FF]" />
        <h2 className="text-3xl font-bold text-white">بيانات الشحن</h2>
      </div>

      <form className="space-y-6">
        {/* Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-sm text-zinc-400 text-right">
              الاسم الكامل
            </label>

            <input
              type="text"
              placeholder="أدخل اسمك بالكامل"
              className="w-full bg-[#242424] border border-zinc-700 rounded-xl h-14 px-4 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="block text-sm text-zinc-400 text-right">
              رقم الجوال
            </label>

            <input
              type="tel"
              placeholder="05XXXXXXXX"
              className="w-full bg-[#242424] border border-zinc-700 rounded-xl h-14 px-4 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label className="block text-sm text-zinc-400 text-right">
            العنوان الوطني / الحي والشارع
          </label>

          <input
            type="text"
            placeholder="مثال: الرياض، حي النرجس، شارع الملك فهد"
            className="w-full bg-[#242424] border border-zinc-700 rounded-xl h-14 px-4 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* City & Zip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* City */}
          <div className="space-y-2">
            <label className="block text-sm text-zinc-400 text-right">
              المدينة
            </label>

            <input
              type="text"
              defaultValue="الرياض"
              className="w-full bg-[#242424] border border-zinc-700 rounded-xl h-14 px-4 text-white outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Zip */}
          <div className="space-y-2">
            <label className="block text-sm text-zinc-400 text-right">
              الرمز البريدي
            </label>

            <input
              type="text"
              placeholder="12345"
              className="w-full bg-[#242424] border border-zinc-700 rounded-xl h-14 px-4 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;