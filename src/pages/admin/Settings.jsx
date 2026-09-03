import Header from "../../components/admin/layout/Header";
import SearchBar from "../../components/admin/layout/SearchBar";
import Sidebar from "../../components/admin/layout/Sidebar";
import ActionCards from "../../components/admin/settings/ActionCards";
import AppearanceCard from "../../components/admin/settings/AppearanceCard";
import ProfileCard from "../../components/admin/settings/ProfileCard";
import SupportCard from "../../components/admin/settings/SupportCard";
import SystemSettings from "../../components/admin/settings/SystemSettings";
import VersionCard from "../../components/admin/settings/VersionCard";


export default function Settings() {
  return (
    <div className="flex bg-[#111111] text-white">
        <Sidebar/>
      <div className="p-8 space-y-8 w-full">
        {/* Header */}
        <Header />

        {/* Search */}
        <SearchBar />

        {/* Top Section */}
        <div className="grid grid-cols-12 gap-6">
          {/* Profile */}
          <div className="col-span-12 lg:col-span-8">
            <ProfileCard />
          </div>

          {/* Appearance */}
          <div className="col-span-12 lg:col-span-4">
            <AppearanceCard />
          </div>
        </div>

        {/* System Settings */}
        <SystemSettings />

        {/* Action Cards */}
        <ActionCards />

        {/* Bottom Cards */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6">
            <SupportCard />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <VersionCard />
          </div>
        </div>
      </div>
    </div>
  );
}