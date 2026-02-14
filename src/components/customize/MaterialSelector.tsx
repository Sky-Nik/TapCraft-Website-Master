"use client";

import { cn } from "@/lib/utils/formatting";
import { MATERIALS, FINISHES } from "@/lib/constants/customization";
import type { CustomizationConfig, MaterialId, FinishId } from "@/types/customization";

interface MaterialSelectorProps {
  config: CustomizationConfig;
  onChange: (updates: Partial<CustomizationConfig>) => void;
}

const DURABILITY_LABELS: Record<string, { label: string; color: string }> = {
  standard: { label: "Standard", color: "bg-blue-100 text-blue-700" },
  high: { label: "High", color: "bg-green-100 text-green-700" },
  premium: { label: "Premium", color: "bg-amber-100 text-amber-700" },
};

const MATERIAL_ICONS: Record<string, React.ReactNode> = {
  pla: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="4" y="4" width="24" height="24" rx="4" />
      <path d="M10 16h12M16 10v12" />
    </svg>
  ),
  petg: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <circle cx="16" cy="16" r="12" />
      <path d="M10 16c0-6 12-6 12 0s-12 6-12 0" />
    </svg>
  ),
  resin: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M16 4l10 6v12l-10 6L6 22V10z" />
    </svg>
  ),
  "wood-filled-pla": (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="6" y="6" width="20" height="20" rx="2" />
      <path d="M6 12h20M6 18h20M6 24h20" />
    </svg>
  ),
  "carbon-fiber-pla": (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="4" y="4" width="24" height="24" rx="3" />
      <path d="M4 4l24 24M28 4L4 28" />
      <path d="M16 4v24M4 16h24" />
    </svg>
  ),
};

export default function MaterialSelector({ config, onChange }: MaterialSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Material cards */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Material</h3>
        <div className="space-y-3">
          {MATERIALS.map((mat) => {
            const isActive = config.material === mat.id;
            const durability = DURABILITY_LABELS[mat.durability];
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => onChange({ material: mat.id as MaterialId })}
                className={cn(
                  "w-full rounded-xl border-2 p-4 text-left transition-[border-color,background-color,box-shadow] cursor-pointer",
                  "hover:border-tapcraft-blue/40 hover:shadow-sm",
                  isActive
                    ? "border-tapcraft-blue bg-tapcraft-blue/5 shadow-sm"
                    : "border-gray-200 bg-white"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "shrink-0 rounded-lg p-2",
                      isActive ? "bg-tapcraft-blue/10 text-tapcraft-blue" : "bg-gray-100 text-gray-400"
                    )}
                  >
                    {MATERIAL_ICONS[mat.id]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={cn(
                          "text-sm font-semibold",
                          isActive ? "text-tapcraft-blue" : "text-gray-800"
                        )}
                      >
                        {mat.name}
                      </h4>
                      <span
                        className={cn(
                          "text-xs font-semibold",
                          mat.priceModifier > 1.0 ? "text-amber-600" : "text-green-600"
                        )}
                      >
                        {mat.priceModifier > 1.0 ? `${mat.priceModifier}x price` : "Base price"}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">{mat.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {durability && (
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-medium",
                            durability.color
                          )}
                        >
                          {durability.label} durability
                        </span>
                      )}
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium",
                          isActive
                            ? "bg-tapcraft-blue/10 text-tapcraft-blue"
                            : "bg-gray-100 text-gray-500"
                        )}
                      >
                        {mat.colors.length} color{mat.colors.length !== 1 ? "s" : ""} available
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Finish options */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Surface Finish</h3>
        <div className="grid grid-cols-2 gap-2">
          {FINISHES.map((finish) => {
            const isActive = config.finish === finish.id;
            return (
              <button
                key={finish.id}
                type="button"
                onClick={() => onChange({ finish: finish.id as FinishId })}
                className={cn(
                  "rounded-xl border-2 px-3 py-3 text-left transition-[border-color,background-color,color] cursor-pointer",
                  "hover:border-tapcraft-blue/40",
                  isActive
                    ? "border-tapcraft-blue bg-tapcraft-blue text-white"
                    : "border-gray-200 bg-white text-gray-700"
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold">{finish.name}</p>
                  {finish.priceModifier > 1.0 && (
                    <span
                      className={cn(
                        "text-[10px] font-semibold",
                        isActive ? "text-white/80" : "text-amber-600"
                      )}
                    >
                      {finish.priceModifier}x
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    "mt-0.5 text-[10px]",
                    isActive ? "text-white/80" : "text-gray-400"
                  )}
                >
                  {finish.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
