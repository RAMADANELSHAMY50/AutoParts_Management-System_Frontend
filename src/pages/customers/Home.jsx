import CategorySection from "../../components/customer/home/CategorySection";
import FeaturesSection from "../../components/customer/home/FeaturesSection";
import HeroSection from "../../components/customer/home/HeroSection";
import ProductSection from "../../components/customer/home/ProductSection";
import Footer from "../../components/customer/layout/Footer";
import Navbar from "../../components/customer/layout/Navbar";


export default function Home() {
  return (
    <div className="min-h-screen bg-[#111111] text-white overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Categories */}
      <CategorySection />

      {/* Features */}
      <FeaturesSection />

      {/* Featured Products */}
      <ProductSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}