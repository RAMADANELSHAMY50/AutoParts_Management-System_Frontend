import { useEffect, useState } from "react";
import axios from "axios";

import {
  MdDashboard,
  MdInventory2,
  MdCategory,
  MdPeople,
  MdPointOfSale,
  MdReceiptLong,
  MdNotifications,
  MdSettings,
  MdClose,
} from "react-icons/md";

import { Headphones } from "lucide-react";
import { FaCarSide } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi2";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/Auth";

const API_URL = "http://localhost:1337";

// ==========================================
// Sidebar Menu
// ==========================================
const menuItems = [
  {
    title: "لوحة القيادة",
    icon: <MdDashboard size={22} />,
    path: "/dashboard",
  },
  {
    title: "المنتجات",
    icon: <MdInventory2 size={22} />,
    path: "/products",
  },
  {
    title: "التصنيفات",
    icon: <MdCategory size={22} />,
    path: "/categories",
  },
  {
    title: "العملاء",
    icon: <MdPeople size={22} />,
    path: "/customers",
  },
  {
    title: "مبيعات POS",
    icon: <MdPointOfSale size={22} />,
    path: "/sales",
  },
  {
    title: "الفواتير",
    icon: <MdReceiptLong size={22} />,
    path: "/invoices",
  },
  {
    title: "الاعدادات",
    icon: <MdSettings size={22} />,
    path: "/settings",
  },
  {
    title: "التنبيهات",
    icon: <MdNotifications size={22} />,
    path: "/notifications",
  },
  {
    title: "الدعم الفني",
    icon: <Headphones size={22} />,
    path: "/admin/support",
  },
];

// ==========================================
// Sidebar
// ==========================================
export default function Sidebar({
  isMobileOpen = false,
  setIsMobileOpen = () => {},
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState("");
  const [admin, setAdmin] = useState(null);

  // ==========================================
  // Get Admin Data
  // ==========================================
  useEffect(() => {
    const getAdmin = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const response = await axios.get(
          `${API_URL}/api/users/me?populate=avatar&populate=role`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = response.data;

        setAdmin(user);

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
          "SIDEBAR USER ERROR:",
          error.response?.data || error.message
        );
      }
    };

    getAdmin();
  }, []);

  // ==========================================
  // Close Mobile Sidebar on Desktop
  // ==========================================
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen?.(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsMobileOpen]);

  // ==========================================
  // Logout
  // ==========================================
  const handleLogout = () => {
    logout();

    setIsMobileOpen?.(false);

    navigate("/login", {
      replace: true,
    });
  };

  // ==========================================
  // Navigation
  // ==========================================
  const handleNavigation = () => {
    if (window.innerWidth < 1024) {
      setIsMobileOpen?.(false);
    }
  };

  // ==========================================
  // Sidebar Content
  // ==========================================
  const SidebarContent = () => (
    <div className="flex h-full min-h-0 flex-col">
      {/* ==========================================
          Logo
      ========================================== */}
      <div className="shrink-0 border-b border-gray-800 px-5 py-6 sm:px-6 sm:py-8">
        <div className="flex items-center gap-3">
          {/* Logo Icon */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 sm:h-12 sm:w-12">
            <FaCarSide className="text-xl text-white sm:text-2xl" />
          </div>

          {/* Logo Text */}
          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold text-white sm:text-2xl">
              زيدان
            </h2>

            <h3 className="truncate text-lg font-bold text-blue-500 sm:text-xl">
              أكسسوار
            </h3>

            <p className="truncate text-[10px] text-gray-400 sm:text-xs">
              نظام إدارة الاحتراف
            </p>
          </div>
        </div>
      </div>

      {/* ==========================================
          Navigation
      ========================================== */}
      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-5 sm:px-4 sm:py-6">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavigation}
              className={({ isActive }) =>
                `flex w-full items-center justify-between rounded-xl px-3 py-3 transition sm:px-4 ${
                  isActive
                    ? "border-r-4 border-blue-500 bg-[#262730] text-white"
                    : "text-gray-400 hover:bg-[#202020] hover:text-white"
                }`
              }
            >
              {/* Menu Title */}
              <span className="truncate text-sm sm:text-base">
                {item.title}
              </span>

              {/* Menu Icon */}
              <span className="flex shrink-0 items-center justify-center">
                {item.icon}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* ==========================================
          Admin Profile
      ========================================== */}
      <div className="shrink-0 border-t border-gray-800 p-3 sm:p-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {avatar ? (
            <img
              src={avatar}
              alt={admin?.username || "المسؤول"}
              className="
                h-9
                w-9
                shrink-0
                rounded-full
                border-2
                border-indigo-300
                object-cover
                sm:h-10
                sm:w-10
              "
            />
          ) : (
            <HiOutlineUserCircle className="h-9 w-9 shrink-0 text-indigo-300 sm:h-10 sm:w-10" />
          )}

          {/* User Info */}
          <div className="min-w-0">
            <h2 className="truncate text-sm font-medium text-white sm:text-base">
              {admin?.username || "المسؤول"}
            </h2>

            <p className="truncate text-xs text-gray-400 sm:text-sm">
              {admin?.role?.name || "المسؤول"}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="
            mt-3
            flex
            w-full
            items-center
            gap-3
            rounded-lg
            px-3
            py-3
            text-sm
            text-red-400
            transition
            hover:bg-red-500/10
            sm:text-base
          "
        >
          تسجيل الخروج
        </button>
      </div>
    </div>
  );

  // ==========================================
  // Return
  // ==========================================
  return (
    <>
      {/* ==========================================
          Desktop Sidebar
          يظهر من 1024px
      ========================================== */}
      <aside
        dir="rtl"
        className="
          sticky
          top-0
          hidden
          h-screen
          w-72
          shrink-0
          border-l
          border-gray-800
          bg-[#161616]
          lg:flex
          lg:flex-col
        "
      >
        <SidebarContent />
      </aside>

      {/* ==========================================
          Mobile Overlay
      ========================================== */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen?.(false)}
          className="
            fixed
            inset-0
            z-[70]
            bg-black/60
            backdrop-blur-[2px]
            lg:hidden
          "
        />
      )}

      {/* ==========================================
          Mobile Sidebar Drawer
      ========================================== */}
      <aside
        dir="rtl"
        className={`
          fixed
          right-0
          top-0
          z-[80]
          h-screen
          w-[280px]
          max-w-[85vw]
          bg-[#161616]
          shadow-2xl
          transition-transform
          duration-300
          lg:hidden
          ${
            isMobileOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsMobileOpen?.(false)}
          className="
            absolute
            left-3
            top-3
            z-10
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-gray-700
            bg-[#202020]
            text-gray-300
            transition
            hover:bg-[#2a2a2a]
            hover:text-white
            active:scale-95
          "
          aria-label="إغلاق القائمة"
          title="إغلاق القائمة"
        >
          <MdClose size={21} />
        </button>

        <SidebarContent />
      </aside>
    </>
  );
}