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
import type { ShopifyCart, ShopifyCartLineItem } from "@/lib/shopify/types";
import {
  createCart,
  addToCart as shopifyAddToCart,
  updateCartItem as shopifyUpdateCartItem,
  removeFromCart as shopifyRemoveFromCart,
  getCart,
} from "@/lib/shopify/cart";

const CART_ID_KEY = "tapcraft_cart_id";

export interface CartItem {
  lineId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  price: number;
  quantity: number;
  image?: string;
  handle: string;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  cartId: string | null;
  checkoutUrl: string | null;
  subtotal: number;
  itemCount: number;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function mapCartLines(cart: ShopifyCart): CartItem[] {
  return cart.lines.edges.map(({ node }: { node: ShopifyCartLineItem }) => ({
    lineId: node.id,
    variantId: node.merchandise.id,
    title: node.merchandise.product.title,
    variantTitle: node.merchandise.title,
    price: parseFloat(node.merchandise.price.amount),
    quantity: node.quantity,
    image: node.merchandise.product.featuredImage?.url,
    handle: node.merchandise.product.handle,
  }));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_ID_KEY);
    if (savedCartId) {
      setCartId(savedCartId);
      setIsLoading(true);
      getCart(savedCartId)
        .then((cart) => {
          if (cart) {
            setItems(mapCartLines(cart));
            setCheckoutUrl(cart.checkoutUrl);
          } else {
            // Cart no longer exists, clear stored ID
            localStorage.removeItem(CART_ID_KEY);
            setCartId(null);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const updateCartState = useCallback((cart: ShopifyCart) => {
    setCartId(cart.id);
    setCheckoutUrl(cart.checkoutUrl);
    setItems(mapCartLines(cart));
    localStorage.setItem(CART_ID_KEY, cart.id);
  }, []);

  const addItem = useCallback(
    async (variantId: string, quantity: number = 1) => {
      setIsLoading(true);
      try {
        let cart: ShopifyCart | null;

        if (cartId) {
          cart = await shopifyAddToCart(cartId, variantId, quantity);
        } else {
          cart = await createCart([{ merchandiseId: variantId, quantity }]);
        }

        if (cart) {
          updateCartState(cart);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cartId, updateCartState]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cartId) return;
      setIsLoading(true);
      try {
        const cart = await shopifyRemoveFromCart(cartId, lineId);
        if (cart) {
          updateCartState(cart);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cartId, updateCartState]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cartId) return;
      if (quantity <= 0) {
        return removeItem(lineId);
      }
      setIsLoading(true);
      try {
        const cart = await shopifyUpdateCartItem(cartId, lineId, quantity);
        if (cart) {
          updateCartState(cart);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cartId, removeItem, updateCartState]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setCartId(null);
    setCheckoutUrl(null);
    localStorage.removeItem(CART_ID_KEY);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
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
      cartId,
      checkoutUrl,
      subtotal,
      itemCount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      items,
      isOpen,
      isLoading,
      cartId,
      checkoutUrl,
      subtotal,
      itemCount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
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
