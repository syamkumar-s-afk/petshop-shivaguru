"use client";

import Link from "next/link";
import { ProductCarousel } from "./ProductCarousel";
import { ProductCard } from "./ProductCard";
import { ProductSkeleton } from "./ProductSkeleton";
import { ProductShowcaseSectionProps } from "@/types/product";
import { ArrowRight } from "lucide-react";
import { useProductAnalytics } from "@/hooks/useProductAnalytics";

export function ProductShowcaseSection({
  title,
  subtitle,
  products,
  variant,
  viewAllHref,
  backgroundVariant = "neutral",
  maxItems = 12,
  showRating = true,
  showBadge = true,
}: ProductShowcaseSectionProps) {
  const { trackViewAllClick } = useProductAnalytics();

  const getBackgroundClass = () => {
    switch (backgroundVariant) {
      case "green": return "bg-green-50/50";
      case "purple": return "bg-purple-50/50";
      case "blue": return "bg-blue-50/50";
      case "yellow": return "bg-yellow-50/50";
      default: return "bg-transparent";
    }
  };

  const displayedProducts = products.slice(0, maxItems);
  const isLoading = products.length === 0;

  const headerRight = viewAllHref ? (
    <Link
      href={viewAllHref}
      onClick={() => trackViewAllClick(variant)}
      className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
    >
      View All
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
    </Link>
  ) : null;

  return (
    <section className={`py-4 md:py-10 ${getBackgroundClass()}`}>
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        <ProductCarousel
          title={title}
          subtitle={subtitle}
          headerRight={headerRight}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton key={`skeleton-${i}`} />
              ))
            : displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={variant}
                  showRating={showRating}
                  showBadge={showBadge}
                />
              ))}
        </ProductCarousel>

      </div>
    </section>
  );
}
