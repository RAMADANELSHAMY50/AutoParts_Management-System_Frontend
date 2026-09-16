import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OrderSummary from "../../components/customer/checkout/OrderSummary";
import PaymentMethods from "../../components/customer/checkout/PaymentMethods";
import ShippingForm from "../../components/customer/checkout/ShippingForm";
import Footer from "../../components/customer/layout/Footer";
import Navbar from "../../components/customer/layout/Navbar";

export default function Checkout() {
  const navigate = useNavigate();

  const [shippingData, setShippingData] =
    useState({
      fullName: "",
      phone: "",
      address: "",
      city: "الرياض",
      zipCode: "",
    });

  const [paymentMethod, setPaymentMethod] =
    useState("بطاقة");

  const handleShippingChange = (data) => {
    setShippingData(data);

    console.log("SHIPPING DATA:", data);
  };

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);

    console.log("SELECTED PAYMENT:", method);
  };

  const handleOrderCreated = (order) => {
    console.log("ORDER CREATED:", order);

    navigate("/myorder", {
      state: {
        order,
      },
    });
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#111111] text-white"
    >
      <Navbar />

      <main className="mt-6 px-3 py-5 sm:mt-8 sm:px-4 sm:py-7 md:px-6 md:py-8 lg:mt-12 lg:px-6 lg:py-10">
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:gap-7 lg:grid-cols-3 lg:gap-8">
          {/* Order Summary */}
          <div className="order-1 lg:order-1">
            <div className="lg:sticky lg:top-6">
              <OrderSummary
                shippingData={shippingData}
                paymentMethod={paymentMethod}
                onOrderCreated={
                  handleOrderCreated
                }
              />
            </div>
          </div>

          {/* Checkout Forms */}
          <div className="order-2 space-y-5 sm:space-y-6 lg:col-span-2 lg:order-2 lg:space-y-8">
            <ShippingForm
              onChange={handleShippingChange}
            />

            <PaymentMethods
              onChange={handlePaymentChange}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}