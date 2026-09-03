import React from "react";
import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
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
    <section className="bg-[#111111] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
            Why Choose Apex Auto
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-white">
            Engineered for Performance
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-zinc-400 leading-7">
            نحن لا نبيع قطع الغيار فحسب، بل نصمم تجربة قيادة متكاملة تعتمد على الدقة والجودة المتناهية.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center ">
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