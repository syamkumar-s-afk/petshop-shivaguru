"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { products, type CategoryId } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";

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

  const shopHref =
    activeCategory === "all" ? "/shop" : `/shop?category=${activeCategory}`;

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

      {/* View All in Shop CTA — replaces the old Load More on large catalogs */}
      <div className="mb-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
        {displayCount < visibleProducts.length && (
          <button
            onClick={() => setDisplayCount((prev) => prev + 20)}
            className="rounded-full border-2 border-leaf px-8 py-3 text-sm font-bold text-leaf transition-colors hover:bg-leaf hover:text-white md:text-base"
          >
            Load More Products
          </button>
        )}
        <Link
          href={shopHref}
          className="group flex items-center gap-2 rounded-full bg-forest px-8 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-forest/90 hover:shadow-lg active:scale-[0.97] md:text-base"
        >
          View All in Shop
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </>
  );
}
