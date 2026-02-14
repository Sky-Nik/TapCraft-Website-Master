"use client";

import { cn } from "@/lib/utils/formatting";
import { NFC_CHIPS, SHAPES } from "@/lib/constants/customization";
import type { CustomizationConfig, NFCChipId } from "@/types/customization";

interface NFCPlacementControlProps {
  config: CustomizationConfig;
  onChange: (updates: Partial<CustomizationConfig>) => void;
}

export default function NFCPlacementControl({ config, onChange }: NFCPlacementControlProps) {
  const selectedShape = SHAPES.find((s) => s.id === config.shape);
  const width = selectedShape?.defaultDimensions.width ?? 86;
  const height = selectedShape?.defaultDimensions.height ?? 54;

  return (
    <div className="space-y-6">
      {/* NFC Chip selection */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">NFC Chip</h3>
        <div className="space-y-3">
          {NFC_CHIPS.map((chip) => {
            const isActive = config.nfcChip === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => onChange({ nfcChip: chip.id as NFCChipId })}
                className={cn(
                  "w-full rounded-xl border-2 p-4 text-left transition-[border-color,background-color,box-shadow] cursor-pointer",
                  "hover:border-tapcraft-blue/40 hover:shadow-sm",
                  isActive
                    ? "border-tapcraft-blue bg-tapcraft-blue/5 shadow-sm"
                    : "border-gray-200 bg-white"
                )}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4
                        className={cn(
                          "text-sm font-semibold",
                          isActive ? "text-tapcraft-blue" : "text-gray-800"
                        )}
                      >
                        {chip.name}
                      </h4>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          isActive
                            ? "bg-tapcraft-blue/15 text-tapcraft-blue"
                            : "bg-gray-100 text-gray-500"
                        )}
                      >
                        {chip.memoryBytes} bytes
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{chip.description}</p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 text-xs font-semibold",
                      "text-gray-700"
                    )}
                  >
                    ${chip.price.toFixed(2)}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    </svg>
                    <span className="text-[10px] text-gray-400">
                      URL capacity: {chip.urlCapacity} chars
                    </span>
                  </div>
                </div>

                {/* Radio indicator */}
                <div className="mt-3 flex items-center gap-2">
                  <div
                    className={cn(
                      "h-4 w-4 rounded-full border-2 transition-[border-color]",
                      isActive ? "border-tapcraft-blue" : "border-gray-300"
                    )}
                  >
                    {isActive && (
                      <div className="m-0.5 h-2 w-2 rounded-full bg-tapcraft-blue" />
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400">
                    {isActive ? "Selected" : "Click to select"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual placement indicator */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Chip Placement</h3>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mx-auto max-w-[260px]">
            <div
              className={cn(
                "relative mx-auto border-2 border-dashed border-gray-300 bg-gray-50",
                config.shape === "round-tag" ? "rounded-full" : "rounded-lg"
              )}
              style={{
                width: "100%",
                aspectRatio: `${width} / ${height}`,
                maxHeight: "180px",
              }}
            >
              {/* NFC chip indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full border-2 border-tapcraft-blue/40 bg-tapcraft-blue/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1E73FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 8.32a7.43 7.43 0 0 1 0 7.36" />
                        <path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58" />
                        <path d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8" />
                        <path d="M16.37 2a20.16 20.16 0 0 1 0 20" />
                      </svg>
                    </div>
                    {/* Pulse animation */}
                    <div className="absolute inset-0 animate-ping rounded-full border-2 border-tapcraft-blue/20" />
                  </div>
                  <span className="text-[10px] font-medium text-tapcraft-blue">
                    {NFC_CHIPS.find((c) => c.id === config.nfcChip)?.name}
                  </span>
                </div>
              </div>

              {/* Dimension labels */}
              <div className="absolute -bottom-6 left-0 right-0 text-center">
                <span className="text-[10px] text-gray-400">{width}mm</span>
              </div>
              <div className="absolute -right-8 top-0 bottom-0 flex items-center">
                <span className="text-[10px] text-gray-400 -rotate-90">{height}mm</span>
              </div>
            </div>
          </div>
          <p className="mt-8 text-center text-[11px] text-gray-400">
            NFC chip is centered within the tag for optimal read range
          </p>
        </div>
      </div>
    </div>
  );
}
