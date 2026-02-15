"use client";

import { useState, useCallback } from "react";
import { useCartContext } from "@/context/CartContext";
import { Button } from "@/components/shared/Button";

interface AddToCartButtonProps {
  variantId: string;
  quantity?: number;
  disabled?: boolean;
  className?: string;
}

export function AddToCartButton({
  variantId,
  quantity = 1,
  disabled = false,
  className,
}: AddToCartButtonProps) {
  const { addItem, openCart } = useCartContext();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleAddToCart = useCallback(async () => {
    if (status === "loading") return;
    setStatus("loading");
    try {
      await addItem(variantId, quantity);
      setStatus("success");
      openCart();
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("idle");
    }
  }, [variantId, quantity, addItem, openCart, status]);

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || status === "loading"}
      loading={status === "loading"}
      variant="primary"
      size="lg"
      className={className}
    >
      {status === "success" ? (
        <span className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Added!
        </span>
      ) : (
        "Add to Cart"
      )}
    </Button>
  );
}
