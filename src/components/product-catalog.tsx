"use client";

import { useEffect, useMemo, useState } from "react";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { products, type CategoryId } from "@/lib/site-data";

export function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  useEffect(() => {
    const handleSelectCategory = (e: Event) => {
      const categoryId = (e as CustomEvent).detail;
      setActiveCategory(categoryId as CategoryId);
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

  return (
    <>
      <Hero
        activeCategory={activeCategory}
        onCategoryChange={(category) => setActiveCategory(category as CategoryId)}
      />

      <section
        className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4"
        id="products"
      >
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}
