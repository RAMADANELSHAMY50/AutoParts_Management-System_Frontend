import { useState } from "react";
import { MdMenu } from "react-icons/md";

import Sidebar from "../../components/admin/layout/Sidebar";
import ActionCards from "../../components/admin/settings/ActionCards";
import AppearanceCard from "../../components/admin/settings/AppearanceCard";
import ProfileCard from "../../components/admin/settings/ProfileCard";

export default function Settings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      dir="rtl"
      className="
        flex
        min-h-screen
        min-w-0
        bg-[#111111]
        text-white
      "
    >
      {/* ================= SIDEBAR ================= */}
      <Sidebar
        isMobileOpen={isSidebarOpen}
        setIsMobileOpen={setIsSidebarOpen}
      />

      {/* ================= MAIN ================= */}
      <main className="min-w-0 flex-1">
        <div
          className="
            w-full
            p-3
            sm:p-4
            md:p-5
            lg:p-6
            xl:p-8
          "
        >
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">

            {/* ================= MOBILE HEADER ================= */}
            <div
              className="
                flex
                items-center
                justify-between
                lg:hidden
              "
            >
              {/* Menu Button */}
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-zinc-800
                  bg-[#171717]
                  text-zinc-300
                  transition
                  hover:border-indigo-400
                  hover:text-indigo-300
                  sm:h-11
                  sm:w-11
                "
                aria-label="فتح القائمة"
              >
                <MdMenu
                  size={24}
                  className="sm:text-[26px]"
                />
              </button>

              {/* Page Title */}
              <div className="min-w-0 text-right">
                <h1
                  className="
                    text-lg
                    font-bold
                    text-white
                    sm:text-xl
                  "
                >
                  الإعدادات
                </h1>

                <p
                  className="
                    mt-1
                    text-xs
                    text-zinc-500
                    sm:text-sm
                  "
                >
                  إدارة إعدادات النظام
                </p>
              </div>
            </div>

            {/* ================= TOP SECTION ================= */}
            <div
              className="
                grid
                grid-cols-1
                gap-4
                lg:grid-cols-12
                lg:gap-6
              "
            >
              {/* Profile */}
              <div className="min-w-0 lg:col-span-8">
                <ProfileCard />
              </div>

              {/* Appearance */}
              <div className="min-w-0 lg:col-span-4">
                <AppearanceCard />
              </div>
            </div>

            {/* ================= ACTION CARDS ================= */}
            <ActionCards />

          </div>
        </div>
      </main>
    </div>
  );
}