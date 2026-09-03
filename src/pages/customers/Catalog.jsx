import { useState } from "react";
import Navbar from "../../components/customer/layout/Navbar";
import Sidebar from "../../components/customer/layout/Sidebar";
import SortDropdown from "../../components/customer/catalog/SortDropdown";
import ProductGrid from "../../components/customer/catalog/ProductGrid";
// import Pagination from "../../components/layout/Pagination";
import RightMenu from "../../components/customer/catalog/RightMenu";
import FloatingCart from "../../components/customer/catalog/FloatingCart";
import Footer from "../../components/customer/layout/Footer";



const Catalog = () => {
  const [sort, setSort] = useState("الأحدث أولاً");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Header */}
      <Navbar />

      {/* Search */}
      {/* <div className="mx-auto max-w-7xl px-6 pt-8">
        <SearchBar />
      </div> */}

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <aside className="col-span-12 lg:col-span-3">
            <Sidebar />
          </aside>

          {/* Products */}
          <section className="col-span-12 lg:col-span-7">
            {/* Top Bar */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold">
                  Product Catalog
                </h1>

                <p className="mt-1 text-zinc-400">
                  Explore premium auto parts and accessories.
                </p>
              </div>

              <SortDropdown
                value={sort}
                onChange={setSort}
              />
            </div>

            {/* Products */}
            <ProductGrid />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={8}
              onPageChange={setCurrentPage}
            />
          </section>

          {/* Right Menu */}
          <aside className="col-span-12 flex justify-center lg:col-span-2 lg:justify-end">
            <RightMenu />
          </aside>
        </div>
      </main>

      {/* Floating Cart */}
      <FloatingCart
        itemCount={3}
        total={1249}
        onClick={() => console.log("Open Cart")}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Catalog;