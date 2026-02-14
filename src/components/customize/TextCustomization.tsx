"use client";

import { cn } from "@/lib/utils/formatting";
import { FONTS, TEXT_EFFECTS } from "@/lib/constants/customization";
import type { CustomizationConfig, TextEffectId } from "@/types/customization";

interface TextCustomizationProps {
  config: CustomizationConfig;
  onChange: (updates: Partial<CustomizationConfig>) => void;
}

export default function TextCustomization({ config, onChange }: TextCustomizationProps) {
  const updateText = (updates: Partial<CustomizationConfig["text"]>) => {
    onChange({ text: { ...config.text, ...updates } });
  };

  return (
    <div className="space-y-6">
      {/* Text content input */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Text Content</h3>
        <div>
          <label className="mb-1 block text-xs text-gray-500">
            Your text (use line breaks for multiple lines)
          </label>
          <textarea
            value={config.text.content}
            onChange={(e) => updateText({ content: e.target.value })}
            placeholder={"Your Name / Company\nTitle or tagline\nWebsite or phone"}
            rows={3}
            className={cn(
              "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800",
              "placeholder:text-gray-300 resize-y",
              "focus:border-tapcraft-blue focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/20"
            )}
          />
        </div>
      </div>

      {/* Font selector */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Font</h3>
        <select
          value={config.text.font}
          onChange={(e) => updateText({ font: e.target.value })}
          className={cn(
            "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800",
            "focus:border-tapcraft-blue focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/20",
            "cursor-pointer"
          )}
        >
          {FONTS.map((font) => (
            <option key={font.id} value={font.id}>
              {font.name} ({font.category})
            </option>
          ))}
        </select>
      </div>

      {/* Text size */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">Text Size</h3>
          <span className="text-xs font-mono font-semibold text-tapcraft-blue">{config.text.size}pt</span>
        </div>
        <input
          type="range"
          min={8}
          max={24}
          value={config.text.size}
          onChange={(e) => updateText({ size: Number(e.target.value) })}
          className="w-full accent-tapcraft-blue"
        />
        <div className="mt-0.5 flex justify-between text-[10px] text-gray-400">
          <span>8pt</span>
          <span>24pt</span>
        </div>
      </div>

      {/* Text color */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Text Color</h3>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={config.text.color}
            onChange={(e) => updateText({ color: e.target.value })}
            className="h-10 w-10 shrink-0 cursor-pointer rounded-lg border border-gray-200"
          />
          <span className="font-mono text-xs text-gray-500">{config.text.color}</span>
        </div>
      </div>

      {/* Text effects */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Text Effect</h3>
        <div className="grid grid-cols-2 gap-2">
          {TEXT_EFFECTS.map((effect) => {
            const isActive = config.text.effect === effect.id;
            return (
              <button
                key={effect.id}
                type="button"
                onClick={() => updateText({ effect: effect.id as TextEffectId })}
                className={cn(
                  "rounded-xl border-2 p-3 text-left transition-[border-color,background-color,color] cursor-pointer",
                  "hover:border-tapcraft-blue/40",
                  isActive
                    ? "border-tapcraft-blue bg-tapcraft-blue/5"
                    : "border-gray-200 bg-white"
                )}
              >
                <div className="flex items-center justify-between">
                  <p
                    className={cn(
                      "text-xs font-semibold",
                      isActive ? "text-tapcraft-blue" : "text-gray-700"
                    )}
                  >
                    {effect.name}
                  </p>
                  {effect.priceModifier > 0 && (
                    <span className="text-[10px] font-semibold text-amber-600">
                      +${effect.priceModifier.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[10px] text-gray-400">{effect.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live preview */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Preview</h3>
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
          {config.text.content.trim() ? (
            <p
              style={{
                fontSize: `${config.text.size}px`,
                fontFamily:
                  FONTS.find((f) => f.id === config.text.font)?.family ?? "sans-serif",
                color: config.text.color,
                whiteSpace: "pre-line",
              }}
            >
              {config.text.content}
            </p>
          ) : (
            <p className="text-sm italic text-gray-300">Enter text above to preview</p>
          )}
        </div>
      </div>
    </div>
  );
}
