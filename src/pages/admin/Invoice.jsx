import InvoiceActions from "../../components/admin/Invoice/InvoiceActions";
import InvoiceList from "../../components/admin/Invoice/InvoiceList";
import InvoicePreview from "../../components/admin/Invoice/InvoicePreview";
import Sidebar from "../../components/admin/layout/Sidebar";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:1337";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const [updatingStatus, setUpdatingStatus] = useState(false);

  // ==========================================
  // Mobile Sidebar
  // ==========================================
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  // =========================================================
  // Get relation object
  // =========================================================
  const getRelation = (relation) => {
    if (!relation) return null;

    if (relation.data) {
      return relation.data;
    }

    return relation;
  };

  // =========================================================
  // Get relation ID
  // =========================================================
  const getRelationId = (relation) => {
    const value = getRelation(relation);

    if (!value) return null;

    return value.documentId || value.id || null;
  };

  // =========================================================
  // Fetch Invoices
  // =========================================================
  const fetchInvoices = async (
    keepSelectedDocumentId = null
  ) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [
        ordersResponse,
        orderItemsResponse,
      ] = await Promise.all([
        axios.get(`${API_URL}/api/orders`, {
          params: {
            sort: "createdAt:desc",
            "populate[users_permissions_user]": true,
          },
          ...config,
        }),

        axios.get(`${API_URL}/api/order-items`, {
          params: {
            sort: "createdAt:asc",
            "populate[product]": true,
            "populate[order]": true,
          },
          ...config,
        }),
      ]);

      const orders =
        ordersResponse.data?.data || [];

      const rawOrderItems =
        orderItemsResponse.data?.data || [];

      console.log(
        "ADMIN INVOICES - ORDERS:",
        orders
      );

      console.log(
        "ADMIN INVOICES - ORDER ITEMS:",
        rawOrderItems
      );

      // =====================================================
      // Normalize Order Items
      // =====================================================
      const normalizedOrderItems =
        rawOrderItems.map((item) => {
          const product = getRelation(item.product);
          const order = getRelation(item.order);

          return {
            ...item,

            product: product || null,
            order: order || null,

            quantity: Number(
              item.quantity || 0
            ),

            price: Number(
              item.price || 0
            ),

            total: Number(
              item.total ||
                Number(item.price || 0) *
                  Number(item.quantity || 0)
            ),
          };
        });

      // =====================================================
      // Attach Order Items
      // =====================================================
      const ordersWithItems = orders.map(
        (order) => {
          const orderItems =
            normalizedOrderItems.filter(
              (item) => {
                const itemOrderId =
                  getRelationId(item.order);

                if (
                  order.documentId &&
                  itemOrderId ===
                    order.documentId
                ) {
                  return true;
                }

                if (
                  order.id &&
                  Number(itemOrderId) ===
                    Number(order.id)
                ) {
                  return true;
                }

                return false;
              }
            );

          return {
            ...order,
            orderItems,
          };
        }
      );

      setInvoices(ordersWithItems);

      // =====================================================
      // Keep selected invoice
      // =====================================================
      if (keepSelectedDocumentId) {
        const refreshedSelectedInvoice =
          ordersWithItems.find(
            (order) =>
              order.documentId ===
              keepSelectedDocumentId
          );

        if (refreshedSelectedInvoice) {
          setSelectedInvoice(
            refreshedSelectedInvoice
          );

          return;
        }
      }

      // =====================================================
      // Initial selection
      // =====================================================
      if (ordersWithItems.length > 0) {
        setSelectedInvoice((previousInvoice) => {
          if (!previousInvoice) {
            return ordersWithItems[0];
          }

          const sameInvoice =
            ordersWithItems.find(
              (order) =>
                order.documentId ===
                previousInvoice.documentId
            );

          return (
            sameInvoice ||
            ordersWithItems[0]
          );
        });
      } else {
        setSelectedInvoice(null);
      }
    } catch (error) {
      console.error(
        "❌ Error fetching invoices:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // Initial Fetch
  // =========================================================
  useEffect(() => {
    fetchInvoices();
  }, []);

  // =========================================================
  // Update Order Status
  // =========================================================
  const handleUpdateOrderStatus = async (
    newStatus
  ) => {
    if (!selectedInvoice) {
      alert("من فضلك اختر طلبًا أولاً");
      return;
    }

    if (updatingStatus) {
      return;
    }

    const token =
      localStorage.getItem("token");

    if (!token) {
      alert("يجب تسجيل الدخول");
      return;
    }

    const documentId =
      selectedInvoice.documentId;

    if (!documentId) {
      console.error(
        "Missing order documentId:",
        selectedInvoice
      );

      alert(
        "لم يتم العثور على documentId الخاص بالطلب"
      );

      return;
    }

    const currentStatus =
      selectedInvoice.State || "";

    if (currentStatus === newStatus) {
      return;
    }

    try {
      setUpdatingStatus(true);

      const response = await axios.put(
        `${API_URL}/api/orders/${documentId}`,
        {
          data: {
            State: newStatus,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "application/json",
          },
        }
      );

      console.log(
        "Order status updated:",
        response.data?.data
      );

      await fetchInvoices(documentId);

      alert(
        `تم تحديث حالة الطلب إلى: ${newStatus}`
      );
    } catch (error) {
      console.error(
        "UPDATE ORDER STATUS ERROR:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.error?.message ||
          "حدث خطأ أثناء تحديث حالة الطلب"
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  // =========================================================
  // Preview
  // =========================================================
  const handlePreview = () => {
    if (!selectedInvoice) {
      return;
    }

    setShowPreview(true);
  };

  // =========================================================
  // Close Preview
  // =========================================================
  const handleClosePreview = () => {
    setShowPreview(false);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#111111] text-white"
    >
      <div className="flex min-h-screen">
        {/* =========================================
            Sidebar
        ========================================== */}
        <Sidebar
          isMobileOpen={isSidebarOpen}
          setIsMobileOpen={setIsSidebarOpen}
        />

        {/* =========================================
            Main
        ========================================== */}
        <main className="min-w-0 flex-1">
          {/* =========================================
              Actions
          ========================================== */}
          <InvoiceActions
            invoice={selectedInvoice}
            onPreview={handlePreview}
            onUpdateStatus={
              handleUpdateOrderStatus
            }
            updatingStatus={updatingStatus}
            onMenuClick={() =>
              setIsSidebarOpen(true)
            }
          />

          {/* =========================================
              Content
          ========================================== */}
          <div className="flex min-w-0 flex-col gap-4 p-3 sm:gap-5 sm:p-4 lg:flex-row lg:gap-4 lg:p-5 xl:p-6">
            {/* =====================================
                Invoice List
            ====================================== */}
            <div className="min-w-0 w-full lg:w-[360px] lg:shrink-0 xl:w-[390px]">
              <InvoiceList
                invoices={invoices}
                selectedInvoice={
                  selectedInvoice
                }
                setSelectedInvoice={
                  setSelectedInvoice
                }
                loading={loading}
              />
            </div>

            {/* =====================================
                Invoice Preview
            ====================================== */}
            <div className="min-w-0 w-full">
              <InvoicePreview
                invoice={selectedInvoice}
                loading={loading}
              />
            </div>
          </div>
        </main>
      </div>

      {/* =========================================
          Preview Modal
      ========================================== */}
      {showPreview &&
        selectedInvoice && (
          <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-2 backdrop-blur-sm sm:items-center sm:p-4 lg:p-6"
            onClick={handleClosePreview}
          >
            <div
              className="relative my-2 max-h-[96vh] w-full max-w-5xl overflow-y-auto rounded-xl border border-zinc-700 bg-[#111111] shadow-2xl sm:my-4 sm:rounded-2xl lg:my-6"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              {/* Close */}
              <button
                type="button"
                onClick={handleClosePreview}
                className="absolute left-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#232323] text-xl text-zinc-300 transition hover:bg-red-500/20 hover:text-red-400 sm:left-5 sm:top-5 sm:h-10 sm:w-10 sm:text-2xl"
                aria-label="إغلاق"
              >
                ×
              </button>

              {/* Header */}
              <div className="border-b border-zinc-800 px-4 py-4 sm:px-6 sm:py-5">
                <h2 className="text-lg font-bold text-white sm:text-xl">
                  معاينة الفاتورة
                </h2>

                <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                  {selectedInvoice.orderNumber ||
                    "---"}
                </p>
              </div>

              {/* Invoice */}
              <div className="p-2 sm:p-4 lg:p-6">
                <InvoicePreview
                  invoice={selectedInvoice}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        )}
    </div>
  );
}