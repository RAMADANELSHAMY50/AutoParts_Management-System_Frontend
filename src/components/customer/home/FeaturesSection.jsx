import React from "react";
import {
  FiTruck,
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";
import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: <FiTruck size={30} />,
      title: "سرعة التوريد",
      description:
        "نظام لوجستي متقدم يضمن وصول طلبك في زمن قياسي مع تتبع دقيق لكل خطوة.",
    },
    {
      id: 2,
      icon: <FiShield size={30} />,
      title: "جودة معتمدة",
      description:
        "جميع قطعنا تخضع لاختبارات أداء صارمة لضمان توافقها التام مع أعلى المعايير العالمية.",
    },
    {
      id: 3,
      icon: <FiRefreshCw size={30} />,
      title: "تركيب احترافي",
      description:
        "شبكة من مراكز الخدمة المعتمدة المجهزة بأحدث التقنيات لضمان أفضل تركيب لسيارتك.",
    },
  ];

  return (
    <section
      dir="rtl"
      className="bg-[#111111] py-12 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Heading */}
        <div className="mb-9 text-center sm:mb-14">

          <span className="inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-400 sm:px-4 sm:py-2 sm:text-sm">
            لماذا تختار Apex Auto؟
          </span>

          <h2 className="mt-4 text-2xl font-bold text-white sm:mt-5 sm:text-4xl md:text-5xl">
            مصمم لأداء أفضل
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-zinc-400 sm:mt-4 sm:text-base sm:leading-7">
            نحن لا نبيع قطع الغيار فحسب، بل نصمم تجربة قيادة متكاملة
            تعتمد على الدقة والجودة والأداء المتميز.
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}