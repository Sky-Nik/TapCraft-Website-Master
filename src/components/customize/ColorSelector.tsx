"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/formatting";
import { MATERIALS } from "@/lib/constants/customization";
import type { CustomizationConfig } from "@/types/customization";

interface ColorSelectorProps {
  config: CustomizationConfig;
  onChange: (updates: Partial<CustomizationConfig>) => void;
}

const COLOR_PRESETS = [
  { id: "white", name: "White", hex: "#FFFFFF" },
  { id: "black", name: "Black", hex: "#1a1a1a" },
  { id: "tapcraft-blue", name: "TapCraft Blue", hex: "#1E73FF" },
  { id: "navy", name: "Navy", hex: "#1e3a5f" },
  { id: "red", name: "Red", hex: "#dc2626" },
  { id: "green", name: "Forest Green", hex: "#166534" },
  { id: "gold", name: "Gold", hex: "#ca8a04" },
  { id: "silver", name: "Silver", hex: "#9ca3af" },
  { id: "rose", name: "Rose", hex: "#e11d48" },
  { id: "sky", name: "Sky Blue", hex: "#0284c7" },
  { id: "coral", name: "Coral", hex: "#f97316" },
  { id: "teal", name: "Teal", hex: "#0d9488" },
  { id: "lavender", name: "Lavender", hex: "#a78bfa" },
  { id: "charcoal", name: "Charcoal", hex: "#374151" },
  { id: "cream", name: "Cream", hex: "#fef3c7" },
  { id: "mint", name: "Mint", hex: "#6ee7b7" },
] as const;

export default function ColorSelector({ config, onChange }: ColorSelectorProps) {
  const [customHex, setCustomHex] = useState("");

  const currentMaterial = MATERIALS.find((m) => m.id === config.material);
  const materialColors = currentMaterial?.colors ?? [];

  const handleSwatchClick = (hex: string) => {
    onChange({ color: hex });
  };

  const handleCustomHexSubmit = () => {
    const hex = customHex.startsWith("#") ? customHex : `#${customHex}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      onChange({ color: hex });
      setCustomHex("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Current color preview */}
      <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
        <div
          className="h-14 w-14 shrink-0 rounded-xl border-2 border-gray-200 shadow-inner"
          style={{ backgroundColor: config.color }}
        />
        <div>
          <p className="text-sm font-semibold text-gray-800">Selected Color</p>
          <p className="font-mono text-xs text-gray-500">{config.color}</p>
        </div>
      </div>

      {/* Material-specific colors */}
      {materialColors.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-700">
            Available for {currentMaterial?.name}
          </h3>
          <div className="flex flex-wrap gap-3">
            {materialColors.map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => handleSwatchClick(hex)}
                className={cn(
                  "h-10 w-10 rounded-xl border-2 transition-[border-color,transform,box-shadow] cursor-pointer",
                  "hover:scale-110 hover:shadow-md",
                  config.color.toLowerCase() === hex.toLowerCase()
                    ? "border-tapcraft-blue ring-2 ring-tapcraft-blue/30 scale-110"
                    : "border-gray-200"
                )}
                style={{ backgroundColor: hex }}
              >
                {config.color.toLowerCase() === hex.toLowerCase() && (
                  <div className="flex h-full items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={hex === "#ffffff" || hex === "#f5f5dc" || hex === "#deb887" ? "#374151" : "#FFFFFF"}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
                <span className="sr-only">{hex}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preset color swatches */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">All Preset Colors</h3>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
          {COLOR_PRESETS.map((swatch) => (
            <button
              key={swatch.id}
              type="button"
              onClick={() => handleSwatchClick(swatch.hex)}
              title={swatch.name}
              className={cn(
                "group relative aspect-square rounded-xl border-2 transition-[border-color,transform,box-shadow] cursor-pointer",
                "hover:scale-110 hover:shadow-md",
                config.color.toLowerCase() === swatch.hex.toLowerCase()
                  ? "border-tapcraft-blue ring-2 ring-tapcraft-blue/30 scale-110"
                  : "border-gray-200"
              )}
              style={{ backgroundColor: swatch.hex }}
            >
              {config.color.toLowerCase() === swatch.hex.toLowerCase() && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={swatch.hex === "#FFFFFF" || swatch.hex === "#fef3c7" || swatch.hex === "#6ee7b7" ? "#374151" : "#FFFFFF"}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
              <span className="sr-only">{swatch.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom hex input */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Custom Color</h3>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">#</span>
            <input
              type="text"
              value={customHex}
              onChange={(e) => setCustomHex(e.target.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6))}
              onKeyDown={(e) => e.key === "Enter" && handleCustomHexSubmit()}
              placeholder="1E73FF"
              maxLength={6}
              className={cn(
                "w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-7 pr-3",
                "font-mono text-sm text-gray-800 placeholder:text-gray-300",
                "focus:border-tapcraft-blue focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/20"
              )}
            />
          </div>
          <button
            type="button"
            onClick={handleCustomHexSubmit}
            disabled={!/^[0-9A-Fa-f]{6}$/.test(customHex)}
            className={cn(
              "rounded-lg bg-tapcraft-blue px-4 py-2.5 text-xs font-semibold text-white transition-[background-color,opacity] cursor-pointer",
              "hover:bg-tapcraft-blue/90 disabled:cursor-not-allowed disabled:opacity-40"
            )}
          >
            Apply
          </button>
          <input
            type="color"
            value={config.color}
            onChange={(e) => onChange({ color: e.target.value })}
            className="h-10 w-10 shrink-0 cursor-pointer rounded-lg border border-gray-200"
          />
        </div>
      </div>

      {/* Text color note */}
      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
        <div className="flex items-start gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" className="mt-0.5 shrink-0">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p className="text-xs text-gray-500">
            Text color can be configured separately in the Text customization tab.
          </p>
        </div>
      </div>
    </div>
  );
}
