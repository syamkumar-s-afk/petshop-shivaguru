import { Star } from "lucide-react";

interface ProductRatingProps {
  rating?: number;
  reviewCount?: number;
}

export function ProductRating({ rating, reviewCount }: ProductRatingProps) {
  if (!rating) return null;

  return (
    <div className="flex items-center gap-1 md:gap-1.5 mt-1 md:mt-2">
      <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 ${
              star <= Math.round(rating)
                ? "fill-current"
                : "text-neutral-300 fill-transparent"
            }`}
          />
        ))}
      </div>
      <span className="text-[10px] md:text-xs font-medium text-neutral-600 leading-none mt-0.5">{rating}</span>
      {reviewCount !== undefined && (
        <span className="text-[9px] md:text-xs text-neutral-400 hidden md:inline leading-none mt-0.5">({reviewCount})</span>
      )}
    </div>
  );
}
