import { Trash2 } from "lucide-react";

const API_URL = "http://localhost:1337";

// ==========================================
// Get Image URL
// ==========================================
const getImageUrl = (image) => {
  if (!image) {
    return "/placeholder.jpg";
  }

  if (typeof image === "string") {
    return image.startsWith("http")
      ? image
      : `${API_URL}${image}`;
  }

  if (image.url) {
    return image.url.startsWith("http")
      ? image.url
      : `${API_URL}${image.url}`;
  }

  if (image.data?.attributes?.url) {
    const url = image.data.attributes.url;

    return url.startsWith("http")
      ? url
      : `${API_URL}${url}`;
  }

  return "/placeholder.jpg";
};

// ==========================================
// Get Category Name
// ==========================================
const getCategoryName = (category) => {
  if (!category) {
    return "";
  }

  if (typeof category === "string") {
    return category;
  }

  if (category.name) {
    return category.name;
  }

  if (category.data?.name) {
    return category.data.name;
  }

  if (category.data?.attributes?.name) {
    return category.data.attributes.name;
  }

  return "";
};

// ==========================================
// Cart Item
// ==========================================
const CartItem = ({
  product,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  if (!product) {
    return null;
  }

  const price = Number(product.price ?? 0);
  const quantity = Number(product.quantity ?? 1);
  const image = getImageUrl(product.image);

  const categoryName = getCategoryName(
    product.category
  );

  return (
    <div
      className="
        flex flex-col gap-4
        rounded-xl border border-zinc-800
        bg-[#181818]
        p-3
        transition
        hover:border-blue-500/40

        sm:gap-5
        sm:rounded-2xl
        sm:p-4

        lg:flex-row
        lg:items-center
        lg:justify-between
        lg:gap-6
        lg:p-5
      "
    >

      {/* ====================================
          Product Image
      ==================================== */}

      <div
        className="
          h-24 w-24
          shrink-0
          overflow-hidden
          rounded-lg
          bg-zinc-900

          sm:h-28 sm:w-28
          sm:rounded-xl

          lg:h-32 lg:w-32
        "
      >
        <img
          src={image}
          alt={product.name || "Product"}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
        />
      </div>

      {/* ====================================
          Product Details
      ==================================== */}

      <div
        className="
          flex flex-1
          justify-between
          gap-3

          sm:gap-5

          lg:gap-6
        "
      >

        <div className="text-right">

          <h3
            className="
              text-base
              font-semibold
              text-[#B7C6FF]

              sm:text-lg

              lg:text-xl
            "
          >
            {product.name || "منتج بدون اسم"}
          </h3>

          {/* SKU */}

          {product.sku && (
            <p
              className="
                mt-1
                text-xs
                text-zinc-500

                sm:mt-2
                sm:text-sm
              "
            >
              SKU: {product.sku}
            </p>
          )}

          {/* Category */}

          {categoryName && (
            <p
              className="
                mt-1
                text-xs
                text-indigo-400

                sm:text-sm
              "
            >
              {categoryName}
            </p>
          )}

          {/* Remove */}

          <button
            type="button"
            onClick={() => onRemove(product.id)}
            className="
              mt-4
              flex
              items-center
              gap-1.5
              text-xs
              text-red-500
              transition
              hover:text-red-400

              sm:mt-5
              sm:gap-2
              sm:text-sm

              lg:mt-6
            "
          >
            <Trash2
              size={14}
              className="sm:h-4 sm:w-4"
            />

            إزالة
          </button>

        </div>

        {/* ==================================
            Price + Quantity
        ================================== */}

        <div
          className="
            flex
            flex-col
            items-end
            justify-between
            gap-4

            sm:gap-5

            lg:gap-6
          "
        >

          <h2
            className="
              text-lg
              font-bold
              text-white

              sm:text-xl

              lg:text-2xl
            "
          >
            {price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            ر.س
          </h2>

          {/* Quantity */}

          <div
            className="
              flex
              items-center
              overflow-hidden
              rounded-lg
              bg-zinc-800

              sm:rounded-xl
            "
          >

            {/* Minus */}

            <button
              type="button"
              onClick={() => onDecrease(product.id)}
              disabled={quantity <= 1}
              className="
                px-3
                py-2
                text-lg
                text-white
                transition
                hover:bg-zinc-700
                disabled:cursor-not-allowed
                disabled:opacity-40

                sm:px-4
                sm:py-2.5
                sm:text-xl

                lg:px-5
                lg:py-3
              "
            >
              −
            </button>

            {/* Quantity */}

            <span
              className="
                min-w-[40px]
                text-center
                text-base
                font-semibold
                text-white

                sm:min-w-[50px]
                sm:text-lg

                lg:min-w-[60px]
                lg:text-xl
              "
            >
              {quantity}
            </span>

            {/* Plus */}

            <button
              type="button"
              onClick={() => onIncrease(product.id)}
              disabled={
                product.stock &&
                quantity >= Number(product.stock)
              }
              className="
                px-3
                py-2
                text-lg
                text-white
                transition
                hover:bg-zinc-700
                disabled:cursor-not-allowed
                disabled:opacity-40

                sm:px-4
                sm:py-2.5
                sm:text-xl

                lg:px-5
                lg:py-3
              "
            >
              +
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CartItem;