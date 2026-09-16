import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const FloatingCart = ({
  itemCount = 0,
  total = 0,
}) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/cart")}
      className="
        fixed
        bottom-3
        right-3
        z-50
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-indigo-500/30
        bg-indigo-600
        px-3
        py-2.5
        text-white
        shadow-2xl
        shadow-indigo-500/30
        transition-all
        duration-300
        hover:scale-105
        hover:bg-indigo-700

        sm:bottom-6
        sm:right-6
        sm:gap-4
        sm:rounded-2xl
        sm:px-5
        sm:py-4
      "
    >
      {/* Cart Icon */}
      <div className="relative shrink-0">
        <FiShoppingCart className="h-5 w-5 sm:h-[26px] sm:w-[26px]" />

        {itemCount > 0 && (
          <span
            className="
              absolute
              -right-1.5
              -top-1.5
              flex
              h-4
              w-4
              items-center
              justify-center
              rounded-full
              bg-red-500
              text-[8px]
              font-bold

              sm:-right-2
              sm:-top-2
              sm:h-5
              sm:w-5
              sm:text-[11px]
            "
          >
            {itemCount}
          </span>
        )}
      </div>

      {/* Text */}
      <div className="text-right">
        <p className="text-[9px] text-indigo-100 sm:text-xs">
          سلة التسوق
        </p>

        <h4 className="text-xs font-semibold sm:text-base">
          {total.toLocaleString()} ر.س
        </h4>
      </div>
    </button>
  );
};

export default FloatingCart;