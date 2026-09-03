import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import AddProductModal from "./products/AddProductModal";
import { useState } from "react";

export default function ProductCard({ products, getProducts, getStockStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // =========================
  // ADD
  // =========================
  const handleAdd = () => {
    setProductToEdit(null);
    setIsOpen(true);
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (product) => {
    console.log("Product to edit:", product);

    setProductToEdit(product);
    setIsOpen(true);
  };

  // =========================
  // DELETE
  // =========================
  const deleteProduct = async (documentId) => {
    try {
      await axios.delete(`http://localhost:1337/api/products/${documentId}`);

      alert("Product deleted successfully");

      getProducts();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-[#171717]">
      {products.length !== 0 ? (
        products.map((product) => {
          const status = getStockStatus(product.stock, product.minimumStock);

          // salePrice - costPrice
          const profit =
            Number(product.salePrice || 0) - Number(product.costPrice || 0);

          return (
            <div key={product.documentId}>
              <div className="border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500 transition-all duration-300">
                {/* Image */}
                <div className="relative">
                  <img
                    src={`http://localhost:1337${product.image?.url}`}
                    className="w-full h-52 object-cover transition-transform duration-[1s] ease-in-out hover:scale-110"
                    alt={product.name}
                  />

                  {/* Status */}
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${status.className}`}
                  >
                    {status.text}
                  </span>

                  {/* Category */}
                  <span className="absolute top-9 right-4 mt-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                    {product.Categories}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {product.name}
                    </h3>

                    <span className="text-white">{product.sku}</span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">
                    متوافق مع:
                    {product.vehicles?.length > 0
                      ? product.vehicles
                          .map((vehicle) => vehicle.name)
                          .join(", ")
                      : "لا يوجد"}
                  </p>

                  {/* Info */}
                  <div className="grid grid-cols-3 gap-4 text-center border-t border-gray-800 pt-4">
                    {/* Quantity */}
                    <div>
                      <p className="text-gray-500 text-xs">الكمية</p>

                      <h4 className="text-white font-bold mt-1">
                        {product.quantity}
                      </h4>
                    </div>

                    {/* Profit */}
                    <div>
                      <p className="text-gray-500 text-xs">الربح لكل قطعة</p>

                      <h4 className="text-white font-bold mt-1">{profit}</h4>
                    </div>

                    {/* Price */}
                    <div>
                      <p className="text-gray-500 text-xs">السعر</p>

                      <h4 className="text-blue-400 font-bold mt-1">
                        {product.price}
                      </h4>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-6">
                    {/* EDIT */}
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition"
                    >
                      <FiEdit />
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => deleteProduct(product.documentId)}
                      className="w-14 bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center text-white transition"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-white">No products found</p>
      )}

      {/* Add Product */}
      <div className="border-dashed border border-gray-600 rounded-2xl flex flex-col justify-center items-center">
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg m-5"
        >
          <IoAddCircleOutline className="size-12 bg-[#2333] p-1.5 rounded-full" />
          إضافة منتج جديد للمتجر
        </button>
      </div>

      {/* Modal */}
      <AddProductModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setProductToEdit(null);
        }}
        getproducts={getProducts}
        productToEdit={productToEdit}
      />
    </div>
  );
}
