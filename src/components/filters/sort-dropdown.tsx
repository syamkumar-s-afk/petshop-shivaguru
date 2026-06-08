"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpDown, Check, ChevronDown } from "lucide-react";
import { SORT_OPTIONS, type SortOption } from "@/lib/filter-utils";

type SortDropdownProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
  compact?: boolean;
};

export function SortDropdown({ value, onChange, compact }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLabel =
    SORT_OPTIONS.find((o) => o.value === value)?.label ?? "Sort";

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow ${
          compact ? "px-2.5 py-2 text-xs" : "px-3.5 py-2.5 text-sm"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <ArrowUpDown className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        <span className={compact ? "max-w-[80px] truncate" : ""}>
          {compact ? activeLabel.split(":").pop()?.trim() ?? activeLabel : activeLabel}
        </span>
        <ChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          } ${compact ? "h-3 w-3" : "h-3.5 w-3.5"}`}
        />
      </button>

      {/* Dropdown menu */}
      <div
        className={`absolute right-0 z-50 mt-2 w-52 origin-top-right rounded-xl border border-gray-100 bg-white py-1.5 shadow-lg transition-all duration-200 ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
        role="listbox"
        aria-label="Sort options"
      >
        {SORT_OPTIONS.map((option) => {
          const isActive = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={isActive}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm transition-colors duration-150 ${
                isActive
                  ? "bg-forest-light/50 font-semibold text-forest"
                  : "font-medium text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center transition-all duration-200 ${
                  isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              >
                <Check className="h-3.5 w-3.5 text-forest" strokeWidth={3} />
              </span>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
