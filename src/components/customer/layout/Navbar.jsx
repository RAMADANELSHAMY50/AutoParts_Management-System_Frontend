import React, { useState } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiBell,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Catalog", path: "/catalog" },
    { name: "MyOrder", path: "/myorder" },
    { name: "Support", path: "/support" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#111111]/95 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold tracking-wide text-white"
        >
          <span className="text-indigo-300">زيدان</span> 
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`transition text-sm ${
                item.name === "Home"
                  ? "text-white border-b-2 border-indigo-400 pb-1"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="hidden md:flex items-center bg-[#1A1A1A] border border-zinc-700 rounded-full px-4 py-2 w-72">
          <FiSearch className="text-zinc-500" />

          <input
            type="text"
            placeholder="Search for auto parts..."
            className="bg-transparent flex-1 ml-3 text-sm text-white placeholder:text-zinc-500 outline-none"
          />
        </div>

        {/* Icons */}
        <div className="hidden lg:flex items-center gap-5 text-xl text-zinc-300">
          <button className="hover:text-white transition">
            <FiShoppingCart />
          </button>

          <button className="hover:text-white transition">
            <FiBell />
          </button>

          <button className="hover:text-white transition">
            <FiUser />
          </button>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white text-2xl"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-[#111111] border-t border-zinc-800">
          <div className="px-6 py-5 space-y-5">
            {/* Search */}
            <div className="flex items-center bg-[#1A1A1A] border border-zinc-700 rounded-full px-4 py-2">
              <FiSearch className="text-zinc-500" />

              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent flex-1 ml-3 text-white placeholder:text-zinc-500 outline-none"
              />
            </div>

            {/* Links */}
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-zinc-300 hover:text-white transition"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-6 text-2xl text-zinc-300 pt-3 border-t border-zinc-800">
              <FiShoppingCart className="cursor-pointer hover:text-white" />
              <FiBell className="cursor-pointer hover:text-white" />
              <FiUser className="cursor-pointer hover:text-white" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}