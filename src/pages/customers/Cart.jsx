import { useEffect, useState } from "react";

import Navbar from "../../components/customer/layout/Navbar";
import Footer from "../../components/customer/layout/Footer";

import CartItem from "../../components/customer/cart/CartItem";
import CouponCard from "../../components/customer/cart/CouponCard";
import OrderSummary from "../../components/customer/cart/OrderSummary";
import SupportCard from "../../components/customer/cart/SupportCard";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // ==========================================
  // Load Cart From LocalStorage
  // ==========================================
  const loadCart = () => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      setCartItems(
        Array.isArray(savedCart)
          ? savedCart
          : []
      );
    } catch (error) {
      console.error(
        "Error loading cart:",
        error
      );

      setCartItems([]);
    }
  };

  // ==========================================
  // Load Cart When Page Opens
  // ==========================================
  useEffect(() => {
    loadCart();

    const handleCartUpdated = () => {
      loadCart();
    };

    window.addEventListener(
      "cartUpdated",
      handleCartUpdated
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdated
      );
    };
  }, []);

  // ==========================================
  // Save Cart
  // ==========================================
  const saveCart = (items) => {
    setCartItems(items);

    localStorage.setItem(
      "cart",
      JSON.stringify(items)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // ==========================================
  // Increase Quantity
  // ==========================================
  const handleIncrease = (id) => {
    const updatedItems = cartItems.map(
      (item) => {
        if (item.id !== id) {
          return item;
        }

        const stock = Number(
          item.stock ?? 0
        );

        const currentQuantity = Number(
          item.quantity ?? 1
        );

        // Don't exceed stock
        if (
          stock > 0 &&
          currentQuantity >= stock
        ) {
          return item;
        }

        return {
          ...item,
          quantity:
            currentQuantity + 1,
        };
      }
    );

    saveCart(updatedItems);
  };

  // ==========================================
  // Decrease Quantity
  // ==========================================
  const handleDecrease = (id) => {
    const updatedItems = cartItems.map(
      (item) => {
        if (
          item.id === id &&
          Number(item.quantity) > 1
        ) {
          return {
            ...item,
            quantity:
              Number(item.quantity) - 1,
          };
        }

        return item;
      }
    );

    saveCart(updatedItems);
  };

  // ==========================================
  // Remove Product
  // ==========================================
  const handleRemove = (id) => {
    const updatedItems =
      cartItems.filter(
        (item) => item.id !== id
      );

    saveCart(updatedItems);
  };

  // ==========================================
  // Coupon
  // ==========================================
  const handleApplyCoupon = (coupon) => {
    console.log("Coupon:", coupon);
  };

  // ==========================================
  // Calculate Subtotal
  // ==========================================
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  // ==========================================
  // Tax
  // ==========================================
  const tax = subtotal * 0.15;

  // ==========================================
  // Shipping
  // ==========================================
  const shipping =
    subtotal > 5000 ? 0 : 150;

  // ==========================================
  // Total
  // ==========================================
  const total =
    subtotal +
    tax +
    shipping;

  // ==========================================
  // Total Products
  // ==========================================
  const totalItems = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.quantity || 0),
    0
  );

  return (
    <>
      <Navbar />

      <main
        dir="rtl"
        className="
          min-h-screen
          bg-[#111111]
          py-8
          text-white

          sm:py-10

          lg:py-12
        "
      >
        {/* ====================================
            Main Container
        ==================================== */}

        <div
          className="
            mx-auto
            w-full
            max-w-[1600px]
            px-3

            sm:px-4

            lg:px-6

            xl:px-8

            2xl:px-10
          "
        >

          {/* ====================================
              Header
          ==================================== */}

          <div
            className="
              mb-7
              mt-5

              sm:mb-9
              sm:mt-6

              lg:mb-10
              lg:mt-7
            "
          >
            <h1
              className="
                text-2xl
                font-bold

                sm:text-3xl

                lg:text-4xl
              "
            >
              سلة التسوق
            </h1>

            <p
              className="
                mt-1
                text-xs
                text-zinc-400

                sm:mt-2
                sm:text-sm
              "
            >
              لديك ({totalItems}){" "}
              {totalItems === 1
                ? "منتج"
                : "منتجات"}{" "}
              في سلة التسوق الخاصة بك
            </p>
          </div>

          {/* ====================================
              Content
          ==================================== */}

          <div
            className="
              grid
              gap-6

              lg:grid-cols-3
              lg:gap-8
            "
          >

            {/* ==================================
                Left Side
            ================================== */}

            <div
              className="
                space-y-5

                sm:space-y-6

                lg:col-span-2
              "
            >

              {/* ==================================
                  Cart Items
              ================================== */}

              {cartItems.length === 0 ? (

                <div
                  className="
                    rounded-xl
                    border
                    border-zinc-800
                    bg-[#181818]
                    py-16
                    text-center

                    sm:rounded-2xl
                    sm:py-20
                  "
                >
                  <h2
                    className="
                      text-xl
                      font-semibold

                      sm:text-2xl
                    "
                  >
                    سلة التسوق فارغة
                  </h2>

                  <p
                    className="
                      mt-2
                      text-xs
                      text-zinc-500

                      sm:text-sm
                    "
                  >
                    أضف بعض المنتجات
                    للمتابعة.
                  </p>
                </div>

              ) : (

                cartItems.map(
                  (item) => (
                    <CartItem
                      key={item.id}
                      product={item}
                      onIncrease={
                        handleIncrease
                      }
                      onDecrease={
                        handleDecrease
                      }
                      onRemove={
                        handleRemove
                      }
                    />
                  )
                )

              )}

              {/* ==================================
                  Coupon
              ================================== */}

              <CouponCard
                onApply={
                  handleApplyCoupon
                }
              />

            </div>

            {/* ==================================
                Right Side
            ================================== */}

            <div
              className="
                space-y-5

                sm:space-y-6
              "
            >

              {/* Order Summary */}

              <OrderSummary
                subtotal={subtotal}
                tax={tax}
                shipping={shipping}
                total={total}
                onCheckout={() =>
                  console.log(
                    "Checkout"
                  )
                }
              />

              {/* Support */}

              <SupportCard />

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default Cart;