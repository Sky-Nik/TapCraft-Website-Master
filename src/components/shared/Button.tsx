import * as React from "react";
import { cn } from "@/lib/utils/formatting";

const buttonVariants = {
  variant: {
    primary:
      "bg-tapcraft-blue text-white hover:bg-tapcraft-blue/90 shadow-sm",
    secondary:
      "border-2 border-tapcraft-blue text-tapcraft-blue bg-transparent hover:bg-tapcraft-blue hover:text-tapcraft-white",
    ghost:
      "bg-transparent text-tapcraft-blue hover:bg-tapcraft-blue/10",
  },
  size: {
    sm: "h-8 px-3 text-sm rounded-md gap-1.5",
    md: "h-10 px-5 text-sm rounded-lg gap-2",
    lg: "h-12 px-8 text-base rounded-lg gap-2.5",
  },
} as const;

type Variant = keyof typeof buttonVariants.variant;
type Size = keyof typeof buttonVariants.size;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      asChild: _asChild = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tapcraft-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          isDisabled && "pointer-events-none opacity-50",
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
