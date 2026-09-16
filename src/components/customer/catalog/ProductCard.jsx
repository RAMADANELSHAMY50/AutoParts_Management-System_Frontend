import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const API_URL = "http://localhost:1337";

const PRODUCTS_PER_PAGE = 6;

// ==========================================
// Category Names Helper
// ==========================================
const getCategoryNames = (categories) => {
  if (!categories) return [];

  if (categories?.data) {
    return getCategoryNames(categories.data);
  }

  if (Array.isArray(categories)) {
    return categories
      .map((category) => {
        if (!category) return "";

        if (typeof category === "string") {
          return category;
        }

        if (category?.name) {
          return category.name;
        }

        if (category?.attributes?.name) {
          return category.attributes.name;
        }

        return "";
      })
      .filter(Boolean);
  }

  if (categories?.name) {
    return [categories.name];
  }

  if (categories?.attributes?.name) {
    return [categories.attributes.name];
  }

  return [];
};

const ProductGrid = ({
  search,
  sort,
  currentPage,
  selectedCategories,
  selectedBrand,
  maxPrice,
  onAddToCart,
  setTotalPages,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Fetch Products
  // ==========================================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/api/products?populate=*`
        );

        const data = response?.data?.data || [];

        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("حدث خطأ أثناء تحميل المنتجات");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ==========================================
  // Filter + Search + Sort
  // ==========================================
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search?.trim()) {
      const searchValue = search.trim().toLowerCase();

      result = result.filter((product) => {
        const name = String(
          product?.name || ""
        ).toLowerCase();

        const sku = String(
          product?.sku || ""
        ).toLowerCase();

        const description = String(
          product?.description || ""
        ).toLowerCase();

        const brandName = String(
          product?.brand?.data?.name ||
            product?.brand?.name ||
            product?.brand?.data?.attributes?.name ||
            product?.brand?.attributes?.name ||
            ""
        ).toLowerCase();

        return (
          name.includes(searchValue) ||
          sku.includes(searchValue) ||
          description.includes(searchValue) ||
          brandName.includes(searchValue)
        );
      });
    }

    // Categories
    if (
      Array.isArray(selectedCategories) &&
      selectedCategories.length > 0
    ) {
      result = result.filter((product) => {
        const categories =
          product?.Categories || product?.category;

        const categoryNames =
          getCategoryNames(categories);

        return selectedCategories.some((selected) =>
          categoryNames.includes(selected)
        );
      });
    }

    // Brand
    if (selectedBrand) {
      result = result.filter((product) => {
        const brand = product?.brand;

        const brandId =
          brand?.data?.id ||
          brand?.id ||
          brand?.data?.attributes?.id;

        const brandName =
          brand?.data?.name ||
          brand?.name ||
          brand?.data?.attributes?.name ||
          brand?.attributes?.name;

        return (
          String(brandId) === String(selectedBrand) ||
          brandName === selectedBrand
        );
      });
    }

    // Price
    if (
      maxPrice !== undefined &&
      maxPrice !== null
    ) {
      result = result.filter((product) => {
        const price = Number(
          product?.salePrice ??
            product?.price ??
            0
        );

        return price <= Number(maxPrice);
      });
    }

    // Sort
    switch (sort) {
      case "الأقدم أولاً":
        result.sort(
          (a, b) =>
            new Date(a?.createdAt || 0) -
            new Date(b?.createdAt || 0)
        );
        break;

      case "السعر: من الأقل للأعلى":
        result.sort((a, b) => {
          const priceA = Number(
            a?.salePrice ?? a?.price ?? 0
          );

          const priceB = Number(
            b?.salePrice ?? b?.price ?? 0
          );

          return priceA - priceB;
        });
        break;

      case "السعر: من الأعلى للأقل":
        result.sort((a, b) => {
          const priceA = Number(
            a?.salePrice ?? a?.price ?? 0
          );

          const priceB = Number(
            b?.salePrice ?? b?.price ?? 0
          );

          return priceB - priceA;
        });
        break;

      case "الأكثر مبيعًا":
        result.sort(
          (a, b) =>
            Number(
              b?.soldCount || b?.sales || 0
            ) -
            Number(
              a?.soldCount || a?.sales || 0
            )
        );
        break;

      case "الأعلى تقييمًا":
        result.sort(
          (a, b) =>
            Number(b?.rating || 0) -
            Number(a?.rating || 0)
        );
        break;

      case "الأحدث أولاً":
      default:
        result.sort(
          (a, b) =>
            new Date(b?.createdAt || 0) -
            new Date(a?.createdAt || 0)
        );
        break;
    }

    return result;
  }, [
    products,
    search,
    sort,
    selectedCategories,
    selectedBrand,
    maxPrice,
  ]);

  // ==========================================
  // Pagination
  // ==========================================
  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length / PRODUCTS_PER_PAGE
    )
  );

  useEffect(() => {
    if (setTotalPages) {
      setTotalPages(totalPages);
    }
  }, [totalPages, setTotalPages]);

  const paginatedProducts = useMemo(() => {
    const startIndex =
      (currentPage - 1) * PRODUCTS_PER_PAGE;

    const endIndex =
      startIndex + PRODUCTS_PER_PAGE;

    return filteredProducts.slice(
      startIndex,
      endIndex
    );
  }, [filteredProducts, currentPage]);

  // ==========================================
  // Loading
  // ==========================================
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-2.5 sm:gap-5">
        {Array.from({
          length: PRODUCTS_PER_PAGE,
        }).map((_, index) => (
          <div
            key={index}
            className="
              h-[300px]
              animate-pulse
              rounded-lg
              border
              border-zinc-800
              bg-[#181818]

              sm:h-[390px]
              sm:rounded-2xl
            "
          />
        ))}
      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================
  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-xs text-red-400 sm:rounded-2xl sm:p-6 sm:text-sm">
        {error}
      </div>
    );
  }

  // ==========================================
  // Empty
  // ==========================================
  if (paginatedProducts.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-[#181818] p-6 text-center sm:rounded-2xl sm:p-10">
        <p className="text-xs text-zinc-400 sm:text-sm">
          لا توجد منتجات مطابقة للبحث أو الفلاتر الحالية.
        </p>
      </div>
    );
  }

  // ==========================================
  // Render
  // ==========================================
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-5">
      {paginatedProducts.map((product) => (
        <ProductCard
          key={
            product?.documentId ||
            product?.id
          }
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;