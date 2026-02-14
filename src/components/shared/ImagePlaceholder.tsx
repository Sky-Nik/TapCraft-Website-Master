import * as React from "react";
import { cn } from "@/lib/utils/formatting";

type MediaType = "image" | "video" | "gif" | "3d";

const gradientMap: Record<MediaType, string> = {
  image: "from-tapcraft-blue/20 to-blue-300/30",
  video: "from-blue-400/20 to-cyan-300/30",
  gif: "from-pink-400/20 to-orange-300/30",
  "3d": "from-emerald-400/20 to-teal-300/30",
};

const iconMap: Record<MediaType, React.ReactNode> = {
  image: (
    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  video: (
    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
    </svg>
  ),
  gif: (
    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 8.25v7.5m-6-3.75h3m0 0v3.75m0-3.75H12M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "3d": (
    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
};

export interface ImagePlaceholderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  name?: string;
  type?: MediaType;
  specs?: string;
}

const ImagePlaceholder = React.forwardRef<HTMLDivElement, ImagePlaceholderProps>(
  (
    {
      className,
      width = 400,
      height = 300,
      name,
      type = "image",
      specs,
      ...props
    },
    ref
  ) => {
    const displaySpecs = specs || `${width} x ${height}`;

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gradient-to-br overflow-hidden",
          gradientMap[type],
          className
        )}
        style={{ aspectRatio: `${width}/${height}` }}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center p-4">
          {iconMap[type]}
          {name && (
            <p className="text-sm font-medium text-gray-600 max-w-[80%] truncate">
              {name}
            </p>
          )}
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            {type} &middot; {displaySpecs}
          </p>
        </div>
      </div>
    );
  }
);

ImagePlaceholder.displayName = "ImagePlaceholder";

export { ImagePlaceholder };
