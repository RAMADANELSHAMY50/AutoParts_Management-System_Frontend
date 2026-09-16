import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

export default function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/products?populate=*&pagination[limit]=4"
      );

      setProducts(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section
      dir="rtl"
      className="bg-[#111111] py-14 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Header */}
        <div className="mb-8 flex flex-col items-center justify-between gap-5 sm:mb-12 md:flex-row">

          <div className="text-right">

            <span className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-400 sm:px-4 sm:text-sm">
              مجموعة مميزة
            </span>

            <h2 className="mt-3 text-2xl font-bold text-white sm:mt-4 sm:text-4xl">
              المنتجات الأكثر مبيعًا
            </h2>

            <p className="mt-2 max-w-xl text-xs leading-6 text-zinc-400 sm:mt-3 sm:text-base sm:leading-7">
              اكتشف مجموعة من أشهر قطع غيار وإكسسوارات السيارات لدينا،
              والتي تم اختيارها بعناية لضمان الجودة والمتانة والأداء المتميز.
            </p>

          </div>

          <Link
            to="/catalog"
            className="flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2.5 text-sm text-white transition hover:border-indigo-500 hover:bg-indigo-500 sm:px-5 sm:py-3 sm:text-base"
          >
            عرض جميع المنتجات
            <FiArrowLeft />
          </Link>

        </div>

        {/* Loading */}
        {loading && (
          <div className="py-10 text-center text-sm text-zinc-400">
            جاري تحميل المنتجات...
          </div>
        )}

        {/* Empty */}
        {!loading && products.length === 0 && (
          <div className="rounded-2xl border border-zinc-800 bg-[#181818] py-12 text-center">
            <p className="text-base font-semibold text-white sm:text-lg">
              لا توجد منتجات حاليًا
            </p>

            <p className="mt-2 text-xs text-zinc-500 sm:text-sm">
              سيتم عرض المنتجات هنا عند إضافتها.
            </p>
          </div>
        )}

        {/* Products */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.documentId || product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}