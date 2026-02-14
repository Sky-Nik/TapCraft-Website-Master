"use client";

import { cn } from "@/lib/utils/formatting";
import { SHAPES } from "@/lib/constants/customization";
import type { CustomizationConfig, ShapeId } from "@/types/customization";

interface ShapeSelectorProps {
  config: CustomizationConfig;
  onChange: (updates: Partial<CustomizationConfig>) => void;
}

const SHAPE_ICONS: Record<string, React.ReactNode> = {
  "business-card": (
    <svg viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-7">
      <rect x="2" y="2" width="44" height="28" rx="3" />
      <line x1="10" y1="12" x2="28" y2="12" />
      <line x1="10" y1="18" x2="22" y2="18" />
    </svg>
  ),
  "round-tag": (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
      <circle cx="20" cy="20" r="17" />
      <circle cx="20" cy="10" r="2" fill="currentColor" />
    </svg>
  ),
  "square-tag": (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
      <rect x="4" y="4" width="32" height="32" rx="3" />
    </svg>
  ),
  "custom-rectangle": (
    <svg viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-7">
      <rect x="2" y="2" width="44" height="28" rx="2" strokeDasharray="4 2" />
    </svg>
  ),
  keychain: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
      <rect x="4" y="10" width="32" height="22" rx="4" />
      <circle cx="20" cy="7" r="4" />
    </svg>
  ),
  badge: (
    <svg viewBox="0 0 44 36" fill="none" stroke="currentColor" strokeWidth="2" className="w-9 h-7">
      <rect x="3" y="3" width="38" height="30" rx="6" />
      <circle cx="22" cy="18" r="6" />
    </svg>
  ),
};

export default function ShapeSelector({ config, onChange }: ShapeSelectorProps) {
  const handleShapeSelect = (shapeId: ShapeId) => {
    onChange({ shape: shapeId });
  };

  const selectedShape = SHAPES.find((s) => s.id === config.shape);

  return (
    <div className="space-y-6">
      {/* Shape grid */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Base Shape</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SHAPES.map((shape) => (
            <button
              key={shape.id}
              type="button"
              onClick={() => handleShapeSelect(shape.id)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-[border-color,background-color,color] cursor-pointer",
                "hover:border-tapcraft-blue/40 hover:bg-tapcraft-blue/5",
                config.shape === shape.id
                  ? "border-tapcraft-blue bg-tapcraft-blue/10 text-tapcraft-blue"
                  : "border-gray-200 bg-white text-gray-500"
              )}
            >
              <div className="text-current">
                {SHAPE_ICONS[shape.id]}
              </div>
              <span className="text-xs font-medium">{shape.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected shape details */}
      {selectedShape && (
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h4 className="text-sm font-semibold text-gray-800">{selectedShape.name}</h4>
          <p className="mt-1 text-xs text-gray-500">{selectedShape.description}</p>
          <div className="mt-3 flex gap-3">
            <div className="rounded-lg bg-gray-50 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Width</p>
              <p className="text-sm font-semibold text-tapcraft-blue">
                {selectedShape.defaultDimensions.width}mm
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Height</p>
              <p className="text-sm font-semibold text-tapcraft-blue">
                {selectedShape.defaultDimensions.height}mm
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Size Factor</p>
              <p className="text-sm font-semibold text-tapcraft-blue">
                {selectedShape.sizeModifier}x
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
