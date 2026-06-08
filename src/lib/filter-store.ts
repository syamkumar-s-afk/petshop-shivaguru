import { create } from "zustand";
import type { CategoryId } from "@/lib/site-data";
import type { SortOption } from "@/lib/filter-utils";

const DEFAULT_PRICE_RANGE: [number, number] = [0, 100000];

interface FilterState {
  selectedCategories: CategoryId[];
  priceRange: [number, number];
  pricePreset: string | null;
  selectedBrands: string[];
  brandSearch: string;
  selectedAges: string[];
  selectedDietary: string[];
  sortBy: SortOption;
  isFilterPanelOpen: boolean;

  // Actions
  toggleCategory: (id: CategoryId) => void;
  setPriceRange: (range: [number, number]) => void;
  setPricePreset: (preset: string | null) => void;
  toggleBrand: (brand: string) => void;
  setBrandSearch: (query: string) => void;
  toggleAge: (age: string) => void;
  toggleDietary: (dietary: string) => void;
  setSortBy: (sort: SortOption) => void;
  clearAllFilters: () => void;
  removeFilter: (type: string, value: string) => void;
  setFilterPanelOpen: (open: boolean) => void;
  setInitialCategory: (category: CategoryId) => void;
  getActiveFilterCount: () => number;
}

export const useFilterStore = create<FilterState>((set, get) => ({
  selectedCategories: [],
  priceRange: DEFAULT_PRICE_RANGE,
  pricePreset: null,
  selectedBrands: [],
  brandSearch: "",
  selectedAges: [],
  selectedDietary: [],
  sortBy: "relevance",
  isFilterPanelOpen: false,

  toggleCategory: (id) =>
    set((state) => {
      const exists = state.selectedCategories.includes(id);
      return {
        selectedCategories: exists
          ? state.selectedCategories.filter((c) => c !== id)
          : [...state.selectedCategories, id],
      };
    }),

  setPriceRange: (range) =>
    set({ priceRange: range }),

  setPricePreset: (preset) =>
    set({ pricePreset: preset }),

  toggleBrand: (brand) =>
    set((state) => {
      const exists = state.selectedBrands.includes(brand);
      return {
        selectedBrands: exists
          ? state.selectedBrands.filter((b) => b !== brand)
          : [...state.selectedBrands, brand],
      };
    }),

  setBrandSearch: (query) =>
    set({ brandSearch: query }),

  toggleAge: (age) =>
    set((state) => {
      const exists = state.selectedAges.includes(age);
      return {
        selectedAges: exists
          ? state.selectedAges.filter((a) => a !== age)
          : [...state.selectedAges, age],
      };
    }),

  toggleDietary: (dietary) =>
    set((state) => {
      const exists = state.selectedDietary.includes(dietary);
      return {
        selectedDietary: exists
          ? state.selectedDietary.filter((d) => d !== dietary)
          : [...state.selectedDietary, dietary],
      };
    }),

  setSortBy: (sort) =>
    set({ sortBy: sort }),

  clearAllFilters: () =>
    set({
      selectedCategories: [],
      priceRange: DEFAULT_PRICE_RANGE,
      pricePreset: null,
      selectedBrands: [],
      brandSearch: "",
      selectedAges: [],
      selectedDietary: [],
      sortBy: "relevance",
    }),

  removeFilter: (type, value) =>
    set((state) => {
      switch (type) {
        case "category":
          return {
            selectedCategories: state.selectedCategories.filter(
              (c) => c !== value,
            ),
          };
        case "brand":
          return {
            selectedBrands: state.selectedBrands.filter((b) => b !== value),
          };
        case "age":
          return {
            selectedAges: state.selectedAges.filter((a) => a !== value),
          };
        case "dietary":
          return {
            selectedDietary: state.selectedDietary.filter((d) => d !== value),
          };
        case "price":
          return {
            priceRange: DEFAULT_PRICE_RANGE,
            pricePreset: null,
          };
        default:
          return {};
      }
    }),

  setFilterPanelOpen: (open) =>
    set({ isFilterPanelOpen: open }),

  setInitialCategory: (category) =>
    set({
      selectedCategories: category === "all" ? [] : [category],
      priceRange: DEFAULT_PRICE_RANGE,
      pricePreset: null,
      selectedBrands: [],
      brandSearch: "",
      selectedAges: [],
      selectedDietary: [],
      sortBy: "relevance",
    }),

  getActiveFilterCount: () => {
    const state = get();
    let count = 0;
    if (state.selectedCategories.length > 0) count += state.selectedCategories.length;
    if (
      state.priceRange[0] !== DEFAULT_PRICE_RANGE[0] ||
      state.priceRange[1] !== DEFAULT_PRICE_RANGE[1]
    )
      count += 1;
    if (state.selectedBrands.length > 0) count += state.selectedBrands.length;
    if (state.selectedAges.length > 0) count += state.selectedAges.length;
    if (state.selectedDietary.length > 0) count += state.selectedDietary.length;
    return count;
  },
}));
