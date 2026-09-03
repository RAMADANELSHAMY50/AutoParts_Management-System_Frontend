import { ShoppingBagIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const ShopNowCard = ({
  title = "تحتاج إلى قطع غيار جديدة؟",
  description = "استكشف آلاف قطع الغيار الأصلية وعالية الجودة المناسبة لسيارتك مع عروض وخصومات حصرية.",
  buttonText = "تسوق الآن",
  image = "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600",
  onShop,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#171717] shadow-lg">
      {/* Image */}
      <div className="relative h-52">
        <img
          src={image}
          alt="Auto Parts"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#A5B4FC]/10">
            <ShoppingBagIcon className="h-6 w-6 text-[#A5B4FC]" />
          </div>

          <h3 className="text-xl font-bold text-white">
            {title}
          </h3>
        </div>

        <p className="text-sm leading-7 text-zinc-400">
          {description}
        </p>

        <button
          onClick={onShop}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#A5B4FC] px-5 py-3 font-semibold text-black transition hover:bg-[#8D9CF7]"
        >
          {buttonText}
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ShopNowCard;