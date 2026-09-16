import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdMenu } from "react-icons/md";

import Sidebar from "../../components/admin/layout/Sidebar";
import FilterTabs from "../../components/admin/notifications/FilterTabs";
import NotificationList from "../../components/admin/notifications/NotificationList";

const API_URL = "http://localhost:1337";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Sidebar Mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ==========================================
  // Get Notifications
  // ==========================================
  const getNotifications = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await axios.get(
        `${API_URL}/api/notifications`,
        {
          params: {
            sort: "createdAt:desc",
            pagination: {
              page: 1,
              pageSize: 100,
            },
          },

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "NOTIFICATIONS:",
        res.data?.data
      );

      setNotifications(
        res.data?.data || []
      );
    } catch (error) {
      console.error(
        "GET NOTIFICATIONS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Load
  // ==========================================
  useEffect(() => {
    getNotifications();
  }, []);

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
      {/* ======================================
          Sidebar
      ====================================== */}
      <Sidebar
        isMobileOpen={isSidebarOpen}
        setIsMobileOpen={setIsSidebarOpen}
      />

      {/* ======================================
          Main
      ====================================== */}
      <main
        className="
          min-w-0
          flex-1
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            p-3
            sm:p-4
            md:p-5
            lg:p-6
            xl:p-8
          "
        >
          {/* ======================================
              Mobile Header
          ====================================== */}
          <div
            className="
              mb-5
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
              aria-label="فتح القائمة"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-gray-800
                bg-[#171717]
                text-gray-300
                transition
                hover:border-indigo-400
                hover:text-indigo-300
                sm:h-11
                sm:w-11
              "
            >
              <MdMenu
                size={24}
                className="sm:text-[26px]"
              />
            </button>

            {/* Mobile Title */}
            <div className="min-w-0 text-right">
              <h1
                className="
                  truncate
                  text-lg
                  font-bold
                  text-white
                  sm:text-xl
                "
              >
                إدارة التنبيهات
              </h1>

              <p
                className="
                  mt-1
                  text-xs
                  text-gray-500
                  sm:text-sm
                "
              >
                آخر التنبيهات والأحداث
              </p>
            </div>
          </div>

          {/* ======================================
              Desktop Header
          ====================================== */}
          <div className="mb-6 sm:mb-8">
            <div
              className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              {/* Title */}
              <div className="min-w-0">
                <h1
                  className="
                    text-2xl
                    font-bold
                    text-white
                    sm:text-3xl
                  "
                >
                  إدارة التنبيهات
                </h1>

                <p
                  className="
                    mt-2
                    text-xs
                    leading-6
                    text-gray-400
                    sm:text-sm
                  "
                >
                  تابع آخر التنبيهات والأحداث في النظام
                </p>
              </div>

              {/* Total */}
              <div
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-800
                  bg-[#1A1A1A]
                  px-4
                  py-3
                  sm:w-auto
                  sm:min-w-[150px]
                  sm:px-5
                "
              >
                <p className="text-xs text-gray-400">
                  إجمالي التنبيهات
                </p>

                <p
                  className="
                    mt-1
                    text-xl
                    font-bold
                    text-[#B8C9FF]
                    sm:text-2xl
                  "
                >
                  {notifications.length}
                </p>
              </div>
            </div>

            {/* ======================================
                Search
            ====================================== */}
            <div className="mt-5 sm:mt-6">
              <input
                type="text"
                placeholder="ابحث في التنبيهات..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-800
                  bg-[#1A1A1A]
                  px-4
                  py-3
                  text-sm
                  text-white
                  placeholder-gray-500
                  outline-none
                  transition
                  focus:border-[#B8C9FF]
                  sm:px-5
                  sm:py-4
                  sm:text-base
                "
              />
            </div>
          </div>

          {/* ======================================
              Filters
          ====================================== */}
          <FilterTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* ======================================
              Notifications
          ====================================== */}
          <NotificationList
            notifications={notifications}
            activeTab={activeTab}
            search={search}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
}