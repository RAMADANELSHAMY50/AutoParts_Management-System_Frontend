
import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import Navbar from "../../components/customer/layout/Navbar";
import Footer from "../../components/customer/layout/Footer";

import DeliveryCard from "../../components/customer/orders/DeliveryCard";
import FilterBar from "../../components/customer/orders/FilterBar";
import OrderCard from "../../components/customer/orders/OrderCard";
import ShopNowCard from "../../components/customer/orders/ShopNowCard";
import StatusTabs from "../../components/customer/orders/StatusTabs";

import banner from "../../assets/images/unnamed3.jpg";

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
// Compare Relations
// ======================================================
const isSameRelation = (first, second) => {
  const firstObject = getRelation(first);
  const secondObject = getRelation(second);

  if (!firstObject || !secondObject) {
    return false;
  }

  // Prefer documentId
  if (
    firstObject.documentId &&
    secondObject.documentId
  ) {
    return (
      firstObject.documentId ===
      secondObject.documentId
    );
  }

  // Fallback to numeric ID
  if (
    firstObject.id != null &&
    secondObject.id != null
  ) {
    return (
      Number(firstObject.id) ===
      Number(secondObject.id)
    );
  }

  return false;
};

// ======================================================
// Image URL
// ======================================================
const getImageUrl = (image) => {
  if (!image) {
    return "/placeholder.jpg";
  }

  if (typeof image === "string") {
    if (image.startsWith("http")) {
      return image;
    }

    return `${API_URL}${image}`;
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
    const url =
      image.data.attributes.url;

    return url.startsWith("http")
      ? url
      : `${API_URL}${url}`;
  }

  return "/placeholder.jpg";
};

// ======================================================
// Normalize Product
// ======================================================
const normalizeProduct = (productRelation) => {
  const rawProduct =
    getRelation(productRelation);

  if (!rawProduct) {
    return null;
  }

  if (rawProduct.attributes) {
    return {
      id: rawProduct.id,

      documentId:
        rawProduct.documentId,

      ...rawProduct.attributes,
    };
  }

  return rawProduct;
};

// ======================================================
// Normalize Order Item
// ======================================================
const normalizeOrderItem = (item) => {
  if (!item) {
    return null;
  }

  const product =
    normalizeProduct(item.product);

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

  return {
    id: item.id,

    documentId:
      item.documentId,

    productId:
      product?.id ?? null,

    productDocumentId:
      product?.documentId ?? null,

    name:
      product?.name ||
      "منتج بدون اسم",

    sku:
      product?.sku || "",

    image: getImageUrl(
      product?.image
    ),

    price,

    quantity,

    total,

    product,
  };
};

