import React from "react";
import {
  HiOutlineInformationCircle,
  HiOutlineArrowDownTray,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

export default function VersionCard() {
  return (
    <div className="bg-[#171717] border border-zinc-800 rounded-2xl p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-right">
          <h2 className="text-xl font-semibold text-white">معلومات النظام</h2>

          <p className="text-sm text-zinc-400 mt-1">
            إصدار النظام وحالة التحديثات
          </p>
        </div>
        
        <HiOutlineInformationCircle className="text-3xl text-indigo-300" />
      </div>

      {/* Version */}
      <div className="rounded-xl border border-zinc-800 bg-[#1F1F1F] p-5 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-indigo-300 font-semibold">الإصدار الحالي</span>

          <span className="text-white font-bold">v2.4.1</span>
        </div>

        <p className="text-sm text-zinc-400 mt-3 text-right">
          آخر تحديث للنظام بتاريخ
          <span className="text-white font-medium"> 15 يوليو 2026</span>
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 mb-6">
        <HiOutlineCheckCircle className="text-3xl text-emerald-400" />

        <div className="text-right">
          <h3 className="text-white font-medium">النظام مُحدَّث</h3>

          <p className="text-sm text-zinc-400">لديك أحدث إصدار متوفر.</p>
        </div>
      </div>

      {/* System Info */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">React</span>
          <span className="text-white">19.x</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Tailwind CSS</span>
          <span className="text-white">4.x</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Backend</span>
          <span className="text-white">Strapi v5</span>
        </div>
      </div>

      {/* Button */}
      <button
        className="
          w-full
          flex
          items-center
          justify-center
          gap-2
          py-3
          rounded-xl
          bg-indigo-300
          hover:bg-indigo-200
          text-[#181818]
          font-semibold
          transition-all
          duration-300
          shadow-lg
          shadow-indigo-500/20
        "
      >
        <HiOutlineArrowDownTray className="text-xl" />
        البحث عن تحديثات
      </button>
    </div>
  );
}
