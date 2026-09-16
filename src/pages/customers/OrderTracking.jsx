
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/customer/layout/Navbar";
import Footer from "../../components/customer/layout/Footer";

import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  XCircleIcon,
  MapPinIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const API_URL = "http://localhost:1337";

// ======================================================
// Relation Helper
// ======================================================
const getRelation = (relation) => {
  if (!relation) {
    return null;
  }

  if (relation.data !== undefined) {
    return relation.data || null;
  }

  return relation;
};

// ======================================================
// Image URL
// ======================================================
const getImageUrl = (image) => {
  if (!image) {
    return "/placeholder.jpg";
  }

  if (typeof image === "string") {
    return image.startsWith("http")
      ? image
      : `${API_URL}${image}`;
  }

  if (image.url) {
    return image.url.startsWith("http")
      ? image.url
      : `${API_URL}${image.url}`;
  }

  if (image.data?.url) {
    const url = image.data.url;

    return url.startsWith("http")
      ? url
      : `${API_URL}${url}`;
  }

  if (image.data?.attributes?.url) {
    const url = image.data.attributes.url;

    return url.startsWith("http")
      ? url
      : `${API_URL}${url}`;
  }

  return "/placeholder.jpg";
};

// ======================================================
// Status
// ======================================================
const getOrderStatus = (state) => {
  switch (state) {
    case "تم التوصيل":
    case "مكتمل":
    case "delivered":
      return "delivered";

    case "جاري الشحن":
    case "shipping":
      return "shipping";

    case "ملغي":
    case "ملغى":
    case "ملغية":
    case "cancelled":
      return "cancelled";

    case "قيد التنفيذ":
    case "قيد الانتظار":
    case "processing":
    case "pending":
    default:
      return "processing";
  }
};

