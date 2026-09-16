import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:1337";

// ==========================================
// Empty Product
// ==========================================
const emptyProduct = {
  name: "",
  quantity: "",
  image: null,
  costPrice: "",
  Categories: "",
  description: "",
  sku: "",
  salePrice: "",
  minimumStock: "",
  stock: "",
  price: "",
  brand: null,
  vehicles: [],
};

// ==========================================
// Create Notification
// ==========================================
const createNotification = async ({
  title,
  message,
  type,
  category,
  priority,
  token,
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/notifications`,
      {
        data: {
          title,
          message,
          type,
          isRead: false,
          category,
          priority,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "✅ Notification created:",
      response.data
    );

    return true;
  } catch (error) {
    console.error(
      "❌ Notification creation failed"
    );

    console.error(
      "FULL STRAPI ERROR:",
      JSON.stringify(
        error.response?.data,
        null,
        2
      )
    );

    console.error(
      "VALIDATION ERRORS:",
      error.response?.data?.error?.details?.errors
    );

    return false;
  }
};

// ==========================================
// Component
// ==========================================
export default function AddProductModal({
  isOpen,
  onClose,
  getProducts,
  productToEdit,
}) {
  const [product, setProduct] =
    useState(emptyProduct);

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // Load Product When Editing
  // ==========================================
  useEffect(() => {
    if (productToEdit) {
      setProduct({
        name: productToEdit.name || "",

        quantity:
          productToEdit.quantity ?? "",

        image:
          productToEdit.image || null,

        costPrice:
          productToEdit.costPrice ?? "",

        Categories:
          productToEdit.Categories || "",

        description:
          productToEdit.description || "",

        sku:
          productToEdit.sku || "",

        salePrice:
          productToEdit.salePrice ?? "",

        minimumStock:
          productToEdit.minimumStock ?? "",

        stock:
          productToEdit.stock ?? "",

        price:
          productToEdit.price ?? "",

        brand:
          productToEdit.brand || null,

        vehicles:
          productToEdit.vehicles || [],
      });
    } else {
      setProduct(emptyProduct);
    }
  }, [productToEdit]);

  // ==========================================
  // Input Change
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // Image Change
  // ==========================================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setProduct((prev) => ({
      ...prev,
      image: file,
    }));
  };

  // ==========================================
  // Submit
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const token =
      localStorage.getItem("token");

    if (!token) {
      alert("يجب تسجيل الدخول أولاً");
      return;
    }

    setLoading(true);

    try {
      // ==========================================
      // Upload Image
      // ==========================================
      let imageId = null;

      if (product.image instanceof File) {
        const formData = new FormData();

        formData.append(
          "files",
          product.image
        );

        const uploadResponse =
          await axios.post(
            `${API_URL}/api/upload`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        imageId =
          uploadResponse.data[0]?.id;

        console.log(
          "New image ID:",
          imageId
        );
      }

      // ==========================================
      // Product Data
      // ==========================================
      const data = {
        name: product.name,

        quantity:
          Number(product.quantity),

        costPrice:
          Number(product.costPrice),

        Categories:
          product.Categories,

        description:
          product.description,

        sku:
          product.sku,

        salePrice:
          Number(product.salePrice),

        minimumStock:
          Number(product.minimumStock),

        stock:
          Number(product.stock),

        price:
          Number(product.price),
      };

      // ==========================================
      // Add New Product
      // ==========================================
      if (!productToEdit) {
        if (imageId) {
          data.image = imageId;
        }

        const response =
          await axios.post(
            `${API_URL}/api/products`,
            {
              data,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":
                  "application/json",
              },
            }
          );

        console.log(
          "✅ Product added:",
          response.data
        );

        // ==========================================
        // New Product Notification
        // ==========================================
        await createNotification({
          token,

          title: "منتج جديد",

          message: `تمت إضافة المنتج ${product.name} إلى المخزون`,

          // IMPORTANT:
          // Strapi allowed value
          type: "النظام",

          category: "Inventory",

          // IMPORTANT:
          // Strapi allowed value
          priority: "Medium",
        });
      }

      // ==========================================
      // Update Existing Product
      // ==========================================
      else {
        if (imageId) {
          data.image = imageId;
        }

        const documentId =
          productToEdit.documentId;

        const response =
          await axios.put(
            `${API_URL}/api/products/${documentId}`,
            {
              data,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":
                  "application/json",
              },
            }
          );

        console.log(
          "✅ Product updated:",
          response.data
        );

        // ==========================================
        // Update Notification
        // ==========================================
        await createNotification({
          token,

          title: "تعديل منتج",

          message: `تم تعديل بيانات المنتج ${product.name}`,

          // IMPORTANT
          type: "النظام",

          category: "Inventory",

          // IMPORTANT
          priority: "Medium",
        });
      }

      // ==========================================
      // Reset Form
      // ==========================================
      setProduct(emptyProduct);

      // ==========================================
      // Close Modal
      // ==========================================
      onClose();

      // ==========================================
      // Refresh Products
      // ==========================================
      if (typeof getProducts === "function") {
        await getProducts();
      } else {
        console.warn(
          "⚠️ getProducts was not passed to AddProductModal"
        );
      }
    } catch (error) {
      console.error(
        "❌ Product operation failed"
      );

      console.error(
        "STRAPI ERROR:",
        JSON.stringify(
          error.response?.data,
          null,
          2
        )
      );

      alert(
        error.response?.data?.error?.message ||
        "حدث خطأ أثناء حفظ المنتج"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Don't Render
  // ==========================================
  if (!isOpen) {
    return null;
  }

  // ==========================================
  // UI
  // ==========================================
  return (
    <div
      dir="rtl"
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      overflow-y-auto
      bg-black/70
      p-2
      sm:p-4
    "
    >
      <div
        className="
        my-2
        flex
        max-h-[96vh]
        w-full
        max-w-3xl
        min-w-0
        flex-col
        overflow-hidden
        rounded-xl
        bg-white
        shadow-2xl
        sm:my-4
        sm:max-h-[90vh]
        sm:rounded-2xl
      "
      >
        {/* ======================================
          Header
      ====================================== */}
        <div
          className="
          flex
          shrink-0
          items-center
          justify-between
          gap-3
          border-b
          p-4
          sm:p-6
        "
        >
          <div className="min-w-0">
            <h2
              className="
              truncate
              text-lg
              font-bold
              text-gray-800
              sm:text-xl
            "
            >
              {productToEdit
                ? "تعديل المنتج"
                : "إضافة منتج جديد"}
            </h2>

            <p
              className="
              mt-1
              truncate
              text-xs
              text-gray-500
              sm:text-sm
            "
            >
              {productToEdit
                ? "تعديل بيانات المنتج"
                : "إضافة منتج جديد إلى المخزون"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-xl
            text-gray-400
            transition
            hover:bg-gray-100
            hover:text-gray-700
            disabled:opacity-50
            sm:h-10
            sm:w-10
            sm:text-2xl
          "
            aria-label="إغلاق"
          >
            ×
          </button>
        </div>

        {/* ======================================
          Form
      ====================================== */}
        <form
          onSubmit={handleSubmit}
          className="
          min-h-0
          flex-1
          space-y-4
          overflow-y-auto
          p-4
          sm:space-y-6
          sm:p-6
        "
        >
          {/* Product Name */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-700 sm:text-sm">
              اسم المنتج
            </label>

            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className="
              w-full
              min-w-0
              rounded-xl
              border
              border-gray-300
              px-3
              py-2.5
              text-sm
              outline-none
              transition
              focus:border-blue-500
              sm:px-4
              sm:py-3
            "
              placeholder="اسم المنتج"
            />
          </div>

          {/* Quantity + Stock */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700 sm:text-sm">
                الكمية
              </label>

              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                required
                min="0"
                className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-3
                py-2.5
                text-sm
                outline-none
                focus:border-blue-500
                sm:px-4
                sm:py-3
              "
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700 sm:text-sm">
                المخزون
              </label>

              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                required
                min="0"
                className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-3
                py-2.5
                text-sm
                outline-none
                focus:border-blue-500
                sm:px-4
                sm:py-3
              "
              />
            </div>
          </div>

          {/* Category + SKU */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700 sm:text-sm">
                التصنيف
              </label>

              <input
                type="text"
                name="Categories"
                value={product.Categories}
                onChange={handleChange}
                className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-3
                py-2.5
                text-sm
                outline-none
                focus:border-blue-500
                sm:px-4
                sm:py-3
              "
                placeholder="التصنيف"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700 sm:text-sm">
                SKU
              </label>

              <input
                type="text"
                name="sku"
                value={product.sku}
                onChange={handleChange}
                className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-3
                py-2.5
                text-sm
                outline-none
                focus:border-blue-500
                sm:px-4
                sm:py-3
              "
                placeholder="SKU"
              />
            </div>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700 sm:text-sm">
                سعر التكلفة
              </label>

              <input
                type="number"
                name="costPrice"
                value={product.costPrice}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-3
                py-2.5
                text-sm
                outline-none
                focus:border-blue-500
                sm:px-4
                sm:py-3
              "
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700 sm:text-sm">
                سعر البيع
              </label>

              <input
                type="number"
                name="salePrice"
                value={product.salePrice}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-3
                py-2.5
                text-sm
                outline-none
                focus:border-blue-500
                sm:px-4
                sm:py-3
              "
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700 sm:text-sm">
                السعر
              </label>

              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-3
                py-2.5
                text-sm
                outline-none
                focus:border-blue-500
                sm:px-4
                sm:py-3
              "
              />
            </div>
          </div>

          {/* Minimum Stock */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-700 sm:text-sm">
              الحد الأدنى للمخزون
            </label>

            <input
              type="number"
              name="minimumStock"
              value={product.minimumStock}
              onChange={handleChange}
              required
              min="0"
              className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-3
              py-2.5
              text-sm
              outline-none
              focus:border-blue-500
              sm:px-4
              sm:py-3
            "
            />
          </div>

          {/* Image */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-700 sm:text-sm">
              صورة المنتج
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="
              w-full
              min-w-0
              rounded-xl
              border
              border-gray-300
              p-2
              text-xs
              sm:p-3
              sm:text-sm
            "
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-700 sm:text-sm">
              الوصف
            </label>

            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className="
              w-full
              min-w-0
              resize-y
              rounded-xl
              border
              border-gray-300
              px-3
              py-2.5
              text-sm
              outline-none
              focus:border-blue-500
              sm:px-4
              sm:py-3
            "
              placeholder="وصف المنتج"
            />
          </div>

          {/* Buttons */}
          <div
            className="
            flex
            flex-col-reverse
            gap-2
            border-t
            pt-4
            sm:flex-row
            sm:justify-end
            sm:gap-3
            sm:pt-5
          "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-5
              py-2.5
              text-sm
              font-semibold
              text-gray-700
              transition
              hover:bg-gray-100
              disabled:opacity-50
              sm:w-auto
              sm:px-6
              sm:py-3
            "
            >
              إلغاء
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              rounded-xl
              bg-blue-600
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:w-auto
              sm:px-6
              sm:py-3
            "
            >
              {loading
                ? "جاري الحفظ..."
                : productToEdit
                  ? "تحديث المنتج"
                  : "حفظ المنتج"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}