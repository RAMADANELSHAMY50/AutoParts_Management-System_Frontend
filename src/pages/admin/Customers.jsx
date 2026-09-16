import CustomerTable from "../../components/admin/customers/CustomerTable";
import HeaderCustomer from "../../components/admin/customers/HeaderCustmoer";
import Sidebar from "../../components/admin/layout/Sidebar";
import StatCard from "../../components/admin/layout/StatCard";
import Pagination from "../../components/admin/layout/Pagination";

import {
  FiUsers,
  FiStar,
  FiDollarSign,
  FiCalendar,
} from "react-icons/fi";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Customers() {
  // =========================
  // Customers
  // =========================

  const [customers, setCustomers] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);

  // =========================
  // Sidebar
  // =========================

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // =========================
  // Pagination
  // =========================

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const pageSize = 6;

  // =========================
  // Statistics
  // =========================

  const totalCustomers = allCustomers.length;

  const activeCustomers = allCustomers.filter(
    (customer) => customer.isActive === true
  ).length;

  const averagePurchase =
    allCustomers.length > 0
      ? allCustomers.reduce(
          (total, customer) =>
            total + Number(customer.totalPurchase || 0),
          0
        ) / allCustomers.length
      : 0;

  const todayVisits = allCustomers.filter((customer) => {
    if (!customer.lastVisit) return false;

    const lastVisitDate = new Date(customer.lastVisit);
    const today = new Date();

    return (
      lastVisitDate.toDateString() === today.toDateString()
    );
  }).length;

  // =========================
  // Statistics Cards
  // =========================

  const statCardCustomer = [
    {
      icons: <FiUsers />,
      Name: "إجمالي العملاء",
      value: totalCustomers,
      color: "text-blue-500",
      bg: "bg-blue-500/20",
    },
    {
      icons: <FiStar />,
      Name: "عملاء نشطون",
      value: activeCustomers,
      color: "text-orange-500",
      bg: "bg-orange-500/20",
    },
    {
      icons: <FiDollarSign />,
      Name: "متوسط الشراء",
      value: `${averagePurchase.toFixed(2)} ج.م`,
      color: "text-green-500",
      bg: "bg-green-500/20",
    },
    {
      icons: <FiCalendar />,
      Name: "زيارات اليوم",
      value: todayVisits,
      color: "text-red-500",
      bg: "bg-red-500/20",
    },
  ];

  // =========================
  // Get Customers
  // =========================

  const getCustomers = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // =====================================
      // 1. Current page customers
      // =====================================

      const tableRes = await axios.get(
        "http://localhost:1337/api/users",
        {
          headers,
          params: {
            "filters[role][name][$eq]": "Customer",
            populate: "role",
            page: page,
            pageSize: pageSize,
          },
        }
      );

      console.log("TABLE CUSTOMERS:", tableRes.data);

      setCustomers(tableRes.data);

      // =====================================
      // 2. ALL customers for statistics
      // =====================================

      const allCustomersRes = await axios.get(
        "http://localhost:1337/api/users",
        {
          headers,
          params: {
            "filters[role][name][$eq]": "Customer",
            populate: "role",
          },
        }
      );

      console.log(
        "ALL CUSTOMERS:",
        allCustomersRes.data
      );

      const allCustomersData = allCustomersRes.data;

      setAllCustomers(allCustomersData);

      // =====================================
      // 3. Pagination
      // =====================================

      setCurrentPage(page);

      setPageCount(
        Math.ceil(allCustomersData.length / pageSize)
      );
    } catch (error) {
      console.log(
        "STATUS:",
        error.response?.status
      );

      console.log(
        "STRAPI ERROR:",
        error.response?.data
      );
    }
  };

  // =========================
  // First Load
  // =========================

  useEffect(() => {
    getCustomers(1);
  }, []);

  // =========================
  // UI
  // =========================

  return (
    <div
      dir="rtl"
      className="
        flex
        min-h-screen
        w-full
        overflow-x-hidden
        bg-[#111111]
      "
    >
      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isSidebarOpen}
        setIsMobileOpen={setIsSidebarOpen}
      />

      {/* Main */}
      <main
        className="
          min-w-0
          flex-1
          p-2.5
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
            space-y-4
            sm:space-y-5
            lg:space-y-8
          "
        >
          {/* Header */}
          <HeaderCustomer
            onMenuClick={() => setIsSidebarOpen(true)}
          />

          {/* Statistics */}
          <StatCard status={statCardCustomer} />

          {/* Customers */}
          <section
            className="
              w-full
              min-w-0
              overflow-hidden
              rounded-xl
              sm:rounded-2xl
              border
              border-zinc-800
              bg-[#171717]
              shadow-lg
            "
          >
            <CustomerTable
              getCustomers={getCustomers}
              customers={customers}
              totalCustomers={totalCustomers}
            />

            {/* Pagination */}
            <div className="px-2.5 pb-2.5 sm:px-4 sm:pb-4">
              <Pagination
                currentPage={currentPage}
                pageCount={pageCount}
                onPageChange={getCustomers}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}