export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";
export type ProductBadgeType = "NEW" | "BEST SELLER" | "TRENDING" | "LIMITED";

export interface Product {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  rating?: number;
  reviewCount?: number;
  stockStatus: StockStatus;
  brand?: string;
  badge?: ProductBadgeType;
  tags?: string[];
  category?: string;
  createdAt?: string; // ISO date string
}

export type ShowcaseVariant =
  | "related"
  | "recently-viewed"
  | "new-arrivals"
  | "featured"
  | "best-seller"
  | "recommended";

export type BackgroundVariant =
  | "green"
  | "purple"
  | "blue"
  | "yellow"
  | "neutral";

export interface ProductShowcaseSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  variant: ShowcaseVariant;
  viewAllHref?: string;
  backgroundVariant?: BackgroundVariant;
  maxItems?: number;
  showRating?: boolean;
  showBadge?: boolean;
  showWishlist?: boolean;
}
