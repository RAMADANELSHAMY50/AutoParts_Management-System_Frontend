import Navbar from "../../components/customer/layout/Navbar";
import ProfileCard from "../../components/customer/settings/ProfileCard";


export default function CustomerSettings() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#111111] text-white"
    >
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= CONTENT ================= */}
      <main className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">

          {/* ================= PAGE HEADER ================= */}
          <div className="text-right">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              الإعدادات
            </h1>

            <p className="mt-2 text-sm text-zinc-400 sm:text-base">
              إدارة معلومات حسابك الشخصية وإعدادات الأمان
            </p>
          </div>

          {/* ================= PROFILE ================= */}
          <div className="w-full">
            <ProfileCard />
          </div>

        </div>
      </main>
    </div>
  );
}