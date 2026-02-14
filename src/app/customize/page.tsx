"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils/formatting";
import { DEFAULT_CUSTOMIZATION_CONFIG } from "@/lib/constants/customization";
import type { CustomizationConfig } from "@/types/customization";
import { LightHeader } from "@/components/layout/LightHeader";
import ThreeDViewer from "@/components/customize/ThreeDViewer";
import CustomizationPanel from "@/components/customize/CustomizationPanel";
import PriceEstimator from "@/components/customize/PriceEstimator";
import ContactForm from "@/components/customize/ContactForm";

const DEFAULT_CONFIG: CustomizationConfig = {
  ...DEFAULT_CUSTOMIZATION_CONFIG,
  quantity: 10,
};

export default function CustomizePage() {
  const [config, setConfig] = useState<CustomizationConfig>(DEFAULT_CONFIG);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);

  const handleConfigChange = useCallback((updates: Partial<CustomizationConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleQuantityChange = useCallback((quantity: number) => {
    setConfig((prev) => ({ ...prev, quantity }));
  }, []);

  const handleSave = useCallback(() => {
    try {
      const serializable = {
        ...config,
        designUpload: config.designUpload
          ? { ...config.designUpload, file: null }
          : null,
      };
      localStorage.setItem("tapcraft-config", JSON.stringify(serializable));
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 3000);
    } catch {
      console.error("Failed to save configuration");
    }
  }, [config]);

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  useEffect(() => {
    if (showSaveToast && toastRef.current) {
      gsap.fromTo(
        toastRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [showSaveToast]);

  useEffect(() => {
    if (!showSaveToast && toastRef.current) {
      gsap.to(toastRef.current, { opacity: 0, y: 20, duration: 0.2 });
    }
  }, [showSaveToast]);

  return (
    <>
      <LightHeader />
      <div className="flex min-h-screen flex-col bg-gray-50">
        {/* Toolbar */}
        <div className="border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div>
              <p className="text-tapcraft-blue text-xs font-semibold tracking-widest uppercase">Customize</p>
              <h1 className="text-lg font-normal text-gray-900 mt-0.5">
                3D NFC Tag Configurator
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className={cn(
                  "rounded-lg bg-tapcraft-blue px-4 py-2 text-xs font-semibold text-white transition-[background-color,box-shadow] cursor-pointer",
                  "hover:bg-tapcraft-blue/90 hover:shadow-md"
                )}
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col lg:flex-row">
        <div className="w-full lg:w-[60%] p-4 sm:p-6">
          <div className="sticky top-4">
            <ThreeDViewer
              color={config.color}
              material={config.material}
              shape={config.shape}
            />
            <div className="mt-4 hidden lg:grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-gray-200 bg-white p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Shape</p>
                <p className="mt-0.5 text-sm font-semibold text-gray-800 capitalize">
                  {config.shape.replace(/-/g, " ")}
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Material</p>
                <p className="mt-0.5 text-sm font-semibold text-gray-800 capitalize">
                  {config.material.replace(/-/g, " ")}
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">NFC Chip</p>
                <p className="mt-0.5 text-sm font-semibold text-gray-800 uppercase">{config.nfcChip}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[40%] border-t lg:border-t-0 lg:border-l border-gray-200 bg-white">
          <CustomizationPanel config={config} onChange={handleConfigChange} />
        </div>
        </div>

        <div className="sticky bottom-0 z-20">
          <PriceEstimator config={config} onQuantityChange={handleQuantityChange} />
        </div>

        <ContactForm
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          config={config}
        />

        {/* Save toast */}
        {showSaveToast && (
          <div
            ref={toastRef}
            className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Configuration saved
            </div>
          </div>
        )}
      </div>
    </>
  );
}
