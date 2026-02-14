import * as React from "react";
import { cn } from "@/lib/utils/formatting";

const badgeVariants = {
  default: "bg-tapcraft-blue text-tapcraft-white",
  new: "bg-emerald-500 text-white",
  "best-seller": "bg-amber-500 text-white",
  "limited-edition": "bg-rose-500 text-white",
  outline: "border border-tapcraft-blue text-tapcraft-blue bg-transparent",
  muted: "bg-gray-100 text-gray-700",
} as const;

type BadgeVariant = keyof typeof badgeVariants;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase transition-colors",
          badgeVariants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
