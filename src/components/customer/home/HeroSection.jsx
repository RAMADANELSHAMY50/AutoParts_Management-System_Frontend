import { Link } from "react-router-dom";
import product1 from "../../../assets/images/hero.jpg";
import product2 from "../../../assets/images/unnamed4.jpg";

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden bg-[#111111]">

      {/* Mobile Image */}
      <img
        src={product2}
        alt="Apex Auto"
        className="absolute inset-0 block h-full w-full object-cover md:hidden"
      />

      {/* Tablet + Laptop + Desktop Image */}
      <img
        src={product1}
        alt="Apex Auto"
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/75 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-end px-4 sm:px-6">

        <div className="max-w-[90%] sm:max-w-xl text-right text-white">

          {/* Badge */}
          <span className="mb-4 inline-block rounded-full border border-indigo-400/40 bg-indigo-500/20 px-3 py-1 text-xs sm:mb-6 sm:px-4 sm:text-sm">
            إصدارات جديدة لعام 2024
          </span>

          {/* Title */}
          <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            أطلق العنان
            <br />
            لأداء محركك
          </h1>

          {/* Description */}
          <p className="mt-4 text-sm leading-7 text-zinc-300 sm:mt-6 sm:text-base sm:leading-8">
            اكتشف أفضل قطع غيار السيارات الأصلية وعالية الجودة.
            <br />
            أداء احترافي، جودة مضمونة، وأسعار تنافسية.
          </p>

          {/* Button */}
          <div className="mt-7 flex justify-end gap-4 sm:mt-10">
            <Link
              to="/catalog#products"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-7 sm:py-3.5 sm:text-base"
            >
              تسوق الآن
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[#111111] to-transparent sm:h-40" />

    </section>
  );
}