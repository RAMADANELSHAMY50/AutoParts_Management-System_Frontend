import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import AddProductModal from "./products/AddProductModal";
import { useState } from "react";

const API_URL = "http://localhost:1337";

export default function ProductCard({
  products,
  getProducts,
  getStockStatus,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // ==========================================
  // ADD
  // ==========================================
  const handleAdd = () => {
    setProductToEdit(null);
    setIsOpen(true);
  };

  // ==========================================
  // EDIT
  // ==========================================
  const handleEdit = (product) => {
    console.log("Product to edit:", product);

    setProductToEdit(product);
    setIsOpen(true);
  };

  // ==========================================
  // DELETE
  // ==========================================
  const deleteProduct = async (documentId) => {
    try {
      await axios.delete(
        `${API_URL}/api/products/${documentId}`
      );

      alert("تم حذف المنتج بنجاح");

      await getProducts();
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );
    }
  };

  // ==========================================
  // Image Helper
  // ==========================================
  const getImageUrl = (image) => {
    if (!image) {
      return "/placeholder.jpg";
    }

    if (image.url) {
      return image.url.startsWith("http")
        ? image.url
        : `${API_URL}${image.url}`;
    }

    return "/placeholder.jpg";
  };

  return (
    <div
      className="
        grid
        w-full
        min-w-0
        grid-cols-1
        gap-3
        sm:gap-4
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        bg-[#171717]
      "
    >
      {products.length !== 0 ? (
        products.map((product) => {
          const status = getStockStatus(
            product.stock,
            product.minimumStock
          );

          const profit =
            Number(product.salePrice || 0) -
            Number(product.costPrice || 0);

          return (
            <div
              key={product.documentId}
              className="min-w-0"
            >
              <div
                className="
                  w-full
                  min-w-0
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-800
                  bg-[#181818]
                  transition-all
                  duration-300
                  hover:border-blue-500
                "
              >
                {/* ==========================================
                    Image
                ========================================== */}
                <div className="relative w-full overflow-hidden">
                  <img
                    src={getImageUrl(product.image)}
                    className="
                      block
                      h-40
                      w-full
                      object-cover
                      transition-transform
                      duration-[1s]
                      ease-in-out
                      hover:scale-110
                      sm:h-44
                      md:h-48
                      lg:h-52
                    "
                    alt={product.name || "المنتج"}
                    onError={(e) => {
                      e.currentTarget.src =
                        "/placeholder.jpg";
                    }}
                  />

                  {/* Status */}
                  <span
                    className={`
                      absolute
                      right-2
                      top-2
                      rounded-full
                      px-2
                      py-1
                      text-[10px]
                      font-semibold
                      sm:right-3
                      sm:top-3
                      sm:px-3
                      sm:text-xs
                      ${status.className}
                    `}
                  >
                    {status.text}
                  </span>

                  {/* Category */}
                  {product.Categories && (
                    <span
                      className="
                        absolute
                        right-2
                        top-10
                        max-w-[calc(100%-1rem)]
                        truncate
                        rounded-full
                        bg-blue-600
                        px-2
                        py-1
                        text-[10px]
                        text-white
                        sm:right-3
                        sm:top-11
                        sm:px-3
                        sm:text-xs
                      "
                    >
                      {product.Categories}
                    </span>
                  )}
                </div>

                {/* ==========================================
                    Content
                ========================================== */}
                <div className="min-w-0 p-3 sm:p-4 lg:p-5">

                  {/* Name + SKU */}
                  <div
                    className="
                      flex
                      min-w-0
                      items-start
                      justify-between
                      gap-2
                    "
                  >
                    <h3
                      className="
                        min-w-0
                        flex-1
                        truncate
                        text-base
                        font-bold
                        text-white
                        sm:text-lg
                        lg:text-xl
                      "
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    <span
                      className="
                        max-w-[35%]
                        shrink-0
                        truncate
                        text-[10px]
                        text-gray-400
                        sm:text-xs
                      "
                      title={product.sku}
                    >
                      {product.sku || "-"}
                    </span>
                  </div>

                  {/* Vehicles */}
                  <p
                    className="
                      mt-2
                      min-h-[36px]
                      text-xs
                      leading-5
                      text-gray-400
                      sm:text-sm
                    "
                  >
                    <span className="font-medium text-gray-500">
                      متوافق مع:
                    </span>{" "}

                    {product.vehicles?.length > 0
                      ? product.vehicles
                          .map(
                            (vehicle) =>
                              vehicle.manufacturer ||
                              "بدون اسم"
                          )
                          .join("، ")
                      : "لا يوجد"}
                  </p>

                  {/* ==========================================
                      Info
                  ========================================== */}
                  <div
                    className="
                      mt-3
                      grid
                      grid-cols-3
                      gap-1
                      border-t
                      border-gray-800
                      pt-3
                      text-center
                      sm:mt-4
                      sm:gap-2
                      sm:pt-4
                    "
                  >
                    {/* Quantity */}
                    <div className="min-w-0">
                      <p className="truncate text-[9px] text-gray-500 sm:text-xs">
                        الكمية
                      </p>

                      <h4 className="mt-1 truncate text-xs font-bold text-white sm:text-sm">
                        {product.quantity ?? 0}
                      </h4>
                    </div>

                    {/* Profit */}
                    <div className="min-w-0">
                      <p className="truncate text-[9px] text-gray-500 sm:text-xs">
                        الربح لكل قطعة
                      </p>

                      <h4 className="mt-1 truncate text-xs font-bold text-white sm:text-sm">
                        {profit}
                      </h4>
                    </div>

                    {/* Price */}
                    <div className="min-w-0">
                      <p className="truncate text-[9px] text-gray-500 sm:text-xs">
                        السعر
                      </p>

                      <h4 className="mt-1 truncate text-xs font-bold text-blue-400 sm:text-sm">
                        {product.price ?? 0}
                      </h4>
                    </div>
                  </div>

                  {/* ==========================================
                      Buttons
                  ========================================== */}
                  <div className="mt-4 flex gap-2 sm:mt-6 sm:gap-3">

                    {/* EDIT */}
                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(product)
                      }
                      className="
                        flex
                        min-w-0
                        flex-1
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        py-2.5
                        text-white
                        transition
                        hover:bg-blue-700
                        sm:py-3
                      "
                    >
                      <FiEdit className="text-sm sm:text-base" />

                      <span className="text-xs sm:text-sm">
                        تعديل
                      </span>
                    </button>

                    {/* DELETE */}
                    <button
                      type="button"
                      onClick={() =>
                        deleteProduct(
                          product.documentId
                        )
                      }
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-red-600
                        text-white
                        transition
                        hover:bg-red-700
                        sm:h-12
                        sm:w-14
                      "
                      aria-label="حذف المنتج"
                      title="حذف المنتج"
                    >
                      <FiTrash2 className="text-sm sm:text-base" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full py-10 text-center">
          <p className="text-sm text-gray-400 sm:text-base">
            لا توجد منتجات
          </p>
        </div>
      )}

      {/* ==========================================
          Add Product Card
      ========================================== */}
      <div
        className="
          flex
          min-h-[220px]
          w-full
          min-w-0
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-gray-600
          p-4
          sm:min-h-[240px]
        "
      >
        <button
          type="button"
          onClick={handleAdd}
          className="
            flex
            w-full
            max-w-[220px]
            flex-col
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            py-3
            text-xs
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            sm:text-sm
          "
        >
          <IoAddCircleOutline
            className="
              h-12
              w-12
              rounded-full
              bg-[#2333]
              p-1.5
              sm:h-14
              sm:w-14
            "
          />

          إضافة منتج جديد للمتجر
        </button>
      </div>

      {/* ==========================================
          Modal
      ========================================== */}
      <AddProductModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setProductToEdit(null);
        }}
        getProducts={getProducts}
        productToEdit={productToEdit}
      />
    </div>
  );
}