import { create } from "zustand";

type UiStoreState = {
  activePattern: string | null;
  activeProblem: string | null;

  setActivePattern: (slug: string | null) => void;
  setActiveProblem: (slug: string | null) => void;
};

export const useUiStore = create<UiStoreState>((set) => ({
  activePattern: null,
  activeProblem: null,

  setActivePattern: (slug) => set({ activePattern: slug }),
  setActiveProblem: (slug) => set({ activeProblem: slug }),
}));

