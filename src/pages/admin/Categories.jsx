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

  const [productsCate, setProductsCate] = useState([]);
  const totalProduct = productsCate.length;
  const totalCategory = categories.length;
  const totalquantity = productsCate.reduce((total, product) => {
    return total + product.quantity * product.costPrice;
  }, 0);

  // pagintion
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const statCardCategory = [
    {
      icons: <TbCategory2 />,
      Name: "اجمالى التصنيفات",
      value: totalCategory,
      color: "text-blue-500",
      bg: "bg-blue-500/20",
    },
    {
      icons: <FiArchive />,
      Name: "إجمالي المنتجات ",
      value: totalProduct,
      color: "text-orange-500",
      bg: "bg-orange-500/20",
    },
    {
      icons: <PiMoneyFill />,
      Name: "قيمة المخزون الكلية ",
      value: totalquantity,
      color: "text-green-500",
      bg: "bg-green-500/20",
    },
    {
      icons: <IoIosAdd />,
      onClick: () => setShowAddCategory(true),
      Name: " اضافه سريع",
      bg: "bg-blue-300",
    },
  ];

  const headerContentCategory = [
    {
      headerName: "إدارة التصنيفات",
      headerPara: "التحكم في أقسام المخزون",
      placeholder: "ابحث في التصنيفات..."
    }
  ]

  const getCategory = async (page = 1) => {
    try {
      const getproducts = await axios.get(
        "http://localhost:1337/api/products?populate=*",
      );
      const res = await axios.get("http://localhost:1337/api/categories", {
        params: {
          populate: "*",
          "pagination[page]": page,
          "pagination[pageSize]": 6,
        },
      });
      setCurrentPage(res.data.meta.pagination.page);

      setPageCount(res.data.meta.pagination.pageCount);
      console.log(res.data.meta.pagination.pageCount);

      setCategories(res.data.data);
      setAllCategories(res.data.data);
      console.log(res.data.data);
      console.log(res.data);
      setProductsCate(getproducts.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div className="flex bg-[#0B0B0B] ">
        <Sidebar />
        <div className="p-8 bg-[#0B0B0B] w-full">
          <HeaderCategoryNotification allCategories={allCategories} setCategories={setCategories} status={headerContentCategory} />
          <div className=" mt-8">
            <StatCard status={statCardCategory} />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {categories.map((category) => (
              <CategoryCard key={category.documentId} category={category} />
            ))}

            <AddCategoryCard onAddClick={() => setShowAddCategory(true)} />
          </div>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={getCategory}
          />

          {/* Table */}
          <ActivityTable categories={categories} />
        </div>
        {showAddCategory && (
          <AddCategoryForm
            onClose={() => setShowAddCategory(false)}
            onSuccess={getCategory}
          />
        )}
      </div>
    </>
  );
}
