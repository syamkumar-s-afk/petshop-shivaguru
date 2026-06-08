interface ProductPriceProps {
  price: number;
  compareAtPrice?: number;
}

export function ProductPrice({ price, compareAtPrice }: ProductPriceProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const discountPercentage = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1.5">
      <span className="text-sm md:text-lg font-bold text-neutral-900 leading-none">
        {formatPrice(price)}
      </span>
      {compareAtPrice && compareAtPrice > price && (
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className="text-[10px] md:text-sm text-neutral-500 line-through leading-none">
            {formatPrice(compareAtPrice)}
          </span>
          <span className="text-[9px] md:text-xs font-semibold text-red-600 bg-red-50 px-1 md:px-1.5 py-0.5 rounded leading-none">
            {discountPercentage}% OFF
          </span>
        </div>
      )}
    </div>
  );
}
