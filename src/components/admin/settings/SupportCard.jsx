import React from "react";
import {
  HiOutlineQuestionMarkCircle,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { MdEmail } from "react-icons/md";

export default function SupportCard() {
  return (
    <div className="bg-[#171717] border border-zinc-800 rounded-2xl p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-right">
          <h2 className="text-xl font-semibold text-white">الدعم الفني</h2>

          <p className="text-sm text-zinc-400 mt-1">
            تواصل مع فريق الدعم في أي وقت.
          </p>
        </div>
        
        <HiOutlineQuestionMarkCircle className="text-3xl text-indigo-300" />
      </div>

      {/* Contact Cards */}
      <div className="space-y-4">
        {/* Live Chat */}
        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#1F1F1F] p-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <HiOutlineChatBubbleLeftRight className="text-2xl text-indigo-300" />
          </div>

          <div className="text-right flex-1 mr-4">
            <h3 className="text-white font-medium">الدردشة المباشرة</h3>

            <p className="text-sm text-zinc-400">تواصل مع الدعم مباشرة.</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#1F1F1F] p-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <MdEmail className="text-2xl text-emerald-300" />
          </div>

          <div className="text-right flex-1 mr-4">
            <h3 className="text-white font-medium">البريد الإلكتروني</h3>

            <p className="text-sm text-zinc-400">support@autoparts.com</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-800 my-6" />

      {/* Support Hours */}
      <div className="rounded-xl bg-[#1F1F1F] border border-zinc-800 p-4">
        <h4 className="text-white font-medium text-right mb-2">ساعات العمل</h4>

        <div className="space-y-2 text-sm text-zinc-400 text-right">
          <p>السبت - الخميس</p>
          <p>09:00 صباحًا - 06:00 مساءً</p>
        </div>
      </div>

      {/* Button */}
      <button
        className="
          w-full
          mt-6
          rounded-xl
          bg-indigo-300
          hover:bg-indigo-200
          text-[#181818]
          font-semibold
          py-3
          transition-all
          duration-300
          shadow-lg
          shadow-indigo-500/20
        "
      >
        تواصل مع الدعم
      </button>
    </div>
  );
}
