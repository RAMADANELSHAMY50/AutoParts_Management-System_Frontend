import React from "react";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMapPin,
  FiMail,
  FiPhone,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const categories = [
    "Engine Parts",
    "Brake System",
    "Suspension",
    "Wheels & Tires",
    "Interior",
  ];

  return (
    <footer className="bg-[#0D0D0D] border-t border-zinc-800">

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              <span className="text-indigo-500">Apex</span> Auto
            </h2>

            <p className="mt-5 text-zinc-400 leading-7">
              Premium automotive parts and accessories designed for performance,
              durability, and style.
            </p>

            <div className="mt-6 flex gap-4">
              {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map(
                (Icon, index) => (
                  <button
                    key={index}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition hover:bg-indigo-600 hover:text-white"
                  >
                    <Icon size={18} />
                  </button>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-zinc-400 hover:text-indigo-400 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Categories
            </h3>

            <ul className="space-y-3">
              {categories.map((item, index) => (
                <li
                  key={index}
                  className="text-zinc-400 hover:text-indigo-400 cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Contact Us
            </h3>

            <div className="space-y-5">
              <div className="flex gap-3">
                <FiMapPin
                  className="text-indigo-500 mt-1"
                  size={18}
                />
                <span className="text-zinc-400">
                  Cairo, Egypt
                </span>
              </div>

              <div className="flex gap-3">
                <FiMail
                  className="text-indigo-500 mt-1"
                  size={18}
                />
                <span className="text-zinc-400">
                  support@apexauto.com
                </span>
              </div>

              <div className="flex gap-3">
                <FiPhone
                  className="text-indigo-500 mt-1"
                  size={18}
                />
                <span className="text-zinc-400">
                  +20 100 123 4567
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Apex Auto. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link
              to="/privacy"
              className="text-zinc-500 hover:text-white transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-zinc-500 hover:text-white transition"
            >
              Terms of Service
            </Link>

            <Link
              to="/cookies"
              className="text-zinc-500 hover:text-white transition"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}