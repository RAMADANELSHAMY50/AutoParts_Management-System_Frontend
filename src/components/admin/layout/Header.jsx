import { useState } from "react";
import { MdMenu } from "react-icons/md";
import AddProductModal from "../products/AddProductModal";

export default function Header({
  getProducts,
  onMenuClick,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  return (
    <>
      {/* ==========================================
          Header
      ========================================== */}
      <header
        dir="rtl"
        className="
          mb-5
          flex
          w-full
          min-w-0
          items-center
          justify-between
          gap-3
          sm:mb-6
          lg:mb-8
        "
      >
        {/* ==========================================
            Title + Mobile Menu
        ========================================== */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">

          {/* ==========================================
              Menu Button
              Mobile + Tablet فقط
              Desktop مخفي
          ========================================== */}
          <button
            type="button"
            onClick={() => {
              onMenuClick?.();
            }}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-gray-700
              bg-[#181818]
              text-white
              shadow-md
              transition-all
              duration-200
              hover:border-gray-600
              hover:bg-[#242424]
              active:scale-95

              lg:hidden
            "
            aria-label="فتح القائمة"
            title="فتح القائمة"
          >
            <MdMenu
              size={25}
              className="shrink-0"
            />
          </button>

          {/* ==========================================
              Page Title
          ========================================== */}
          <div className="min-w-0">
            <h1
              className="
                truncate
                text-lg
                font-bold
                text-white
                sm:text-xl
                lg:text-2xl
              "
            >
              المنتجات
            </h1>

            <p
              className="
                mt-1
                truncate
                text-xs
                text-gray-400
                sm:text-sm
              "
            >
              إدارة المنتجات والمخزون
            </p>
          </div>
        </div>

        {/* ==========================================
            Add Product
        ========================================== */}
        <button
          type="button"
          onClick={() => {
            setProductToEdit(null);
            setIsOpen(true);
          }}
          className="
            flex
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-blue-600
            px-3
            py-2.5
            text-xs
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            active:scale-95
            sm:px-4
            sm:py-3
            sm:text-sm
            lg:px-5
          "
        >
          <span className="hidden sm:inline">
            + إضافة منتج
          </span>

          <span className="sm:hidden">
            + إضافة
          </span>
        </button>
      </header>

      {/* ==========================================
          Add Product Modal
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
    </>
  );
}