import React from "react";
import Header from "../../components/admin/layout/Header";
import StatCard from "../../components/admin/layout/StatCard";
import InventoryHealth from "../../components/admin/reports/InventoryHealth";
import SalesChart from "../../components/admin/reports/SalesChart";
import FinancialActivity from "../../components/admin/reports/FinancialActivity";
import BrandPerformance from "../../components/admin/reports/BrandPerformance";
import Sidebar from "../../components/admin/layout/Sidebar";

export default function Reports() {
  return (
    <div className="bg-[#111111] text-white flex">
      <Sidebar />
      <div className="p-3 lg:p-8 space-y-6 w-full">
        {/* Header */}
        {/* <Header /> */}

        {/* Statistics Cards */}
        <StatCard />

        {/* Inventory Health + Sales Chart */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8">
            <SalesChart />
          </div>
          
          <div className="col-span-12 lg:col-span-4">
            <InventoryHealth />
          </div>
        </div>

        {/* Financial Activity + Brand Performance */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6">
            <FinancialActivity />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <BrandPerformance />
          </div>
        </div>
      </div>
    </div>
  );
}
