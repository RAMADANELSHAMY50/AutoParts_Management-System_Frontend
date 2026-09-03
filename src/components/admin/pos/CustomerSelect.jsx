// import React from "react";
// import { MdKeyboardArrowDown, MdPersonAdd } from "react-icons/md";

// export default function CustomerSelect({
//   customers = [],
//   selectedCustomer,
//   onSelectCustomer,
//   onAddCustomer,
// }) {
//   return (
//     <div className="flex items-center gap-3">
//       {/* Customer Select */}
//       <div className="relative w-72">
//         <select
//           value={selectedCustomer}
//           onChange={(e) => onSelectCustomer(e.target.value)}
//           className="
//             appearance-none
//             w-full
//             h-11
//             rounded-xl
//             bg-[#1b1b1b]
//             border
//             border-zinc-700
//             px-4
//             pr-10
//             text-white
//             focus:outline-none
//             focus:border-blue-500
//             cursor-pointer
//           "
//         >
//           {customers.map((customer) => (
//             <option
//               key={customer.id}
//               value={customer.id}
//               className="bg-[#1b1b1b]"
//             >
//               {customer.name}
//             </option>
//           ))}
//         </select>

//         <MdKeyboardArrowDown
//           size={22}
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
//         />
//       </div>

//       {/* Add Customer */}
//       <button
//         onClick={onAddCustomer}
//         className="
//           w-11
//           h-11
//           rounded-xl
//           bg-blue-600
//           hover:bg-blue-700
//           transition
//           flex
//           items-center
//           justify-center
//         "
//       >
//         <MdPersonAdd size={22} className="text-white" />
//       </button>
//     </div>
//   );
// }