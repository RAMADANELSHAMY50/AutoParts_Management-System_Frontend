import { useState } from "react";
import { FiSearch, FiSliders } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import ProductCard from "../ProductCard";

export default function SearchBar({
  allProducts,
  setProducts,
  getStockStatus,
}) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("كل التصنيفات");
  const [selectedStock, setSelectedStock] = useState("حالة المخزون");

  const filterStock = (stockValue) => {
    setSelectedStock(stockValue);
    if (stockValue === "حالة المخزون") {
      setProducts(allProducts);
      return;
    }
    const filteredProducts = allProducts.filter((product) => {
      const stockStatus = getStockStatus(product.stock, product.minimumStock);
      return stockStatus.text === stockValue;
    });
    setProducts(filteredProducts);
  };

  const filterCategories = (category) => {
    setSelectedCategory(category);

    if (category === "كل التصنيفات") {
      setProducts(allProducts);
      return;
    }

    const filteredProducts = allProducts.filter(
      (product) => product.Categories === category,
    );

    setProducts(filteredProducts);

    console.log("Selected Category:", category);
    console.log("Filtered Products:", filteredProducts);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setProducts(allProducts);
      return;
    }

    const result = allProducts.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase()),
    );

    setProducts(result);
    console.log(result);
  };

  return (
    <div className="bg-[#171717] border border-gray-800 rounded-2xl p-4 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />

          <input
            type="text"
            placeholder="ابحث عن منتج حسب الاسم، الباركود أو العلامة التجارية..."
            className="w-full bg-[#101010] border border-gray-700 rounded-xl py-3 pr-12 pl-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={handleChange}
            value={search}
          />
        </div>

        {/* Category */}
        <div className="relative">
          <select
            className="appearance-none bg-[#101010] border border-gray-700 rounded-xl px-5 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={selectedCategory}
            onChange={(e) => filterCategories(e.target.value)}
          >
            <option value="كل التصنيفات">كل التصنيفات</option>

            <option value="هياكل خارجية">هياكل خارجية</option>

            <option value="إكسسوارات داخلية">إكسسوارات داخلية</option>

            <option value=" تعديل المحركات"> تعديل المحركات</option>

            <option value=" اضاءه">اضاءه </option>
          </select>

          <IoChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Stock */}
        <div className="relative">
          <select
            value={selectedStock}
            onChange={(e) => filterStock(e.target.value)}
            className="appearance-none bg-[#101010] border border-gray-700 rounded-xl px-5 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="حالة المخزون">حالة المخزون</option>

            <option value="نفد">نفد</option>
            <option value="منخفض">منخفض</option>
            <option value="متوفر">متوفر</option>


          </select>

          <IoChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Filter Button */}
        <button className="w-14 h-12 flex items-center justify-center rounded-xl border border-gray-700 bg-[#101010] text-gray-300 hover:bg-blue-600 hover:text-white transition">
          <FiSliders size={20} />
        </button>
      </div>
    </div>
  );
}
