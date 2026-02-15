"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext";
import { CartItem } from "@/components/cart/CartItem";
import { Button } from "@/components/shared/Button";

export function CartDrawer() {
  const {
    items,
    isOpen,
    isLoading,
    subtotal,
    itemCount,
    checkoutUrl,
    closeCart,
  } = useCartContext();

  // Close on ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    },
    [closeCart]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 transition-opacity"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            Your Cart
            {itemCount > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({itemCount} {itemCount === 1 ? "item" : "items"})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="rounded-md p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Content */}
        {items.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p className="text-gray-500 text-base mb-1">Your cart is empty</p>
            <p className="text-gray-400 text-sm mb-6">
              Add some products to get started.
            </p>
            <Button
              onClick={closeCart}
              variant="primary"
              size="md"
            >
              <Link
                href="/catalogue"
                onClick={closeCart}
                className="no-underline text-white"
              >
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Item List */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.map((item) => (
                <CartItem key={item.lineId} item={item} />
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-5 space-y-4 bg-gray-50/50">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-gray-700">
                  Subtotal
                </span>
                <span className="text-lg font-bold text-gray-900">
                  A${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Shipping & taxes calculated at checkout.
              </p>
              {checkoutUrl ? (
                <a
                  href={checkoutUrl}
                  className="block w-full"
                >
                  <Button
                    disabled={isLoading || items.length === 0}
                    loading={isLoading}
                    className="w-full"
                    size="lg"
                  >
                    Checkout
                  </Button>
                </a>
              ) : (
                <Button
                  disabled
                  className="w-full"
                  size="lg"
                >
                  Checkout
                </Button>
              )}
              <button
                onClick={closeCart}
                className="block w-full text-center text-sm text-gray-500 hover:text-tapcraft-blue transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
