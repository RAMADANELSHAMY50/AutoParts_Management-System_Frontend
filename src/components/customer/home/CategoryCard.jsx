import { Link } from "react-router-dom";

export default function CategoryCard({
  category,
  className = "",
}) {
  const imageUrl = category?.image?.url
    ? `http://localhost:1337${category.image.url}`
    : null;

  return (
    <Link
      to={`/catalog?category=${category.id}`}
      className={`
        ${className}
        relative
        block
        h-full
        cursor-pointer
        overflow-hidden
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        group
      `}
    >
      {/* Background Image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="h-full w-full bg-zinc-800" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 right-0 w-full p-4 sm:p-6">

        <h3 className="text-lg font-bold text-white sm:text-2xl">
          {category.name}
        </h3>

        <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-300 sm:mt-2 sm:text-sm sm:leading-normal">
          {category.description}
        </p>

      </div>

      {/* Hover Border */}
      <div className="absolute inset-0 rounded-2xl border border-transparent transition-all duration-300 group-hover:border-indigo-500/60" />

      {/* Shine */}
      <div className="absolute -left-40 top-0 h-full w-20 rotate-12 bg-white/10 blur-xl transition-all duration-700 group-hover:left-[120%]" />

    </Link>
  );
}