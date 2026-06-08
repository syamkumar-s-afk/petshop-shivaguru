import { Product } from "@/types/product";
import { products as siteProducts } from "@/lib/site-data";

// Map site-data products to our Showcase Product interface
const MAPPED_PRODUCTS: Product[] = siteProducts.map((p, index) => ({
  id: p.id,
  slug: p.id,
  name: p.name,
  image: p.image,
  price: p.price,
  // Adding mock fields to satisfy the UI since original products lack them
  compareAtPrice: p.price + (p.price * 0.2), // Mock 20% discount
  rating: 4.5 + (index % 5) * 0.1, // Mock rating between 4.5 and 4.9
  reviewCount: 50 + (index * 17) % 200, // Mock reviews
  stockStatus: "in-stock",
  brand: p.brand || "Exotic Pets",
  category: p.category,
  createdAt: p.createdAt,
  badge: index % 3 === 0 ? "NEW" : index % 5 === 0 ? "BEST SELLER" : undefined,
  tags: [p.category, p.age || "", p.brand || ""].filter(Boolean),
}));

export class ProductRepository {
  /**
   * Fetch all products
   */
  static async getProducts(): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return MAPPED_PRODUCTS;
  }

  /**
   * Fetch specific products by IDs
   */
  static async getProductsByIds(ids: string[]): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MAPPED_PRODUCTS.filter((product) => ids.includes(product.id));
  }

  /**
   * Fetch new arrivals
   */
  static async getNewArrivals(limit: number = 6): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const sorted = [...MAPPED_PRODUCTS].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
    return sorted.slice(0, limit);
  }
}
