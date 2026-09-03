import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FiCamera } from "react-icons/fi";
import InputField from "./InputField";

export default function ProfileCard() {
  return (
    <div className="bg-[#171717] border border-zinc-800 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <HiOutlineUserCircle className="text-3xl text-indigo-300" />

        <div className="text-right">
          <h2 className="text-xl font-semibold text-white">
            الملف الشخصي للمسؤول
          </h2>

          <p className="text-sm text-zinc-400 mt-1">
            إدارة معلومات الحساب وكلمة المرور الخاصة بك
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Profile Image */}
        <div className="col-span-12 lg:col-span-3 flex flex-col items-center">
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80"
              alt="Admin"
              className="w-36 h-36 rounded-2xl object-cover border-2 border-indigo-400"
            />

            <button
              className="absolute inset-0 bg-black/50 rounded-2xl
              opacity-0 group-hover:opacity-100 transition
              flex items-center justify-center"
            >
              <FiCamera className="text-white text-3xl" />
            </button>
          </div>

          <button className="mt-4 text-indigo-300 hover:text-indigo-200 text-sm font-medium transition">
            تغيير الصورة
          </button>
        </div>

        {/* Form */}
        <div className="col-span-12 lg:col-span-9 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <InputField
              label="الاسم الكامل"
              value="أحمد المسؤول"
            />

            <InputField
              label="البريد الإلكتروني"
              value="info@premium-acc.com"
              type="email"
            />
          </div>

          <InputField
            label="تغيير كلمة المرور"
            type="password"
            value="123456789"
          />

          <button
            className="mt-2 bg-indigo-300 hover:bg-indigo-200
            text-[#181818] font-semibold px-8 py-3 rounded-xl
            transition shadow-lg shadow-indigo-400/20"
          >
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
}