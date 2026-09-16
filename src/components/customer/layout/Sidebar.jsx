
import PriceRange from "../catalog/PriceRange";
import BrandFilter from "../catalog/BrandFilter";
import FilterSection from "../catalog/FilterSection";

const Sidebar = ({
  selectedCategories,
  setSelectedCategories,
  selectedBrand,
  setSelectedBrand,
  maxPrice,
  setMaxPrice,
}) => {
  return (
    <aside className="w-full space-y-6">

      {/* Categories */}
      <FilterSection
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      {/* Price */}
      <PriceRange
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      {/* Brands */}
      <BrandFilter
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
      />

    </aside>
  );
};

export default Sidebar;

