"use client";

import { useMemo } from "react";
import { useFilterStore } from "@/lib/filter-store";
import { PRICE_PRESETS } from "@/lib/filter-utils";
import { categories } from "@/lib/site-data";
import type { CategoryId } from "@/lib/site-data";
import { SortDropdown } from "@/components/filters/sort-dropdown";
import { SlidersHorizontal, X } from "lucide-react";

/* ─── Quick Category Chips ─── */
function QuickFilterChips() {
  const { selectedCategories, toggleCategory } = useFilterStore();
  const displayCategories = categories.filter((c) => c.id !== "all");

  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto py-1">
      {/* All chip */}
      <button
        type="button"
        onClick={() => {
          // Clear all category selections to show "all"
          if (selectedCategories.length > 0) {
            // Reset categories
            selectedCategories.forEach((cat) => toggleCategory(cat as CategoryId));
          }
        }}
        className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
          selectedCategories.length === 0
            ? "bg-forest text-white shadow-sm"
            : "border border-gray-200 bg-white text-gray-600 hover:border-leaf/30 hover:bg-forest-light"
        }`}
      >
        All
      </button>
      {displayCategories.map((cat) => {
        const Icon = cat.icon;
        const isActive = selectedCategories.includes(cat.id as CategoryId);
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => toggleCategory(cat.id as CategoryId)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
              isActive
                ? "bg-forest text-white shadow-sm"
                : "border border-gray-200 bg-white text-gray-600 hover:border-leaf/30 hover:bg-forest-light"
            }`}
          >
            <Icon className="h-3 w-3" />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Active Filter Pills ─── */
function ActiveFilterPills() {
  const {
    selectedCategories,
    priceRange,
    pricePreset,
    selectedBrands,
    selectedAges,
    selectedDietary,
    removeFilter,
    clearAllFilters,
  } = useFilterStore();

  const pills: { type: string; value: string; label: string }[] = useMemo(() => {
    const result: { type: string; value: string; label: string }[] = [];

    selectedCategories.forEach((cat) => {
      const catObj = categories.find((c) => c.id === cat);
      result.push({ type: "category", value: cat, label: catObj?.label ?? cat });
    });

    if (pricePreset) {
      const preset = PRICE_PRESETS.find((p) => p.id === pricePreset);
      if (preset) result.push({ type: "price", value: pricePreset, label: preset.label });
    } else if (priceRange[0] > 0 || priceRange[1] < 100000) {
      result.push({
        type: "price",
        value: "custom",
        label: `₹${priceRange[0].toLocaleString("en-IN")} – ₹${priceRange[1].toLocaleString("en-IN")}`,
      });
    }

    selectedBrands.forEach((brand) => {
      result.push({ type: "brand", value: brand, label: brand });
    });

    selectedAges.forEach((age) => {
      result.push({ type: "age", value: age, label: age });
    });

    selectedDietary.forEach((d) => {
      result.push({ type: "dietary", value: d, label: d });
    });

    return result;
  }, [selectedCategories, priceRange, pricePreset, selectedBrands, selectedAges, selectedDietary]);

  if (pills.length === 0) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
      {pills.map((pill) => (
        <button
          key={`${pill.type}-${pill.value}`}
          type="button"
          onClick={() => removeFilter(pill.type, pill.value)}
          className="animate-chip-enter flex shrink-0 items-center gap-1 rounded-full bg-forest-light px-2.5 py-1 text-[11px] font-medium text-forest transition-all hover:bg-red-50 hover:text-red-600 group"
        >
          <span className="max-w-[120px] truncate">{pill.label}</span>
          <X className="h-3 w-3 text-forest/50 group-hover:text-red-500 transition-colors" />
        </button>
      ))}
      <button
        type="button"
        onClick={clearAllFilters}
        className="shrink-0 text-[11px] font-semibold text-leaf hover:text-red-500 transition-colors whitespace-nowrap"
      >
        Clear All
      </button>
    </div>
  );
}

/* ─── Main Filter Bar ─── */
export function FilterBar({ resultCount }: { resultCount: number }) {
  const { sortBy, setSortBy, setFilterPanelOpen, getActiveFilterCount } = useFilterStore();
  const activeCount = getActiveFilterCount();

  return (
    <div className="sticky top-0 z-30 -mx-4 bg-white/95 backdrop-blur-md px-4 transition-shadow lg:static lg:mx-0 lg:bg-transparent lg:backdrop-blur-none lg:px-0">
      <div className="flex flex-col gap-2 py-3 lg:py-0 lg:gap-3">
        {/* Row 1: Sort + Filter button (mobile) | Sort + result count (desktop) */}
        <div className="flex items-center justify-between gap-3">
          {/* Sort dropdown */}
          <SortDropdown value={sortBy} onChange={setSortBy} />

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            {/* Result count (desktop) */}
            <span className="hidden lg:inline-block text-xs text-gray-500">
              <span className="font-semibold text-gray-700 animate-count-pop" key={resultCount}>
                {resultCount.toLocaleString("en-IN")}
              </span>{" "}
              {resultCount === 1 ? "product" : "products"}
            </span>

            {/* Filter button (mobile only) */}
            <button
              type="button"
              onClick={() => setFilterPanelOpen(true)}
              className="lg:hidden flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-sm transition-all hover:border-leaf/30 hover:shadow-md active:scale-[0.97]"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
              {activeCount > 0 && (
                <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-leaf px-1 text-[10px] font-bold text-white">
                  {activeCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Quick category chips (mobile) */}
        <div className="lg:hidden">
          <QuickFilterChips />
        </div>

        {/* Row 3: Active filter pills */}
        <ActiveFilterPills />

        {/* Result count (mobile) */}
        <div className="lg:hidden flex items-center">
          <span className="text-xs text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700" key={resultCount}>
              {resultCount.toLocaleString("en-IN")}
            </span>{" "}
            {resultCount === 1 ? "product" : "products"}
          </span>
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-px bg-gray-100 lg:hidden" />
    </div>
  );
}
