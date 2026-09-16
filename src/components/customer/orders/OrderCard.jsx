import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  EyeIcon,
  PrinterIcon,
  XMarkIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

import OrderStatus from "./OrderStatus";

const API_URL = "http://localhost:1337";

// ==========================================
// Image Helper
// ==========================================
const getImageUrl = (image) => {
  if (!image) {
    return "/placeholder.jpg";
  }

  // Direct URL
  if (typeof image === "string") {
    if (image.startsWith("http")) {
      return image;
    }

    return `${API_URL}${image.startsWith("/") ? "" : "/"}${image}`;
  }

  // Strapi v5
  if (image?.url) {
    return image.url.startsWith("http")
      ? image.url
      : `${API_URL}${image.url.startsWith("/") ? "" : "/"}${image.url}`;
  }

  // Strapi relation
  if (image?.data) {
    return getImageUrl(image.data);
  }

  // Strapi v4
  if (image?.attributes?.url) {
    const url = image.attributes.url;

    return url.startsWith("http")
      ? url
      : `${API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  }

  return "/placeholder.jpg";
};

// ==========================================
// Relation ID Helper
// ==========================================
const getRelationId = (relation) => {
  if (!relation) return null;

  if (typeof relation === "number") {
    return relation;
  }

  if (typeof relation === "string") {
    return relation;
  }

  if (relation?.documentId) {
    return relation.documentId;
  }

  if (relation?.id) {
    return relation.id;
  }

  if (relation?.data) {
    return getRelationId(relation.data);
  }

  return null;
};

// ==========================================
// OrderCard
// ==========================================
const OrderCard = ({
  order,
  orderNumber,
  date,
  total,
  status,
  orderItems = [],
  onOrderUpdated,
}) => {
  const navigate = useNavigate();

  const [showDetails, setShowDetails] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelMessage, setCancelMessage] = useState("");
  const [reordering, setReordering] = useState(false);

  // ==========================================
  // Track Order
  // ==========================================
  const handleTrackOrder = () => {
    const orderId = order?.documentId || order?.id;

    if (!orderId) return;

    navigate(`/myorder/${orderId}`);
  };

  // ==========================================
  // Cancel Order
  // ==========================================
  const handleCancelOrder = async () => {
    if (!order) return;

    if (order.State !== "قيد التنفيذ") {
      setCancelMessage(
        "لا يمكن إلغاء هذا الطلب في حالته الحالية."
      );
      return;
    }

    try {
      setCancelling(true);
      setCancelMessage("");

      const token = localStorage.getItem("token");

      if (!token) {
        setCancelMessage("يرجى تسجيل الدخول أولاً.");
        return;
      }

      // ==========================================
      // Get all order items related to this order
      // ==========================================
      const orderId = getRelationId(order);

      const orderItemsResponse = await axios.get(
        `${API_URL}/api/order-items?populate=product&populate=order&pagination[limit]=100`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const allItems = orderItemsResponse?.data?.data || [];

      const currentOrderItems = allItems.filter((item) => {
        const itemOrder = item?.order;

        const itemOrderId = getRelationId(itemOrder);

        return (
          String(itemOrderId) === String(orderId)
        );
      });

      // ==========================================
      // Restore Product Stock
      // ==========================================
      for (const item of currentOrderItems) {
        const product = item?.product;

        if (!product) continue;

        const productId = getRelationId(product);

        if (!productId) continue;

        const quantity = Number(item?.quantity || 0);

        const currentStock = Number(
          product?.stock || 0
        );

        const newStock =
          currentStock + quantity;

        await axios.put(
          `${API_URL}/api/products/${productId}`,
          {
            data: {
              stock: newStock,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // ==========================================
      // Update Order State
      // ==========================================
      const orderDocumentId =
        order?.documentId || order?.id;

      await axios.put(
        `${API_URL}/api/orders/${orderDocumentId}`,
        {
          data: {
            State: "ملغى",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setShowCancelModal(false);

      setCancelMessage(
        "تم إلغاء الطلب وإرجاع الكمية للمخزون بنجاح."
      );

      if (onOrderUpdated) {
        onOrderUpdated(order);
      }
    } catch (error) {
      console.error(
        "Cancel order error:",
        error?.response?.data || error
      );

      setCancelMessage(
        error?.response?.data?.error?.message ||
          "حدث خطأ أثناء إلغاء الطلب."
      );
    } finally {
      setCancelling(false);
    }
  };

  // ==========================================
  // Reorder
  // ==========================================
  const handleReorder = async () => {
    if (!orderItems?.length) return;

    try {
      setReordering(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("يرجى تسجيل الدخول أولاً.");
        return;
      }

      const currentCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      const updatedCart = [...currentCart];

      for (const item of orderItems) {
        const productId =
          item?.productDocumentId ||
          item?.productId ||
          getRelationId(item?.product);

        if (!productId) continue;

        const response = await axios.get(
          `${API_URL}/api/products/${productId}?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const productData = response?.data?.data;

        if (!productData) continue;

        const product = {
          id: productData.id,
          documentId: productData.documentId,
          ...productData,
          ...(productData.attributes || {}),
        };

        const requestedQuantity = Number(
          item?.quantity || 1
        );

        const stock = Number(
          product?.stock || 0
        );

        if (stock <= 0) {
          continue;
        }

        const existingIndex =
          updatedCart.findIndex(
            (cartItem) =>
              String(
                cartItem?.documentId ||
                  cartItem?.id
              ) ===
              String(
                product?.documentId ||
                  product?.id
              )
          );

        if (existingIndex !== -1) {
          const existingQuantity = Number(
            updatedCart[existingIndex]?.quantity || 0
          );

          const newQuantity =
            existingQuantity + requestedQuantity;

          updatedCart[existingIndex] = {
            ...updatedCart[existingIndex],
            quantity: Math.min(
              newQuantity,
              stock
            ),
          };
        } else {
          updatedCart.push({
            ...product,
            quantity: Math.min(
              requestedQuantity,
              stock
            ),
          });
        }
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      navigate("/cart");
    } catch (error) {
      console.error(
        "Reorder error:",
        error?.response?.data || error
      );

      alert(
        "حدث خطأ أثناء إعادة الطلب."
      );
    } finally {
      setReordering(false);
    }
  };

  // ==========================================
  // Product Row
  // ==========================================
  const ProductRow = ({ item }) => {
    const rawProduct = item?.product || {};

    const product = {
      ...rawProduct,
      ...(rawProduct?.attributes || {}),
    };

    const name =
      product?.name ||
      item?.name ||
      "منتج غير معروف";

    const sku =
      product?.sku ||
      item?.sku ||
      "بدون SKU";

    const price = Number(
      product?.salePrice ??
        product?.price ??
        item?.price ??
        0
    );

    const quantity = Number(
      item?.quantity || 1
    );

    const itemTotal = Number(
      item?.total ??
        price * quantity
    );

    const image = getImageUrl(
      product?.image ||
        item?.image
    );

    return (
      <div className="flex items-center gap-2.5 rounded-xl border border-zinc-800 bg-[#1B1B1B] p-2.5 sm:gap-3 sm:p-3 lg:gap-4 lg:p-4">
        {/* =====================================
            Product Image
        ====================================== */}
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-[#0E0E0E] sm:h-16 sm:w-16 lg:h-20 lg:w-20">
          <img
            src={image || "/placeholder.jpg"}
            alt={name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "/placeholder.jpg";
            }}
          />
        </div>

        {/* =====================================
            Product Information
        ====================================== */}
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-xs font-semibold text-white sm:text-sm lg:text-base">
            {name}
          </h4>

          <p className="mt-1 truncate text-[10px] text-zinc-500 sm:text-xs">
            SKU: {sku}
          </p>

          <p className="mt-1 text-[10px] text-zinc-400 sm:text-xs lg:text-sm">
            {price.toLocaleString("ar-EG")} ر.س
          </p>
        </div>

        {/* =====================================
            Quantity
        ====================================== */}
        <div className="text-center">
          <p className="text-[9px] text-zinc-500 sm:text-[10px]">
            الكمية
          </p>

          <p className="mt-1 text-xs font-semibold text-white sm:text-sm">
            {quantity}
          </p>
        </div>

        {/* =====================================
            Total
        ====================================== */}
        <div className="min-w-[58px] text-left sm:min-w-[70px]">
          <p className="text-[9px] text-zinc-500 sm:text-[10px]">
            الإجمالي
          </p>

          <p className="mt-1 text-xs font-bold text-[#A5B4FC] sm:text-sm lg:text-base">
            {itemTotal.toLocaleString("ar-EG")} ر.س
          </p>
        </div>
      </div>
    );
  };

  // ==========================================
  // Render
  // ==========================================
  return (
    <>
      {/* ========================================
          Main Order Card
      ========================================= */}
      <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-3 text-white shadow-lg sm:p-4 lg:p-5">
        {/* ======================================
            Header
        ======================================= */}
        <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:gap-4 lg:mb-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Order Info */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h2 className="text-sm font-bold text-white sm:text-base lg:text-lg">
                طلب #{orderNumber}
              </h2>

              <OrderStatus status={status} />
            </div>

            <p className="mt-1 text-[10px] text-zinc-500 sm:text-xs lg:text-sm">
              {date}
            </p>
          </div>

          {/* Total */}
          <div className="text-right">
            <p className="text-[10px] text-zinc-500 sm:text-xs">
              الإجمالي
            </p>

            <p className="mt-0.5 text-base font-bold text-[#A5B4FC] sm:text-lg lg:text-xl">
              {Number(total || 0).toLocaleString(
                "ar-EG"
              )}{" "}
              ر.س
            </p>
          </div>
        </div>

        {/* ======================================
            Main Content
        ======================================= */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-5 lg:gap-6">
          {/* ====================================
              Products
          ===================================== */}
          <div className="space-y-2.5 lg:col-span-3 sm:space-y-3">
            {orderItems?.length > 0 ? (
              orderItems.map((item, index) => (
                <ProductRow
                  key={
                    item?.documentId ||
                    item?.id ||
                    index
                  }
                  item={item}
                />
              ))
            ) : (
              <div className="rounded-xl border border-zinc-800 bg-[#1B1B1B] p-4 text-center text-xs text-zinc-500 sm:text-sm">
                لا توجد منتجات في هذا الطلب
              </div>
            )}
          </div>

          {/* ====================================
              Order Summary
          ===================================== */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-zinc-800 bg-[#1B1B1B] p-3 sm:p-4">
              <h3 className="mb-3 text-xs font-bold text-white sm:mb-4 sm:text-sm">
                تفاصيل الطلب
              </h3>

              <div className="space-y-2.5 sm:space-y-3">
                {/* Subtotal */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] text-zinc-500 sm:text-xs">
                    المجموع الفرعي
                  </span>

                  <span className="text-xs font-medium text-white sm:text-sm">
                    {Number(
                      order?.subtotal ?? total ?? 0
                    ).toLocaleString("ar-EG")}{" "}
                    ر.س
                  </span>
                </div>

                {/* Discount */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] text-zinc-500 sm:text-xs">
                    الخصم
                  </span>

                  <span className="text-xs font-medium text-white sm:text-sm">
                    {Number(
                      order?.discount || 0
                    ).toLocaleString("ar-EG")}{" "}
                    ر.س
                  </span>
                </div>

                {/* Tax */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] text-zinc-500 sm:text-xs">
                    الضريبة
                  </span>

                  <span className="text-xs font-medium text-white sm:text-sm">
                    {Number(
                      order?.tax || 0
                    ).toLocaleString("ar-EG")}{" "}
                    ر.س
                  </span>
                </div>

                <div className="border-t border-zinc-800 pt-2.5 sm:pt-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-white sm:text-sm">
                      الإجمالي
                    </span>

                    <span className="text-sm font-bold text-[#A5B4FC] sm:text-base">
                      {Number(
                        total || 0
                      ).toLocaleString("ar-EG")}{" "}
                      ر.س
                    </span>
                  </div>
                </div>

                {/* Payment Method */}
                {order?.paymentMethod && (
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] text-zinc-500 sm:text-xs">
                      طريقة الدفع
                    </span>

                    <span className="text-xs text-white sm:text-sm">
                      {order.paymentMethod}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================
            Actions
        ======================================= */}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-zinc-800 pt-4 sm:mt-5 sm:gap-3 sm:pt-5 lg:mt-6">
          {/* Details */}
          <button
            type="button"
            onClick={() =>
              setShowDetails(true)
            }
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-zinc-700 px-3 py-2 text-[11px] font-medium text-white transition hover:bg-zinc-800 sm:flex-none sm:px-4 sm:py-2.5 sm:text-xs lg:text-sm"
          >
            <EyeIcon className="h-4 w-4" />

            عرض التفاصيل
          </button>

          {/* Track */}
          {(status === "processing" ||
            status === "shipping") && (
            <>
              <button
                type="button"
                onClick={handleTrackOrder}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#A5B4FC] px-3 py-2 text-[11px] font-bold text-[#0E0E0E] transition hover:bg-[#C1C9FF] sm:flex-none sm:px-4 sm:py-2.5 sm:text-xs lg:text-sm"
              >
                <TruckIcon className="h-4 w-4" />

                تتبع الطلب
              </button>

              {/* Cancel */}
              {status === "processing" && (
                <button
                  type="button"
                  onClick={() =>
                    setShowCancelModal(true)
                  }
                  disabled={cancelling}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-500/30 px-3 py-2 text-[11px] font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-4 sm:py-2.5 sm:text-xs lg:text-sm"
                >
                  <XMarkIcon className="h-4 w-4" />

                  إلغاء الطلب
                </button>
              )}
            </>
          )}

          {/* Reorder */}
          {status === "delivered" && (
            <button
              type="button"
              onClick={handleReorder}
              disabled={reordering}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#A5B4FC] px-3 py-2 text-[11px] font-bold text-[#0E0E0E] transition hover:bg-[#C1C9FF] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-4 sm:py-2.5 sm:text-xs lg:text-sm"
            >
              <ArrowPathIcon className="h-4 w-4" />

              {reordering
                ? "جاري إعادة الطلب..."
                : "إعادة الطلب"}
            </button>
          )}
        </div>
      </div>

      {/* ========================================
          Details Modal
      ========================================= */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-zinc-800 bg-[#171717] p-4 shadow-2xl sm:p-5 lg:p-6">
            {/* Modal Header */}
            <div className="mb-4 flex items-center justify-between sm:mb-5 lg:mb-6">
              <div>
                <h2 className="text-base font-bold text-white sm:text-lg lg:text-xl">
                  تفاصيل الطلب
                </h2>

                <p className="mt-1 text-[10px] text-zinc-500 sm:text-xs">
                  طلب #{orderNumber}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowDetails(false)
                }
                className="rounded-lg p-1.5 text-zinc-500 transition hover:bg-zinc-800 hover:text-white sm:p-2"
              >
                <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* Products */}
            <div className="space-y-2.5 sm:space-y-3">
              {orderItems?.map((item, index) => (
                <ProductRow
                  key={
                    item?.documentId ||
                    item?.id ||
                    index
                  }
                  item={item}
                />
              ))}
            </div>

            {/* Invoice Button */}
            <div className="mt-4 flex justify-end sm:mt-5 lg:mt-6">
              <button
                type="button"
                onClick={() =>
                  window.print()
                }
                className="flex items-center gap-2 rounded-xl border border-zinc-700 px-3 py-2 text-xs text-white transition hover:bg-zinc-800 sm:px-4 sm:py-2.5 sm:text-sm"
              >
                <PrinterIcon className="h-4 w-4 sm:h-5 sm:w-5" />

                طباعة الفاتورة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================
          Cancel Modal
      ========================================= */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#171717] p-4 shadow-2xl sm:p-5 lg:p-6">
            {/* Icon */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 sm:h-14 sm:w-14">
              <XMarkIcon className="h-6 w-6 text-red-400 sm:h-7 sm:w-7" />
            </div>

            <div className="mt-4 text-center sm:mt-5">
              <h2 className="text-base font-bold text-white sm:text-lg">
                إلغاء الطلب
              </h2>

              <p className="mt-2 text-xs leading-6 text-zinc-400 sm:text-sm sm:leading-7">
                هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟
              </p>
            </div>

            {cancelMessage && (
              <div className="mt-4 rounded-xl border border-zinc-800 bg-[#1B1B1B] p-3 text-center text-xs text-zinc-300 sm:mt-5 sm:p-4 sm:text-sm">
                {cancelMessage}
              </div>
            )}

            {/* Actions */}
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
              <button
                type="button"
                onClick={() =>
                  setShowCancelModal(false)
                }
                disabled={cancelling}
                className="rounded-xl border border-zinc-700 px-3 py-2.5 text-xs font-medium text-white transition hover:bg-zinc-800 sm:py-3 sm:text-sm"
              >
                تراجع
              </button>

              <button
                type="button"
                onClick={handleCancelOrder}
                disabled={cancelling}
                className="rounded-xl bg-red-500 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3 sm:text-sm"
              >
                {cancelling
                  ? "جاري الإلغاء..."
                  : "تأكيد الإلغاء"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCard;