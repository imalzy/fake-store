import type { Product } from "@/components/ui/ProductCard";
import { CartContext, type CartItem } from "@/context/cartContext";
import { useState, type ReactNode } from "react";
import { toast } from "react-toastify";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = async (product: Product, userId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // await createCart({
    //   userId,
    //   date: new Date().toISOString().split("T")[0],
    //   products: [{ productId: product.id, quantity: 1 }],
    // });
    toast.success("Product added to cart!");
  };

  const updateRemoteCart = async (
    cartId: number,
    userId: string,
    updatedItem?: { productId: number; quantity: number }
  ) => {
    if (!updatedItem) {
      toast.error("Updated item is required to update the cart!");
      return;
    }

    try {
      setCart((prev) => {
        const existingItem = prev.find(
          (item) => item.id === updatedItem.productId
        );

        if (!existingItem) {
          return [
            ...prev,
            {
              id: updatedItem.productId,
              quantity: updatedItem.quantity,
            } as CartItem,
          ];
        }

        return prev.map((item) =>
          item.id === updatedItem.productId
            ? ({ ...item, quantity: updatedItem.quantity } as CartItem)
            : item
        ) as CartItem[];
      });

      // Prepare data to sync with API
      const products = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      // await updateCart(cartId, {
      //   userId,
      //   date: new Date().toISOString().split("T")[0],
      //   products,
      // });
      toast.success("Cart updated successfully! 🛒");
    } catch (error) {
      toast.error("Failed to sync with server");
    }
  };

  const removeCart = async (cartId: number) => {
    //  await deleteCart(cartId);
    setCart([]);
    toast.success("Cart deleted!");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateRemoteCart, removeCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
