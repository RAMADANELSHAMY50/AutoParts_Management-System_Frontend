import axios from "axios";
import { Delete } from "lucide-react";
import { useEffect, useState } from "react";

export default function AddProductModal({
  isOpen,
  onClose,
  getproducts,
  productToEdit,
}) {
  const emptyProduct = {
    name: "",
    quantity: "",
    image: null,
    costPrice: "",
    Categories: "",
    description: "",
    sku: "",
    salePrice: "",
    minimumStock: "",
    stock: "",
    price: "",
    brand: null,
    vehicles: [],
  };

  const [product, setProduct] = useState(emptyProduct);
  const [loading, setLoading] = useState(false);

  // Fill form when editing
  useEffect(() => {
    if (productToEdit) {
      setProduct({
        name: productToEdit.name || "",
        quantity: productToEdit.quantity ?? "",
        image: null,
        costPrice: productToEdit.costPrice ?? "",
        Categories: productToEdit.Categories || "",
        description: productToEdit.description || "",
        sku: productToEdit.sku || "",
        salePrice: productToEdit.salePrice ?? "",
        minimumStock: productToEdit.minimumStock ?? "",
        stock: productToEdit.stock ?? "",
        price: productToEdit.price ?? "",
        
      });
    } else {
      setProduct(emptyProduct);
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      let imageId = null;

      // =========================
      // Upload new image
      // =========================
      if (product.image instanceof File) {
        const formData = new FormData();

        formData.append("files", product.image);

        const uploadRes = await axios.post(
          "http://localhost:1337/api/upload",
          formData,
        );

        imageId = uploadRes.data[0].id;

        console.log("New image ID:", imageId);
      }

      // =========================
      // Product data
      // =========================
      const data = {
        name: product.name,
        quantity: Number(product.quantity),
        costPrice: Number(product.costPrice),
        Categories: product.Categories,
        description: product.description,
        sku: product.sku,
        salePrice: Number(product.salePrice),
        minimumStock: Number(product.minimumStock),
        stock: Number(product.stock),
        price: Number(product.price),
      };

      // =========================
      // ADD PRODUCT
      // =========================
      if (!productToEdit) {
        // Image is required when adding
        if (!imageId) {
          alert("Please select an image");
          setLoading(false);
          return;
        }

        data.image = imageId;

        const response = await axios.post(
          "http://localhost:1337/api/products",
          {
            data,
          },
        );

        console.log("Product added:", response.data);

        alert("Product added successfully");
      }

      // =========================
      // UPDATE PRODUCT
      // =========================
      else {
        // Only update image if user selected a new one
        if (imageId) {
          data.image = imageId;
        }

        const response = await axios.put(
          `http://localhost:1337/api/products/${productToEdit.documentId}`,
          {
            data,
          },
        );

        console.log("Product updated:", response.data);

        alert("Product updated successfully");
      }

      // =========================
      // Finish
      // =========================
      setProduct(emptyProduct);

      onClose();

      getproducts();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);

      console.error(JSON.stringify(error.response?.data, null, 2));

      alert(error.response?.data?.error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#ffffffde] rounded-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {productToEdit ? "Update Product" : "Add Product"}
          </h2>

          <button type="button" onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          {/* Name */}
          <div className="flex flex-col">
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={product.name}
              placeholder="Name"
              className="border border-gray-400 rounded-lg py-2 px-2"
              onChange={handleChange}
              required
            />
          </div>

          {/* Quantity */}
          <div className="flex flex-col">
            <label>Quantity</label>

            <input
              type="number"
              name="quantity"
              value={product.quantity}
              placeholder="Quantity"
              className="border border-gray-400 rounded-lg py-2 px-2"
              onChange={handleChange}
              required
            />
          </div>

          {/* Categories */}
          <div className="flex flex-col">
            <label>Categories</label>

            <input
              type="text"
              name="Categories"
              value={product.Categories}
              placeholder="Categories"
              className="border border-gray-400 rounded-lg py-2 px-2"
              onChange={handleChange}
            />
          </div>

          {/* Cost Price */}
          <div className="flex flex-col">
            <label>Cost Price</label>

            <input
              type="number"
              name="costPrice"
              value={product.costPrice}
              placeholder="Cost Price"
              className="border border-gray-400 rounded-lg py-2 px-2"
              onChange={handleChange}
            />
          </div>

          {/* Image */}
          <div className="flex flex-col">
            <label>
              Image
              {productToEdit && (
                <span className="text-gray-500 text-sm ml-2">(optional)</span>
              )}
            </label>

            <input
              type="file"
              accept="image/*"
              className="border border-gray-400 rounded-lg py-2 px-2"
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  image: e.target.files?.[0] || null,
                }))
              }
            />
          </div>

          {/* Sale Price */}
          <div className="flex flex-col">
            <label>Sale Price</label>

            <input
              type="number"
              name="salePrice"
              value={product.salePrice}
              placeholder="Sale Price"
              className="border border-gray-400 rounded-lg py-2 px-2"
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label>Description</label>

            <input
              type="text"
              name="description"
              value={product.description}
              placeholder="Description"
              className="border border-gray-400 rounded-lg py-2 px-2"
              onChange={handleChange}
            />
          </div>

          {/* SKU */}
          <div className="flex flex-col">
            <label>SKU</label>

            <input
              type="text"
              name="sku"
              value={product.sku}
              placeholder="SKU"
              className="border border-gray-400 rounded-lg py-2 px-2"
              onChange={handleChange}
            />
          </div>

          {/* Minimum Stock */}
          <div className="flex flex-col">
            <label>Minimum Stock</label>

            <input
              type="number"
              name="minimumStock"
              value={product.minimumStock}
              placeholder="Minimum Stock"
              className="border border-gray-400 rounded-lg py-2 px-2"
              onChange={handleChange}
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col">
            <label>Stock</label>

            <input
              type="number"
              name="stock"
              value={product.stock}
              placeholder="Stock"
              className="border border-gray-400 rounded-lg py-2 px-2"
              onChange={handleChange}
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label>Price</label>

            <input
              type="number"
              name="price"
              value={product.price}
              placeholder="Price"
              className="border border-gray-400 rounded-lg py-2 px-2"
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="col-span-full flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : productToEdit
                  ? "Update Product"
                  : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
