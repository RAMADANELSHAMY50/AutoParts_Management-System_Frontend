// import React from "react";
// import {
//   MdNotificationsNone,
//   MdKeyboardArrowDown,
//   MdOutlinePersonAddAlt,
// } from "react-icons/md";
// import { HiOutlineMoon } from "react-icons/hi2";

// export default function Header() {
//   return (
//     <header className="h-20 border-b border-zinc-800 bg-[#111111] px-6 flex items-center justify-between">

//       {/* Left */}
//       <div className="flex items-center gap-5">

//         {/* Dark Mode */}
//         <button className="w-10 h-10 rounded-full bg-[#1b1b1b] border border-zinc-700 flex items-center justify-center hover:bg-[#252525] transition">
//           <HiOutlineMoon className="text-xl text-white" />
//         </button>

//         {/* Notifications */}
//         <button className="relative w-10 h-10 rounded-full bg-[#1b1b1b] border border-zinc-700 flex items-center justify-center hover:bg-[#252525] transition">
//           <MdNotificationsNone className="text-2xl text-white" />

//           <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
//         </button>

//       </div>

//       {/* Center */}
//       <div className="flex items-center gap-2 cursor-pointer">

//         <span className="text-gray-300 font-medium">
//           عميل نقدي (افتراضي)
//         </span>

//         <MdKeyboardArrowDown className="text-gray-400 text-xl" />

//         <button className="w-9 h-9 rounded-full bg-[#1b1b1b] border border-zinc-700 flex items-center justify-center hover:bg-[#252525] transition">
//           <MdOutlinePersonAddAlt className="text-blue-400 text-xl" />
//         </button>

//       </div>

//       {/* Right */}
//       <div className="text-right">

//         <p className="text-xs text-gray-500">
//           نقطة البيع
//         </p>

//         <h2 className="text-lg font-semibold text-white">
//           جهاز 01 - الفرع الرئيسي
//         </h2>

//       </div>

//     </header>
//   );
// }