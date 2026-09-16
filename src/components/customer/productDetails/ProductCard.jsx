import React from "react";

import {
  FiShoppingCart,
  FiHeart,
} from "react-icons/fi";

import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:1337";

// ==========================================
// Image Helper
// ==========================================
const getImageUrl = (image) => {
  if (!image) {
    return "/placeholder.jpg";
  }

  if (typeof image === "string") {
    if (image.startsWith("http")) {
      return image;
    }

    return `${API_URL}${image}`;
  }

  if (image?.url) {
    return image.url.startsWith("http")
      ? image.url
      : `${API_URL}${image.url}`;
  }

  if (image?.data?.attributes?.url) {
    const url =
      image.data.attributes.url;

    return url.startsWith("http")
      ? url
      : `${API_URL}${url}`;
  }

  return "/placeholder.jpg";
};

const ProductCard = ({
  product,
  onAddToCart,
  onWishlist,
}) => {
  if (!product) return null;

  const price =
    product?.salePrice ??
    product?.price ??
    0;

  const normalPrice =
    product?.price ?? 0;

  const hasDiscount =
    product?.salePrice &&
    normalPrice > product.salePrice;

  const discount = hasDiscount
    ? Math.round(
        ((normalPrice -
          product.salePrice) /
          normalPrice) *
          100
      )
    : 0;

  const stock = Number(
    product?.stock || 0
  );

  const category =
    product?.Categories?.name ||
    product?.Categories?.data?.attributes
      ?.name ||
    "بدون فئة";

  const rating = Number(
    product?.rating || 5
  );

  const reviews = Number(
    product?.reviews || 0
  );

  const imageUrl = getImageUrl(
    product?.image
  );

  // ==========================================
  // Add To Cart
  // ==========================================
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (stock <= 0) {
      toast.error(
        "المنتج غير متوفر في المخزون"
      );
      return;
    }

    if (onAddToCart) {
      onAddToCart(product);
      return;
    }

    try {
      const storedCart =
        localStorage.getItem("cart");

      const cart = storedCart
        ? JSON.parse(storedCart)
        : [];

      const existingIndex =
        cart.findIndex(
          (item) =>
            Number(item.id) ===
            Number(product.id)
        );

      if (existingIndex !== -1) {
        const currentQuantity =
          Number(
            cart[existingIndex]
              .quantity || 0
          );

        if (
          currentQuantity + 1 >
          stock
        ) {
          toast.error(
            "لا يمكن إضافة كمية أكبر من المخزون المتاح"
          );
          return;
        }

        cart[existingIndex].quantity =
          currentQuantity + 1;
      } else {
        cart.push({
          id: product.id,
          documentId:
            product.documentId,
          name: product.name,
          price,
          salePrice:
            product.salePrice,
          image: product.image,
          stock: product.stock,
          quantity: 1,
          sku: product.sku,
          category,
        });
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      toast.success(
        "تمت إضافة المنتج إلى السلة"
      );
    } catch (error) {
      console.error(
        "Cart error:",
        error
      );

      toast.error(
        "حدث خطأ أثناء إضافة المنتج إلى السلة"
      );
    }
  };

  // ==========================================
  // Wishlist
  // ==========================================
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onWishlist) {
      onWishlist(product);
      return;
    }

    toast.success(
      "تمت إضافة المنتج إلى المفضلة"
    );
  };

  return (
    <div className="group overflow-hidden rounded-xl border border-zinc-800 bg-[#181818] transition duration-300 hover:border-blue-600/50 hover:shadow-xl hover:shadow-black/20 sm:rounded-2xl">
      {/* Image */}
      <Link
        to={`/productdetails/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-[#101010]"
      >
        <img
          src={imageUrl}
          alt={
            product?.name ||
            "صورة المنتج"
          }
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "/placeholder.jpg";
          }}
        />

        {/* Discount */}
        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-1 text-[9px] font-bold text-white sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
            خصم {discount}%
          </span>
        )}

        {/* Stock */}
        <span
          className={`absolute right-2 top-2 max-w-[80px] truncate rounded-full px-2 py-1 text-[9px] font-semibold sm:right-3 sm:top-3 sm:max-w-[90px] sm:px-3 sm:text-xs ${
            stock > 0
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {stock > 0
            ? "متوفر"
            : "غير متوفر"}
        </span>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          aria-label="إضافة إلى المفضلة"
          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-black/70 text-zinc-300 backdrop-blur transition hover:border-blue-500 hover:text-blue-500 sm:bottom-3 sm:right-3 sm:h-10 sm:w-10"
        >
          <FiHeart
            size={15}
            className="sm:h-[18px] sm:w-[18px]"
          />
        </button>
      </Link>

      {/* Info */}
      <div className="min-w-0 p-3 sm:p-4 lg:p-5">
        {/* Category */}
        <p className="mb-1 truncate text-[9px] text-zinc-500 sm:text-xs">
          {category}
        </p>

        {/* Name */}
        <Link
          to={`/productdetails/${product.id}`}
          className="block min-h-10 break-words text-sm font-semibold leading-5 text-white transition hover:text-blue-500 sm:min-h-12 sm:text-base sm:leading-6 lg:text-lg"
        >
          {product?.name ||
            "منتج بدون اسم"}
        </Link>

        {/* SKU */}
        {product?.sku && (
          <p className="mt-1 truncate text-[9px] text-zinc-600 sm:text-xs">
            رمز المنتج: {product.sku}
          </p>
        )}

        {/* Rating */}
        <div className="mt-3 flex min-w-0 items-center gap-1 sm:mt-4 sm:gap-2">
          <div className="flex shrink-0 items-center gap-0.5 text-yellow-500">
            {[1, 2, 3, 4, 5].map(
              (star) => (
                <FaStar
                  key={star}
                  size={9}
                  className={
                    star <= rating
                      ? "text-yellow-500"
                      : "text-zinc-700"
                  }
                />
              )
            )}
          </div>

          <span className="truncate text-[9px] text-zinc-500 sm:text-xs">
            ({reviews} تقييم)
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:mt-5 sm:gap-3">
          <span className="text-sm font-bold text-white sm:text-lg lg:text-xl">
            {Number(
              price
            ).toLocaleString()}{" "}
            ر.س
          </span>

          {hasDiscount && (
            <span className="text-[10px] text-zinc-500 line-through sm:text-sm">
              {Number(
                normalPrice
              ).toLocaleString()}{" "}
              ر.س
            </span>
          )}
        </div>

        {/* Add To Cart */}
        <button
          onClick={handleAddToCart}
          disabled={stock <= 0}
          className="mt-3 flex w-full min-w-0 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-2 py-2.5 text-[11px] font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-700 sm:mt-5 sm:gap-2 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm lg:text-base"
        >
          <FiShoppingCart
            className="shrink-0"
            size={15}
          />

          <span className="truncate">
            {stock > 0
              ? "أضف إلى السلة"
              : "غير متوفر"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;