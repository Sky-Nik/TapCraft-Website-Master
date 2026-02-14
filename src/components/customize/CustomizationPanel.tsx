"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils/formatting";
import type { CustomizationConfig } from "@/types/customization";
import ShapeSelector from "./ShapeSelector";
import ColorSelector from "./ColorSelector";
import MaterialSelector from "./MaterialSelector";
import NFCPlacementControl from "./NFCPlacementControl";
import TextCustomization from "./TextCustomization";

interface CustomizationPanelProps {
  config: CustomizationConfig;
  onChange: (updates: Partial<CustomizationConfig>) => void;
}

const TABS = [
  {
    id: "shape",
    label: "Shape",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    ),
  },
  {
    id: "color",
    label: "Color",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="10.5" r="2.5" />
        <circle cx="8.5" cy="7.5" r="2.5" />
        <circle cx="6.5" cy="12.5" r="2.5" />
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5C4.5 19.5 7 22 12 22" />
      </svg>
    ),
  },
  {
    id: "material",
    label: "Material",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: "nfc",
    label: "NFC",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8.32a7.43 7.43 0 0 1 0 7.36" />
        <path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58" />
        <path d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8" />
        <path d="M16.37 2a20.16 20.16 0 0 1 0 20" />
      </svg>
    ),
  },
  {
    id: "text",
    label: "Text",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
  },
  {
    id: "upload",
    label: "Upload",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
] as const;

function UploadTab({
  config,
  onChange,
}: {
  config: CustomizationConfig;
  onChange: (updates: Partial<CustomizationConfig>) => void;
}) {
  const hasDesign = config.designUpload?.file != null;

  const toggleDesign = () => {
    if (hasDesign) {
      onChange({ designUpload: null });
    } else {
      onChange({
        designUpload: {
          file: new File(["placeholder"], "design.svg", { type: "image/svg+xml" }),
          previewUrl: null,
          position: { x: 0, y: 0 },
          scale: 1,
          rotation: 0,
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Upload Custom Design</h3>
        <div
          className={cn(
            "flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors",
            hasDesign
              ? "border-tapcraft-blue bg-tapcraft-blue/5"
              : "border-gray-300 bg-gray-50 hover:border-gray-400"
          )}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke={hasDesign ? "#1E73FF" : "#9ca3af"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <p className="mt-3 text-sm font-medium text-gray-600">
            {hasDesign ? "Custom design enabled" : "Drag & drop your design here"}
          </p>
          <p className="mt-1 text-xs text-gray-400">SVG, PNG, or AI files up to 10MB</p>
          <button
            type="button"
            onClick={toggleDesign}
            className={cn(
              "mt-4 rounded-lg px-4 py-2 text-xs font-semibold transition-[background-color,border-color,color] cursor-pointer",
              hasDesign
                ? "bg-tapcraft-blue text-white hover:bg-tapcraft-blue/90"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
            )}
          >
            {hasDesign ? "Remove Design" : "Browse Files"}
          </button>
        </div>
      </div>

      {hasDesign && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d97706"
              strokeWidth="2"
              className="mt-0.5 shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <p className="text-xs font-semibold text-amber-800">Custom design fee applies</p>
              <p className="mt-0.5 text-[11px] text-amber-600">
                An additional $5.00 per unit will be added for custom design processing and setup.
              </p>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Design Guidelines</h3>
        <ul className="space-y-2">
          {[
            "Use vector formats (SVG, AI) for best print quality",
            "Minimum 300 DPI for raster images",
            "Leave 2mm bleed area around edges",
            "Avoid thin lines under 0.5mm",
            "Our team will review and optimize your design",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2 text-xs text-gray-500">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1E73FF"
                strokeWidth="2"
                className="mt-0.5 shrink-0"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function CustomizationPanel({ config, onChange }: CustomizationPanelProps) {
  const [activeTab, setActiveTab] = useState("shape");
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tabsContainerRef.current || !indicatorRef.current) return;

    const activeButton = tabsContainerRef.current.querySelector(`[data-tab-id="${activeTab}"]`) as HTMLElement;
    if (activeButton) {
      const left = activeButton.offsetLeft + 8;
      const width = activeButton.offsetWidth - 16;
      gsap.to(indicatorRef.current, {
        left,
        width,
        duration: 0.3,
        ease: "power3.out",
      });
    }
  }, [activeTab]);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "shape":
        return <ShapeSelector config={config} onChange={onChange} />;
      case "color":
        return <ColorSelector config={config} onChange={onChange} />;
      case "material":
        return <MaterialSelector config={config} onChange={onChange} />;
      case "nfc":
        return <NFCPlacementControl config={config} onChange={onChange} />;
      case "text":
        return <TextCustomization config={config} onChange={onChange} />;
      case "upload":
        return <UploadTab config={config} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Tab navigation */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div ref={tabsContainerRef} className="relative flex overflow-x-auto scrollbar-hide">
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-0.5 rounded-full bg-tapcraft-blue"
            style={{ left: 8, width: 0 }}
          />
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                data-tab-id={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex shrink-0 flex-col items-center gap-1 px-4 py-3 text-[11px] font-medium transition-colors cursor-pointer",
                  isActive ? "text-tapcraft-blue" : "text-gray-400 hover:text-gray-600"
                )}
              >
                <div className={cn(isActive && "text-tapcraft-blue")}>{tab.icon}</div>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        <div key={activeTab} ref={contentRef}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
