import CustomerTable from "../../components/admin/customers/CustomerTable";
import HeaderCustomer from "../../components/admin/customers/HeaderCustmoer";
import Sidebar from "../../components/admin/layout/Sidebar";
import StatCard from "../../components/admin/layout/StatCard";
import Pagination from "../../components/admin/layout/Pagination";

import { FiUsers, FiStar, FiDollarSign, FiCalendar } from "react-icons/fi";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  // =========================
  // Statistics
  // =========================

  const activeCustomers = customers.filter(
    (customer) => customer.isActive,
  ).length;

  const averagePurchase =
    customers.reduce(
      (total, customer) => total + (customer.totalPurchase || 0),
      0,
    ) / (customers.length || 1);

  const todayVisits = customers.filter((customer) => {
    if (!customer.lastVisit) return false;

    const lastVisitDate = new Date(customer.lastVisit);
    const today = new Date();

    return lastVisitDate.toDateString() === today.toDateString();
  }).length;

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
      value: averagePurchase,
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

      const res = await axios.get(
        `http://localhost:1337/api/users?filters[role][name][$eq]=Customer&populate=role`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            "pagination[page]": page,
            "pagination[pageSize]": 6,
          },
        },
      );

      console.log("CUSTOMERS RESPONSE:", res.data);
      console.log("CUSTOMERS RESPONSE:", res);

      // الصفحة الحالية فقط
      setCustomers(res.data);

      setCurrentPage(res.data.meta.pagination.page);
      setPageCount(res.data.meta.pagination.pageCount);

      // مؤقتاً
      // سنحدد pageCount بطريقة أخرى
    } catch (error) {
      console.log("STATUS:", error.response?.status);

      console.log("STRAPI ERROR:", error.response?.data);
    }
  };

  // =========================
  // First Load
  // =========================

  useEffect(() => {
    getCustomers(1);
  }, []);

  return (
    <div className="flex bg-[#111111]">
      <Sidebar />

      <div className="text-white w-full">
        <div className="p-8 space-y-8">
          <HeaderCustomer />

          <StatCard status={statCardCustomer} />

          <div className="rounded-2xl border border-zinc-800 bg-[#171717] shadow-lg">
            <CustomerTable
              getCustomers={getCustomers}
              customers={customers}
              totalCustomers={totalCustomers}
            />

            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              onPageChange={getCustomers}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
