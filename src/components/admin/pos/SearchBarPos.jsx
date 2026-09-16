import React, { useState } from "react";
import {
  MdSearch,
  MdQrCodeScanner,
} from "react-icons/md";

export default function SearchBar({
  allProducts = [],
  setProducts,
}) {
  const [search, setSearch] = useState("");

  const handleSearch = (value) => {
    setSearch(value);

    if (value.trim() === "") {
      setProducts([]);
      return;
    }

    const searchValue =
      value.toLowerCase().trim();

    const filteredProducts =
      allProducts.filter((product) =>
        String(product.name || "")
          .toLowerCase()
          .includes(searchValue)
      );

    setProducts(filteredProducts);
  };

  return (
    <div className="border-b border-zinc-800 bg-[#111111] px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5">
      <div className="w-full max-w-xl">
        <div className="relative">
          {/* Search Icon */}
          <MdSearch
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 sm:right-4"
            size={20}
          />

          {/* QR Icon */}
          <MdQrCodeScanner
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 sm:left-4"
            size={20}
          />

          <input
            value={search}
            onChange={(e) =>
              handleSearch(e.target.value)
            }
            type="text"
            placeholder="ابحث بالباركود أو اسم المنتج..."
            className="h-11 w-full rounded-xl border border-zinc-700 bg-[#1a1a1a] py-2 pl-11 pr-11 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500 sm:h-12 sm:pl-12 sm:pr-12 sm:text-base lg:h-14"
          />
        </div>
      </div>
    </div>
  );
}