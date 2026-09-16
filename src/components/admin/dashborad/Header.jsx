import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FiBell,
  FiMoon,
} from "react-icons/fi";

import { MdMenu } from "react-icons/md";

import { HiOutlineUserCircle } from "react-icons/hi2";

const API_URL = "http://localhost:1337";

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  // ==========================================
  // Get Admin Avatar
  // ==========================================
  useEffect(() => {
    const getAdmin = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const response = await axios.get(
          `${API_URL}/api/users/me?populate=avatar`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = response.data;

        const imageUrl =
          user.avatar?.url ||
          user.avatar?.formats?.thumbnail?.url ||
          "";

        if (imageUrl) {
          setAvatar(
            imageUrl.startsWith("http")
              ? imageUrl
              : `${API_URL}${imageUrl}`
          );
        }
      } catch (error) {
        console.error(
          "HEADER USER ERROR:",
          error.response?.data || error.message
        );
      }
    };

    getAdmin();
  }, []);

  // ==========================================
  // Get Unread Notifications
  // ==========================================
  const getUnreadNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await axios.get(
        `${API_URL}/api/notifications`,
        {
          params: {
            "filters[isRead][$eq]": false,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const notifications = response.data?.data || [];

      setUnreadCount(notifications.length);
    } catch (error) {
      console.error(
        "GET UNREAD NOTIFICATIONS ERROR:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================================
  // Notifications Polling
  // ==========================================
  useEffect(() => {
    getUnreadNotifications();

    const interval = setInterval(() => {
      getUnreadNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ==========================================
  // Notification Click
  // ==========================================
  const handleNotificationClick = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/notifications");
        return;
      }

      const response = await axios.get(
        `${API_URL}/api/notifications`,
        {
          params: {
            "filters[isRead][$eq]": false,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const notifications = response.data?.data || [];

      await Promise.all(
        notifications.map((notification) =>
          axios.put(
            `${API_URL}/api/notifications/${notification.documentId}`,
            {
              data: {
                isRead: true,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
        )
      );

      setUnreadCount(0);

      navigate("/notifications");
    } catch (error) {
      console.error(
        "NOTIFICATION CLICK ERROR:",
        error.response?.data || error.message
      );

      navigate("/notifications");
    }
  };

  return (
    <header
      dir="rtl"
      className="w-full border-b border-gray-800 px-2 py-3 sm:px-4 sm:py-4 lg:px-8 lg:py-5"
    >
      <div className="flex w-full items-center justify-between gap-3">

        {/* ==========================================
            Right Side - Menu + Title
        ========================================== */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-700 bg-[#181818] text-gray-200 transition hover:bg-[#242424] active:scale-95 lg:hidden"
            aria-label="فتح القائمة"
            title="فتح القائمة"
          >
            <MdMenu size={24} />
          </button>

          {/* Page Title */}
          <h2 className="truncate text-lg font-bold text-white sm:text-xl lg:text-2xl">
            لوحة التحكم
          </h2>
        </div>

        {/* ==========================================
            Left Side - Actions
        ========================================== */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-6">

          {/* Notifications */}
          <button
            type="button"
            onClick={handleNotificationClick}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-300 transition hover:bg-[#222] hover:text-white sm:h-10 sm:w-10"
            aria-label="التنبيهات"
            title="التنبيهات"
          >
            <FiBell className="h-5 w-5 sm:h-6 sm:w-6" />

            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white sm:min-w-[20px] sm:text-xs">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {/* Dark Mode */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-300 transition hover:bg-[#222] hover:text-white sm:h-10 sm:w-10"
            aria-label="الوضع الداكن"
            title="الوضع الداكن"
          >
            <FiMoon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Admin Avatar */}
          <button
            type="button"
            className="flex shrink-0 items-center justify-center"
            aria-label="الملف الشخصي"
            title="الملف الشخصي"
          >
            {avatar ? (
              <img
                src={avatar}
                alt="المسؤول"
                className="h-8 w-8 rounded-full border-2 border-indigo-300 object-cover sm:h-10 sm:w-10 lg:h-11 lg:w-11"
              />
            ) : (
              <HiOutlineUserCircle className="h-8 w-8 text-indigo-300 sm:h-10 sm:w-10 lg:h-11 lg:w-11" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}