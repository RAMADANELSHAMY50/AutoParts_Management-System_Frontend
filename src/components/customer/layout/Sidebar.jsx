// import FilterSection from "./productDetails";
// import PriceRange from "./PriceRange";
// import BrandFilter from "./BrandFilter";

const Sidebar = () => {
  return (
    <aside className="w-full space-y-6">
      {/* Categories */}
      <FilterSection />

      {/* Price */}
      <PriceRange />

      {/* Brands */}
      <BrandFilter />
    </aside>
  );
};

export default Sidebar;