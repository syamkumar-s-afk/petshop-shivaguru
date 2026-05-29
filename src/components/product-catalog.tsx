"use client";

import { useEffect, useMemo, useState } from "react";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { products, type CategoryId } from "@/lib/site-data";

export function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [displayCount, setDisplayCount] = useState(20);

  useEffect(() => {
    const handleSelectCategory = (e: Event) => {
      const categoryId = (e as CustomEvent).detail;
      setActiveCategory(categoryId as CategoryId);
      setDisplayCount(20);
    };
    window.addEventListener("select-category", handleSelectCategory);
    return () => {
      window.removeEventListener("select-category", handleSelectCategory);
    };
  }, []);

  const visibleProducts = useMemo(() => {
    if (activeCategory === "all") {
      return products;
    }
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const displayedProducts = visibleProducts.slice(0, displayCount);

  return (
    <>
      <Hero
        activeCategory={activeCategory}
        onCategoryChange={(category) => {
          setActiveCategory(category as CategoryId);
          setDisplayCount(20);
        }}
      />

      <section
        className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4"
        id="products"
      >
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      {displayCount < visibleProducts.length && (
        <div className="mb-12 flex justify-center">
          <button
            onClick={() => setDisplayCount((prev) => prev + 20)}
            className="rounded-full border-2 border-leaf px-8 py-3 text-sm font-bold text-leaf transition-colors hover:bg-leaf hover:text-white md:text-base"
          >
            Load More Products
          </button>
        </div>
      )}
    </>
  );
}
