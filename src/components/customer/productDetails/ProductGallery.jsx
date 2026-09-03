import { useState } from "react";
import { FaPlayCircle } from "react-icons/fa";

export default function ProductGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(
    images.length ? images[0] : null
  );

  if (!images.length) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-2xl border border-zinc-800 bg-[#171717] text-zinc-500">
        No Images
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#171717]">
        {/* Badge */}
        <span className="absolute right-4 top-4 z-10 rounded-full bg-blue-600 px-4 py-1 text-sm font-medium text-white">
          إصدار محدود
        </span>

        <img
          src={selectedImage}
          alt="Product"
          className="h-[500px] w-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto">
        {/* Video Thumbnail */}
        <button
          className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-[#171717] transition hover:border-blue-500"
        >
          <FaPlayCircle className="text-3xl text-zinc-400" />
        </button>

        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-xl border-2 transition ${
              selectedImage === image
                ? "border-blue-600"
                : "border-zinc-700 hover:border-zinc-500"
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="h-24 w-24 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}