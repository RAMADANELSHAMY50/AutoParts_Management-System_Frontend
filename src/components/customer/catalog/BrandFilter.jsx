import { useEffect, useState } from "react";

const API_URL = "http://localhost:1337";

const BrandFilter = ({
  selectedBrand,
  setSelectedBrand,
}) => {
  const [brands, setBrands] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // Fetch Brands
  // ==========================================
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/brands?populate=*`
        );

        const result =
          await response.json();

        setBrands(
          result?.data || []
        );
      } catch (error) {
        console.error(
          "Error fetching brands:",
          error
        );

        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div
      className="
        rounded-xl
        border
        border-zinc-800
        bg-[#181818]
        p-3

        sm:rounded-2xl
        sm:p-6
      "
    >
      {/* Heading */}
      <h3
        className="
          mb-4
          text-sm
          font-bold
          text-white

          sm:mb-6
          sm:text-lg
        "
      >
        العلامة التجارية
      </h3>

      {/* Loading */}
      {loading && (
        <div className="space-y-2.5 sm:space-y-4">
          {Array.from({
            length: 5,
          }).map((_, index) => (
            <div
              key={index}
              className="h-5 animate-pulse rounded bg-zinc-800 sm:h-6"
            />
          ))}
        </div>
      )}

      {/* Brands */}
      {!loading &&
        brands.length > 0 && (
          <div className="space-y-2.5 sm:space-y-4">
            {brands.map((brand) => {
              const brandName =
                brand?.name ||
                brand?.attributes?.name ||
                "";

              const brandId =
                brand?.id ||
                brand?.documentId;

              if (!brandName) {
                return null;
              }

              return (
                <label
                  key={brandId}
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
                    type="radio"
                    name="brand"
                    value={brandId}
                    checked={
                      String(
                        selectedBrand
                      ) ===
                      String(brandId)
                    }
                    onChange={() =>
                      setSelectedBrand(
                        brandName
                      )
                    }
                    className="
                      h-4
                      w-4
                      shrink-0
                      border-zinc-600
                      bg-zinc-800
                      text-blue-600
                      focus:ring-blue-500

                      sm:h-5
                      sm:w-5
                    "
                  />

                  <span className="truncate">
                    {brandName}
                  </span>
                </label>
              );
            })}
          </div>
        )}

      {/* Selected */}
      {selectedBrand && (
        <div
          className="
            mt-4
            rounded-lg
            border
            border-blue-500/20
            bg-blue-500/10
            p-2

            sm:mt-6
            sm:rounded-xl
            sm:p-3
          "
        >
          <p className="text-[10px] text-zinc-400 sm:text-xs">
            العلامة المختارة
          </p>

          <p className="mt-1 truncate text-xs font-medium text-blue-400 sm:text-sm">
            {selectedBrand}
          </p>

          <button
            type="button"
            onClick={() =>
              setSelectedBrand("")
            }
            className="mt-2 text-[10px] text-zinc-500 hover:text-white sm:text-xs"
          >
            إزالة الاختيار
          </button>
        </div>
      )}
    </div>
  );
};

export default BrandFilter;