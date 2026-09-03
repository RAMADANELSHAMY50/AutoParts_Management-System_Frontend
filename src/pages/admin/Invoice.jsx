import InvoiceActions from "../../components/admin/Invoice/InvoiceActions";
import InvoiceHeader from "../../components/admin/Invoice/InvoiceHeader";
import InvoiceList from "../../components/admin/Invoice/InvoiceList";
import InvoicePreview from "../../components/admin/Invoice/InvoicePreview";
import Sidebar from "../../components/admin/layout/Sidebar";

export default function Invoices() {
  return (
    <div className="flex min-h-screen bg-[#111111] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-full">
        <InvoiceHeader />

        <InvoiceActions />

        <div className="flex gap-3 p-2">
          <div className="w-100">
            <InvoiceList />
          </div>

          <div className="w-full">
            <InvoicePreview />
          </div>
        </div>
      </div>
    </div>
  );
}
