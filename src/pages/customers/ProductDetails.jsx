import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiShoppingCart } from "react-icons/fi";
import { toast } from "react-hot-toast";

import Navbar from "../../components/customer/layout/Navbar";
import Footer from "../../components/customer/layout/Footer";

import Breadcrumb from "../../components/customer/productDetails/Breadcrumb";
import ProductGallery from "../../components/customer/productDetails/ProductGallery";
import ProductInfo from "../../components/customer/productDetails/ProductInfo";
import ProductTabs from "../../components/customer/productDetails/ProductTabs";
import RelatedProducts from "../../components/customer/productDetails/RelatedProducts";

const API_URL = "http://localhost:1337";

// ==========================================
// Image Helper
// ==========================================
const getImageUrl = (image) => {
  if (!image) return "/placeholder.jpg";

  if (typeof image === "string") {
    if (image.startsWith("http")) return image;
    return `${API_URL}${image}`;
  }

  if (image?.url) {
    return image.url.startsWith("http")
      ? image.url
      : `${API_URL}${image.url}`;
  }

  if (image?.data?.attributes?.url) {
    const url = image.data.attributes.url;

    return url.startsWith("http")
      ? url
      : `${API_URL}${url}`;
  }

  return "/placeholder.jpg";
};

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Get Product
  // ==========================================
  const getProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/api/products?populate=*`
      );

      const products = response.data?.data || [];

      const currentProduct = products.find(
        (item) => Number(item.id) === Number(id)
      );

      if (!currentProduct) {
        setError("المنتج غير موجود");
        return;
      }

      setProduct(currentProduct);

      // ==========================================
      // Related Products
      // ==========================================
      const currentCategory =
        currentProduct?.Categories?.id ||
        currentProduct?.Categories?.data?.id ||
        currentProduct?.Categories?.data?.attributes?.id;

      const related = products
        .filter((item) => {
          if (item.id === currentProduct.id) return false;

          const itemCategory =
            item?.Categories?.id ||
            item?.Categories?.data?.id ||
            item?.Categories?.data?.attributes?.id;

          return (
            currentCategory &&
            itemCategory &&
            Number(currentCategory) === Number(itemCategory)
          );
        })
        .slice(0, 4);

      setRelatedProducts(related);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("حدث خطأ أثناء تحميل بيانات المنتج");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  // ==========================================
  // Add To Cart
  // ==========================================
  const handleAddToCart = (productData, quantity = 1) => {
    const stock = Number(productData?.stock || 0);

    if (stock <= 0) {
      toast.error("المنتج غير متوفر في المخزون");
      return;
    }

    try {
      const storedCart = localStorage.getItem("cart");

      const cart = storedCart ? JSON.parse(storedCart) : [];

      const existingIndex = cart.findIndex(
        (item) => Number(item.id) === Number(productData.id)
      );

      if (existingIndex !== -1) {
        const currentQuantity = Number(
          cart[existingIndex].quantity || 0
        );

        if (currentQuantity + quantity > stock) {
          toast.error("الكمية المطلوبة تتجاوز المخزون المتاح");
          return;
        }

        cart[existingIndex].quantity =
          currentQuantity + quantity;
      } else {
        cart.push({
          id: productData.id,
          documentId: productData.documentId,
          name: productData.name,
          price: productData.price,
          salePrice: productData.salePrice,
          image: productData.image,
          stock: productData.stock,
          quantity,
          sku: productData.sku,
          category: productData.category,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      window.dispatchEvent(new Event("cartUpdated"));

      toast.success("تمت إضافة المنتج إلى السلة");
    } catch (err) {
      console.error("Cart error:", err);
      toast.error("حدث خطأ أثناء إضافة المنتج إلى السلة");
    }
  };

  // ==========================================
  // Loading
  // ==========================================
  if (loading) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#111111] text-white"
      >
        <Navbar />

        <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-3 py-20 sm:px-4 sm:py-24 lg:px-6 lg:py-32">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-600 sm:h-12 sm:w-12" />

            <p className="text-sm text-zinc-400 sm:text-base">
              جاري تحميل بيانات المنتج...
            </p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================
  if (error || !product) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#111111] text-white"
      >
        <Navbar />

        <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-3 py-20 sm:px-4 sm:py-24 lg:px-6 lg:py-32">
          <div className="w-full max-w-xl rounded-xl border border-zinc-800 bg-[#171717] p-5 text-center sm:rounded-2xl sm:p-10">
            <h1 className="mb-3 text-xl font-bold text-white sm:text-2xl">
              المنتج غير موجود
            </h1>

            <p className="mb-6 text-sm text-zinc-400 sm:text-base">
              {error || "لم نتمكن من العثور على المنتج المطلوب."}
            </p>

            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-6 sm:text-base"
            >
              <FiArrowLeft />
              العودة إلى المنتجات
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // ==========================================
  // Product Data
  // ==========================================
  const imageUrl = getImageUrl(product?.image);

  const productPrice =
    product?.salePrice ?? product?.price ?? 0;

  const normalPrice = product?.price ?? 0;

  const hasOldPrice =
    normalPrice > productPrice;

  const stock = Number(product?.stock || 0);

  const category =
    product?.Categories?.name ||
    product?.Categories?.data?.attributes?.name ||
    "بدون فئة";

  const brand =
    product?.brand?.name ||
    product?.brand?.data?.attributes?.name ||
    "غير محدد";

  const specifications = {
    "رمز المنتج": product?.sku || "غير متوفر",
    "الفئة": category,
    "الماركة": brand,
    "المخزون": stock,
  };

  const features = [
    "جودة عالية",
    "مناسب لقطع وإكسسوارات السيارات",
    "تصميم عملي ومميز",
    "منتج موثوق للاستخدام اليومي",
  ];

  const packageIncludes = [
    product?.name || "المنتج",
  ];

  const productData = {
    ...product,
    id: product.id,
    name: product.name,
    price: productPrice,
    oldPrice: hasOldPrice ? normalPrice : null,
    stock,
    category,
    brand,
    sku: product?.sku,
    rating: product?.rating || 5,
    reviews: product?.reviews || 0,
    description:
      product?.description ||
      "لا يوجد وصف متاح لهذا المنتج حاليًا.",
    images: [imageUrl],
    image: imageUrl,
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#111111] text-white"
    >
      <Navbar />

      <main className="mx-auto max-w-7xl px-3 pb-12 pt-20 sm:px-4 sm:pb-16 sm:pt-24 lg:px-6 lg:pb-20 lg:pt-28">

        {/* Breadcrumb */}
        <Breadcrumb
          productName={product.name || "تفاصيل المنتج"}
          categoryName={category}
        />

        {/* Product Main Section */}
        <section className="mt-5 grid gap-5 sm:mt-8 sm:gap-7 lg:grid-cols-2 lg:gap-10">
          <ProductGallery
            images={productData.images}
          />

          <ProductInfo
            product={productData}
            onAddToCart={handleAddToCart}
          />
        </section>

        {/* Quick Information */}
        <section className="mt-8 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 sm:mt-10 sm:gap-4 lg:mt-12 lg:grid-cols-4">

          <div className="rounded-xl border border-zinc-800 bg-[#171717] p-3 sm:rounded-2xl sm:p-5">
            <p className="mb-1 text-xs text-zinc-500 sm:text-sm">
              الماركة
            </p>

            <p className="break-words text-sm font-semibold text-white sm:text-base">
              {brand}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-[#171717] p-3 sm:rounded-2xl sm:p-5">
            <p className="mb-1 text-xs text-zinc-500 sm:text-sm">
              رمز المنتج
            </p>

            <p className="break-words text-sm font-semibold text-white sm:text-base">
              {product?.sku || "غير متوفر"}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-[#171717] p-3 sm:rounded-2xl sm:p-5">
            <p className="mb-1 text-xs text-zinc-500 sm:text-sm">
              الفئة
            </p>

            <p className="break-words text-sm font-semibold text-white sm:text-base">
              {category}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-[#171717] p-3 sm:rounded-2xl sm:p-5">
            <p className="mb-1 text-xs text-zinc-500 sm:text-sm">
              حالة المخزون
            </p>

            <p
              className={`text-sm font-semibold sm:text-base ${
                stock > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {stock > 0
                ? `متوفر (${stock})`
                : "غير متوفر"}
            </p>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="mt-8 sm:mt-10 lg:mt-12">
          <ProductTabs
            description={
              product?.description ||
              "لا يوجد وصف متاح لهذا المنتج حاليًا."
            }
            specifications={specifications}
            features={features}
            packageIncludes={packageIncludes}
          />
        </section>

        {/* Related Products */}
        <section className="mt-10 sm:mt-12 lg:mt-16">
          <RelatedProducts
            products={relatedProducts}
          />
        </section>
      </main>

      {/* Floating Cart */}
      <button
        onClick={() => handleAddToCart(productData, 1)}
        disabled={stock === 0}
        className="fixed bottom-3 left-3 right-3 z-50 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-700 min-[640px]:left-6 min-[640px]:right-auto sm:px-5 sm:py-4 sm:text-base"
      >
        <FiShoppingCart className="shrink-0" size={20} />

        <span className="truncate">
          {stock > 0
            ? "أضف إلى السلة"
            : "غير متوفر"}
        </span>
      </button>

      <Footer />
    </div>
  );
};

export default ProductDetails;