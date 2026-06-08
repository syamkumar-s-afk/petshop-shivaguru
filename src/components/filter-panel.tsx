"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useFilterStore } from "@/lib/filter-store";
import {
  applyFilters,
  getFilteredCounts,
  getAvailableBrands,
  getAvailableAges,
  getAvailableDietary,
  getContextualFilters,
  PRICE_PRESETS,
} from "@/lib/filter-utils";
import { products, categories } from "@/lib/site-data";
import type { CategoryId } from "@/lib/site-data";
import { FilterCheckbox } from "@/components/filters/filter-checkbox";
import { PriceRangeSlider } from "@/components/filters/price-range-slider";
import { ChevronDown, ChevronUp, X, Search, RotateCcw, SlidersHorizontal } from "lucide-react";

/* ─── Accordion Section ─── */
function FilterSection({
  title,
  icon,
  defaultOpen = true,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-gray-50/60"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          {icon}
          {title}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>
      <div className="filter-accordion-content" data-open={open}>
        <div className="filter-accordion-inner">
          <div className="px-5 pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Filter Panel Content (shared between mobile & desktop) ─── */
function FilterPanelContent() {
  const {
    selectedCategories,
    priceRange,
    pricePreset,
    selectedBrands,
    brandSearch,
    selectedAges,
    selectedDietary,
    toggleCategory,
    setPriceRange,
    setPricePreset,
    toggleBrand,
    setBrandSearch,
    toggleAge,
    toggleDietary,
  } = useFilterStore();

  const filterState = useMemo(
    () => ({
      selectedCategories,
      priceRange,
      selectedBrands,
      selectedAges,
      selectedDietary,
    }),
    [selectedCategories, priceRange, selectedBrands, selectedAges, selectedDietary]
  );

  const counts = useMemo(() => getFilteredCounts(products, filterState), [filterState]);
  const availableBrands = useMemo(() => getAvailableBrands(products), []);
  const availableAges = useMemo(() => getAvailableAges(products), []);
  const availableDietary = useMemo(() => getAvailableDietary(products), []);
  const contextual = useMemo(() => getContextualFilters(selectedCategories), [selectedCategories]);

  const [showAllBrands, setShowAllBrands] = useState(false);

  const filteredBrands = useMemo(() => {
    let brands = availableBrands;
    if (brandSearch) {
      brands = brands.filter((b) =>
        b.value.toLowerCase().includes(brandSearch.toLowerCase())
      );
    }
    if (!showAllBrands && !brandSearch) {
      return brands.slice(0, 6);
    }
    return brands;
  }, [availableBrands, brandSearch, showAllBrands]);

  const displayCategories = categories.filter((c) => c.id !== "all");

  return (
    <div className="flex flex-col">
      {/* Category Filter */}
      <FilterSection
        title="Category"
        icon={<span className="text-base">📂</span>}
        defaultOpen={true}
      >
        <div className="flex flex-col gap-1">
          {displayCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <FilterCheckbox
                key={cat.id}
                label={cat.label}
                checked={selectedCategories.includes(cat.id as CategoryId)}
                count={counts.categories.get(cat.id) ?? 0}
                onChange={() => toggleCategory(cat.id as CategoryId)}
                icon={<Icon className="h-3.5 w-3.5 text-gray-500" />}
              />
            );
          })}
        </div>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection
        title="Price Range"
        icon={<span className="text-base">💰</span>}
        defaultOpen={true}
      >
        <PriceRangeSlider
          min={0}
          max={100000}
          value={priceRange}
          onChange={setPriceRange}
          activePreset={pricePreset}
          onPresetChange={setPricePreset}
        />
      </FilterSection>

      {/* Brand Filter */}
      <FilterSection
        title="Brand"
        icon={<span className="text-base">🏷️</span>}
        defaultOpen={true}
      >
        {availableBrands.length > 6 && (
          <div className="relative mb-2">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search brands..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-xs text-gray-700 outline-none transition-colors placeholder:text-gray-400 focus:border-leaf focus:bg-white focus:ring-1 focus:ring-leaf/20"
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          {filteredBrands.map((brand) => (
            <FilterCheckbox
              key={brand.value}
              label={brand.value}
              checked={selectedBrands.includes(brand.value)}
              count={counts.brands.get(brand.value) ?? 0}
              onChange={() => toggleBrand(brand.value)}
            />
          ))}
        </div>
        {!brandSearch && availableBrands.length > 6 && (
          <button
            type="button"
            onClick={() => setShowAllBrands((v) => !v)}
            className="mt-2 text-xs font-medium text-leaf hover:text-leaf-hover transition-colors"
          >
            {showAllBrands
              ? "Show less"
              : `+${availableBrands.length - 6} more`}
          </button>
        )}
      </FilterSection>

      {/* Age / Life Stage Filter */}
      <FilterSection
        title="Age / Life Stage"
        icon={<span className="text-base">🐾</span>}
        defaultOpen={selectedAges.length > 0}
      >
        <div className="flex flex-col gap-1">
          {availableAges.map((age) => (
            <FilterCheckbox
              key={age.value}
              label={age.value}
              checked={selectedAges.includes(age.value)}
              count={counts.ages.get(age.value) ?? 0}
              onChange={() => toggleAge(age.value)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Dietary Requirements Filter (context-adaptive) */}
      {contextual.includes("dietary") && availableDietary.length > 0 && (
        <FilterSection
          title="Dietary Requirements"
          icon={<span className="text-base">🥗</span>}
          defaultOpen={selectedDietary.length > 0}
        >
          <div className="flex flex-col gap-1">
            {availableDietary.map((item) => (
              <FilterCheckbox
                key={item.value}
                label={item.value}
                checked={selectedDietary.includes(item.value)}
                count={counts.dietary.get(item.value) ?? 0}
                onChange={() => toggleDietary(item.value)}
              />
            ))}
          </div>
        </FilterSection>
      )}
    </div>
  );
}

/* ─── Mobile Bottom Sheet ─── */
function MobileFilterSheet({
  onClose,
  resultCount,
}: {
  onClose: () => void;
  resultCount: number;
}) {
  const { clearAllFilters, getActiveFilterCount } = useFilterStore();
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => onClose(), 300);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const activeCount = getActiveFilterCount();

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] ${closing ? "animate-backdrop-out" : "animate-backdrop-in"}`}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`absolute inset-x-0 bottom-0 flex max-h-[92vh] flex-col rounded-t-2xl bg-white shadow-2xl ${closing ? "animate-filter-slide-down" : "animate-filter-slide-up"}`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="h-1 w-10 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 pb-3 pt-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
            >
              <X className="h-4.5 w-4.5 text-gray-600" />
            </button>
            <h2 className="text-base font-bold text-gray-900">Filters</h2>
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-leaf px-1.5 text-[10px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </div>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-xs font-medium text-leaf hover:text-leaf-hover transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              Clear All
            </button>
          )}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto filter-scrollbar">
          <FilterPanelContent />
        </div>

        {/* Sticky bottom CTA */}
        <div className="border-t border-gray-100 bg-white px-5 py-3 safe-area-bottom">
          <div className="flex items-center gap-3">
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-xl bg-forest px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-forest/90 active:scale-[0.98]"
            >
              Show {resultCount.toLocaleString("en-IN")} {resultCount === 1 ? "Item" : "Items"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Desktop Sidebar ─── */
function DesktopFilterSidebar() {
  const { clearAllFilters, getActiveFilterCount } = useFilterStore();
  const activeCount = getActiveFilterCount();

  return (
    <aside className="hidden lg:block w-72 xl:w-80 shrink-0">
      <div className="sticky top-4 rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-forest" />
            <h2 className="text-sm font-bold text-gray-900">Filters</h2>
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-leaf px-1.5 text-[10px] font-bold text-white animate-count-pop">
                {activeCount}
              </span>
            )}
          </div>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-xs font-medium text-leaf hover:text-leaf-hover transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              Clear All
            </button>
          )}
        </div>

        {/* Scrollable content */}
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto filter-scrollbar">
          <FilterPanelContent />
        </div>
      </div>
    </aside>
  );
}

/* ─── Main Export ─── */
export function FilterPanel({ resultCount }: { resultCount: number }) {
  const { isFilterPanelOpen, setFilterPanelOpen } = useFilterStore();

  return (
    <>
      {/* Desktop: always visible sidebar */}
      <DesktopFilterSidebar />

      {/* Mobile: bottom sheet */}
      {isFilterPanelOpen && (
        <MobileFilterSheet
          onClose={() => setFilterPanelOpen(false)}
          resultCount={resultCount}
        />
      )}
    </>
  );
}
