import { ProductBadgeType } from "@/types/product";

interface ProductBadgeProps {
  badge: ProductBadgeType;
}

export function ProductBadge({ badge }: ProductBadgeProps) {
  const getBadgeStyles = (type: ProductBadgeType) => {
    switch (type) {
      case "NEW":
        return "bg-blue-600 text-white";
      case "BEST SELLER":
        return "bg-yellow-500 text-black";
      case "TRENDING":
        return "bg-purple-600 text-white";
      case "LIMITED":
        return "bg-red-600 text-white";
      default:
        return "bg-neutral-800 text-white";
    }
  };

  return (
    <div
      className={`absolute top-2 left-2 md:top-3 md:left-3 z-10 px-1.5 py-0.5 md:px-2.5 md:py-1 text-[8px] md:text-[10px] font-bold tracking-wider uppercase rounded shadow-sm ${getBadgeStyles(
        badge
      )}`}
    >
      {badge}
    </div>
  );
}
