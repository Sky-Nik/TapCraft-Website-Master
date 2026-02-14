import * as React from "react";
import { cn } from "@/lib/utils/formatting";

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-[3px]",
  lg: "h-12 w-12 border-4",
} as const;

type SpinnerSize = keyof typeof sizeMap;

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  label?: string;
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size = "md", label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        className={cn("flex flex-col items-center justify-center gap-3", className)}
        {...props}
      >
        <div
          className={cn(
            "animate-spin rounded-full border-tapcraft-blue/20 border-t-tapcraft-blue",
            sizeMap[size]
          )}
        />
        {label && (
          <p className="text-sm text-gray-500 animate-pulse">{label}</p>
        )}
        <span className="sr-only">{label || "Loading..."}</span>
      </div>
    );
  }
);

LoadingSpinner.displayName = "LoadingSpinner";

export { LoadingSpinner };
