import { Link } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";

export default function Breadcrumb() {
  return (
    <div className="flex items-center  gap-2 text-sm text-zinc-400 mb-6">
      <Link
        to="/"
        className="transition hover:text-white"
      >
        الرئيسية
      </Link>

      <HiChevronLeft className="text-xs text-zinc-600" />

      <Link
        to="/catalog"
        className="transition hover:text-white"
      >
        الهيكل الخارجي
      </Link>

      <HiChevronLeft className="text-xs text-zinc-600" />

      <span className="font-medium text-white">
        جناح خلفي كربون فايبر
      </span>
    </div>
  );
}