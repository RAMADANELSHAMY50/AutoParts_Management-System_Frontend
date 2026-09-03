// import React, { useState } from "react";

// const categories = [
//   "الكل",
//   "إضاءة",
//   "إطارات",
//   "حماية",
//   "زيوت",
//   "إلكترونيات",
// ];

// export default function CategoryTabs() {
//   const [activeCategory, setActiveCategory] = useState("الكل");

//   return (
//     <div className="bg-[#111111] px-6 py-4 border-b border-zinc-800">
//       <div className="flex items-center justify-between">

//         {/* Categories */}
//         <div className="flex gap-3 flex-wrap">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveCategory(category)}
//               className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
//                 ${
//                   activeCategory === category
//                     ? "bg-blue-600 text-white border border-blue-500 shadow-lg shadow-blue-600/20"
//                     : "bg-[#232323] text-gray-300 hover:bg-[#2d2d2d] border border-transparent"
//                 }
//               `}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* Title */}
//         <h2 className="text-white font-semibold text-lg">
//           نقطة البيع
//         </h2>

//       </div>
//     </div>
//   );
// }