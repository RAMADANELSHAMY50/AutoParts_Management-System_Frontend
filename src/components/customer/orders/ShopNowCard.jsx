const ShopNowCard = ({
  title = "اكتشف المزيد من المنتجات",
  description = "تصفح مجموعة كبيرة من قطع الغيار والإكسسوارات.",
  buttonText = "تسوق الآن",
  image,
  onShop,
}) => {
  const defaultImage =
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#171717] shadow-lg">
      {/* Image */}
      <div className="h-40 overflow-hidden sm:h-48 lg:h-52">
        <img
          src={image || defaultImage}
          alt={title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 lg:p-6">
        <h3 className="text-lg font-bold text-white sm:text-xl">
          {title}
        </h3>

        <p className="mt-2 text-xs leading-6 text-zinc-400 sm:text-sm sm:leading-7">
          {description}
        </p>

        <button
          type="button"
          onClick={onShop}
          className="mt-4 rounded-xl bg-[#A5B4FC] px-4 py-2.5 text-xs font-bold text-[#0E0E0E] transition hover:bg-[#C1C9FF] sm:mt-5 sm:px-5 sm:py-3 sm:text-sm"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ShopNowCard;