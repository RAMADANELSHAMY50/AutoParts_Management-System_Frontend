import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:1337";

// ======================================================
// Helpers
// ======================================================

const getRelation = (relation) => {
  if (!relation) return null;

  if (relation.data) {
    return relation.data;
  }

  return relation;
};

const normalizeProduct = (product) => {
  const normalized = getRelation(product);

  if (!normalized) return null;

  return {
    ...normalized,

    id: normalized.id,

    documentId: normalized.documentId,

    name: normalized.name,

    price: Number(
      normalized.salePrice ??
        normalized.price ??
        normalized.costPrice ??
        0
    ),

    stock: Number(normalized.stock ?? 0),

    quantity: Number(
      normalized.quantity ?? 0
    ),

    minimumStock: Number(
      normalized.minimumStock ?? 0
    ),

    image: normalized.image,
  };
};

const getImageUrl = (image) => {
  if (!image) {
    return "/placeholder.jpg";
  }

  // Direct string
  if (typeof image === "string") {
    if (image.startsWith("http")) {
      return image;
    }

    return `${API_URL}${
      image.startsWith("/") ? "" : "/"
    }${image}`;
  }

  // Strapi relation
  const imageData = image?.data || image;

  if (!imageData) {
    return "/placeholder.jpg";
  }

  const url =
    imageData?.url ||
    imageData?.attributes?.url ||
    imageData?.formats?.large?.url ||
    imageData?.attributes?.formats?.large?.url ||
    imageData?.formats?.medium?.url ||
    imageData?.attributes?.formats?.medium?.url ||
    imageData?.formats?.small?.url ||
    imageData?.attributes?.formats?.small?.url;

  if (!url) {
    return "/placeholder.jpg";
  }

  if (url.startsWith("http")) {
    return url;
  }

  return `${API_URL}${
    url.startsWith("/") ? "" : "/"
  }${url}`;
};

// ======================================================
// Component
// ======================================================

