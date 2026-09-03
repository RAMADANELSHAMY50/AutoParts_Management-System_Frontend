import { FiShoppingCart } from "react-icons/fi";

const FloatingCart = ({
  itemCount = 3,
  total = 1249,
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      className="
        fixed
        bottom-6
        right-6
        z-50
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-indigo-500/30
        bg-indigo-600
        px-5
        py-4
        text-white
        shadow-2xl
        shadow-indigo-500/30
        transition-all
        duration-300
        hover:scale-105
        hover:bg-indigo-700
      "
    >
      {/* Cart Icon */}
      <div className="relative">
        <FiShoppingCart size={26} />

        {itemCount > 0 && (
          <span
            className="
              absolute
              -right-2
              -top-2
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-red-500
              text-[11px]
              font-bold
            "
          >
            {itemCount}
          </span>
        )}
      </div>

      {/* Cart Info */}
      <div className="text-left">
        <p className="text-xs text-indigo-100">
          Shopping Cart
        </p>

        <h4 className="font-semibold">
          ${total.toLocaleString()}
        </h4>
      </div>
    </button>
  );
};

export default FloatingCart;