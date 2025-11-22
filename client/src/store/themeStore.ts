import { create } from "zustand";

interface ThemeStore {
  colorScheme: "light" | "dark";
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set: any) => ({
  colorScheme: "light",
  toggleTheme: () =>
    set((state: any) => ({
      colorScheme: state.colorScheme === "light" ? "dark" : "light",
    })),
}));
