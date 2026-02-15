"use client";

import Image from "next/image";
import { useCartContext } from "@/context/CartContext";
import type { CartItem as CartItemType } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem, isLoading } = useCartContext();

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 last:border-b-0">
      {/* Product Image */}
      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {item.title}
        </h3>
        {item.variantTitle !== "Default Title" && (
          <p className="text-xs text-gray-500 mt-0.5">{item.variantTitle}</p>
        )}
        <p className="text-sm font-semibold text-tapcraft-blue mt-1">
          A${item.price.toFixed(2)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-0">
            <button
              onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
              disabled={isLoading}
              className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-8 h-7 flex items-center justify-center border-t border-b border-gray-300 text-xs font-medium text-gray-900">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
              disabled={isLoading}
              className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.lineId)}
            disabled={isLoading}
            className="text-xs text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
            aria-label={`Remove ${item.title}`}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