export default function OrderSummary({
  shippingData,
  paymentMethod,
  onOrderCreated,
}) {
  const [loading, setLoading] = useState(false);

  // ======================================================
  // Cart
  // ======================================================

  let products = [];

  try {
    products = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
  } catch (error) {
    console.error(
      "❌ CART PARSE ERROR:",
      error
    );

    products = [];
  }

  if (!Array.isArray(products)) {
    products = [];
  }

  // ======================================================
  // Normalize Cart Products
  // ======================================================

  const normalizedProducts = products
    .map((item) => {
      const product =
        normalizeProduct(item);

      if (!product) {
        return null;
      }

      return {
        ...product,

        cartQuantity: Number(
          item.cartQuantity ??
            item.quantityInCart ??
            item.qty ??
            item.quantity ??
            1
        ),

        price: Number(
          item.salePrice ??
            item.price ??
            product.salePrice ??
            product.price ??
            0
        ),
      };
    })
    .filter(Boolean);

  // ======================================================
  // Calculate Subtotal
  // ======================================================

  const subtotal =
    normalizedProducts.reduce(
      (total, item) => {
        const quantity = Number(
          item.cartQuantity || 1
        );

        const price = Number(
          item.price || 0
        );

        return (
          total +
          price * quantity
        );
      },
      0
    );

  // ======================================================
  // Shipping
  // ======================================================

  const shipping =
    subtotal >= 500 ? 0 : 50;

  // ======================================================
  // Tax
  // ======================================================

  const taxRate = 0.15;

  const tax =
    subtotal * taxRate;

  // ======================================================
  // Discount
  // ======================================================

  const discount = 0;

  // ======================================================
  // Total
  // ======================================================

  const total =
    subtotal +
    shipping +
    tax -
    discount;

  // ======================================================
  // Checkout
  // ======================================================

  const handleCheckout = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      // ==================================================
      // Token
      // ==================================================

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {
        toast.error(
          "يجب تسجيل الدخول أولاً"
        );

        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type":
            "application/json",
        },
      };

      // ==================================================
      // Empty Cart
      // ==================================================

      if (
        !normalizedProducts.length
      ) {
        toast.error(
          "السلة فارغة"
        );

        return;
      }

      // ==================================================
      // Current User
      // ==================================================

      let currentUser;

      try {
        const userResponse =
          await axios.get(
            `${API_URL}/api/users/me`,
            config
          );

        currentUser =
          userResponse.data;

        console.log(
          "CURRENT USER:",
          currentUser
        );

        console.log(
          "USER ID:",
          currentUser?.id
        );

        console.log(
          "USER DOCUMENT ID:",
          currentUser?.documentId
        );
      } catch (userError) {
        console.error(
          "❌ GET CURRENT USER ERROR:",
          userError.response?.data ||
            userError
        );

        if (
          userError.response?.status ===
          401
        ) {
          toast.error(
            "انتهت جلسة تسجيل الدخول، سجل الدخول مرة أخرى"
          );
        } else {
          toast.error(
            "فشل في الحصول على بيانات المستخدم"
          );
        }

        return;
      }

      // ==================================================
      // Validate User
      // ==================================================

      if (!currentUser?.id) {
        toast.error(
          "بيانات المستخدم غير صحيحة"
        );

        return;
      }

      // ==================================================
      // Validate Products
      // ==================================================

      const verifiedProducts = [];

      for (const item of normalizedProducts) {
        try {
          let response;

          // ----------------------------------------------
          // Prefer documentId
          // ----------------------------------------------

          if (item.documentId) {
            response =
              await axios.get(
                `${API_URL}/api/products`,
                {
                  ...config,

                  params: {
                    "filters[documentId][$eq]":
                      item.documentId,

                    populate: "*",
                  },
                }
              );
          }

          // ----------------------------------------------
          // Fallback numeric ID
          // ----------------------------------------------

          if (
            !response?.data?.data
              ?.length &&
            item.id
          ) {
            response =
              await axios.get(
                `${API_URL}/api/products`,
                {
                  ...config,

                  params: {
                    "filters[id][$eq]":
                      item.id,

                    populate: "*",
                  },
                }
              );
          }

          const productData =
            response?.data?.data?.[0];

          if (!productData) {
            toast.error(
              `المنتج "${item.name}" غير موجود`
            );

            return;
          }

          const realProduct =
            normalizeProduct(
              productData
            );

          if (!realProduct) {
            toast.error(
              `بيانات المنتج "${item.name}" غير صحيحة`
            );

            return;
          }

          const requestedQuantity =
            Number(
              item.cartQuantity || 1
            );

          const currentStock =
            Number(
              realProduct.stock ?? 0
            );

          // ----------------------------------------------
          // Stock Validation
          // ----------------------------------------------

          if (
            currentStock <
            requestedQuantity
          ) {
            toast.error(
              `الكمية المطلوبة من "${realProduct.name}" غير متوفرة`
            );

            return;
          }

          verifiedProducts.push({
            ...realProduct,

            cartQuantity:
              requestedQuantity,

            price: Number(
              realProduct.salePrice ??
                realProduct.price ??
                item.price ??
                0
            ),
          });
        } catch (productError) {
          console.error(
            "❌ PRODUCT VERIFICATION ERROR:",
            productError.response
              ?.data ||
              productError
          );

          toast.error(
            `فشل التحقق من المنتج "${item.name}"`
          );

          return;
        }
      }

      // ==================================================
      // Make sure all products were verified
      // ==================================================

      if (
        verifiedProducts.length !==
        normalizedProducts.length
      ) {
        toast.error(
          "فشل التحقق من منتجات السلة"
        );

        return;
      }

      // ==================================================
      // Order Number
      // ==================================================

      const orderNumber =
        `ORD-${Date.now()}`;

      console.log(
        "ORDER NUMBER:",
        orderNumber
      );

      // ==================================================
      // Payment Method
      // ==================================================

      const selectedPaymentMethod =
        paymentMethod || "بطاقة";

      console.log(
        "PAYMENT METHOD:",
        selectedPaymentMethod
      );

      // ==================================================
      // Order Payload
      // ==================================================

      const orderPayload = {
        data: {
          orderNumber,

          subtotal: Number(
            subtotal.toFixed(2)
          ),

          tax: Number(
            tax.toFixed(2)
          ),

          discount: Number(
            discount.toFixed(2)
          ),

          total: Number(
            total.toFixed(2)
          ),

          paymentMethod:
            selectedPaymentMethod,

          State: "قيد التنفيذ",

          users_permissions_user:
            currentUser.id,
        },
      };

      console.log(
        "ORDER PAYLOAD:",
        JSON.stringify(
          orderPayload,
          null,
          2
        )
      );

      // ==================================================
      // Create Order
      // ==================================================

      const orderResponse =
        await axios.post(
          `${API_URL}/api/orders`,
          orderPayload,
          config
        );

      const createdOrder =
        orderResponse.data?.data;

      console.log(
        "ORDER CREATED:",
        createdOrder
      );

      if (!createdOrder?.id) {
        throw new Error(
          "Order created but no order ID returned"
        );
      }

      // ==================================================
      // Create Order Items
      // ==================================================

      const createdOrderItems = [];

      // IMPORTANT:
      // Use normalizedProducts
      // NOT normalizedCart

      for (const product of normalizedProducts) {
        const quantity = Number(
          product.cartQuantity || 1
        );

        const price = Number(
          product.price || 0
        );

        const itemTotal =
          price * quantity;

        const orderItemPayload = {
          data: {
            productDocumentId:
              product.documentId,

            orderDocumentId:
              createdOrder.documentId,

            quantity,

            price,

            total: Number(
              itemTotal.toFixed(2)
            ),
          },
        };

        console.log(
          "📦 CREATING ORDER ITEM:",
          JSON.stringify(
            orderItemPayload,
            null,
            2
          )
        );

        try {
          const orderItemResponse =
            await axios.post(
              `${API_URL}/api/order-items`,
              orderItemPayload,
              config
            );

          console.log(
            "🔎 FULL ORDER ITEM RESPONSE:",
            JSON.stringify(
              orderItemResponse,
              null,
              2
            )
          );

          console.log(
            "🔎 ORDER ITEM RESPONSE DATA:",
            JSON.stringify(
              orderItemResponse.data,
              null,
              2
            )
          );

          // Strapi can return either:
          // response.data.data
          // OR response.data directly

          const createdOrderItem =
            orderItemResponse.data?.data ??
            orderItemResponse.data;

          console.log(
            "✅ CREATED ORDER ITEM:",
            JSON.stringify(
              createdOrderItem,
              null,
              2
            )
          );

          if (
            !createdOrderItem?.id
          ) {
            console.error(
              "❌ ORDER ITEM RESPONSE HAS NO ID:",
              JSON.stringify(
                orderItemResponse.data,
                null,
                2
              )
            );

            throw new Error(
              `Order item creation failed for ${product.name}`
            );
          }

          createdOrderItems.push(
            createdOrderItem
          );

          console.log(
            `✅ ORDER ITEM CREATED SUCCESSFULLY: ${product.name}`
          );
        } catch (itemError) {
          console.error(
            `❌ ORDER ITEM ERROR FOR ${product.name}:`,
            itemError
          );

          console.error(
            "STATUS:",
            itemError.response
              ?.status
          );

          console.error(
            "STRAPI RESPONSE:",
            itemError.response
              ?.data
          );

          console.error(
            "STRAPI MESSAGE:",
            itemError.response
              ?.data?.error?.message
          );

          console.error(
            "STRAPI DETAILS:",
            itemError.response
              ?.data?.error?.details
          );

          throw itemError;
        }
      }

      // ==================================================
      // Verify Order Items
      // ==================================================

      try {
        const verificationResponse =
          await axios.get(
            `${API_URL}/api/order-items`,
            {
              ...config,

              params: {
                "filters[order][documentId][$eq]":
                  createdOrder.documentId,

                populate: "*",

                "pagination[limit]":
                  100,
              },
            }
          );

        const verifiedOrderItems =
          verificationResponse.data
            ?.data || [];

        console.log(
          "VERIFIED ORDER ITEMS:",
          verifiedOrderItems
        );

        if (
          !verifiedOrderItems.length
        ) {
          console.warn(
            "⚠️ Order created but no order items were found during verification."
          );
        }
      } catch (
        verificationError
      ) {
        console.warn(
          "⚠️ ORDER ITEM VERIFICATION FAILED:",
          verificationError.response
            ?.data ||
            verificationError
        );
      }

      // ==================================================
      // Update Stock
      // ==================================================

      for (const product of verifiedProducts) {
        const quantity =
          Number(
            product.cartQuantity || 1
          );

        const oldStock =
          Number(
            product.stock || 0
          );

        const newStock =
          Math.max(
            0,
            oldStock - quantity
          );

        try {
          let stockResponse;

          // ----------------------------------------------
          // Update by documentId
          // ----------------------------------------------

          if (
            product.documentId
          ) {
            stockResponse =
              await axios.put(
                `${API_URL}/api/products/${product.documentId}`,
                {
                  data: {
                    stock:
                      newStock,
                  },
                },
                config
              );
          } else if (
            product.id
          ) {
            // --------------------------------------------
            // Fallback numeric ID
            // --------------------------------------------

            stockResponse =
              await axios.put(
                `${API_URL}/api/products/${product.id}`,
                {
                  data: {
                    stock:
                      newStock,
                  },
                },
                config
              );
          } else {
            throw new Error(
              "Product has no ID or documentId"
            );
          }

          console.log(
            "STOCK UPDATED:",
            {
              product:
                product.name,

              oldStock,

              quantity,

              newStock,
            }
          );

          console.log(
            "STOCK RESPONSE:",
            stockResponse.data
          );
        } catch (
          stockError
        ) {
          console.error(
            "❌ STOCK UPDATE ERROR:",
            stockError.response
              ?.data ||
              stockError
          );

          // Do not stop checkout
          // because order already exists.
        }
      }

      // ==================================================
      // Create Customer Notification
      // ==================================================

      try {
        console.log(
          "🔔 CREATING CUSTOMER NOTIFICATION..."
        );

        console.log(
          "NOTIFICATION USER ID:",
          currentUser.id
        );

        console.log(
          "NOTIFICATION USER DOCUMENT ID:",
          currentUser.documentId
        );

        // ----------------------------------------------
        // Make sure documentId exists
        // ----------------------------------------------

        if (
          !currentUser.documentId
        ) {
          console.warn(
            "⚠️ CURRENT USER HAS NO DOCUMENT ID"
          );

          console.warn(
            "⚠️ NOTIFICATION WAS NOT CREATED"
          );
        } else {
          const notificationPayload =
            {
              data: {
                title:
                  "طلب جديد",

                message:
                  `تم إنشاء طلبك رقم ${orderNumber} بنجاح`,

                type:
                  "تم إنشاء الفاتورة",

                isRead: false,

                users_permissions_users:
                  {
                    connect: [
                      currentUser.documentId,
                    ],
                  },
              },
            };

          console.log(
            "NOTIFICATION PAYLOAD:",
            JSON.stringify(
              notificationPayload,
              null,
              2
            )
          );

          const notificationResponse =
            await axios.post(
              `${API_URL}/api/notifications`,
              notificationPayload,
              config
            );

          console.log(
            "✅ NOTIFICATION CREATED:",
            notificationResponse.data
          );

          window.dispatchEvent(
            new Event(
              "notificationsUpdated"
            )
          );

          console.log(
            "🔔 notificationsUpdated EVENT DISPATCHED"
          );
        }
      } catch (
        notificationError
      ) {
        console.error(
          "❌ NOTIFICATION CREATION FAILED"
        );

        console.error(
          "STATUS:",
          notificationError.response
            ?.status
        );

        console.error(
          "RESPONSE:",
          notificationError.response
            ?.data
        );

        console.error(
          "MESSAGE:",
          notificationError.response
            ?.data?.error?.message
        );

        console.error(
          "FULL NOTIFICATION ERROR:",
          JSON.stringify(
            notificationError.response
              ?.data,
            null,
            2
          )
        );
      }

      // ==================================================
      // Save Last Invoice
      // ==================================================

      const lastInvoice = {
        ...createdOrder,

        id: createdOrder.id,

        documentId:
          createdOrder.documentId,

        orderNumber,

        subtotal,

        shipping,

        tax,

        discount,

        total,

        paymentMethod:
          selectedPaymentMethod,

        State:
          "قيد التنفيذ",

        users_permissions_user:
          currentUser,

        order_items:
          createdOrderItems,

        products:
          verifiedProducts.map(
            (product) => ({
              id: product.id,

              documentId:
                product.documentId,

              name:
                product.name,

              price:
                product.price,

              quantity:
                product.cartQuantity,

              total:
                product.price *
                product.cartQuantity,

              image:
                getImageUrl(
                  product.image
                ),
            })
          ),
      };

      localStorage.setItem(
        "lastInvoice",
        JSON.stringify(
          lastInvoice
        )
      );

      // ==================================================
      // Clear Cart
      // ==================================================

      localStorage.removeItem(
        "cart"
      );

      // ==================================================
      // Notify Cart Components
      // ==================================================

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      // ==================================================
      // Notify Parent
      // ==================================================

      if (onOrderCreated) {
        onOrderCreated(
          lastInvoice
        );
      }

      // ==================================================
      // Success
      // ==================================================

      toast.success(
        "تم إنشاء الطلب بنجاح 🎉"
      );

      console.log(
        "CHECKOUT COMPLETED SUCCESSFULLY"
      );
    } catch (error) {
      console.error(
        "❌ CHECKOUT ERROR:",
        error
      );

      console.error(
        "❌ STATUS:",
        error.response?.status
      );

      console.error(
        "❌ STRAPI RESPONSE:",
        JSON.stringify(
          error.response?.data,
          null,
          2
        )
      );

      console.error(
        "❌ STRAPI MESSAGE:",
        error.response?.data
          ?.error?.message
      );

      console.error(
        "❌ STRAPI DETAILS:",
        JSON.stringify(
          error.response?.data
            ?.error?.details,
          null,
          2
        )
      );

      if (
        error.response?.status ===
        401
      ) {
        toast.error(
          "انتهت جلسة تسجيل الدخول، سجل الدخول مرة أخرى"
        );

        return;
      }

      if (
        error.response?.status ===
        403
      ) {
        toast.error(
          "ليس لديك صلاحية لتنفيذ عملية الشراء"
        );

        return;
      }

      if (
        error.response?.status ===
        404
      ) {
        toast.error(
          "تعذر العثور على أحد البيانات المطلوبة"
        );

        return;
      }

      toast.error(
        error.response?.data?.error
          ?.message ||
          error.message ||
          "حدث خطأ أثناء إنشاء الطلب"
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <div
      dir="rtl"
      className="rounded-2xl border border-zinc-800 bg-[#171717] p-6 text-white"
    >
      {/* ==================================================
          Header
      ================================================== */}

      <div className="mb-6">
        <h2 className="text-xl font-bold">
          ملخص الطلب
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          راجع تفاصيل طلبك قبل إتمام
          الشراء
        </p>
      </div>

      {/* ==================================================
          Products
      ================================================== */}

      <div className="space-y-4">
        {normalizedProducts.map(
          (item, index) => {
            const quantity =
              Number(
                item.cartQuantity || 1
              );

            const price =
              Number(
                item.price || 0
              );

            const itemTotal =
              price * quantity;

            return (
              <div
                key={
                  item.documentId ||
                  item.id ||
                  index
                }
                className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-[#1c1c1c] p-3"
              >
                {/* Image */}

                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-900">
                  <img
                    src={getImageUrl(
                      item.image
                    )}
                    alt={item.name}
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/placeholder.jpg";
                    }}
                  />
                </div>

                {/* Product Info */}

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold">
                    {item.name}
                  </h3>

                  <div className="mt-1 text-sm text-zinc-500">
                    الكمية:{" "}
                    {quantity}
                  </div>

                  <div className="mt-1 text-sm text-zinc-400">
                    {price.toFixed(
                      2
                    )}{" "}
                    ر.س
                  </div>
                </div>

                {/* Total */}

                <div className="text-left">
                  <div className="font-bold text-blue-500">
                    {itemTotal.toFixed(
                      2
                    )}{" "}
                    ر.س
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* ==================================================
          Divider
      ================================================== */}

      <div className="my-6 border-t border-zinc-800" />

      {/* ==================================================
          Summary
      ================================================== */}

      <div className="space-y-4">
        {/* Subtotal */}

        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-400">
            المجموع الفرعي
          </span>

          <span className="font-medium">
            {subtotal.toFixed(
              2
            )}{" "}
            ر.س
          </span>
        </div>

        {/* Shipping */}

        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-400">
            الشحن
          </span>

          <span
            className={
              shipping === 0
                ? "font-medium text-green-500"
                : "font-medium"
            }
          >
            {shipping === 0
              ? "مجاني"
              : `${shipping.toFixed(
                  2
                )} ر.س`}
          </span>
        </div>

        {/* Tax */}

        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-400">
            الضريبة 15%
          </span>

          <span className="font-medium">
            {tax.toFixed(
              2
            )}{" "}
            ر.س
          </span>
        </div>

        {/* Discount */}

        {discount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">
              الخصم
            </span>

            <span className="font-medium text-green-500">
              -
              {discount.toFixed(
                2
              )}{" "}
              ر.س
            </span>
          </div>
        )}
      </div>

      {/* ==================================================
          Total Divider
      ================================================== */}

      <div className="my-6 border-t border-zinc-800" />

      {/* ==================================================
          Total
      ================================================== */}

      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">
          الإجمالي
        </span>

        <span className="text-2xl font-bold text-blue-500">
          {total.toFixed(
            2
          )}{" "}
          ر.س
        </span>
      </div>

      {/* ==================================================
          Shipping Info
      ================================================== */}

      {shippingData && (
        <div className="mt-6 rounded-xl border border-zinc-800 bg-[#1c1c1c] p-4">
          <h3 className="mb-3 font-semibold">
            بيانات الشحن
          </h3>

          <div className="space-y-1 text-sm text-zinc-400">
            {shippingData.name && (
              <p>
                الاسم:{" "}
                <span className="text-zinc-200">
                  {
                    shippingData.name
                  }
                </span>
              </p>
            )}

            {shippingData.phone && (
              <p>
                الهاتف:{" "}
                <span className="text-zinc-200">
                  {
                    shippingData.phone
                  }
                </span>
              </p>
            )}

            {shippingData.address && (
              <p>
                العنوان:{" "}
                <span className="text-zinc-200">
                  {
                    shippingData.address
                  }
                </span>
              </p>
            )}

            {shippingData.city && (
              <p>
                المدينة:{" "}
                <span className="text-zinc-200">
                  {
                    shippingData.city
                  }
                </span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* ==================================================
          Payment Method
      ================================================== */}

      <div className="mt-4 rounded-xl border border-zinc-800 bg-[#1c1c1c] p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">
            طريقة الدفع
          </span>

          <span className="font-medium">
            {paymentMethod ||
              "بطاقة"}
          </span>
        </div>
      </div>

      {/* ==================================================
          Checkout Button
      ================================================== */}

      <button
        type="button"
        onClick={handleCheckout}
        disabled={
          loading ||
          normalizedProducts.length ===
            0
        }
        className="mt-6 flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <div className="flex items-center gap-3">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

            <span>
              جاري إنشاء الطلب...
            </span>
          </div>
        ) : (
          "تأكيد الطلب"
        )}
      </button>

      {/* ==================================================
          Security Text
      ================================================== */}

      <p className="mt-4 text-center text-xs text-zinc-500">
        سيتم إنشاء الطلب وتحديث
        المخزون تلقائيًا بعد تأكيد
        الشراء.
      </p>
    </div>
  );
}