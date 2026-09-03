import {
  FiGrid,
  FiShoppingBag,
  FiHeart,
  FiBell,
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

const menuItems = [
  {
    id: 1,
    icon: <FiGrid size={20} />,
    label: "Dashboard",
    active: true,
  },
  {
    id: 2,
    icon: <FiShoppingBag size={20} />,
    label: "Orders",
  },
  {
    id: 3,
    icon: <FiHeart size={20} />,
    label: "Wishlist",
  },
  {
    id: 4,
    icon: <FiBell size={20} />,
    label: "Notifications",
  },
  {
    id: 5,
    icon: <FiUser size={20} />,
    label: "Profile",
  },
  {
    id: 6,
    icon: <FiSettings size={20} />,
    label: "Settings",
  },
  {
    id: 7,
    icon: <FiHelpCircle size={20} />,
    label: "Support",
  },
];

const RightMenu = () => {
  return (
    <aside className="sticky top-6 flex h-fit w-20 flex-col items-center justify-between rounded-3xl border border-zinc-800 bg-[#181818] py-6">
      {/* Logo */}
      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-bold text-white">
        A
      </div>

      {/* Menu */}
      <div className="flex flex-1 flex-col items-center gap-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            title={item.label}
            className={`group flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${
              item.active
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>

      {/* Logout */}
      <button
        title="Logout"
        className="mt-8 flex h-12 w-12 items-center justify-center rounded-xl text-red-400 transition hover:bg-red-500 hover:text-white"
      >
        <FiLogOut size={20} />
      </button>
    </aside>
  );
};

export default RightMenu;