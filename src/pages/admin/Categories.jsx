import ActivityTable from "../../components/admin/category/ActivityTable";
import AddCategoryCard from "../../components/admin/category/AddCategoryCard";
import CategoryCard from "../../components/admin/category/CategoryCard";
import HeaderCategoryNotification from "../../components/admin/layout/HeaderCategoryNotification";
import Sidebar from "../../components/admin/layout/Sidebar";
import StatCard from "../../components/admin/layout/StatCard";
import AddCategoryForm from "../../components/admin/category/AddCategoryForm";

import axios from "axios";

import { IoIosAdd } from "react-icons/io";
import { PiMoneyFill } from "react-icons/pi";
import { TbCategory2 } from "react-icons/tb";
import { FiArchive } from "react-icons/fi";

import { useEffect, useState } from "react";
import Pagination from "../../components/admin/layout/Pagination";

export default function Categories() {
  const [allCategories, setAllCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showAddCategory, setShowAddCategory] = useState(false);

  // ==========================================
  // Mobile Sidebar
  // ==========================================
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ==========================================
  // Products
  // ==========================================
  const [productsCate, setProductsCate] = useState([]);

  const totalProduct = productsCate.length;
  const totalCategory = categories.length;

  const totalquantity = productsCate.reduce(
    (total, product) => {
      return (
        total +
        Number(product.quantity || 0) *
          Number(product.costPrice || 0)
      );
    },
    0
  );

  // ==========================================
  // Pagination
  // ==========================================
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  // ==========================================
  // Statistics
  // ==========================================
  const statCardCategory = [
    {
      icons: <TbCategory2 />,
      Name: "إجمالي التصنيفات",
      value: totalCategory,
      color: "text-blue-500",
      bg: "bg-blue-500/20",
    },
    {
      icons: <FiArchive />,
      Name: "إجمالي المنتجات",
      value: totalProduct,
      color: "text-orange-500",
      bg: "bg-orange-500/20",
    },
    {
      icons: <PiMoneyFill />,
      Name: "قيمة المخزون الكلية",
      value: totalquantity,
      color: "text-green-500",
      bg: "bg-green-500/20",
    },
    {
      icons: <IoIosAdd />,
      onClick: () => setShowAddCategory(true),
      Name: "إضافة سريعة",
      bg: "bg-blue-300",
    },
  ];

  // ==========================================
  // Header Content
  // ==========================================
  const headerContentCategory = [
    {
      headerName: "إدارة التصنيفات",
      headerPara: "التحكم في أقسام المخزون",
      placeholder: "ابحث في التصنيفات...",
    },
  ];

  // ==========================================
  // Get Categories
  // ==========================================
  const getCategory = async (page = 1) => {
    try {
      const getproducts = await axios.get(
        "http://localhost:1337/api/products?populate=*"
      );

      const res = await axios.get(
        "http://localhost:1337/api/categories",
        {
          params: {
            populate: "*",
            "pagination[page]": page,
            "pagination[pageSize]": 6,
          },
        }
      );

      setCurrentPage(
        res.data.meta?.pagination?.page || 1
      );

      setPageCount(
        res.data.meta?.pagination?.pageCount || 1
      );

      setCategories(res.data.data || []);
      setAllCategories(res.data.data || []);

      setProductsCate(
        getproducts.data.data || []
      );
    } catch (error) {
      console.error(
        "Get Categories Error:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================================
  // First Load
  // ==========================================
  useEffect(() => {
    getCategory(1);
  }, []);

  return (
    <div
      dir="rtl"
      className="
        flex
        min-h-screen
        w-full
        overflow-x-hidden
        bg-[#0B0B0B]
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
          Main
      ========================================== */}
      <main
        className="
          min-w-0
          flex-1
          bg-[#0B0B0B]
          p-3
          sm:p-4
          md:p-5
          lg:p-6
          xl:p-8
        "
      >
        <div
          className="
            w-full
            min-w-0
            space-y-5
            sm:space-y-6
            lg:space-y-8
          "
        >
          {/* ==========================================
              Header
          ========================================== */}
          <HeaderCategoryNotification
            allCategories={allCategories}
            setCategories={setCategories}
            status={headerContentCategory}
            onMenuClick={() => setIsSidebarOpen(true)}
          />

          {/* ==========================================
              Statistics
          ========================================== */}
          <section className="w-full min-w-0">
            <StatCard status={statCardCategory} />
          </section>

          {/* ==========================================
              Category Cards
          ========================================== */}
          <section
            className="
              grid
              grid-cols-1
              gap-4
              sm:gap-5
              md:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              lg:gap-6
            "
          >
            {categories.map((category) => (
              <CategoryCard
                key={
                  category.documentId ||
                  category.id
                }
                category={category}
              />
            ))}

            <AddCategoryCard
              onAddClick={() =>
                setShowAddCategory(true)
              }
            />
          </section>

          {/* ==========================================
              Pagination
          ========================================== */}
          <section className="w-full overflow-x-auto">
            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              onPageChange={getCategory}
            />
          </section>

          {/* ==========================================
              Activity Table
          ========================================== */}
          <ActivityTable
            categories={categories}
          />
        </div>
      </main>

      {/* ==========================================
          Add Category Modal
      ========================================== */}
      {showAddCategory && (
        <AddCategoryForm
          onClose={() =>
            setShowAddCategory(false)
          }
          onSuccess={getCategory}
        />
      )}
    </div>
  );
}