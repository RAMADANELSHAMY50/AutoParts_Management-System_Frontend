import React, { useState } from "react";
import { Truck } from "lucide-react";

const ShippingForm = ({ onChange }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "الرياض",
    zipCode: "",
  });

  // ==========================================
  // Handle Input Change
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);

    // Send data to Checkout
    if (onChange) {
      onChange(updatedData);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-end gap-2 sm:mb-6 lg:mb-8">
        <Truck className="h-5 w-5 text-[#B7C9FF] sm:h-6 sm:w-6" />

        <h2 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
          بيانات الشحن
        </h2>
      </div>

      <form className="space-y-4 sm:space-y-5 lg:space-y-6">
        {/* Name & Phone */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-right text-xs text-zinc-400 sm:text-sm">
              الاسم الكامل
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="أدخل اسمك بالكامل"
              className="h-12 w-full rounded-xl border border-zinc-700 bg-[#242424] px-3 text-xs text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500 sm:h-14 sm:px-4 sm:text-sm"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-right text-xs text-zinc-400 sm:text-sm">
              رقم الجوال
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="05XXXXXXXX"
              className="h-12 w-full rounded-xl border border-zinc-700 bg-[#242424] px-3 text-xs text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500 sm:h-14 sm:px-4 sm:text-sm"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-right text-xs text-zinc-400 sm:text-sm">
            العنوان الوطني / الحي والشارع
          </label>

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="مثال: الرياض، حي النرجس، شارع الملك فهد"
            className="h-12 w-full rounded-xl border border-zinc-700 bg-[#242424] px-3 text-xs text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500 sm:h-14 sm:px-4 sm:text-sm"
          />
        </div>

        {/* City & Zip */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          {/* City */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-right text-xs text-zinc-400 sm:text-sm">
              المدينة
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-zinc-700 bg-[#242424] px-3 text-xs text-white outline-none transition focus:border-blue-500 sm:h-14 sm:px-4 sm:text-sm"
            />
          </div>

          {/* Zip */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-right text-xs text-zinc-400 sm:text-sm">
              الرمز البريدي
            </label>

            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="12345"
              className="h-12 w-full rounded-xl border border-zinc-700 bg-[#242424] px-3 text-xs text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500 sm:h-14 sm:px-4 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;