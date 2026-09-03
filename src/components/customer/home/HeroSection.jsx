import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import product1 from "../../../assets/images/hero.jpg";

export default function HeroSection() {
  return (
    <section
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${product1})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/75 via-black/40 to-black/80"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-center justify-end">
        <div className="max-w-xl text-right text-white">
          {/* Badge */}
          <span className="inline-block bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-sm px-4 py-1 rounded-full mb-6">
            إصدارات جديدة لعام 2024
          </span>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            أطلق العنان
            <br />
            لأداء محركك
          </h1>

          {/* Description */}
          <p className="mt-6 text-zinc-300 leading-8">
            اكتشف أفضل قطع غيار السيارات الأصلية وعالية الجودة.
            <br />
            أداء احترافي، جودة مضمونة، وأسعار تنافسية.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex justify-end gap-4">
            <button className="bg-indigo-500 hover:bg-indigo-600 transition px-7 py-3 rounded-xl font-semibold flex items-center gap-2">
              تسوق الآن
              <FiArrowLeft />
            </button>

            <button className="border border-zinc-500 hover:border-indigo-400 hover:bg-white/10 transition px-7 py-3 rounded-xl font-semibold">
              تشخيص سيارتك
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#111111] to-transparent"></div>
    </section>
  );
}
