import React from "react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function CustomerRow({ customer }) {
  return (
    <tr className="border-b border-zinc-800 hover:bg-[#1E1E1E] transition-colors">
      {/* Customer */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">

          <div>
            <h3 className="font-semibold text-white">{customer.username}</h3>

            <p className="mt-1 text-sm text-zinc-400">
              {customer.type}
            </p>
          </div>
        </div>
      </td>

      {/* Contact */}
      <td className="px-6 py-5">
        <div className="space-y-1">
          <p className="text-white">{customer.phone}</p>

          <p className="text-sm text-zinc-400">
            {customer.email}
          </p>
        </div>
      </td>

      {/* Purchases */}
      <td className="px-6 py-5">
        <div>
          <p className="font-semibold text-white">
            {customer.total}
          </p>

          <p className="text-sm text-zinc-400">
            {customer.invoices} فاتورة
          </p>
        </div>
      </td>

      {/* Last Visit */}
      <td className="px-6 py-5">
        <div>
          <p className="text-white">{customer.updatedAt}</p>

          <p className="text-sm text-zinc-400">
            {customer.since}
          </p>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <span
          className={`inline-flex items-center rounded-full px-4 py-1 text-sm font-medium ${
            customer.status === "نشط"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          <span
            className={`mr-2 h-2 w-2 rounded-full ${
              customer.status === "نشط"
                ? "bg-green-400"
                : "bg-red-400"
            }`}
          ></span>

          {customer.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex justify-center gap-2">
          <button className="rounded-lg bg-[#242424] p-2 text-zinc-300 transition hover:bg-blue-500 hover:text-white">
            <FiEye size={18} />
          </button>

          <button className="rounded-lg bg-[#242424] p-2 text-zinc-300 transition hover:bg-yellow-500 hover:text-white">
            <FiEdit2 size={18} />
          </button>

          <button className="rounded-lg bg-[#242424] p-2 text-zinc-300 transition hover:bg-red-500 hover:text-white">
            <FiTrash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}