// ======================================================
// Format Date
// ======================================================
const formatDate = (date) => {
  if (!date) {
    return "غير محدد";
  }

  try {
    return new Date(
      date
    ).toLocaleDateString(
      "ar-EG",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  } catch {
    return "غير محدد";
  }
};

// ======================================================
// Order Status
// ======================================================
const getOrderStatus = (state) => {
  switch (state) {
    case "مكتمل":
    case "تم التوصيل":
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
    case "processing":
    case "pending":
    case "قيد الانتظار":
    default:
      return "processing";
  }
};

// ======================================================
// Orders
// ======================================================
export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("all");

  // ====================================================
  // Get Orders
  // ====================================================
  const getOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {
        setError(
          "يجب تسجيل الدخول أولاً."
        );
        return;
      }

      const savedUser =
        localStorage.getItem(
          "user"
        );

      if (!savedUser) {
        setError(
          "لم يتم العثور على بيانات المستخدم."
        );
        return;
      }

      const currentUser =
        JSON.parse(savedUser);

      // ==================================================
      // Orders
      // ==================================================
      const ordersResponse =
        await axios.get(
          `${API_URL}/api/orders`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            params: {
              sort: "createdAt:desc",

              "populate[users_permissions_user]":
                true,

              pagination: {
                page: 1,
                pageSize: 100,
              },
            },
          }
        );

      const allOrders =
        ordersResponse.data?.data ||
        [];

      // ==================================================
      // Only Current User Orders
      // ==================================================
      const userOrders =
        allOrders.filter(
          (order) => {
            const orderUser =
              getRelation(
                order.users_permissions_user
              );

            if (!orderUser) {
              return false;
            }

            return (
              Number(
                orderUser.id
              ) ===
              Number(
                currentUser.id
              )
            );
          }
        );

      // ==================================================
      // Order Items
      // ==================================================
      const orderItemsResponse =
        await axios.get(
          `${API_URL}/api/order-items`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            params: {
              "populate[product]":
                true,

              "populate[product][populate][image]":
                true,

              "populate[order]":
                true,

              pagination: {
                page: 1,
                pageSize: 200,
              },
            },
          }
        );

      const allOrderItems =
        orderItemsResponse.data?.data ||
        [];

      // ==================================================
      // Normalize
      // ==================================================
      const normalizedOrders =
        userOrders.map(
          (order) => {
            const currentOrderItems =
              allOrderItems
                .filter(
                  (item) => {
                    return isSameRelation(
                      item.order,
                      order
                    );
                  }
                )
                .map(
                  normalizeOrderItem
                )
                .filter(Boolean);

            return {
              ...order,

              orderItems:
                currentOrderItems,

              status:
                getOrderStatus(
                  order.State
                ),

              formattedDate:
                formatDate(
                  order.createdAt
                ),
            };
          }
        );

      console.log(
        "FINAL ORDERS:",
        normalizedOrders
      );

      normalizedOrders.forEach(
        (order) => {
          console.log(
            "================================"
          );

          console.log(
            "ORDER:",
            order.orderNumber
          );

          console.log(
            "ITEMS:",
            order.orderItems
          );

          console.log(
            "ITEM COUNT:",
            order.orderItems.length
          );
        }
      );

      setOrders(
        normalizedOrders
      );
    } catch (err) {
      console.error(
        "GET ORDERS ERROR:",
        err
      );

      console.error(
        "ERROR RESPONSE:",
        err.response?.data
      );

      setError(
        err.response?.data?.error
          ?.message ||
          "حدث خطأ أثناء تحميل الطلبات."
      );
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // Initial Load
  // ====================================================
  useEffect(() => {
    getOrders();
  }, []);

  // ====================================================
  // Filter
  // ====================================================
  const filteredOrders =
    useMemo(() => {
      if (
        activeTab === "all"
      ) {
        return orders;
      }

      return orders.filter(
        (order) =>
          order.status ===
          activeTab
      );
    }, [
      orders,
      activeTab,
    ]);

  // ====================================================
  // Handle Order Update
  // ====================================================
  const handleOrderUpdated = (
    orderId,
    newStatus
  ) => {
    setOrders(
      (previousOrders) =>
        previousOrders.map(
          (order) => {
            if (
              Number(order.id) !==
              Number(orderId)
            ) {
              return order;
            }

            return {
              ...order,

              State:
                newStatus ===
                "cancelled"
                  ? "ملغى"
                  : order.State,

              status:
                newStatus,
            };
          }
        )
    );

    // Refresh data from Strapi
    setTimeout(() => {
      getOrders();
    }, 300);
  };

  // ====================================================
  // Latest Order For Delivery Card
  // ====================================================
  const latestOrder =
    orders.length > 0
      ? orders[0]
      : null;

  // ====================================================
  // Render
  // ====================================================
  return (
  <div
    dir="rtl"
    className="min-h-screen bg-[#0E0E0E] text-white"
  >
    <Navbar />

    <main className="mx-auto max-w-[1600px] px-3 py-5 sm:px-4 sm:py-6 md:px-8 md:py-8 lg:px-12 lg:py-8">
      <FilterBar />

      <StatusTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        orders={orders}
      />

      {loading && (
        <div className="py-10 text-center text-sm text-zinc-500">
          جاري تحميل الطلبات...
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredOrders.length > 0 ? (
            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.documentId || order.id}
                  order={order}
                  orderNumber={order.orderNumber}
                  date={order.date}
                  total={order.total}
                  status={order.status}
                  orderItems={order.orderItems}
                  onOrderUpdated={handleOrderUpdated}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-zinc-800 bg-[#171717] px-4 py-10 text-center sm:px-6 sm:py-14">
              <p className="text-sm font-medium text-zinc-400 sm:text-base">
                لا توجد طلبات حالياً
              </p>
            </div>
          )}

          {/* Bottom Cards */}
          <div className="mt-7 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5 lg:mt-10 lg:grid-cols-2 lg:gap-6">
            <DeliveryCard
              order={latestOrder}
              address={latestOrder?.address}
              company={latestOrder?.company}
              trackingNumber={latestOrder?.trackingNumber}
              estimatedDate={latestOrder?.estimatedDate}
              estimatedTime={latestOrder?.estimatedTime}
            />

            <ShopNowCard />
          </div>
        </>
      )}
    </main>

    <Footer />
  </div>
);
}
