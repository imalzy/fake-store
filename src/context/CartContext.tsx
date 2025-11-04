import type { Product } from "@/components/ui/ProductCard";
import { createContext, useContext } from "react";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product, userId: string) => Promise<void>;
  updateRemoteCart: (cartId: number, userId: string) => Promise<void>;
  removeCart: (cartId: number) => Promise<void>;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
