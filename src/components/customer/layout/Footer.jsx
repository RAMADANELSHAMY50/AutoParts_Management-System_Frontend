import React from "react";

import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMapPin,
  FiMail,
  FiPhone,
} from "react-icons/fi";

import { Link } from "react-router-dom";

export default function Footer() {
  // ==========================================
  // Quick Links
  // ==========================================
  const quickLinks = [
    {
      name: "الرئيسية",
      path: "/home",
    },
    {
      name: "المنتجات",
      path: "/catalog",
    },
    {
      name: "طلباتي",
      path: "/myorder",
    },
    {
      name: "الدعم",
      path: "/support",
    },
  ];

  // ==========================================
  // Categories
  // ==========================================
  const categories = [
    "قطع المحرك",
    "نظام الفرامل",
    "نظام التعليق",
    "الجنوط والإطارات",
    "الإكسسوارات الداخلية",
  ];

  return (
    <footer
      dir="rtl"
      className="
        w-full
        border-t
        border-zinc-800
        bg-[#0D0D0D]
      "
    >
      {/* ======================================
          Footer Content
      ====================================== */}
      <div
        className="
          mx-auto
          w-full
          px-4
          py-12

          sm:px-5
          sm:py-14

          lg:px-6
          lg:py-16

          xl:px-8

          2xl:px-10
        "
      >
        <div
          className="
            grid
            gap-10

            sm:grid-cols-2

            lg:grid-cols-4
          "
        >
          {/* ==================================
              Brand
          ================================== */}
          <div className="text-right">
            <h2
              className="
                text-2xl
                font-bold
                text-white

                sm:text-3xl
              "
            >
              <span className="text-indigo-500">
                Apex
              </span>{" "}
              Auto
            </h2>

            <p
              className="
                mt-4
                text-sm
                leading-7
                text-zinc-400

                sm:mt-5
              "
            >
              نوفر لك أفضل قطع غيار وإكسسوارات
              السيارات بجودة عالية، وأداء متميز،
              وأسعار تنافسية.
            </p>

            {/* Social Media */}
            <div
              className="
                mt-5
                flex
                justify-start
                gap-3

                sm:mt-6
                sm:gap-4
              "
            >
              {[
                FiFacebook,
                FiTwitter,
                FiInstagram,
                FiLinkedin,
              ].map((Icon, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label="وسائل التواصل الاجتماعي"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-zinc-800
                    text-zinc-300
                    transition
                    hover:bg-indigo-600
                    hover:text-white

                    sm:h-11
                    sm:w-11
                  "
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* ==================================
              Quick Links
          ================================== */}
          <div className="text-right">
            <h3
              className="
                mb-4
                text-lg
                font-semibold
                text-white

                sm:mb-5
                sm:text-xl
              "
            >
              روابط سريعة
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="
                      text-sm
                      text-zinc-400
                      transition
                      hover:text-indigo-400

                      sm:text-base
                    "
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ==================================
              Categories
          ================================== */}
          <div className="text-right">
            <h3
              className="
                mb-4
                text-lg
                font-semibold
                text-white

                sm:mb-5
                sm:text-xl
              "
            >
              الفئات
            </h3>

            <ul className="space-y-3">
              {categories.map(
                (item, index) => (
                  <li
                    key={index}
                    className="
                      cursor-pointer
                      text-sm
                      text-zinc-400
                      transition
                      hover:text-indigo-400

                      sm:text-base
                    "
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* ==================================
              Contact
          ================================== */}
          <div className="text-right">
            <h3
              className="
                mb-4
                text-lg
                font-semibold
                text-white

                sm:mb-5
                sm:text-xl
              "
            >
              تواصل معنا
            </h3>

            <div className="space-y-5">
              {/* Location */}
              <div className="flex items-start gap-3">
                <FiMapPin
                  className="
                    mt-1
                    shrink-0
                    text-indigo-500
                  "
                  size={18}
                />

                <span className="text-sm text-zinc-400 sm:text-base">
                  كفرالشيخ، مصر
                </span>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <FiMail
                  className="
                    mt-1
                    shrink-0
                    text-indigo-500
                  "
                  size={18}
                />

                <span
                  dir="ltr"
                  className="
                    break-all
                    text-sm
                    text-zinc-400

                    sm:text-base
                  "
                >
                  elshamyramadan203@gmail.com
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <FiPhone
                  className="
                    mt-1
                    shrink-0
                    text-indigo-500
                  "
                  size={18}
                />

                <span
                  dir="ltr"
                  className="
                    text-sm
                    text-zinc-400

                    sm:text-base
                  "
                >
                  +20 106 875 2427
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================
            Bottom
        ====================================== */}
        <div
          className="
            mt-10
            flex
            flex-col
            items-center
            justify-between
            gap-4
            border-t
            border-zinc-800
            pt-6

            sm:mt-12
            sm:pt-7

            md:flex-row
          "
        >
          {/* Copyright */}
          <p
            className="
              text-center
              text-xs
              text-zinc-500

              sm:text-sm

              md:text-right
            "
          >
            © {new Date().getFullYear()} Apex
            Auto. جميع الحقوق محفوظة.
          </p>

          {/* Policies */}
          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-4
              text-xs

              sm:gap-6
              sm:text-sm
            "
          >
            <Link
              to="/privacy"
              className="
                text-zinc-500
                transition
                hover:text-white
              "
            >
              سياسة الخصوصية
            </Link>

            <Link
              to="/terms"
              className="
                text-zinc-500
                transition
                hover:text-white
              "
            >
              شروط الاستخدام
            </Link>

            <Link
              to="/cookies"
              className="
                text-zinc-500
                transition
                hover:text-white
              "
            >
              ملفات تعريف الارتباط
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}