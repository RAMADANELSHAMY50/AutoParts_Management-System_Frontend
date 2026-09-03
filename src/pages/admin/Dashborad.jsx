import React, { useEffect, useState } from "react";
import StatCard from "../../components/admin/layout/StatCard";
import SalesChart from "../../components/admin/dashborad/SalesChart";
import DonutChart from "../../components/admin/dashborad/DonutChart";
import RecentSales from "../../components/admin/dashborad/RecentSales";
import Header from "../../components/admin/dashborad/Header";
import LatestInvoices from "../../components/admin/dashborad/LatestInvoices";
import Sidebar from "../../components/admin/layout/Sidebar";
import { FiUsers, FiStar, FiDollarSign, FiCalendar } from "react-icons/fi";
import axios from "axios";

export default function Dashborad() {

  const [productsCate, setProductsCate] = useState([]);
  const totalProduct = productsCate.length;

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:1337/api/products?populate=*", {
      });
      setProductsCate(res.data.data);
      console.log("Products:", res.data.data.length);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const statCardDashborad = [
    {
      icons: <FiUsers />,
      Name: "إجمالي المنتجات ",
      value: totalProduct,
      color: "text-blue-500",
      bg: "bg-blue-500/20",
    },
    {
      icons: <FiStar />,
      Name: " إجمالي المبيعات",
      // value: activeCustomers,
      color: "text-orange-500",
      bg: "bg-orange-500/20",
    },
    {
      icons: <FiDollarSign />,
      Name: " أرباح الشهر",
      // value: averagePurchase,
      color: "text-green-500",
      bg: "bg-green-500/20",
    },
    {
      icons: <FiCalendar />,
      Name: " تنبيه مخزون منخفض",
      // value: todayVisits,
      color: "text-red-500",
      bg: "bg-red-500/20",
    },
  ];
  return (
    <>
      <div className="flex bg-black">
        <Sidebar />
        <div className="space-y-6 w-full p-2.5">
          <Header />

          <div className=" space-y-8">
            <StatCard status={statCardDashborad} />
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <SalesChart />
            </div>

            <div className="col-span-4">
              <DonutChart />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-7">
              <LatestInvoices />
            </div>

            <div className="col-span-5">
              <RecentSales />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
