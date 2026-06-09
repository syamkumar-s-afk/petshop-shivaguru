"use client";

import { useProducts, useNewArrivals } from "@/hooks/useProducts";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { ProductShowcaseSection } from "./ProductShowcaseSection";

export function ShowcaseSectionsDemo() {
  const { data: allProducts = [] } = useProducts();
  const { data: newArrivals = [] } = useNewArrivals(6);
  const recentlyViewed = useRecentlyViewed((s) => s.viewedProducts);

  return (
    <div className="flex flex-col w-full mt-4 mb-4">
      {recentlyViewed.length > 0 && (
        <ProductShowcaseSection
          title="Recently Viewed"
          subtitle="Pick up where you left off."
          variant="recently-viewed"
          products={recentlyViewed}
          backgroundVariant="purple"
          maxItems={12}
        />
      )}

      <ProductShowcaseSection
        title="New Arrivals"
        variant="new-arrivals"
        products={newArrivals}
        backgroundVariant="green"
      />

      <ProductShowcaseSection
        title="Trending Products"
        subtitle="Discover what everyone's talking about."
        variant="featured"
        products={allProducts}
        backgroundVariant="neutral"
      />
    </div>
  );
}
