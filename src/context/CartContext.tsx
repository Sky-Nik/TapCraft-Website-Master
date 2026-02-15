"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import type { ReactNode } from "react";
import {
  createCart,
  addToCart,
  updateCartLine,
  removeCartLine,
  getCart,
  mapCartLines,
} from "@/lib/shopify/cart";
import type { MappedCartLine } from "@/lib/shopify/cart";

const CART_ID_KEY = "tapcraft_cart_id";

interface CartContextValue {
  items: MappedCartLine[];
  isOpen: boolean;
  isLoading: boolean;
  subtotal: number;
  itemCount: number;
  checkoutUrl: string | null;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MappedCartLine[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load existing cart from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_ID_KEY);
    if (savedCartId) {
      setIsLoading(true);
      getCart(savedCartId)
        .then((cart) => {
          if (cart && cart.lines.edges.length > 0) {
            setCartId(cart.id);
            setCheckoutUrl(cart.checkoutUrl);
            setItems(mapCartLines(cart));
          } else {
            // Cart is empty or expired
            localStorage.removeItem(CART_ID_KEY);
          }
        })
        .catch(() => {
          localStorage.removeItem(CART_ID_KEY);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const addItem = useCallback(
    async (variantId: string, quantity: number = 1) => {
      setIsLoading(true);
      try {
        let cart;
        if (cartId) {
          cart = await addToCart(cartId, variantId, quantity);
        } else {
          cart = await createCart(variantId, quantity);
        }

        if (cart) {
          setCartId(cart.id);
          setCheckoutUrl(cart.checkoutUrl);
          setItems(mapCartLines(cart));
          localStorage.setItem(CART_ID_KEY, cart.id);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cartId]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cartId) return;
      setIsLoading(true);
      try {
        const cart = await removeCartLine(cartId, lineId);
        if (cart) {
          setItems(mapCartLines(cart));
          setCheckoutUrl(cart.checkoutUrl);
          if (cart.lines.edges.length === 0) {
            setCartId(null);
            setCheckoutUrl(null);
            localStorage.removeItem(CART_ID_KEY);
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cartId]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cartId) return;

      if (quantity <= 0) {
        await removeItem(lineId);
        return;
      }

      setIsLoading(true);
      try {
        const cart = await updateCartLine(cartId, lineId, quantity);
        if (cart) {
          setItems(mapCartLines(cart));
          setCheckoutUrl(cart.checkoutUrl);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cartId, removeItem]
  );

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.totalPrice, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      isLoading,
      subtotal,
      itemCount,
      checkoutUrl,
      addItem,
      removeItem,
      updateQuantity,
      openCart,
      closeCart,
    }),
    [
      items,
      isOpen,
      isLoading,
      subtotal,
      itemCount,
      checkoutUrl,
      addItem,
      removeItem,
      updateQuantity,
      openCart,
      closeCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
