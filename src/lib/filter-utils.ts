import type { Product, CategoryId } from "@/lib/site-data";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type SortOption =
  | "relevance"
  | "price-low"
  | "price-high"
  | "newest"
  | "name-az";

export type FilterOption = { value: string; count: number };

export type PricePreset = {
  id: string;
  label: string;
  min: number;
  max: number;
};

export type FilterState = {
  selectedCategories: string[];
  priceRange: [number, number];
  selectedBrands: string[];
  selectedAges: string[];
  selectedDietary: string[];
};

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "name-az", label: "Name: A–Z" },
];

export const PRICE_PRESETS: PricePreset[] = [
  { id: "under-500", label: "Under ₹500", min: 0, max: 500 },
  { id: "500-2000", label: "₹500–₹2,000", min: 500, max: 2000 },
  { id: "2000-5000", label: "₹2,000–₹5,000", min: 2000, max: 5000 },
  { id: "5000-20000", label: "₹5,000–₹20,000", min: 5000, max: 20000 },
  { id: "above-20000", label: "Above ₹20,000", min: 20000, max: 100000 },
];

/* ------------------------------------------------------------------ */
/*  Helper – extract available filter options                          */
/* ------------------------------------------------------------------ */

export function getAvailableBrands(products: Product[]): FilterOption[] {
  const map = new Map<string, number>();
  for (const p of products) {
    if (p.brand) {
      map.set(p.brand, (map.get(p.brand) ?? 0) + 1);
    }
  }
  return Array.from(map, ([value, count]) => ({ value, count })).sort(
    (a, b) => b.count - a.count,
  );
}

export function getAvailableAges(products: Product[]): FilterOption[] {
  const map = new Map<string, number>();
  for (const p of products) {
    if (p.age) {
      map.set(p.age, (map.get(p.age) ?? 0) + 1);
    }
  }
  return Array.from(map, ([value, count]) => ({ value, count })).sort(
    (a, b) => b.count - a.count,
  );
}

export function getAvailableDietary(products: Product[]): FilterOption[] {
  const map = new Map<string, number>();
  for (const p of products) {
    if (p.dietaryRequirements) {
      // Split by commas and "&" to extract individual terms
      const terms = p.dietaryRequirements
        .split(/[,&]/)
        .map((t) => t.trim())
        .filter(Boolean);
      for (const term of terms) {
        map.set(term, (map.get(term) ?? 0) + 1);
      }
    }
  }
  return Array.from(map, ([value, count]) => ({ value, count })).sort(
    (a, b) => b.count - a.count,
  );
}

export function getPriceRange(products: Product[]): {
  min: number;
  max: number;
} {
  if (products.length === 0) return { min: 0, max: 100000 };
  let min = Infinity;
  let max = -Infinity;
  for (const p of products) {
    if (p.price < min) min = p.price;
    if (p.price > max) max = p.price;
  }
  return { min, max };
}

/* ------------------------------------------------------------------ */
/*  Contextual filter visibility                                       */
/* ------------------------------------------------------------------ */

export function getContextualFilters(selectedCategories: string[]): string[] {
  const sections = ["category", "price", "brand", "age"];

  // Show dietary section when "food" is selected or no categories are selected
  if (
    selectedCategories.length === 0 ||
    selectedCategories.includes("food")
  ) {
    sections.push("dietary");
  }

  return sections;
}

/* ------------------------------------------------------------------ */
/*  Core filter logic                                                  */
/* ------------------------------------------------------------------ */

function matchesFilters(
  product: Product,
  state: FilterState,
  skip?: keyof FilterState,
): boolean {
  // Category filter (OR within group)
  if (skip !== "selectedCategories" && state.selectedCategories.length > 0) {
    if (!state.selectedCategories.includes(product.category)) return false;
  }

  // Price range filter
  if (skip !== "priceRange") {
    const [min, max] = state.priceRange;
    if (product.price < min || product.price > max) return false;
  }

  // Brand filter (OR within group)
  if (skip !== "selectedBrands" && state.selectedBrands.length > 0) {
    if (!product.brand || !state.selectedBrands.includes(product.brand))
      return false;
  }

  // Age filter (OR within group)
  if (skip !== "selectedAges" && state.selectedAges.length > 0) {
    if (!product.age || !state.selectedAges.includes(product.age)) return false;
  }

  // Dietary filter (OR within group)
  if (skip !== "selectedDietary" && state.selectedDietary.length > 0) {
    if (!product.dietaryRequirements) return false;
    const terms = product.dietaryRequirements
      .split(/[,&]/)
      .map((t) => t.trim())
      .filter(Boolean);
    if (!state.selectedDietary.some((d) => terms.includes(d))) return false;
  }

  return true;
}

export function applyFilters(
  products: Product[],
  filterState: FilterState,
): Product[] {
  return products.filter((p) => matchesFilters(p, filterState));
}

/* ------------------------------------------------------------------ */
/*  Sorting                                                            */
/* ------------------------------------------------------------------ */

export function applySorting(
  products: Product[],
  sortBy: SortOption,
): Product[] {
  if (sortBy === "relevance") return products;

  const sorted = [...products];
  switch (sortBy) {
    case "price-low":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
    case "name-az":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }
  return sorted;
}

/* ------------------------------------------------------------------ */
/*  Cross-filter counts                                                */
/* ------------------------------------------------------------------ */

export function getFilteredCounts(
  products: Product[],
  filterState: FilterState,
): {
  categories: Map<string, number>;
  brands: Map<string, number>;
  ages: Map<string, number>;
  dietary: Map<string, number>;
} {
  const categories = new Map<string, number>();
  const brands = new Map<string, number>();
  const ages = new Map<string, number>();
  const dietary = new Map<string, number>();

  // For each dimension, count products matching all OTHER filters
  for (const product of products) {
    // Category counts — skip category filter itself
    if (matchesFilters(product, filterState, "selectedCategories")) {
      categories.set(
        product.category,
        (categories.get(product.category) ?? 0) + 1,
      );
    }

    // Brand counts — skip brand filter itself
    if (product.brand && matchesFilters(product, filterState, "selectedBrands")) {
      brands.set(product.brand, (brands.get(product.brand) ?? 0) + 1);
    }

    // Age counts — skip age filter itself
    if (product.age && matchesFilters(product, filterState, "selectedAges")) {
      ages.set(product.age, (ages.get(product.age) ?? 0) + 1);
    }

    // Dietary counts — skip dietary filter itself
    if (
      product.dietaryRequirements &&
      matchesFilters(product, filterState, "selectedDietary")
    ) {
      const terms = product.dietaryRequirements
        .split(/[,&]/)
        .map((t) => t.trim())
        .filter(Boolean);
      for (const term of terms) {
        dietary.set(term, (dietary.get(term) ?? 0) + 1);
      }
    }
  }

  return { categories, brands, ages, dietary };
}
