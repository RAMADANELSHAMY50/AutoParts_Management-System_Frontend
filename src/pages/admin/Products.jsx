import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../components/admin/layout/Sidebar";
import Header from "../../components/admin/layout/Header";
import SearchBar from "../../components/admin/layout/SearchBar";
import ProductCard from "../../components/admin/ProductCard";
import Pagination from "../../components/admin/layout/Pagination";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  // ==========================================
  // Mobile Sidebar
  // ==========================================
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ==========================================
  // Stock Status
  // ==========================================
  const getStockStatus = (stock, minimumStock) => {
    if (Number(stock) === 0) {
      return {
        text: "نفد",
        className: "bg-red-100 text-red-700",
      };
    }

    if (Number(stock) <= Number(minimumStock)) {
      return {
        text: "منخفض",
        className: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      text: "متوفر",
      className: "bg-green-100 text-green-700",
    };
  };

  // ==========================================
  // Get Products
  // ==========================================
  const getProducts = async (page = 1) => {
    try {
      const res = await axios.get(
        "http://localhost:1337/api/products",
        {
          params: {
            "populate[image]": true,
            "populate[category]": true,
            "populate[brand]": true,
            "populate[vehicles]": true,

            "pagination[page]": page,
            "pagination[pageSize]": 6,
          },
        }
      );

      console.log("Products:", res.data.data);

      setAllProducts(res.data.data || []);
      setProducts(res.data.data || []);

      setCurrentPage(
        res.data.meta?.pagination?.page || 1
      );

      setPageCount(
        res.data.meta?.pagination?.pageCount || 1
      );
    } catch (error) {
      console.error(
        "Get Products Error:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================================
  // First Load
  // ==========================================
  useEffect(() => {
    getProducts(1);
  }, []);

  return (
    <div
      dir="rtl"
      className="
        flex
        min-h-screen
        w-full
        overflow-x-hidden
        bg-[#171717]
      "
    >
      {/* ==========================================
          Sidebar
      ========================================== */}
      <Sidebar
        isMobileOpen={isSidebarOpen}
        setIsMobileOpen={setIsSidebarOpen}
      />

      {/* ==========================================
          Main Content
      ========================================== */}
      <main
        className="
          min-w-0
          flex-1
          p-2
          sm:p-4
          lg:p-6
          xl:p-8
        "
      >
        <div className="w-full min-w-0 space-y-4 sm:space-y-5 lg:space-y-6">

          {/* ==========================================
              Header
          ========================================== */}
          <Header
            getProducts={getProducts}
            onMenuClick={() => setIsSidebarOpen(true)}
          />

          {/* ==========================================
              Search
          ========================================== */}
          <section className="w-full min-w-0">
            <SearchBar
              allProducts={allProducts}
              setProducts={setProducts}
              getStockStatus={getStockStatus}
            />
          </section>

          {/* ==========================================
              Products
          ========================================== */}
          <section className="w-full min-w-0">
            <ProductCard
              products={products}
              getProducts={getProducts}
              getStockStatus={getStockStatus}
            />
          </section>

          {/* ==========================================
              Pagination
          ========================================== */}
          <section className="w-full min-w-0 overflow-x-auto">
            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              onPageChange={getProducts}
            />
          </section>

        </div>
      </main>
    </div>
  );
}