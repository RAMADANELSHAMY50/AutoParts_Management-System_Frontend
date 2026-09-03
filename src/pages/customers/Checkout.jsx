// Checkout.jsx

import OrderSummary from "../../components/customer/checkout/OrderSummary";
import PaymentMethods from "../../components/customer/checkout/PaymentMethods";
import ShippingForm from "../../components/customer/checkout/ShippingForm";
import Footer from "../../components/customer/layout/Footer";
import Navbar from "../../components/customer/layout/Navbar";



export default function Checkout() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#111111] text-white"
    >
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="mt-12 px-6 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Side - Order Summary */}
          <div className="lg:order-1">
            <div className="sticky top-6">
              <OrderSummary />
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-8 lg:col-span-2 lg:order-2">
            {/* Shipping Information */}
            <ShippingForm />

            {/* Payment Methods */}
            <PaymentMethods />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}