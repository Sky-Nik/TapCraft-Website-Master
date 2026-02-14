"use client";

import { Suspense, useRef, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils/formatting";
import { SHAPES } from "@/lib/constants/customization";
import type { ShapeId } from "@/types/customization";

interface ThreeDViewerProps {
  color: string;
  material: string;
  shape?: ShapeId;
}

function LoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-50 rounded-xl">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-tapcraft-blue border-t-transparent" />
        <p className="text-sm text-gray-500">Loading 3D viewer...</p>
      </div>
    </div>
  );
}

const SceneCanvas = dynamic(() => import("./ThreeDViewerCanvas"), {
  ssr: false,
  loading: () => <LoadingFallback />,
});

export default function ThreeDViewer({
  color,
  material,
  shape = "business-card",
}: ThreeDViewerProps) {
  const resetRef = useRef<(() => void) | null>(null);

  const handleReset = useCallback(() => {
    resetRef.current?.();
  }, []);

  const shapeData = useMemo(
    () => SHAPES.find((s) => s.id === shape),
    [shape]
  );

  const width = shapeData?.defaultDimensions.width ?? 86;
  const height = shapeData?.defaultDimensions.height ?? 54;

  return (
    <div className={cn("relative w-full rounded-xl overflow-hidden bg-gray-50", "h-[400px] lg:h-[500px]")}>
      <Suspense fallback={<LoadingFallback />}>
        <SceneCanvas
          color={color}
          material={material}
          thickness={3}
          width={width}
          height={height}
          shape={shape}
          cornerRadius={shape === "round-tag" ? 20 : 4}
          resetRef={resetRef}
        />
      </Suspense>

      <button
        onClick={handleReset}
        className={cn(
          "absolute top-4 right-4 z-10",
          "flex items-center gap-1.5 rounded-lg px-3 py-2",
          "bg-white/90 backdrop-blur-sm shadow-md",
          "text-xs font-medium text-gray-700",
          "transition-[background-color,box-shadow] hover:bg-white hover:shadow-lg",
          "cursor-pointer"
        )}
        aria-label="Reset camera view"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 1 1 9 9" />
          <polyline points="3 3 3 12 12 12" />
        </svg>
        Reset View
      </button>

      <div className="absolute bottom-4 left-4 z-10 rounded-lg bg-white/90 backdrop-blur-sm px-3 py-1.5 shadow-sm">
        <p className="text-[10px] text-gray-500">
          {width}mm &times; {height}mm
        </p>
      </div>
    </div>
  );
}
