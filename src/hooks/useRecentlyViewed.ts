import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

interface RecentlyViewedState {
  viewedProducts: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  clearHistory: () => void;
}

const MAX_RECENTLY_VIEWED = 20;

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      viewedProducts: [],
      addProduct: (product) =>
        set((state) => {
          // Remove if it already exists to prevent duplicates
          const filtered = state.viewedProducts.filter((p) => p.id !== product.id);
          // Add to beginning and slice to max length
          const updated = [product, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
          return { viewedProducts: updated };
        }),
      removeProduct: (productId) =>
        set((state) => ({
          viewedProducts: state.viewedProducts.filter((p) => p.id !== productId),
        })),
      clearHistory: () => set({ viewedProducts: [] }),
    }),
    {
      name: "petshop-recently-viewed", // key in localStorage
    }
  )
);
