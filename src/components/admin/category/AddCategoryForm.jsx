import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { AddCategory } from "./AddToUpdateToDelete";

const AddCategoryForm = ({ onClose, onSuccess }) => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: null,
    productCount: 0,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // IMAGE CHANGE
  // =========================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setCategory({
      ...category,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  // =========================
  // SUBMIT
  // =========================
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
        bg-black/60
        p-3
        backdrop-blur-sm
      "
    >
      {/* Modal */}
      <div
        className="
          relative
          w-full
          max-w-xl
          rounded-3xl
          border
          border-white/10
          bg-[#141414]
          p-3
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="mb-3">
          <h2 className="text-2xl font-bold text-white">إضافة قسم جديد</h2>

          <p className="mt-2 text-sm text-gray-400">أدخل بيانات القسم</p>
        </div>

        {/* ========================= */}
        {/* NAME */}
        {/* ========================= */}
        <div className="mb-3">
          <label className="mb-2 block text-white">اسم القسم</label>

          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            placeholder="مثال: إضاءة"
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-[#1E1E1E]
              p-2
              text-white
              outline-none
              transition
              focus:border-blue-500
            "
          />
        </div>
        

        {/* ========================= */}
        {/* DESCRIPTION */}
        {/* ========================= */}
        <div className="mb-3">
          <label className="mb-2 block text-white">وصف القسم</label>

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
              p-2
              text-white
              outline-none
              transition
              focus:border-blue-500
            "
          />
        </div>

        {/* ========================= */}
        {/* IMAGE */}
        {/* ========================= */}
        <div className="mb-3">
          <label className="mb-2 block text-white">صورة القسم</label>

          <label
            htmlFor="category-image"
            className="
              flex
              h-33
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
            "
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-center text-gray-400">
                <p>اضغط لاختيار صورة</p>

                <p className="mt-1 text-xs">PNG / JPG</p>
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

        {/* ========================= */}
        {/* BUTTONS */}
        {/* ========================= */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              bg-[#292929]
              px-6
              py-3
              text-white
              transition
              hover:bg-[#333]
            "
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="
              rounded-xl
              bg-blue-600
              px-6
              py-3
              text-white
              transition
              hover:bg-blue-700
              disabled:opacity-50
            "
          >
            {loading ? "جاري الإضافة..." : "إضافة القسم"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
