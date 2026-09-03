import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../components/admin/layout/Sidebar";
import FilterTabs from "../../components/admin/notifications/FilterTabs";
import NotificationList from "../../components/admin/notifications/NotificationList";
import HeaderCategoryNotification from "../../components/admin/layout/HeaderCategoryNotification";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const getNotifications = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      console.log("JWT:", token);

      const res = await axios.get(
        "http://localhost:1337/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(res.data.data);
      console.log(res.data.data)
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const headerContentNotification=[
    {
      headerName:"إدارة التنبيهات",
      placeholder:"ابحث في التنبيهات..."
    }
  ]

  return (
    <div className="flex min-h-screen bg-[#111111] text-white">
      <Sidebar />

      <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
        <HeaderCategoryNotification status={headerContentNotification}/>

        {/* Filter Tabs */}
        <FilterTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Notifications */}
        <NotificationList
          notifications={notifications}
          activeTab={activeTab}
          search={search}
          loading={loading}
        />
      </div>
    </div>
  );
}