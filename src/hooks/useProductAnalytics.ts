import { useCallback } from "react";
import { Product } from "@/types/product";

export function useProductAnalytics() {
  const trackProductClick = useCallback((product: Product, sectionVariant: string) => {
    // In a real app, this would call your analytics provider (e.g., Segment, Mixpanel)
    console.log(`[Analytics] Product Clicked: ${product.name} (ID: ${product.id}) in section: ${sectionVariant}`);
  }, []);

  const trackViewAllClick = useCallback((sectionVariant: string) => {
    console.log(`[Analytics] View All Clicked in section: ${sectionVariant}`);
  }, []);

  const trackCardImpression = useCallback((product: Product, sectionVariant: string) => {
    console.log(`[Analytics] Card Impression: ${product.name} (ID: ${product.id}) in section: ${sectionVariant}`);
  }, []);

  return {
    trackProductClick,
    trackViewAllClick,
    trackCardImpression,
  };
}
