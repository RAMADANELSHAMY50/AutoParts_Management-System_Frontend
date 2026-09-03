import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/layout/Sidebar";
import CartPanel from "../../components/admin/pos/CartPanel";
import ProductGrid from "../../components/admin/pos/ProductGrid";
import SearchBar from "../../components/admin/pos/SearchBarPos";
import axios from "axios";
import PaymentPanel from "../../components/admin/pos/PaymentPanel";

export default function Pos() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // =========================
  // Payment Calculations
  // =========================

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = 0;
  const taxRate = 0.15;

  const tax = (subtotal - discount) * taxRate;

  const total = subtotal - discount + tax;

  const addToCart = (product) => {
    setCartItems((prev) => {
      // هل المنتج موجود بالفعل؟
      const existingProduct = prev.find(
        (item) => item.id === product.id
      );



      // لو موجود → زوّد الكمية
      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        );
      }

      // لو مش موجود → أضفه للسلة
      return [
        ...prev,
        {
          id: product.id,
          documentId: product.documentId, // أضف دي
          name: product.name,
          price: Number(product.price),
          quantity: 1,
          image: `http://localhost:1337${product.image?.url || ""}`,
        },
      ];
    });
  };

  // =========================
  // Increase Quantity
  // =========================

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

  // =========================
  // Decrease Quantity
  // =========================

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

  // =========================
  // Remove Item
  // =========================

  const removeItem = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };


  const handleCheckout = async (paymentData) => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      // =========================
      // Get JWT Token
      // =========================

      const token = localStorage.getItem("token");

      if (!token) {
        alert("You are not logged in");
        return;
      }

      // =========================
      // 1. Create Order
      // =========================

      const orderResponse = await axios.post(
        "http://localhost:1337/api/orders",
        {
          data: {
            orderNumber: `ORD-${Date.now()}`,
            subtotal: paymentData.subtotal,
            discount: paymentData.discount,
            tax: paymentData.tax,
            total: paymentData.total,
            paymentMethod: paymentData.paymentMethod,
            // state: "مكتمل",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const order = orderResponse.data.data;

      console.log("Order created:", order);

      // =========================
      // 2. Create Order Items
      // =========================

      for (const item of cartItems) {
        const itemResponse = await axios.post(
          "http://localhost:1337/api/order-items",
          {
            data: {
              quantity: item.quantity,
              price: item.price,
              total: item.price * item.quantity,
              order: order.documentId,
              product: item.documentId,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Order Item created:", itemResponse.data);
      }

      // =========================
      // 3. Success
      // =========================

      alert("Sale completed successfully");

      setCartItems([]);

    } catch (error) {
      console.log("========== CHECKOUT ERROR ==========");
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Message:", error.response?.data?.error?.message);
      console.log("Token:", localStorage.getItem("token"));
      console.log("====================================");

      alert("Failed to complete sale");
    }
  };
  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:1337/api/products", {
        params: {
          "populate[image]": true,
          "populate[category]": true,
          "populate[brand]": true,
          "populate[vehicles]": true,
        },
      });

      console.log("Products:", res.data.data);

      setAllProducts(res.data.data);
      setProducts([]);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="h-full bg-[#0f0f0f]">
      <div className=" bg-[#0f0f0f] text-white flex ">
        {/* Sidebar */}
        <Sidebar />

        {/* Products */}
        <main className="flex-1 flex flex-col ">
          <SearchBar setProducts={setProducts} allProducts={allProducts} />
          <ProductGrid getProducts={getProducts} products={products} addToCart={addToCart} />
        </main>

        <div className="h-100">
          {/* Cart */}
          <CartPanel cartItems={cartItems} increaseQty={increaseQty} decreaseQty={decreaseQty} removeItem={removeItem} />
          <PaymentPanel
            subtotal={subtotal}
            discount={discount}
            taxRate={taxRate}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}
