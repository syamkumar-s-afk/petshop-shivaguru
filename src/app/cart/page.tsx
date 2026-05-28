import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartPageContent } from "@/components/cart-page-content";

export const metadata: Metadata = {
  title: "Shopping Cart | Exotic Pets World Pollachi",
  description:
    "Review your premium selected pets, food formulas, and accessories before final checkout on WhatsApp.",
};

export default function CartPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[75vh] bg-gray-50/20 py-4 md:py-8">
        <CartPageContent />
      </main>
      <SiteFooter />
    </>
  );
}
