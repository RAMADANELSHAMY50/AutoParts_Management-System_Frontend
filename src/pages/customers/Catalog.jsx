import { useState } from "react";

import Navbar from "../../components/customer/layout/Navbar";
import Sidebar from "../../components/customer/layout/Sidebar";
import SortDropdown from "../../components/customer/catalog/SortDropdown";
import ProductGrid from "../../components/customer/catalog/ProductGrid";
import CatalogPagination from "../../components/customer/layout/CatalogPagination";
import FloatingCart from "../../components/customer/catalog/FloatingCart";
import Footer from "../../components/customer/layout/Footer";

const Catalog = () => {
  const [sort, setSort] = useState("الأحدث أولاً");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);

  // ==========================================
  // Cart
  // ==========================================
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  // ==========================================
  // Add To Cart
  // ==========================================
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id
      );

      let updatedCart;

      if (existingProduct) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Number(item.quantity || 1) + 1,
              }
            : item
        );
      } else {
        updatedCart = [
          ...prevCart,
          {
            ...product,
            quantity: 1,
          },
        ];
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      window.dispatchEvent(new Event("cartUpdated"));

      return updatedCart;
    });
  };

  // ==========================================
  // Cart Total
  // ==========================================
  const cartTotal = cart.reduce((total, item) => {
    const price = Number(
      item.salePrice || item.price || 0
    );

    const quantity = Number(item.quantity || 1);

    return total + price * quantity;
  }, 0);

  // ==========================================
  // Filters
  // ==========================================
  const handleCategoryChange = (value) => {
    setSelectedCategories(value);
    setCurrentPage(1);
  };

  const handleBrandChange = (value) => {
    setSelectedBrand(value);
    setCurrentPage(1);
  };

  const handlePriceChange = (value) => {
    setMaxPrice(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setCurrentPage(1);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-[#111111] text-white"
    >
      <Navbar />

      <main className="mx-auto max-w-7xl px-3 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-12 gap-4 sm:gap-8">

          {/* ========================================
              SIDEBAR
          ======================================== */}
          <aside className="col-span-12 lg:col-span-3">
            <div
              className="
                max-h-[420px]
                overflow-y-auto
                overscroll-contain
                rounded-xl
                scrollbar-thin
                scrollbar-track-transparent
                scrollbar-thumb-zinc-700

                sm:max-h-none
                sm:overflow-visible
              "
            >
              <Sidebar
                selectedCategories={selectedCategories}
                setSelectedCategories={handleCategoryChange}
                selectedBrand={selectedBrand}
                setSelectedBrand={handleBrandChange}
                maxPrice={maxPrice}
                setMaxPrice={handlePriceChange}
              />
            </div>
          </aside>

          {/* ========================================
              PRODUCTS
          ======================================== */}
          <section className="col-span-12 lg:col-span-9">

            {/* Header */}
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div className="text-right">
                  <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    كتالوج المنتجات
                  </h1>

                  <p className="mt-1 text-xs text-zinc-400 sm:mt-2 sm:text-sm">
                    اكتشف أفضل قطع غيار وإكسسوارات السيارات
                  </p>
                </div>

                <SortDropdown
                  value={sort}
                  onChange={handleSortChange}
                />
              </div>

              {/* Search */}
              <div className="mt-3 sm:mt-5">
                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    handleSearchChange(e.target.value)
                  }
                  placeholder="ابحث عن منتج أو رقم المنتج أو العلامة التجارية..."
                  className="
                    w-full
                    rounded-lg
                    border
                    border-zinc-800
                    bg-[#181818]
                    px-3
                    py-2.5
                    text-right
                    text-xs
                    text-white
                    outline-none
                    transition
                    placeholder:text-zinc-500
                    focus:border-blue-500

                    sm:rounded-xl
                    sm:px-5
                    sm:py-3
                    sm:text-sm
                  "
                />
              </div>
            </div>

            {/* Products */}
            <ProductGrid
              search={search}
              sort={sort}
              currentPage={currentPage}
              selectedCategories={selectedCategories}
              selectedBrand={selectedBrand}
              maxPrice={maxPrice}
              onAddToCart={handleAddToCart}
              setTotalPages={setTotalPages}
            />

            {/* Pagination */}
            <CatalogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </section>
        </div>
      </main>

      {/* Floating Cart */}
      <FloatingCart
        itemCount={cart.reduce(
          (total, item) =>
            total + Number(item.quantity || 1),
          0
        )}
        total={cartTotal}
      />

      <Footer />
    </div>
  );
};

export default Catalog;