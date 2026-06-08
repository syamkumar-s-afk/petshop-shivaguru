import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ShopContent } from "@/components/shop-content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop All Products | Exotic Pets World Pollachi",
  description:
    "Browse and filter our complete collection of exotic pets, premium pet food, accessories, toys, cages, supplements, and more in Pollachi.",
};

export default function ShopPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1.5 text-xs text-gray-500">
          <Link
            href="/"
            className="transition-colors hover:text-forest font-medium"
          >
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-gray-800">Shop</span>
        </nav>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-forest sm:text-2xl md:text-3xl tracking-tight">
            Shop All Products
          </h1>
          <p className="mt-1 text-xs text-gray-500 md:text-sm">
            Explore our wide range of exotic pets, premium food, accessories, and more.
          </p>
        </div>

        {/* Shop Content (wrapped in Suspense for useSearchParams) */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-leaf" />
            </div>
          }
        >
          <ShopContent />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
