import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { AddCategory } from "./AddToUpdateToDelete";

const AddCategoryForm = ({
  onClose,
  onSuccess,
}) => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: null,
    productCount: 0,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // Input Change
  // ==========================================
  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // Image Change
  // ==========================================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setCategory({
      ...category,
      image: file,
    });

    setPreview(
      URL.createObjectURL(file)
    );
  };

  // ==========================================
  // Submit
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.name.trim()) {
      alert("من فضلك أدخل اسم القسم");
      return;
    }

    if (!category.description.trim()) {
      alert("من فضلك أدخل وصف القسم");
      return;
    }

    if (!category.image) {
      alert("من فضلك اختر صورة القسم");
      return;
    }

    try {
      setLoading(true);

      await AddCategory(category);

      if (onSuccess) {
        await onSuccess();
      }

      onClose();
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء إضافة القسم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/70
        p-3
        backdrop-blur-sm
        sm:p-4
      "
    >
      {/* ==========================================
          Modal
      ========================================== */}
      <div
        className="
          relative
          w-full
          max-w-xl
          max-h-[92vh]
          overflow-y-auto
          rounded-2xl
          border
          border-white/10
          bg-[#141414]
          p-4
          shadow-2xl
          sm:rounded-3xl
          sm:p-5
          lg:p-6
        "
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            left-3
            top-3
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            bg-[#242424]
            text-gray-300
            transition
            hover:bg-red-500
            hover:text-white
            sm:h-9
            sm:w-9
          "
          aria-label="إغلاق"
        >
          <IoClose size={20} />
        </button>

        {/* Header */}
        <div className="mb-4 pl-10 sm:mb-5">
          <h2
            className="
              text-xl
              font-bold
              text-white
              sm:text-2xl
            "
          >
            إضافة قسم جديد
          </h2>

          <p className="mt-1 text-xs text-gray-400 sm:mt-2 sm:text-sm">
            أدخل بيانات القسم
          </p>
        </div>

        {/* ==========================================
            Name
        ========================================== */}
        <div className="mb-4">
          <label className="mb-1.5 block text-sm text-white sm:mb-2">
            اسم القسم
          </label>

          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            placeholder="مثال: إضاءة"
            className="
              h-11
              w-full
              rounded-xl
              border
              border-white/10
              bg-[#1E1E1E]
              px-3
              text-sm
              text-white
              outline-none
              transition
              focus:border-blue-500
              sm:h-12
              sm:p-3
            "
          />
        </div>

        {/* ==========================================
            Description
        ========================================== */}
        <div className="mb-4">
          <label className="mb-1.5 block text-sm text-white sm:mb-2">
            وصف القسم
          </label>

          <textarea
            name="description"
            value={category.description}
            onChange={handleChange}
            placeholder="اكتب وصف القسم..."
            rows={3}
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-white/10
              bg-[#1E1E1E]
              p-3
              text-sm
              text-white
              outline-none
              transition
              focus:border-blue-500
            "
          />
        </div>

        {/* ==========================================
            Image
        ========================================== */}
        <div className="mb-4">
          <label className="mb-1.5 block text-sm text-white sm:mb-2">
            صورة القسم
          </label>

          <label
            htmlFor="category-image"
            className="
              flex
              h-28
              w-full
              cursor-pointer
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              border-2
              border-dashed
              border-white/10
              bg-[#1E1E1E]
              transition
              hover:border-blue-500
              sm:h-36
            "
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-center text-xs text-gray-400 sm:text-sm">
                <p>اضغط لاختيار صورة</p>

                <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                  PNG / JPG
                </p>
              </div>
            )}
          </label>

          <input
            id="category-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* ==========================================
            Buttons
        ========================================== */}
        <div
          className="
            flex
            flex-col-reverse
            gap-2
            sm:flex-row
            sm:justify-end
            sm:gap-3
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              w-full
              rounded-xl
              bg-[#292929]
              px-5
              py-2.5
              text-sm
              text-white
              transition
              hover:bg-[#333]
              sm:w-auto
              sm:px-6
              sm:py-3
            "
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-blue-600
              px-5
              py-2.5
              text-sm
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
              ? "جاري الإضافة..."
              : "إضافة القسم"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;