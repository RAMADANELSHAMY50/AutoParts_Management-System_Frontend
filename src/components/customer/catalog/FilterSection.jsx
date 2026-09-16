import { useEffect, useState } from "react";

const API_URL = "http://localhost:1337";

// ==========================================
// Category Name Helper
// ==========================================
const getCategoryName = (category) => {
  if (!category) return "";

  if (typeof category === "string") {
    return category;
  }

  if (category?.data) {
    return getCategoryName(category.data);
  }

  if (category?.attributes?.name) {
    return category.attributes.name;
  }

  if (category?.name) {
    return category.name;
  }

  return "";
};

const FilterSection = ({
  selectedCategories = [],
  setSelectedCategories,
}) => {
  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // Fetch Categories
  // ==========================================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/categories?populate=*`
        );

        const result =
          await response.json();

        setCategories(
          result?.data || []
        );
      } catch (error) {
        console.error(
          "Error fetching categories:",
          error
        );

        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ==========================================
  // Toggle Category
  // ==========================================
  const handleCategoryChange = (
    categoryName
  ) => {
    const exists =
      selectedCategories.includes(
        categoryName
      );

    let updatedCategories;

    if (exists) {
      updatedCategories =
        selectedCategories.filter(
          (item) =>
            item !== categoryName
        );
    } else {
      updatedCategories = [
        ...selectedCategories,
        categoryName,
      ];
    }

    setSelectedCategories(
      updatedCategories
    );
  };

  // ==========================================
  // Reset
  // ==========================================
  const handleReset = () => {
    setSelectedCategories([]);
  };

  return (
    <div
      className="
        rounded-xl
        border
        border-zinc-800
        bg-[#181818]
        p-3

        sm:rounded-2xl
        sm:p-5
      "
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between sm:mb-5">
        <h3 className="text-sm font-bold text-white sm:text-base">
          الفئات
        </h3>

        {selectedCategories.length > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="text-[10px] text-blue-400 transition hover:text-blue-300 sm:text-xs"
          >
            إعادة تعيين
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-2.5 sm:space-y-3">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <div
              key={index}
              className="h-5 animate-pulse rounded bg-zinc-800 sm:h-6"
            />
          ))}
        </div>
      )}

      {/* Categories */}
      {!loading &&
        categories.length > 0 && (
          <div
            className="
              max-h-[220px]
              space-y-2
              overflow-y-auto
              pr-1
              scrollbar-thin
              scrollbar-track-transparent
              scrollbar-thumb-zinc-700

              sm:max-h-none
              sm:space-y-3
              sm:overflow-visible
            "
          >
            {categories.map((category) => {
              const categoryName =
                getCategoryName(
                  category
                );

              if (!categoryName) {
                return null;
              }

              const checked =
                selectedCategories.includes(
                  categoryName
                );

              return (
                <label
                  key={
                    category?.id ||
                    categoryName
                  }
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-2
                    text-xs
                    text-zinc-300
                    transition
                    hover:text-white

                    sm:gap-3
                    sm:text-sm
                  "
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      handleCategoryChange(
                        categoryName
                      )
                    }
                    className="
                      h-3.5
                      w-3.5
                      shrink-0
                      rounded
                      border-zinc-600
                      bg-zinc-800
                      text-blue-600
                      focus:ring-blue-500

                      sm:h-4
                      sm:w-4
                    "
                  />

                  <span className="truncate">
                    {categoryName}
                  </span>
                </label>
              );
            })}
          </div>
        )}

      {/* Empty */}
      {!loading &&
        categories.length === 0 && (
          <p className="text-xs text-zinc-500 sm:text-sm">
            لا توجد فئات متاحة
          </p>
        )}
    </div>
  );
};

export default FilterSection;