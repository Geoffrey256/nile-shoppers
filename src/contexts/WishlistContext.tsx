import { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "@/data/products";

interface WishlistContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  toggleItem: (product: Product) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>([]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeItem = (id: number) => setItems((prev) => prev.filter((p) => p.id !== id));

  const isInWishlist = (id: number) => items.some((p) => p.id === id);

  const toggleItem = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const clearWishlist = () => setItems([]);

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, toggleItem, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
