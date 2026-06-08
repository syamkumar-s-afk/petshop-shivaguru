import { Product } from "@/types/product";

export class ProductRecommendationService {
  /**
   * Recommend products based on a base product and a pool of available products.
   * Priority algorithm: category > brand > tags > price
   */
  static getRecommendations(
    baseProduct: Product | null,
    allProducts: Product[],
    limit: number = 6
  ): Product[] {
    if (!baseProduct) {
      return allProducts.slice(0, limit);
    }

    // Filter out the base product itself
    const candidates = allProducts.filter((p) => p.id !== baseProduct.id);

    // Score each candidate
    const scoredCandidates = candidates.map((candidate) => {
      let score = 0;

      // 1. Category match (Highest Priority)
      if (candidate.category && candidate.category === baseProduct.category) {
        score += 40;
      }

      // 2. Brand match
      if (candidate.brand && candidate.brand === baseProduct.brand) {
        score += 30;
      }

      // 3. Tags match
      if (candidate.tags && baseProduct.tags) {
        const matchingTags = candidate.tags.filter((tag) =>
          baseProduct.tags?.includes(tag)
        );
        score += matchingTags.length * 5; // 5 points per matching tag
      }

      // 4. Price range match (within 20%)
      const priceDiff = Math.abs(candidate.price - baseProduct.price);
      const priceRatio = priceDiff / baseProduct.price;
      if (priceRatio <= 0.2) {
        score += 10;
      } else if (priceRatio <= 0.5) {
        score += 5;
      }

      return { product: candidate, score };
    });

    // Sort by score DESC
    scoredCandidates.sort((a, b) => b.score - a.score);

    // Return top `limit` products
    return scoredCandidates.slice(0, limit).map((sc) => sc.product);
  }
}
