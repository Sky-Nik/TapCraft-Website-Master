"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/shared/Button";

interface CartDrawerProps {
  variant?: "dark" | "light";
}

export function CartDrawer({ variant = "dark" }: CartDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <>
      {/* Cart Icon */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className={`inline-flex items-center justify-center w-10 h-10 rounded-md transition-colors relative ${
          variant === "light"
            ? "text-gray-900 hover:text-tapcraft-blue"
            : "text-white hover:text-tapcraft-blue"
        }`}
        aria-label="Shopping cart"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        {cart.totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-tapcraft-blue text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cart.totalItems}
          </span>
        )}
      </button>

      {/* Cart Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full min-h-screen md:max-w-md bg-white shadow-lg z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {cart.items.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Button asChild>
              <Link href="/catalogue" onClick={() => setIsOpen(false)}>
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="p-6 space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="p-6 border-t border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">
                  Total:
                </span>
                <span className="text-lg font-bold text-tapcraft-blue">
                  ${cart.totalPrice.toFixed(2)}
                </span>
              </div>
              <Button asChild className="w-full">
                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                  Proceed to Checkout
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
