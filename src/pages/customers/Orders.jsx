

import product1 from "../../assets/images/unnamed.jpg";
import banner from "../../assets/images/unnamed3.jpg";
import Footer from "../../components/customer/layout/Footer";
import Navbar from "../../components/customer/layout/Navbar";
import DeliveryCard from "../../components/customer/orders/DeliveryCard";
import FilterBar from "../../components/customer/orders/FilterBar";
import OrderCard from "../../components/customer/orders/OrderCard";
import ShopNowCard from "../../components/customer/orders/ShopNowCard";
import StatusTabs from "../../components/customer/orders/StatusTabs";



const orders = [
  {
    id: 1,
    orderNumber: "AX-#20948",
    date: "12 أكتوبر 2024",
    total: "2,450.00",
    status: "processing",
    quantity: 3,
    products: "فواصل سيراميك، طقم مساعدين، والمزيد...",
    image: product1,
  },
  {
    id: 2,
    orderNumber: "AX-#20812",
    date: "05 أكتوبر 2024",
    total: "850.00",
    status: "delivered",
    quantity: 1,
    products: "طقم مصابيح LED أمامية",
    image: product1,
  },
  {
    id: 3,
    orderNumber: "AX-#20556",
    date: "22 سبتمبر 2024",
    total: "1,200.00",
    status: "shipping",
    quantity: 2,
    products: "فلتر هواء رياضي، زيت محرك",
    image: product1,
  },
];

const Orders = () => {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar/>
      <div className="mt-7 px-6 py-8"> 

        {/* Filter */}
        <FilterBar />

        {/* Tabs */}
        <StatusTabs />

        {/* Content */}
        <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-12">
          {/* Orders List */}
          <div className="space-y-6 xl:col-span-8">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                orderNumber={order.orderNumber}
                date={order.date}
                total={order.total}
                status={order.status}
                quantity={order.quantity}
                products={order.products}
                image={order.image}
              />
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 xl:col-span-4">
            <DeliveryCard
              company="Aramex"
              trackingNumber="ARX-45892311"
              address="الرياض، حي العليا، شارع الملك فهد"
              estimatedDate="18 أكتوبر 2024"
              estimatedTime="09:00 ص - 01:00 م"
            />

            <ShopNowCard
              image={banner}
              title="اكتشف أحدث قطع الغيار"
              description="تصفح آلاف المنتجات الأصلية والمتوافقة مع سيارتك بأسعار تنافسية وعروض حصرية."
              buttonText="تسوق الآن"
              onShop={() => console.log("Go To Shop")}
            />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Orders;