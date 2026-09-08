import { Star } from "lucide-react";

export default function StarRating({ rating = 0, size = 18, showValue = false }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {stars.map((star) => {
          const fillPercent = Math.min(Math.max(rating - (star - 1), 0), 1) * 100;

          return (
            <div key={star} className="relative" style={{ width: size, height: size }}>
              {/* Empty star (background) */}
              <Star size={size} className="absolute inset-0 text-gray-200" fill="currentColor" />
              {/* Filled star (clipped to fillPercent width) */}
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
                <Star size={size} className="text-yellow-500" fill="currentColor" />
              </div>
            </div>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-black ml-1">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}