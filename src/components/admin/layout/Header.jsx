import { FiPlus, FiUpload } from "react-icons/fi";
import AddProductModal from "../products/AddProductModal";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-between mb-8">
      {/* Title */}
      <div className="text-right">
        <h1 className="text-4xl font-bold text-white">إدارة المنتجات</h1>

        <p className="text-gray-400 mt-2">
          نظرة شاملة وتحكم في مخزون إكسسوارات السيارات
        </p>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + اضافه منتج
        </button>

        <AddProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  );
}
