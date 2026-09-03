import { FaPlayCircle } from "react-icons/fa";

export default function ThumbnailList({
  images = [],
  selectedImage,
  onSelect,
  showVideo = true,
  onVideoClick,
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {showVideo && (
        <button
          onClick={onVideoClick}
          className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-[#171717] transition hover:border-blue-600"
        >
          <FaPlayCircle className="text-3xl text-zinc-400" />
        </button>
      )}

      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => onSelect(image)}
          className={`h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
            selectedImage === image
              ? "border-blue-600"
              : "border-zinc-700 hover:border-zinc-500"
          }`}
        >
          <img
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className="h-full w-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}