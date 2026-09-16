import React from "react";
import {
  HiOutlineCloudArrowUp,
  HiOutlineArrowPath,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { FiDatabase } from "react-icons/fi";

const actions = [
  {
    id: 1,
    title: "System Name",
    description: "AutoParts Management System",
    icon: <FiDatabase size={24} />,
    color: "text-blue-300",
  },
  {
    id: 2,
    title: "Version",
    description: "1.0.0",
    icon: <HiOutlineShieldCheck size={24} />,
    color: "text-emerald-300",
  },
  {
    id: 3,
    title: "Backend",
    description: "Strapi",
    icon: <HiOutlineCloudArrowUp size={24} />,
    color: "text-cyan-300",
  },
  {
    id: 4,
    title: "Frontend",
    description: "React",
    icon: <HiOutlineArrowPath size={24} />,
    color: "text-red-400",
  },
];

export default function ActionCards() {
  return (
    <div
      dir="rtl"
      className="
        grid
        grid-cols-1
        gap-3
        sm:grid-cols-2
        sm:gap-4
        lg:grid-cols-4
        lg:gap-6
      "
    >
      {actions.map((item) => (
        <div
          key={item.id}
          className="
            flex
            min-w-0
            flex-col
            justify-between
            rounded-xl
            border
            border-zinc-800
            bg-[#171717]
            p-4
            transition-all
            duration-300
            hover:border-indigo-400
            sm:rounded-2xl
            sm:p-5
            lg:p-6
          "
        >
          {/* Icon */}
          <div
            className={`
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#222]
              sm:h-14
              sm:w-14
              ${item.color}
            `}
          >
            {item.icon}
          </div>

          {/* Content */}
          <div className="mt-4 min-w-0 sm:mt-5">
            <h3
              className="
                mb-1
                break-words
                text-right
                text-base
                font-semibold
                text-white
                sm:mb-2
                sm:text-lg
              "
            >
              {item.title}
            </h3>

            <p
              className="
                break-words
                text-right
                text-sm
                leading-6
                text-zinc-400
              "
            >
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}