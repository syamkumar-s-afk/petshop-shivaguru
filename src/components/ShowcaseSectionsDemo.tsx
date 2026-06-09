"use client";

import { useProducts, useNewArrivals, useRelatedProducts } from "@/hooks/useProducts";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { ProductShowcaseSection } from "./ProductShowcaseSection";

export function ShowcaseSectionsDemo() {
  const { data: allProducts = [], isLoading: isLoadingAll } = useProducts();
  const { data: newArrivals = [], isLoading: isLoadingNew } = useNewArrivals(6);
  const { data: relatedProducts = [], isLoading: isLoadingRelated } = useRelatedProducts(allProducts[0] || null, 6);
  const recentlyViewed = useRecentlyViewed((s) => s.viewedProducts);

  return (
    <div className="flex flex-col gap-4 w-full mt-6 mb-6">
      <ProductShowcaseSection
        title="Trending Products"
        subtitle="Discover what everyone's talking about in the exotic pet world."
        variant="featured"
        products={allProducts}
        backgroundVariant="neutral"
        viewAllHref="/catalog?category=trending"
      />

      <ProductShowcaseSection
        title="New Arrivals"
        variant="new-arrivals"
        products={newArrivals}
        backgroundVariant="green"
        viewAllHref="/catalog?sort=newest"
      />

      {recentlyViewed.length > 0 && (
        <ProductShowcaseSection
          title="Recently Viewed"
          subtitle="Pick up where you left off — products you recently explored."
          variant="recently-viewed"
          products={recentlyViewed}
          backgroundVariant="purple"
          maxItems={12}
          viewAllHref="/shop"
        />
      )}

      <ProductShowcaseSection
        title="Related Products"
        subtitle="Because you viewed Premium Adult Dog Food"
        variant="related"
        products={relatedProducts}
        backgroundVariant="neutral"
      />
    </div>
  );
}
