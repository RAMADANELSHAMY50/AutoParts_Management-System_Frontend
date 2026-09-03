import React from "react";
import {
  HiOutlineCloudArrowUp,
  HiOutlineArrowPath,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { FiDatabase } from "react-icons/fi";

const actions = [
  {
    id: 1,
    title: "إنشاء نسخة احتياطية",
    description: "احفظ نسخة احتياطية من جميع بيانات النظام.",
    icon: <FiDatabase size={26} />,
    button: "إنشاء",
    color: "text-blue-300",
  },
  {
    id: 2,
    title: "سجلات الأمان",
    description: "مراجعة عمليات الدخول وسجل النشاط.",
    icon: <HiOutlineShieldCheck size={26} />,
    button: "عرض السجل",
    color: "text-emerald-300",
  },
  {
    id: 3,
    title: "مزامنة سحابية",
    description: "مزامنة البيانات مع التخزين السحابي.",
    icon: <HiOutlineCloudArrowUp size={26} />,
    button: "مزامنة",
    color: "text-cyan-300",
  },
  {
    id: 4,
    title: "إعادة ضبط النظام",
    description: "إعادة الإعدادات الافتراضية للنظام.",
    icon: <HiOutlineArrowPath size={26} />,
    button: "إعادة ضبط",
    color: "text-red-400",
    danger: true,
  },
];

export default function ActionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {actions.map((item) => (
        <div
          key={item.id}
          className="bg-[#171717] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-400 transition-all duration-300"
        >
          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-xl bg-[#222] flex items-center justify-center ${item.color}`}
          >
            {item.icon}
          </div>

          {/* Content */}
          <div className="mt-5">
            <h3 className="text-lg font-semibold text-white mb-2 text-right">
              {item.title}
            </h3>

            <p className="text-sm text-zinc-400 text-right leading-6">
              {item.description}
            </p>
          </div>

          {/* Button */}
          <button
            className={`mt-6 w-full rounded-xl py-3 font-medium transition-all duration-300 ${
              item.danger
                ? "bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
                : "bg-indigo-300 text-[#181818] hover:bg-indigo-200"
            }`}
          >
            {item.button}
          </button>
        </div>
      ))}
    </div>
  );
}