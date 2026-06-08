"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFilterStore } from "@/lib/filter-store";
import { applyFilters, applySorting } from "@/lib/filter-utils";
import { products } from "@/lib/site-data";
import type { CategoryId } from "@/lib/site-data";
import { ProductCard } from "@/components/product-card";
import { FilterBar } from "@/components/filter-bar";
import { FilterPanel } from "@/components/filter-panel";
import { SearchX, RotateCcw } from "lucide-react";

/* ─── Empty State ─── */
function EmptyState() {
  const { clearAllFilters } = useFilterStore();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-forest-light">
        <SearchX className="h-9 w-9 text-forest/60" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-gray-800">No products found</h3>
      <p className="mb-6 max-w-sm text-sm text-gray-500">
        We couldn&apos;t find any products matching your current filters. Try adjusting your
        selections or clearing all filters.
      </p>
      <button
        type="button"
        onClick={clearAllFilters}
        className="flex items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-forest/90 active:scale-[0.97]"
      >
        <RotateCcw className="h-4 w-4" />
        Clear All Filters
      </button>
    </div>
  );
}

/* ─── Shop Content ─── */
export function ShopContent() {
  const searchParams = useSearchParams();
  const {
    selectedCategories,
    priceRange,
    selectedBrands,
    selectedAges,
    selectedDietary,
    sortBy,
    setInitialCategory,
  } = useFilterStore();

  const [displayCount, setDisplayCount] = useState(24);

  // Read initial category from URL query param
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && cat !== "all") {
      setInitialCategory(cat as CategoryId);
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(24);
  }, [selectedCategories, priceRange, selectedBrands, selectedAges, selectedDietary, sortBy]);

  const filterState = useMemo(
    () => ({
      selectedCategories,
      priceRange,
      selectedBrands,
      selectedAges,
      selectedDietary,
    }),
    [selectedCategories, priceRange, selectedBrands, selectedAges, selectedDietary]
  );

  const filteredProducts = useMemo(() => {
    const filtered = applyFilters(products, filterState);
    return applySorting(filtered, sortBy);
  }, [filterState, sortBy]);

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  return (
    <div className="flex gap-6 lg:gap-8">
      {/* Desktop sidebar filter panel */}
      <FilterPanel resultCount={filteredProducts.length} />

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Filter bar */}
        <FilterBar resultCount={filteredProducts.length} />

        {/* Product grid */}
        {filteredProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <section
              className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-3 xl:grid-cols-4"
              id="shop-products"
            >
              {displayedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-product-fade-in"
                  style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </section>

            {/* Load More */}
            {hasMore && (
              <div className="my-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setDisplayCount((prev) => prev + 24)}
                  className="rounded-full border-2 border-leaf px-8 py-3 text-sm font-bold text-leaf transition-all hover:bg-leaf hover:text-white hover:shadow-lg active:scale-[0.97] md:text-base"
                >
                  Load More Products
                </button>
              </div>
            )}

            {/* End message */}
            {!hasMore && filteredProducts.length > 0 && (
              <div className="my-8 flex justify-center">
                <p className="text-xs text-gray-400">
                  Showing all {filteredProducts.length.toLocaleString("en-IN")} products
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
