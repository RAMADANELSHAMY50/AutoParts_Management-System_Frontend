import {
  MdDashboard,
  MdInventory2,
  MdCategory,
  MdPeople,
  MdPointOfSale,
  MdReceiptLong,
  MdBarChart,
  MdNotifications,
  MdSettings,
} from "react-icons/md";
import profile from "../../../assets/images/img_login.png"

import { FaCarSide } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

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
    title: "التقارير",
    icon: <MdBarChart size={22} />,
    path: "/reports",
  },
  {
    title: "الاعدادات",
    icon: <MdSettings  size={22} />,
    path: "/settings",
  },
  {
    title: "التنبيهات",
    icon: <MdNotifications  size={22} />,
    path: "/notifications",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 h-fit bg-[#161616] border-l border-gray-800 flex flex-col justify-between">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-3 px-6 py-8 border-b border-gray-800">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
            <FaCarSide className="text-white text-2xl" />
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold">زيدان</h2>
            <h3 className="text-blue-500 text-xl font-bold">أكسسوار</h3>
            <p className="text-xs text-gray-400">نظام إدارة الاحتراف</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="mt-6 px-4 space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-[#262730] border-r-4 border-blue-500 text-white"
                    : "text-gray-400 hover:bg-[#202020] hover:text-white"
                }`
              }
            >
              <span>{item.title}</span>
              {item.icon}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Settings */}
      <div className="border-t border-gray-800 p-4 flex gap-3.5 mt-50">
        <img src={profile} alt="" className="w-8 rounded-full border border-[#262626] " />
        <div className="">
          <h2 className="font-medium text-lg">ahmed ail</h2>
          <p>dfcv fd</p>
        </div>
      </div>
    </aside>
  );
}
