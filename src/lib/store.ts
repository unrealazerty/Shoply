import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = { id: string; qty: number };

type CartState = {
  items: CartItem[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (id, qty = 1) =>
        set((s) => {
          const found = s.items.find((i) => i.id === id);
          if (found) return { items: s.items.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i)) };
          return { items: [...s.items, { id, qty }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) => set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)) })),
      clear: () => set({ items: [] }),
    }),
    { name: "shoply-cart" }
  )
);

type WishState = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
};

export const useWishlist = create<WishState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id] })),
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    { name: "shoply-wish" }
  )
);

type ThemeState = { theme: "light" | "dark"; toggle: () => void };
export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      toggle: () =>
        set((s) => {
          const next = s.theme === "light" ? "dark" : "light";
          if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", next === "dark");
          return { theme: next };
        }),
    }),
    { name: "shoply-theme" }
  )
);
