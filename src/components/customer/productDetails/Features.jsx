import {
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineRefresh,
  HiOutlineCreditCard,
} from "react-icons/hi";

const features = [
  {
    id: 1,
    icon: HiOutlineTruck,
    title: "Free Shipping",
    description: "Free shipping on orders over $150.",
  },
  {
    id: 2,
    icon: HiOutlineShieldCheck,
    title: "2-Year Warranty",
    description: "Premium warranty against manufacturing defects.",
  },
  {
    id: 3,
    icon: HiOutlineRefresh,
    title: "30-Day Returns",
    description: "Easy returns and exchanges within 30 days.",
  },
  {
    id: 4,
    icon: HiOutlineCreditCard,
    title: "Secure Payment",
    description: "Your payment information is encrypted and protected.",
  },
];

export default function Features() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-6">
      <h3 className="mb-6 text-lg font-semibold text-white">
        Why Shop With Us?
      </h3>

      <div className="space-y-5">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.id}
              className="flex items-start gap-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/15 text-blue-500">
                <Icon size={24} />
              </div>

              <div>
                <h4 className="font-semibold text-white">
                  {feature.title}
                </h4>

                <p className="mt-1 text-sm leading-6 text-zinc-400">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}