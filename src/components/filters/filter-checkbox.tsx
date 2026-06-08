"use client";

import type { ReactNode } from "react";

type FilterCheckboxProps = {
  label: string;
  checked: boolean;
  count?: number;
  onChange: () => void;
  icon?: ReactNode;
};

export function FilterCheckbox({
  label,
  checked,
  count,
  onChange,
  icon,
}: FilterCheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className="group/cb flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-all duration-200 hover:bg-forest-light/60 active:scale-[0.98] min-h-[44px]"
    >
      {/* Custom checkbox box */}
      <span
        className={`relative flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
          checked
            ? "border-forest bg-forest"
            : "border-gray-300 bg-white group-hover/cb:border-gray-400"
        }`}
      >
        {/* Animated checkmark */}
        <svg
          viewBox="0 0 12 12"
          fill="none"
          className={`h-3 w-3 transition-all duration-200 ${
            checked
              ? "scale-100 opacity-100"
              : "scale-50 opacity-0"
          }`}
        >
          <path
            d="M2 6.5L4.5 9L10 3"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Optional leading icon */}
      {icon && (
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center transition-colors duration-200 ${
            checked ? "text-forest" : "text-gray-400"
          }`}
        >
          {icon}
        </span>
      )}

      {/* Label + count */}
      <span className="flex flex-1 items-center gap-2 overflow-hidden">
        <span
          className={`truncate text-sm transition-colors duration-200 ${
            checked ? "font-semibold text-forest" : "font-medium text-gray-700"
          }`}
        >
          {label}
        </span>
        {count !== undefined && (
          <span
            className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none transition-all duration-200 ${
              checked
                ? "bg-forest/10 text-forest"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {count}
          </span>
        )}
      </span>
    </button>
  );
}
