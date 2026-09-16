import { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";

export default function ProductGallery({
  images = [],
}) {
  const [selectedImage, setSelectedImage] =
    useState(images[0] || null);

  useEffect(() => {
    setSelectedImage(
      images[0] || null
    );
  }, [images]);

  if (!images.length) {
    return (
      <div className="flex h-[280px] items-center justify-center rounded-xl border border-zinc-800 bg-[#171717] text-sm text-zinc-500 min-[400px]:h-[320px] sm:h-[400px] sm:rounded-2xl lg:h-[500px]">
        لا توجد صور للمنتج
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-[#171717] sm:rounded-2xl">
        <span className="absolute right-2 top-2 z-10 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-medium text-white sm:right-4 sm:top-4 sm:px-4 sm:text-sm">
          منتج
        </span>

        <img
          src={selectedImage}
          alt="صورة المنتج"
          className="h-[280px] w-full object-cover min-[400px]:h-[320px] sm:h-[400px] lg:h-[500px]"
          onError={(e) => {
            e.currentTarget.src =
              "/placeholder.jpg";
          }}
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1 sm:gap-3">
        {/* Video */}
        <button
          type="button"
          aria-label="عرض الفيديو"
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-[#171717] transition hover:border-blue-500 sm:h-20 sm:w-20 sm:rounded-xl lg:h-24 lg:w-24"
        >
          <FaPlayCircle className="text-2xl text-zinc-400 sm:text-3xl" />
        </button>

        {images.map(
          (image, index) => (
            <button
              type="button"
              key={index}
              onClick={() =>
                setSelectedImage(image)
              }
              aria-label={`عرض الصورة ${index + 1}`}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-20 sm:w-20 sm:rounded-xl lg:h-24 lg:w-24 ${
                selectedImage === image
                  ? "border-blue-600"
                  : "border-zinc-700 hover:border-zinc-500"
              }`}
            >
              <img
                src={image}
                alt={`صورة مصغرة ${index + 1}`}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "/placeholder.jpg";
                }}
              />
            </button>
          )
        )}
      </div>
    </div>
  );
}