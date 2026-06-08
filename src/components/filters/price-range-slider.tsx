"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { PRICE_PRESETS } from "@/lib/filter-utils";

type PriceRangeSliderProps = {
  min: number;
  max: number;
  value: [number, number];
  onChange: (range: [number, number]) => void;
  activePreset: string | null;
  onPresetChange: (presetId: string | null) => void;
};

function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
  activePreset,
  onPresetChange,
}: PriceRangeSliderProps) {
  const [localMin, setLocalMin] = useState(String(value[0]));
  const [localMax, setLocalMax] = useState(String(value[1]));
  const trackRef = useRef<HTMLDivElement>(null);

  // Keep local text inputs in sync with value prop
  useEffect(() => {
    setLocalMin(String(value[0]));
    setLocalMax(String(value[1]));
  }, [value]);

  const pctLeft = ((value[0] - min) / (max - min)) * 100;
  const pctRight = ((value[1] - min) / (max - min)) * 100;

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = Math.min(Number(e.target.value), value[1]);
      onChange([newMin, value[1]]);
      onPresetChange(null);
    },
    [onChange, onPresetChange, value],
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = Math.max(Number(e.target.value), value[0]);
      onChange([value[0], newMax]);
      onPresetChange(null);
    },
    [onChange, onPresetChange, value],
  );

  const handlePresetClick = useCallback(
    (preset: (typeof PRICE_PRESETS)[number]) => {
      if (activePreset === preset.id) {
        // Deselect preset, reset to full range
        onPresetChange(null);
        onChange([min, max]);
      } else {
        onPresetChange(preset.id);
        onChange([preset.min, preset.max]);
      }
    },
    [activePreset, onChange, onPresetChange, min, max],
  );

  const commitMinInput = useCallback(() => {
    const parsed = parseInt(localMin, 10);
    if (isNaN(parsed)) {
      setLocalMin(String(value[0]));
      return;
    }
    const clamped = Math.max(min, Math.min(parsed, value[1]));
    onChange([clamped, value[1]]);
    setLocalMin(String(clamped));
    onPresetChange(null);
  }, [localMin, min, value, onChange, onPresetChange]);

  const commitMaxInput = useCallback(() => {
    const parsed = parseInt(localMax, 10);
    if (isNaN(parsed)) {
      setLocalMax(String(value[1]));
      return;
    }
    const clamped = Math.min(max, Math.max(parsed, value[0]));
    onChange([value[0], clamped]);
    setLocalMax(String(clamped));
    onPresetChange(null);
  }, [localMax, max, value, onChange, onPresetChange]);

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent, commit: () => void) => {
      if (e.key === "Enter") commit();
    },
    [],
  );

  return (
    <div className="space-y-4">
      {/* Preset chips */}
      <div className="flex flex-wrap gap-2">
        {PRICE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => handlePresetClick(preset)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              activePreset === preset.id
                ? "bg-forest text-white shadow-sm"
                : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Dual range slider */}
      <div className="px-1 pt-2 pb-1">
        <div ref={trackRef} className="relative h-2 w-full">
          {/* Background track */}
          <div className="absolute inset-0 rounded-full bg-gray-200" />

          {/* Active / filled track */}
          <div
            className="absolute top-0 h-full rounded-full bg-leaf transition-all duration-75"
            style={{
              left: `${pctLeft}%`,
              right: `${100 - pctRight}%`,
            }}
          />

          {/* Min thumb input */}
          <input
            type="range"
            min={min}
            max={max}
            step={100}
            value={value[0]}
            onChange={handleMinChange}
            className="range-thumb pointer-events-none absolute inset-0 z-20 h-full w-full cursor-pointer appearance-none bg-transparent"
            style={{ zIndex: value[0] > max - 100 ? 30 : 20 }}
            aria-label="Minimum price"
          />

          {/* Max thumb input */}
          <input
            type="range"
            min={min}
            max={max}
            step={100}
            value={value[1]}
            onChange={handleMaxChange}
            className="range-thumb pointer-events-none absolute inset-0 z-20 h-full w-full cursor-pointer appearance-none bg-transparent"
            aria-label="Maximum price"
          />
        </div>

        {/* Price labels under slider */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">{formatPrice(min)}</span>
          <span className="text-xs text-gray-400">{formatPrice(max)}</span>
        </div>
      </div>

      {/* Manual input fields */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            ₹
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            onBlur={commitMinInput}
            onKeyDown={(e) => handleInputKeyDown(e, commitMinInput)}
            className="w-full rounded-lg border border-gray-200 py-2 pl-7 pr-3 text-sm text-gray-700 outline-none transition-colors focus:border-leaf focus:ring-1 focus:ring-leaf/30"
            aria-label="Minimum price input"
          />
        </div>
        <span className="text-xs font-medium text-gray-300">—</span>
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            ₹
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            onBlur={commitMaxInput}
            onKeyDown={(e) => handleInputKeyDown(e, commitMaxInput)}
            className="w-full rounded-lg border border-gray-200 py-2 pl-7 pr-3 text-sm text-gray-700 outline-none transition-colors focus:border-leaf focus:ring-1 focus:ring-leaf/30"
            aria-label="Maximum price input"
          />
        </div>
      </div>

      {/* Slider thumb styles — injected via a <style> tag for custom range styling */}
      <style jsx>{`
        .range-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          pointer-events: all;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #008a3d;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .range-thumb::-webkit-slider-thumb:hover {
          box-shadow: 0 2px 8px rgba(0, 138, 61, 0.35);
          transform: scale(1.15);
        }
        .range-thumb::-webkit-slider-thumb:active {
          transform: scale(1.05);
        }
        .range-thumb::-moz-range-thumb {
          pointer-events: all;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #008a3d;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
          cursor: pointer;
        }
        .range-thumb::-moz-range-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
