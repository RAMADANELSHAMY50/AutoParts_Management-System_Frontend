import { useState } from "react";

// Images
import img1 from "../../assets/images/hero.jpg";
import img2 from "../../assets/images/hero.jpg";
import img3 from "../../assets/images/hero.jpg";
import img4 from "../../assets/images/hero.jpg";

import Breadcrumb from "../../components/customer/productDetails/Breadcrumb";
import ProductGallery from "../../components/customer/productDetails/ProductGallery";
import Rating from "../../components/customer/productDetails/Rating";
import Price from "../../components/customer/productDetails/Price";
import ProductInfo from "../../components/customer/productDetails/ProductInfo";
// import FinishSelector from "../../components/customer/productDetails/FinishSelector";
// import VehicleSelector from "../../components/customer/productDetails/VehicleSelector";
// import AddToCart from "../../components/customer/productDetails/AddToCart";
import Features from "../../components/customer/productDetails/Features";
import ProductTabs from "../../components/customer/productDetails/ProductTabs";
import Specifications from "../../components/customer/productDetails/Specifications";
import Description from "../../components/customer/productDetails/Description";
import RelatedProducts from "../../components/customer/productDetails/RelatedProducts";
import Navbar from "../../components/customer/layout/Navbar";
import Footer from "../../components/customer/layout/Footer";

export default function ProductDetails() {
  const [finish, setFinish] = useState("Glossy");
  const [vehicle, setVehicle] = useState("");

  const product = {
    id: 1,
    name: "Apex Pro GT Carbon Fiber Rear Wing",

    price: 4850,
    oldPrice: 5200,

    stock: 5,

    rating: 4.9,

    reviews: 124,

    description:
      "The Apex Pro GT Rear Wing is engineered from premium pre-preg carbon fiber to improve aerodynamics while delivering an aggressive motorsport appearance.",

    images: [img1, img2, img3, img4],

    finishes: ["Glossy", "Matte", "Forged Carbon"],

    vehicles: [
      "Porsche 911 (992)",
      "BMW M4 G82",
      "Mercedes AMG GT",
      "Audi RS5",
    ],

    specifications: [
      {
        label: "Material",
        value: "Pre-Preg Carbon Fiber",
      },
      {
        label: "Finish",
        value: "Gloss UV",
      },
      {
        label: "Weight",
        value: "2.8 kg",
      },
      {
        label: "Installation",
        value: "Bolt-On",
      },
      {
        label: "Warranty",
        value: "2 Years",
      },
      {
        label: "Brand",
        value: "Apex Performance",
      },
    ],

    features: [
      "Premium Carbon Fiber",
      "OEM Perfect Fit",
      "Lightweight Design",
      "UV Resistant Coating",
      "Easy Installation",
      "2-Year Warranty",
    ],

    packageIncludes: [
      "Rear Wing",
      "Mounting Brackets",
      "Hardware Kit",
      "Installation Manual",
    ],
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Carbon Front Lip",
      image: img2,
      price: 920,
      oldPrice: 1100,
      rating: 4.8,
      reviews: 60,
    },
    {
      id: 3,
      name: "Side Skirts",
      image: img3,
      price: 1450,
      oldPrice: 1600,
      rating: 4.7,
      reviews: 44,
    },
    {
      id: 4,
      name: "Rear Diffuser",
      image: img4,
      price: 1700,
      oldPrice: 1900,
      rating: 5,
      reviews: 91,
    },
    {
      id: 5,
      name: "Mirror Caps",
      image: img1,
      price: 650,
      rating: 4.9,
      reviews: 102,
    },
  ];

  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <Navbar/>
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", link: "/" },
            { label: "Exterior", link: "/products" },
            { label: product.name },
          ]}
        />

        {/* Product */}
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} />

          <div className="space-y-6">
            
            <ProductInfo product={product} />

            {/* <FinishSelector
              finishes={product.finishes}
              selectedFinish={finish}
              onChange={setFinish}
            /> */}

            {/* <VehicleSelector
              vehicles={product.vehicles}
              selectedVehicle={vehicle}
              onChange={setVehicle}
            /> */}

            {/* <AddToCart
              stock={product.stock}
              onAddToCart={(qty) =>
                console.log("Add", qty)
              }
              onBuyNow={(qty) =>
                console.log("Buy", qty)
              }
              onWishlist={() =>
                console.log("Wishlist")
              }
            /> */}
          </div>
        </div>

        {/* Tabs */}
        <div className=" mt-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ProductTabs
            description={
              <Description
                description={product.description}
                features={product.features}
                packageIncludes={product.packageIncludes}
              />
            }
            specifications={
              <Specifications specifications={product.specifications} />
            }
            installation={
              <div className="space-y-3 text-zinc-300">
                <p>Professional installation is recommended.</p>

                <ul className="list-disc space-y-2 pl-6">
                  <li>Clean the mounting area.</li>
                  <li>Position the rear wing.</li>
                  <li>Tighten all mounting bolts.</li>
                  <li>Verify alignment.</li>
                </ul>
              </div>
            }
            reviews={
              <div className="space-y-4">
                <div className="rounded-xl border border-zinc-800 bg-[#171717] p-4">
                  ⭐⭐⭐⭐⭐ Amazing quality and perfect fit.
                </div>

                <div className="rounded-xl border border-zinc-800 bg-[#171717] p-4">
                  ⭐⭐⭐⭐☆ Fast shipping and easy installation.
                </div>
              </div>
            }
          />
          <Features/>
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
      <Footer/>
    </main>
  );
}
