"use client";

import { useState, useCallback, useEffect } from "react";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}

const CART_STORAGE_KEY = "tapcraft_cart";

export function useCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalPrice: 0,
    totalItems: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  const saveCart = useCallback((updatedCart: Cart) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    setCart(updatedCart);
  }, []);

  const addToCart = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      setCart((prevCart) => {
        const existingItem = prevCart.items.find((i) => i.id === item.id);
        let updatedItems: CartItem[];

        if (existingItem) {
          updatedItems = prevCart.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          );
        } else {
          updatedItems = [
            ...prevCart.items,
            { ...item, quantity: item.quantity || 1 },
          ];
        }

        const totalItems = updatedItems.reduce((sum, i) => sum + i.quantity, 0);
        const totalPrice = updatedItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );

        const updatedCart = { items: updatedItems, totalItems, totalPrice };
        saveCart(updatedCart);
        return updatedCart;
      });
    },
    [saveCart]
  );

  const removeFromCart = useCallback(
    (itemId: string) => {
      setCart((prevCart) => {
        const updatedItems = prevCart.items.filter((i) => i.id !== itemId);
        const totalItems = updatedItems.reduce((sum, i) => sum + i.quantity, 0);
        const totalPrice = updatedItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );

        const updatedCart = { items: updatedItems, totalItems, totalPrice };
        saveCart(updatedCart);
        return updatedCart;
      });
    },
    [saveCart]
  );

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(itemId);
        return;
      }

      setCart((prevCart) => {
        const updatedItems = prevCart.items.map((i) =>
          i.id === itemId ? { ...i, quantity } : i
        );
        const totalItems = updatedItems.reduce((sum, i) => sum + i.quantity, 0);
        const totalPrice = updatedItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );

        const updatedCart = { items: updatedItems, totalItems, totalPrice };
        saveCart(updatedCart);
        return updatedCart;
      });
    },
    [removeFromCart, saveCart]
  );

  const clearCart = useCallback(() => {
    const emptyCart = { items: [], totalPrice: 0, totalItems: 0 };
    saveCart(emptyCart);
  }, [saveCart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}
