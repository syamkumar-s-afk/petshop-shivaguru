import { useQuery } from "@tanstack/react-query";
import { ProductRepository } from "@/repositories/ProductRepository";
import { ProductRecommendationService } from "@/services/ProductRecommendationService";
import { Product } from "@/types/product";

// Fetch all products (or base catalog)
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => ProductRepository.getProducts(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Fetch new arrivals
export function useNewArrivals(limit: number = 6) {
  return useQuery({
    queryKey: ["products", "new-arrivals", limit],
    queryFn: () => ProductRepository.getNewArrivals(limit),
    staleTime: 1000 * 60 * 5,
  });
}

// Fetch related products based on a base product
export function useRelatedProducts(baseProduct: Product | null, limit: number = 6) {
  // We need all products to calculate recommendations. In a real app,
  // this might be a direct API call: /api/products/:id/related
  const { data: allProducts = [] } = useProducts();

  return useQuery({
    queryKey: ["products", "related", baseProduct?.id, limit],
    queryFn: () => {
      return ProductRecommendationService.getRecommendations(baseProduct, allProducts, limit);
    },
    enabled: allProducts.length > 0 && !!baseProduct,
    staleTime: 1000 * 60 * 5,
  });
}
