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

  const getStockStatus = (stock, minimumStock) => {
    if (stock === 0) {
      return {
        text: "نفد",
        className: "bg-red-100 text-red-700",
      };
    }

    if (stock <= minimumStock) {
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

  const getProducts = async (page = 1) => {
    try {
      const res = await axios.get("http://localhost:1337/api/products", {
        params: {
          "populate[image]": true,
          "populate[category]": true,
          "populate[brand]": true,
          "populate[vehicles]": true,

          "pagination[page]": page,
          "pagination[pageSize]": 6,
        },
      });

      console.log("Products:", res.data.data);

      setAllProducts(res.data.data);
      setProducts(res.data.data);

      setCurrentPage(res.data.meta.pagination.page);

      setPageCount(res.data.meta.pagination.pageCount);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  return (
    <div className="flex bg-[#171717]">
      <Sidebar />

      <div className="w-full p-8">
        <Header />

        <SearchBar
          allProducts={allProducts}
          setProducts={setProducts}
          getStockStatus={getStockStatus}
        />

        <ProductCard
          products={products}
          getProducts={getProducts}
          getStockStatus={getStockStatus}
        />

        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={getProducts}
        />
      </div>
    </div>
  );
}
