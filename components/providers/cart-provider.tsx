"use client";

import React from "react";

import { getAllProducts, type Product } from "@/lib/products";

export type CartItem = {
  id: string; // productId + option signature
  productId: string;
  quantity: number;
  selectedOptions?: Record<string, string>;
};

interface CartContextValue {
  items: CartItem[];
  populatedItems: (CartItem & { product: Product })[];
  count: number;
  subtotal: number;
  addItem: (
    productId: string,
    selectedOptions?: Record<string, string>,
    quantity?: number,
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = React.createContext<CartContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "gsc_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const products = React.useMemo(() => getAllProducts(), []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        setItems(parsed);
      }
    } catch {
      // ignore corrupted cart, start fresh
    }
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore write failures
    }
  }, [items]);

  const value = React.useMemo<CartContextValue>(() => {
    const populated = items
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return { ...item, product };
      })
      .filter(Boolean) as (CartItem & { product: Product })[];

    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = populated.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const addItem: CartContextValue["addItem"] = (
      productId,
      selectedOptions = {},
      quantity = 1,
    ) => {
      setItems((prev) => {
        const id = buildCartItemId(productId, selectedOptions);
        const existing = prev.find((item) => item.id === id);
        if (existing) {
          return prev.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }
        return [
          ...prev,
          {
            id,
            productId,
            selectedOptions,
            quantity,
          },
        ];
      });
    };

    const removeItem: CartContextValue["removeItem"] = (id) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity: CartContextValue["updateQuantity"] = (
      id,
      quantity,
    ) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
        ),
      );
    };

    const clearCart: CartContextValue["clearCart"] = () => setItems([]);

    return {
      items,
      populatedItems: populated,
      count,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    };
  }, [items, products]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function buildCartItemId(
  productId: string,
  selectedOptions: Record<string, string>,
) {
  const optionKey = Object.entries(selectedOptions)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${value}`)
    .join("|");
  return optionKey ? `${productId}-${optionKey}` : productId;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
