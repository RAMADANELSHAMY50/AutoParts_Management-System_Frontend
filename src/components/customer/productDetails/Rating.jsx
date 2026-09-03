import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function Rating({
  rating = 5,
  reviews = 0,
  showNumber = true,
  size = "text-base",
}) {
  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <FaStar
            key={i}
            className={`${size} text-yellow-400`}
          />
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <FaStarHalfAlt
            key={i}
            className={`${size} text-yellow-400`}
          />
        );
      } else {
        stars.push(
          <FaRegStar
            key={i}
            className={`${size} text-zinc-500`}
          />
        );
      }
    }

    return stars;
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {renderStars()}
      </div>

      {showNumber && (
        <>
          <span className="font-semibold text-white">
            {rating.toFixed(1)}
          </span>

          <span className="text-sm text-zinc-400">
            ({reviews} Reviews)
          </span>
        </>
      )}
    </div>
  );
}