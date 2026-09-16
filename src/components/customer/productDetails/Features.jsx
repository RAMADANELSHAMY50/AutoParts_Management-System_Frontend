import React from "react";

import {
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineRefresh,
  HiOutlineLockClosed,
} from "react-icons/hi";

const features = [
  {
    icon: HiOutlineTruck,
    title: "شحن مجاني",
    description:
      "شحن مجاني على الطلبات المؤهلة",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "ضمان لمدة سنتين",
    description:
      "ضمان موثوق على المنتج",
  },
  {
    icon: HiOutlineRefresh,
    title: "إرجاع خلال 30 يومًا",
    description:
      "إمكانية إرجاع المنتج خلال 30 يومًا",
  },
  {
    icon: HiOutlineLockClosed,
    title: "دفع آمن",
    description:
      "جميع عمليات الدفع محمية وآمنة",
  },
];

const Features = () => {
  return (
    <div className="rounded-xl border border-zinc-800 bg-[#171717] p-3 sm:rounded-2xl sm:p-4 lg:p-6">
      <h2 className="mb-4 text-base font-bold text-white sm:mb-6 sm:text-lg">
        مميزات الخدمة
      </h2>

      <div className="space-y-4 sm:space-y-5">
        {features.map(
          ({
            icon: Icon,
            title,
            description,
          }) => (
            <div
              key={title}
              className="flex min-w-0 items-start gap-2.5 sm:gap-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-500 sm:h-12 sm:w-12 sm:rounded-xl">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="break-words text-xs font-semibold text-white sm:text-sm">
                  {title}
                </h3>

                <p className="mt-1 break-words text-[11px] leading-5 text-zinc-500 sm:text-xs sm:leading-6">
                  {description}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Features;