// ======================================================
// Format Money
// ======================================================
const formatMoney = (value) => {
  return Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// ======================================================
// Format Date
// ======================================================
const formatDate = (date) => {
  if (!date) {
    return "غير محدد";
  }

  try {
    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "غير محدد";
  }
};

// ======================================================
// Timeline Item
// ======================================================
const TimelineItem = ({
  title,
  description,
  active,
  completed,
  icon: Icon,
  last = false,
}) => {
  return (
    <div className="relative flex gap-4">
      {!last && (
        <div
          className={`absolute right-[19px] top-11 h-[calc(100%-4px)] w-px ${
            completed
              ? "bg-[#A5B4FC]"
              : "bg-zinc-700"
          }`}
        />
      )}

      <div
        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
          active || completed
            ? "border-[#A5B4FC] bg-[#A5B4FC]/15"
            : "border-zinc-700 bg-zinc-800"
        }`}
      >
        <Icon
          className={`h-5 w-5 ${
            active || completed
              ? "text-[#A5B4FC]"
              : "text-zinc-500"
          }`}
        />
      </div>

      <div className="pb-10">
        <h3
          className={`font-bold ${
            active || completed
              ? "text-white"
              : "text-zinc-500"
          }`}
        >
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-zinc-500">
          {description}
        </p>
      </div>
    </div>
  );
};

// ======================================================
// Order Tracking
// ======================================================
export default function OrderTracking() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ====================================================
  // Load Order
  // ====================================================
  useEffect(() => {
    const getOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (!token) {
          setError("يجب تسجيل الدخول أولاً.");
          return;
        }

        if (!savedUser) {
          setError("لم يتم العثور على بيانات المستخدم.");
          return;
        }

        const currentUser = JSON.parse(savedUser);

        // ================================================
        // Order
        // ================================================
        const orderResponse = await axios.get(
          `${API_URL}/api/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              "populate[users_permissions_user]": true,
            },
          }
        );

        const fetchedOrder =
          orderResponse.data?.data;

        if (!fetchedOrder) {
          setError("لم يتم العثور على الطلب.");
          return;
        }

        // ================================================
        // Security: Make sure order belongs to user
        // ================================================
        const orderUser = getRelation(
          fetchedOrder.users_permissions_user
        );

        if (
          !orderUser ||
          Number(orderUser.id) !==
            Number(currentUser.id)
        ) {
          setError(
            "لا يمكنك عرض تفاصيل هذا الطلب."
          );
          return;
        }

        // ================================================
        // Order Items
        // ================================================
        const itemsResponse = await axios.get(
          `${API_URL}/api/order-items`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              "filters[order][documentId][$eq]":
                fetchedOrder.documentId,

              "populate[product]": true,

              "populate[product][populate][image]":
                true,

              "pagination[page]": 1,
              "pagination[pageSize]": 100,
            },
          }
        );

        const fetchedItems =
          itemsResponse.data?.data || [];

        setOrder(fetchedOrder);
        setOrderItems(fetchedItems);
      } catch (err) {
        console.error(
          "ORDER TRACKING ERROR:",
          err
        );

        console.error(
          "ORDER TRACKING RESPONSE:",
          err.response?.data
        );

        setError(
          err.response?.data?.error?.message ||
            "حدث خطأ أثناء تحميل بيانات الطلب."
        );
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      getOrder();
    }
  }, [orderId]);

  // ====================================================
  // Status
  // ====================================================
  const status = useMemo(() => {
    return getOrderStatus(order?.State);
  }, [order]);

  // ====================================================
  // Timeline
  // ====================================================
  const timeline = useMemo(() => {
    if (status === "cancelled") {
      return [
        {
          title: "قيد التنفيذ",
          description:
            "تم إنشاء الطلب بنجاح.",
          icon: ClockIcon,
          completed: true,
          active: false,
        },
        {
          title: "تم إلغاء الطلب",
          description:
            "تم إلغاء هذا الطلب وإرجاع الكمية إلى المخزون.",
          icon: XCircleIcon,
          completed: true,
          active: true,
        },
      ];
    }

    const processingCompleted =
      status === "shipping" ||
      status === "delivered";

    const shippingCompleted =
      status === "delivered";

    return [
      {
        title: "قيد التنفيذ",
        description:
          "تم استلام طلبك وجاري تجهيزه.",
        icon: ClockIcon,
        completed: processingCompleted,
        active: status === "processing",
      },
      {
        title: "جاري الشحن",
        description:
          "تم تجهيز الطلب وهو الآن في مرحلة الشحن.",
        icon: TruckIcon,
        completed: shippingCompleted,
        active: status === "shipping",
      },
      {
        title: "تم التوصيل",
        description:
          "تم تسليم الطلب بنجاح.",
        icon: CheckCircleIcon,
        completed: status === "delivered",
        active: status === "delivered",
      },
    ];
  }, [status]);

  // ====================================================
  // Loading
  // ====================================================
  if (loading) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#0E0E0E] text-white"
      >
        <Navbar />

        <main className="mx-auto max-w-[1400px] px-4 py-16 md:px-8">
          <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-12 text-center">
            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-[#A5B4FC]" />

            <p className="text-zinc-400">
              جاري تحميل تفاصيل الطلب...
            </p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // ====================================================
  // Error
  // ====================================================
  if (error || !order) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#0E0E0E] text-white"
      >
        <Navbar />

        <main className="mx-auto max-w-[1400px] px-4 py-16 md:px-8">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-10 text-center">
            <XCircleIcon className="mx-auto h-14 w-14 text-red-400" />

            <h2 className="mt-5 text-2xl font-bold text-white">
              تعذر تحميل الطلب
            </h2>

            <p className="mt-3 text-red-300">
              {error || "الطلب غير موجود."}
            </p>

            <button
              type="button"
              onClick={() => navigate("/myorder")}
              className="mt-6 rounded-xl bg-zinc-800 px-6 py-3 font-semibold text-white transition hover:bg-zinc-700"
            >
              العودة إلى طلباتي
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#0E0E0E] text-white"
    >
      <Navbar />

      <main className="mx-auto max-w-[1400px] px-4 py-8 md:px-8 lg:px-12">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/myorder")}
          className="mb-6 flex items-center gap-2 text-zinc-400 transition hover:text-white"
        >
          <ArrowRightIcon className="h-5 w-5" />

          العودة إلى طلباتي
        </button>

        {/* Header */}
        <div className="mb-6 rounded-2xl border border-zinc-800 bg-[#171717] p-6 shadow-lg">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-zinc-500">
                تتبع الطلب
              </p>

              <h1 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                {order.orderNumber ||
                  `ORD-${order.id}`}
              </h1>

              <p className="mt-2 text-sm text-zinc-500">
                تم إنشاء الطلب في{" "}
                {formatDate(order.createdAt)}
              </p>
            </div>

            <div
              className={`rounded-xl px-5 py-3 text-center ${
                status === "processing"
                  ? "bg-blue-500/10 text-blue-400"
                  : status === "shipping"
                  ? "bg-yellow-500/10 text-yellow-400"
                  : status === "delivered"
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              <p className="text-xs text-zinc-500">
                الحالة الحالية
              </p>

              <p className="mt-1 font-bold">
                {status === "processing" &&
                  "قيد التنفيذ"}

                {status === "shipping" &&
                  "جاري الشحن"}

                {status === "delivered" &&
                  "تم التوصيل"}

                {status === "cancelled" &&
                  "ملغي"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Timeline */}
          <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-6 lg:col-span-2">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A5B4FC]/10">
                <TruckIcon className="h-6 w-6 text-[#A5B4FC]" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  حالة الشحنة
                </h2>

                <p className="text-sm text-zinc-500">
                  تابع مراحل تنفيذ طلبك
                </p>
              </div>
            </div>

            <div className="pr-1">
              {timeline.map((item, index) => (
                <TimelineItem
                  key={item.title}
                  {...item}
                  last={
                    index ===
                    timeline.length - 1
                  }
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A5B4FC]/10">
                <ShoppingBagIcon className="h-6 w-6 text-[#A5B4FC]" />
              </div>

              <h2 className="text-xl font-bold text-white">
                ملخص الطلب
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-zinc-500">
                  المجموع الفرعي
                </span>

                <span className="font-semibold text-white">
                  {formatMoney(order.subtotal)} ر.س
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-zinc-500">
                  الضريبة
                </span>

                <span className="font-semibold text-white">
                  {formatMoney(order.tax)} ر.س
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-zinc-500">
                  الخصم
                </span>

                <span className="font-semibold text-white">
                  {formatMoney(order.discount)} ر.س
                </span>
              </div>

              <div className="border-t border-zinc-800 pt-4">
                <div className="flex justify-between gap-4">
                  <span className="font-bold text-white">
                    الإجمالي
                  </span>

                  <span className="text-xl font-bold text-[#A5B4FC]">
                    {formatMoney(order.total)} ر.س
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 rounded-xl bg-[#202020] p-4">
                <CreditCardIcon className="h-5 w-5 text-zinc-500" />

                <div>
                  <p className="text-xs text-zinc-500">
                    طريقة الدفع
                  </p>

                  <p className="mt-1 font-medium text-white">
                    {order.paymentMethod ||
                      "غير محدد"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-[#202020] p-4">
                <CalendarDaysIcon className="h-5 w-5 text-zinc-500" />

                <div>
                  <p className="text-xs text-zinc-500">
                    تاريخ الطلب
                  </p>

                  <p className="mt-1 font-medium text-white">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-[#171717] p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A5B4FC]/10">
              <ShoppingBagIcon className="h-6 w-6 text-[#A5B4FC]" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                منتجات الطلب
              </h2>

              <p className="text-sm text-zinc-500">
                {orderItems.length} منتج
              </p>
            </div>
          </div>

          {orderItems.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-[#202020] p-6 text-center text-zinc-500">
              لا توجد منتجات مرتبطة بهذا الطلب.
            </div>
          ) : (
            <div className="space-y-3">
              {orderItems.map((item, index) => {
                const product =
                  getRelation(item.product);

                const image = getImageUrl(
                  product?.image
                );

                const price = Number(
                  item.price ??
                    product?.salePrice ??
                    product?.price ??
                    0
                );

                const quantity = Number(
                  item.quantity || 1
                );

                const total = Number(
                  item.total ??
                    price * quantity
                );

                return (
                  <div
                    key={
                      item.documentId ||
                      item.id ||
                      index
                    }
                    className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-[#202020] p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-900">
                      <img
                        src={image}
                        alt={
                          product?.name ||
                          "المنتج"
                        }
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.onerror =
                            null;
                          e.currentTarget.src =
                            "/placeholder.jpg";
                        }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-white">
                        {product?.name ||
                          "منتج بدون اسم"}
                      </h3>

                      {product?.sku && (
                        <p className="mt-1 text-sm text-zinc-500">
                          رقم المنتج: {product.sku}
                        </p>
                      )}
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-zinc-500">
                        الكمية
                      </p>

                      <p className="mt-1 font-semibold text-white">
                        {quantity}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-zinc-500">
                        السعر
                      </p>

                      <p className="mt-1 font-semibold text-white">
                        {formatMoney(price)} ر.س
                      </p>
                    </div>

                    <div className="min-w-[120px] text-center">
                      <p className="text-xs text-zinc-500">
                        الإجمالي
                      </p>

                      <p className="mt-1 font-bold text-[#A5B4FC]">
                        {formatMoney(total)} ر.س
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Delivery */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A5B4FC]/10">
                <MapPinIcon className="h-6 w-6 text-[#A5B4FC]" />
              </div>

              <div>
                <h2 className="font-bold text-white">
                  معلومات التوصيل
                </h2>

                <p className="text-sm text-zinc-500">
                  تفاصيل الشحنة
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-[#202020] p-4">
              <p className="text-sm text-zinc-500">
                رقم التتبع
              </p>

              <p className="mt-1 font-mono text-lg font-semibold text-[#A5B4FC]">
                {order.trackingNumber ||
                  `ORD-${order.id}`}
              </p>
            </div>

            <div className="mt-4 flex items-start gap-3">
              <MapPinIcon className="mt-1 h-5 w-5 text-zinc-500" />

              <div>
                <p className="text-sm text-zinc-500">
                  عنوان التوصيل
                </p>

                <p className="mt-1 text-white">
                  {order.shippingAddress ||
                    order.address ||
                    "سيتم التواصل معك لتأكيد عنوان التوصيل"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A5B4FC]/10">
                <TruckIcon className="h-6 w-6 text-[#A5B4FC]" />
              </div>

              <div>
                <h2 className="font-bold text-white">
                  شركة الشحن
                </h2>

                <p className="text-sm text-zinc-500">
                  معلومات الشحنة
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm text-zinc-500">
                  شركة الشحن
                </p>

                <p className="mt-1 font-medium text-white">
                  {order.shippingCompany ||
                    "Apex Express"}
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  موعد الوصول المتوقع
                </p>

                <p className="mt-1 font-medium text-white">
                  {status === "delivered"
                    ? "تم التوصيل"
                    : "سيتم تحديث الموعد بعد بدء الشحن"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/myorder")}
            className="rounded-xl bg-[#A5B4FC] px-8 py-3 font-semibold text-black transition hover:bg-[#8D9CF7]"
          >
            العودة إلى طلباتي
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

