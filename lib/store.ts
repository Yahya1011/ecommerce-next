import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, action: "plus" | "minus") => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        }),

      updateQuantity: (id, action) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              const newQty =
                action === "plus" ? item.quantity + 1 : item.quantity - 1;
              // Kembalikan item dengan quantity baru (minimal 1)
              return { ...item, quantity: Math.max(1, newQty) };
            }
            return item;
          }),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    { name: "cart-storage" }, // Data tersimpan di browser meskipun di-refresh
  ),
);
