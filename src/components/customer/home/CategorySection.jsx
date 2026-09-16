import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import CategoryCard from "./CategoryCard";

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/categories?populate=*"
      );

      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="bg-[#111111] py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Header */}
        <div className="mb-7 flex items-center justify-between sm:mb-10">

          <Link
            to="/catalog"
            className="flex items-center gap-1.5 text-sm text-zinc-300 transition hover:text-white sm:gap-2 sm:text-base"
          >
            <FiArrowLeft />
            عرض الكل
          </Link>

          <div className="text-right">
            <h2 className="text-2xl font-bold text-white sm:text-4xl">
              تسوق حسب الفئة
            </h2>

            <p className="mt-1 text-xs text-zinc-400 sm:mt-2 sm:text-base">
              مجموعة مختارة بعناية لأفضل أداء
            </p>
          </div>

        </div>

        {/* Loading */}
        {loading && (
          <div className="py-10 text-center text-sm text-zinc-400">
            جاري تحميل الفئات...
          </div>
        )}

        {/* Categories */}
        {!loading && (
          <div className="grid grid-cols-1 gap-4 auto-rows-[180px] sm:grid-cols-2 sm:gap-6 sm:auto-rows-[240px] md:grid-cols-3">

            {categories.slice(0, 4).map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                className={
                  index === 0 || index === 3
                    ? "md:col-span-2"
                    : "md:col-span-1"
                }
              />
            ))}

          </div>
        )}

      </div>
    </section>
  );
}