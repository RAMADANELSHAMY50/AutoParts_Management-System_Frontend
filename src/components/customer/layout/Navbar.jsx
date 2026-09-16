import { useEffect, useState } from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import {
  ShoppingCartIcon,
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useAuth } from "../../../store/Auth.jsx";

const API_URL = "http://localhost:1337";

export default function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [profileUser, setProfileUser] =
    useState(user);

  const [cartCount, setCartCount] =
    useState(0);

  const [notifications, setNotifications] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  // ==========================================
  // Sync profile user
  // ==========================================
  useEffect(() => {
    setProfileUser(user);
  }, [user]);

  // ==========================================
  // Get Current User
  // ==========================================
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await axios.get(
          `${API_URL}/api/users/me?populate=avatar`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfileUser(response.data);

        localStorage.setItem(
          "user",
          JSON.stringify(response.data)
        );
      } catch (error) {
        console.error(
          "Failed to fetch current user:",
          error
        );
      }
    };

    getCurrentUser();
  }, []);

  // ==========================================
  // Cart Count
  // ==========================================
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const savedCart =
          localStorage.getItem("cart");

        if (!savedCart) {
          setCartCount(0);
          return;
        }

        const cart = JSON.parse(savedCart);

        if (!Array.isArray(cart)) {
          setCartCount(0);
          return;
        }

        const count = cart.reduce(
          (total, item) =>
            total + Number(item.quantity || 1),
          0
        );

        setCartCount(count);
      } catch (error) {
        console.error(
          "Failed to read cart:",
          error
        );

        setCartCount(0);
      }
    };

    updateCartCount();

    window.addEventListener(
      "cartUpdated",
      updateCartCount
    );

    window.addEventListener(
      "storage",
      updateCartCount
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );

      window.removeEventListener(
        "storage",
        updateCartCount
      );
    };
  }, []);

  // ==========================================
  // Notifications
  // ==========================================
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token || !user?.id) {
          setNotifications([]);
          return;
        }

        const response = await axios.get(
          `${API_URL}/api/notifications?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const allNotifications =
          response.data?.data || [];

        const currentUserNotifications =
          allNotifications.filter(
            (notification) => {
              const notificationUser =
                notification
                  ?.users_permissions_users;

              if (!notificationUser) {
                return false;
              }

              if (
                Array.isArray(
                  notificationUser
                )
              ) {
                return notificationUser.some(
                  (item) =>
                    String(item?.id || "") ===
                      String(user?.id || "") ||
                    String(
                      item?.documentId || ""
                    ) ===
                      String(
                        user?.documentId || ""
                      )
                );
              }

              return (
                String(
                  notificationUser?.id || ""
                ) ===
                  String(user?.id || "") ||
                String(
                  notificationUser?.documentId ||
                    ""
                ) ===
                  String(
                    user?.documentId || ""
                  )
              );
            }
          );

        const unreadNotifications =
          currentUserNotifications.filter(
            (notification) => {
              const data =
                notification?.attributes ||
                notification;

              return data?.isRead !== true;
            }
          );

        setNotifications(
          unreadNotifications
        );
      } catch (error) {
        console.error(
          "Failed to fetch notifications:",
          error
        );

        setNotifications([]);
      }
    };

    getNotifications();

    const handleNotificationsUpdated =
      () => {
        console.log(
          "🔔 Navbar: notifications updated"
        );

        getNotifications();
      };

    window.addEventListener(
      "notificationsUpdated",
      handleNotificationsUpdated
    );

    const handleStorage = (event) => {
      if (
        event.key === "user" ||
        event.key === "token"
      ) {
        getNotifications();
      }
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "notificationsUpdated",
        handleNotificationsUpdated
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, [user]);

  // ==========================================
  // Logout
  // ==========================================
  const handleLogout = () => {
    logout();

    setProfileUser(null);
    setNotifications([]);
    setCartCount(0);

    setOpen(false);
    setProfileOpen(false);

    navigate("/login", {
      replace: true,
    });
  };

  // ==========================================
  // Profile Image
  // ==========================================
  const getAvatarUrl = () => {
    const avatar = profileUser?.avatar;

    if (!avatar) {
      return null;
    }

    const image =
      avatar?.data?.attributes ||
      avatar?.data ||
      avatar;

    if (typeof image === "string") {
      return image.startsWith("http")
        ? image
        : `${API_URL}${image}`;
    }

    if (image?.url) {
      return image.url.startsWith("http")
        ? image.url
        : `${API_URL}${image.url}`;
    }

    return null;
  };

  const avatarUrl = getAvatarUrl();

  // ==========================================
  // Active Link
  // ==========================================
  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-[#B3C5FF]"
        : "text-[#C2C6D8] hover:text-[#B3C5FF]"
    }`;

  return (
    <nav
      dir="rtl"
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-[#2A2A2A]
        bg-[#131313]/95
        backdrop-blur
      "
    >
      {/* ======================================
          Navbar Container
      ====================================== */}
      <div
        className="
          mx-auto
          flex
          h-20
          w-full
          items-center
          justify-between

          px-3

          sm:px-4

          md:px-5

          lg:px-6

          xl:px-8

          2xl:px-10
        "
      >
        {/* ======================================
            Logo
        ====================================== */}
        <NavLink
          to="/home"
          className="
            shrink-0
            text-2xl
            font-bold
            text-[#B3C5FF]
          "
        >
          زيدان
        </NavLink>

        {/* ======================================
            Desktop Navigation
        ====================================== */}
        <div
          className="
            hidden
            items-center
            gap-6

            md:flex

            lg:gap-8
          "
        >
          <NavLink
            to="/home"
            className={navLinkClass}
          >
            الرئيسية
          </NavLink>

          <NavLink
            to="/catalog"
            className={navLinkClass}
          >
            المنتجات
          </NavLink>

          <NavLink
            to="/myorder"
            className={navLinkClass}
          >
            طلباتي
          </NavLink>

          <NavLink
            to="/support"
            className={navLinkClass}
          >
            الدعم
          </NavLink>
        </div>

        {/* ======================================
            Desktop Actions
        ====================================== */}
        <div
          className="
            hidden
            items-center
            gap-3

            md:flex

            lg:gap-4
          "
        >
          {/* Cart */}
          <button
            type="button"
            onClick={() =>
              navigate("/cart")
            }
            className="
              relative
              text-[#C2C6D8]
              transition
              hover:text-[#B3C5FF]
            "
          >
            <ShoppingCartIcon className="h-6 w-6" />

            {cartCount > 0 && (
              <span
                className="
                  absolute
                  -right-2
                  -top-2
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-[#0066FF]
                  px-1
                  text-[10px]
                  text-white
                "
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Notifications */}
          <button
            type="button"
            onClick={() =>
              navigate(
                "/customer/notifications"
              )
            }
            className="
              relative
              text-[#C2C6D8]
              transition
              hover:text-[#B3C5FF]
            "
          >
            <BellIcon className="h-6 w-6" />

            {notifications.length > 0 && (
              <span
                className="
                  absolute
                  -right-2
                  -top-2
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  px-1
                  text-[10px]
                  text-white
                "
              >
                {notifications.length}
              </span>
            )}
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setProfileOpen(
                  (previous) => !previous
                )
              }
              className="
                flex
                items-center
                gap-2
              "
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="
                    h-10
                    w-10
                    shrink-0
                    rounded-full
                    border
                    border-[#3A3939]
                    object-cover
                  "
                  onError={(event) => {
                    event.currentTarget.style.display =
                      "none";
                  }}
                />
              ) : (
                <UserCircleIcon className="h-10 w-10 text-[#C2C6D8]" />
              )}

              <div className="text-right">
                <p className="text-sm font-semibold text-white">
                  {profileUser?.username ||
                    profileUser?.name ||
                    "المستخدم"}
                </p>

                <p className="text-xs text-[#8C90A1]">
                  حسابي
                </p>
              </div>
            </button>

            {profileOpen && (
              <div
                className="
                  absolute
                  left-0
                  top-14
                  z-50
                  w-52
                  rounded-xl
                  border
                  border-[#333]
                  bg-[#1A1A1A]
                  p-2
                  shadow-xl
                "
              >
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);

                    navigate(
                      "/customer/settings"
                    );
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-3
                    text-right
                    text-sm
                    text-[#C2C6D8]
                    transition
                    hover:bg-[#252525]
                    hover:text-white
                  "
                >
                  <Cog6ToothIcon className="h-5 w-5" />
                  الإعدادات
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-3
                    text-right
                    text-sm
                    text-red-400
                    transition
                    hover:bg-[#252525]
                  "
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ======================================
            Mobile Menu Button
        ====================================== */}
        <button
          type="button"
          onClick={() =>
            setOpen(
              (previous) => !previous
            )
          }
          className="
            text-[#C2C6D8]
            md:hidden
          "
        >
          {open ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>
      </div>

      {/* ========================================
          Mobile Menu
      ======================================== */}
      {open && (
        <div
          className="
            w-full
            border-t
            border-[#2A2A2A]
            bg-[#131313]
            px-4
            py-5

            sm:px-5

            md:hidden
          "
        >
          <div className="flex flex-col gap-5">
            <NavLink
              to="/home"
              onClick={() =>
                setOpen(false)
              }
              className={navLinkClass}
            >
              الرئيسية
            </NavLink>

            <NavLink
              to="/catalog"
              onClick={() =>
                setOpen(false)
              }
              className={navLinkClass}
            >
              المنتجات
            </NavLink>

            <NavLink
              to="/myorder"
              onClick={() =>
                setOpen(false)
              }
              className={navLinkClass}
            >
              طلباتي
            </NavLink>

            <NavLink
              to="/support"
              onClick={() =>
                setOpen(false)
              }
              className={navLinkClass}
            >
              الدعم
            </NavLink>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate("/cart");
              }}
              className="
                flex
                items-center
                gap-3
                text-right
                text-[#C2C6D8]
              "
            >
              <ShoppingCartIcon className="h-5 w-5" />
              السلة

              {cartCount > 0 && (
                <span className="rounded-full bg-[#0066FF] px-2 py-0.5 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen(false);

                navigate(
                  "/customer/notifications"
                );
              }}
              className="
                flex
                items-center
                gap-3
                text-right
                text-[#C2C6D8]
              "
            >
              <BellIcon className="h-5 w-5" />
              الإشعارات

              {notifications.length > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                  {notifications.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen(false);

                navigate(
                  "/customer/settings"
                );
              }}
              className="
                flex
                items-center
                gap-3
                text-right
                text-[#C2C6D8]
              "
            >
              <Cog6ToothIcon className="h-5 w-5" />
              الإعدادات
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="
                flex
                items-center
                gap-3
                text-right
                text-red-400
              "
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}