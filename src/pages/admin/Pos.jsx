import { useEffect, useState } from "react";
import axios from "axios";
import { MdMenu } from "react-icons/md";

import Sidebar from "../../components/admin/layout/Sidebar";
import SearchBar from "../../components/admin/pos/SearchBarPos";
import ProductGrid from "../../components/admin/pos/ProductGrid";
import CartPanel from "../../components/admin/pos/CartPanel";
import PaymentPanel from "../../components/admin/pos/PaymentPanel";

const API_URL = "http://localhost:1337";

export default function Pos() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ==========================================
  // Get Products
  // ==========================================
  const getProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await axios.get(`${API_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          populate: "*",
          "pagination[limit]": 1000,
        },
      });

      const data = response.data?.data || [];

      const formattedProducts = data.map((item) => ({
        id: item.id,
        documentId: item.documentId,
        ...item,
        image: item.image?.url
          ? `${API_URL}${item.image.url}`
          : "/placeholder.jpg",
      }));

      setAllProducts(formattedProducts);
    } catch (error) {
      console.log("GET PRODUCTS ERROR:", error.response?.data || error);
    }
  };

  // ==========================================
  // Add To Cart
  // ==========================================
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          image:
            product.image ||
            (product.image?.url
              ? `${API_URL}${product.image.url}`
              : "/placeholder.jpg"),
        },
      ];
    });
  };

  // ==========================================
  // Increase Quantity
  // ==========================================
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // ==========================================
  // Decrease Quantity
  // ==========================================
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ==========================================
  // Remove Item
  // ==========================================
  const removeItem = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // ==========================================
  // Create Notification
  // ==========================================
  const createOrderNotification = async (order) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      await axios.post(
        `${API_URL}/api/notifications`,
        {
          data: {
            title: "طلب جديد",
            message: `تم إنشاء طلب جديد برقم ${order.orderNumber}`,
            type: "info",
            isRead: false,
            category: "Orders",
            priority: "high",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(
        "CREATE NOTIFICATION ERROR:",
        error.response?.data || error
      );
    }
  };

  // ==========================================
  // Checkout
  // ==========================================
  const handleCheckout = async ({
    paymentMethod,
    subtotal,
    discount,
    tax,
    total,
  }) => {
    try {
      if (cartItems.length === 0) {
        alert("السلة فارغة");
        return;
      }

      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token) {
        alert("يرجى تسجيل الدخول أولاً");
        return;
      }

      const currentUser = storedUser
        ? JSON.parse(storedUser)
        : null;

      const orderNumber = `ORD-${Date.now()}`;

      // ==========================================
      // Create Order
      // ==========================================
      const orderResponse = await axios.post(
        `${API_URL}/api/orders`,
        {
          data: {
            orderNumber,
            subtotal,
            discount,
            tax,
            total,
            paymentMethod,
            State: "قيد التنفيذ",
            users_permissions_user: currentUser?.id || null,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const createdOrder = orderResponse.data?.data;

      if (!createdOrder) {
        throw new Error("Order was not created");
      }

      // ==========================================
      // Create Order Items
      // ==========================================
      for (const item of cartItems) {
        await axios.post(
          `${API_URL}/api/order-items`,
          {
            data: {
              product: item.id,
              order: createdOrder.id,
              quantity: item.quantity,
              price: item.price,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // ==========================================
      // Notification
      // ==========================================
      await createOrderNotification({
        ...createdOrder,
        orderNumber,
      });

      // ==========================================
      // Save Last Invoice
      // ==========================================
      localStorage.setItem(
        "lastInvoice",
        JSON.stringify({
          ...createdOrder,
          orderNumber,
          subtotal,
          discount,
          tax,
          total,
          paymentMethod,
          items: cartItems,
        })
      );

      // ==========================================
      // Clear Cart
      // ==========================================
      setCartItems([]);

      // Refresh Products
      await getProducts();

      alert("تم إتمام البيع بنجاح");
    } catch (error) {
      console.log(
        "CHECKOUT ERROR:",
        error.response?.data || error
      );

      alert("حدث خطأ أثناء إتمام البيع");
    }
  };

  // ==========================================
  // Initial Load
  // ==========================================
  useEffect(() => {
    getProducts();
  }, []);

  // ==========================================
  // Subtotal
  // ==========================================
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#0f0f0f] text-white"
    >
      <div className="flex min-h-screen bg-[#0f0f0f]">
        {/* ==========================================
            Sidebar
        ========================================== */}
        <Sidebar
          isMobileOpen={isSidebarOpen}
          setIsMobileOpen={setIsSidebarOpen}
        />

        {/* ==========================================
            Main Area
        ========================================== */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* ==========================================
              Mobile Header
          ========================================== */}
          <header className="flex items-center gap-3 border-b border-zinc-800 bg-[#111111] px-3 py-3 sm:px-4 lg:hidden">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-[#1b1b1b] text-white transition hover:border-blue-500 hover:bg-[#222]"
              aria-label="فتح القائمة"
            >
              <MdMenu size={24} />
            </button>

            <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-white sm:text-lg">
                نقطة البيع
              </h1>

              <p className="text-xs text-zinc-500 sm:text-sm">
                إدارة عمليات البيع
              </p>
            </div>
          </header>

          {/* ==========================================
              POS Layout
              
              Mobile:
              Products
              ↓
              Cart
              ↓
              Payment

              Desktop:
              Products | Cart + Payment
          ========================================== */}
          <div className="flex min-w-0 flex-1 flex-col lg:flex-row">
            {/* ==========================================
                Products Area
            ========================================== */}
            <main className="min-w-0 flex-1 bg-[#0f0f0f]">
              <SearchBar
                allProducts={allProducts}
                setProducts={setProducts}
              />

              <ProductGrid
                products={products}
                getProducts={getProducts}
                addToCart={addToCart}
              />
            </main>

            {/* ==========================================
                Cart + Payment
            ========================================== */}
            <section className="w-full shrink-0 border-t border-zinc-800 bg-[#181818] lg:w-[360px] lg:border-t-0 lg:border-r">
              <CartPanel
                cartItems={cartItems}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeItem={removeItem}
              />

              <PaymentPanel
                subtotal={subtotal}
                discount={0}
                taxRate={0.15}
                onCheckout={handleCheckout}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}