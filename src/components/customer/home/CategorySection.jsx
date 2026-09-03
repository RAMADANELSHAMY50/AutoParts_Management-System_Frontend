
import { FiArrowLeft } from "react-icons/fi";
import CategoryCard from "./CategoryCard";

import image1 from "../../../assets/images/hero.jpg"
import image2 from "../../../assets/images/unnamed.jpg"
import image3 from "../../../assets/images/unnamed.jpg"
import image4 from "../../../assets/images/unnamed3.jpg"



export default function CategorySection() {
  const categories = [
    {
      id: 1,
      title: "اكسسوارات المقصورة",
      subtitle: "راحة وأناقة داخلية",
      image: image1,
      className: "md:col-span-2",
    },
    {
      id: 2,
      title: "المكابح والتعليق",
      subtitle: "تحكم مثالي وانضباط",
      image: image2,
      className: "md:col-span-1",
    },
    {
      id: 3,
      title: "الجنوط والعجلات",
      subtitle: "تصاميم عصرية وثبات",
      image: image3,
      className: "md:col-span-1",
    },
    {
      id: 4,
      title: "تعديلات المحرك",
      subtitle: "قوة وعزم أكبر",
      image: image4,
      className: "md:col-span-2",
    },
  ];

  return (
    <section className="bg-[#111111] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <button className="flex items-center gap-2 text-zinc-300 hover:text-white transition">
            <FiArrowLeft />
            عرض الكل
          </button>

          <div className="text-right">
            <h2 className="text-4xl font-bold text-white">
              تسوق حسب الفئة
            </h2>

            <p className="text-zinc-400 mt-2">
              مجموعة مختارة بعناية لأفضل أداء
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              subtitle={category.subtitle}
              image={category.image}
              className={category.className}
            />
          ))}
        </div>
      </div>
    </section>
  );
}