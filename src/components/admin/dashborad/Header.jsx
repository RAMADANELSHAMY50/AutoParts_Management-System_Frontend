import {
  FiSearch,
  FiBell,
  FiCalendar,
  FiMoon,
} from "react-icons/fi";

export default function Header() {
  return (
    <header className=" border-b border-gray-800 px-8 py-5">

      <div className="flex items-center justify-between">


        {/* Search */}
        <div className="relative w-[450px]">

          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />

          <input
            type="text"
            placeholder="البحث عن منتج، عميل أو فاتورة..."
            className="w-full bg-[#1C1C1C] border border-gray-700 rounded-full py-3 pr-12 pl-5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Left */}
        <div className="flex items-center gap-6">

          {/* Notification */}
          <button className="relative text-gray-300 hover:text-white transition">
            <FiBell size={24} />

            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          {/* Dark Mode */}
          <button className="text-gray-300 hover:text-white transition">
            <FiMoon size={24} />
          </button>

        </div>

      </div>

    </header>
  );
}