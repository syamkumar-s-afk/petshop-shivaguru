import { memo } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { ProductImage } from "./ProductImage";
import { ProductBadge } from "./ProductBadge";
import { ProductPrice } from "./ProductPrice";
import { useProductAnalytics } from "@/hooks/useProductAnalytics";

interface ProductCardProps {
  product: Product;
  variant: string;
  showRating?: boolean;
  showBadge?: boolean;
}

export const ProductCard = memo(function ProductCard({
  product,
  variant,
  showRating = true,
  showBadge = true,
}: ProductCardProps) {
  const { trackProductClick } = useProductAnalytics();

  return (
    <Link
      href={`/product/${product.slug}`}
      onClick={() => trackProductClick(product, variant)}
      className="group flex flex-col bg-white rounded-xl md:rounded-2xl border border-neutral-100 hover:border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden min-w-[120px] w-[30vw] max-w-[140px] md:min-w-[240px] md:max-w-[300px] md:w-full snap-start hover:-translate-y-1"
      aria-label={`View details for ${product.name}`}
    >
      <div className="relative">
        {showBadge && product.badge && <ProductBadge badge={product.badge} />}
        <ProductImage src={product.image} alt={product.name} />
        
        {/* Stock Status Overlay if Out of Stock */}
        {product.stockStatus === "out-of-stock" && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10 backdrop-blur-[1px]">
            <span className="px-3 py-1.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-md">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-2 md:p-3 flex flex-col flex-grow justify-between">
        <div className="flex flex-col">
          {/* Brand */}
          {product.brand && (
            <span className="text-[9px] md:text-xs text-neutral-500 font-medium tracking-wide uppercase truncate leading-none">
              {product.brand}
            </span>
          )}

          {/* Title */}
          <h3 className="mt-1 md:mt-1.5 text-[11px] md:text-sm font-semibold text-neutral-800 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Price & Cart Actions Container */}
        <div className="mt-1.5 md:mt-2 pt-1.5 md:pt-2 border-t border-neutral-50 flex items-end justify-between">
          <ProductPrice
            price={product.price}
            compareAtPrice={product.compareAtPrice}
          />
        </div>
      </div>
    </Link>
  );
});
