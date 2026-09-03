import { useState } from "react";
import Navbar from "../../components/customer/layout/Navbar";
import Footer from "../../components/customer/layout/Footer";

import CartItem from "../../components/customer/cart/CartItem";
import CouponCard from "../../components/customer/cart/CouponCard";
import OrderSummary from "../../components/customer/cart/OrderSummary";
// import PaymentMethods from "../../components/customer/cart/PaymentMethods";
import SupportCard from "../../components/customer/cart/SupportCard";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Apex Ceramic Brake Pads",
      sku: "APX-BRK-001",
      image:
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=500",
      price: 1250,
      quantity: 1,
    },
    {
      id: 2,
      name: "Performance Oil Filter",
      sku: "APX-OIL-204",
      image:
        "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500",
      price: 850,
      quantity: 2,
    },
  ]);

  const handleIncrease = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleApplyCoupon = (coupon) => {
    console.log("Coupon:", coupon);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.15;
  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal + tax + shipping;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#111111] py-12 text-white">
        <div className="mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="mb-10 mt-7">
            <h1 className="text-4xl font-bold">سلة التسوق</h1>

            <p className="mt-2 text-zinc-400">
              لديك (3) منتجات في سلة التسوق الخاصة بك
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Side */}
            <div className="space-y-6 lg:col-span-2">
              {cartItems.length === 0 ? (
                <div className="rounded-2xl border border-zinc-800 bg-[#181818] py-20 text-center">
                  <h2 className="text-2xl font-semibold">
                    Your cart is empty
                  </h2>

                  <p className="mt-2 text-zinc-500">
                    Add products to continue shopping.
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    product={item}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onRemove={handleRemove}
                  />
                ))
              )}

              <CouponCard onApply={handleApplyCoupon} />
            </div>

            {/* Right Side */}
            <div className="space-y-6">
              <OrderSummary
                subtotal={subtotal}
                tax={tax}
                shipping={shipping}
                total={total}
                onCheckout={() => console.log("Checkout")}
              />

              {/* <PaymentMethods /> */}

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