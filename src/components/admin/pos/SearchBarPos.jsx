import React, { useState } from "react";
import { MdSearch, MdQrCodeScanner } from "react-icons/md";

export default function SearchBar({ allProducts=[] ,setProducts }) {
  const [search, setSearch] = useState("");
  const handleSearch = (value) => {
    setSearch(value);

    if (value.trim() === "") {
      setProducts([]);
      return;
    }

    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase()),
    );

    setProducts(filteredProducts);
  };
  return (
    <div className="px-6 py-5 bg-[#111111] border-b border-zinc-800 ">
      <div className="relative max-w-xl">
        {/* Search Icon */}
        <MdSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          size={22}
        />

        {/* Barcode Icon */}
        <MdQrCodeScanner
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
          size={22}
        />

        {/* Input */}
        <input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          placeholder="ابحث بالباركود أو اسم المنتج..."
          className="
            w-full
            h-14
            rounded-xl
            bg-[#1a1a1a]
            border
            border-zinc-700
            px-14
            text-white
            placeholder:text-zinc-500
            focus:outline-none
            focus:border-blue-500
            transition
          "
        />
      </div>
    </div>
  );
}
