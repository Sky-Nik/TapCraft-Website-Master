"use client";

import { useCartContext } from "@/context/CartContext";

interface CartIconProps {
  variant?: "dark" | "light";
}

export function CartIcon({ variant = "dark" }: CartIconProps) {
  const { itemCount, openCart } = useCartContext();

  return (
    <button
      onClick={openCart}
      type="button"
      className={`inline-flex items-center justify-center w-10 h-10 rounded-md transition-colors relative ${
        variant === "light"
          ? "text-gray-900 hover:text-tapcraft-blue"
          : "text-white hover:text-tapcraft-blue"
      }`}
      aria-label={`Shopping cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-tapcraft-blue text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
}
