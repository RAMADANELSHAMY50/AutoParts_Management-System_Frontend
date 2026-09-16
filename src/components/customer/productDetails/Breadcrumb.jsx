
import { Link } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";

export default function Breadcrumb({
  productName = "",
  categoryName = "",
}) {
  return (
    <div className="mb-6 flex items-center gap-2 text-sm text-zinc-400">

      <Link
        to="/home"
        className="transition hover:text-white"
      >
        الرئيسية
      </Link>

      <HiChevronLeft className="text-xs text-zinc-600" />

      <Link
        to="/catalog"
        className="transition hover:text-white"
      >
        {categoryName || "المنتجات"}
      </Link>

      <HiChevronLeft className="text-xs text-zinc-600" />

      <span className="font-medium text-white">
        {productName}
      </span>

    </div>
  );
}

