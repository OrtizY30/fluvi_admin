import { create } from "zustand";
import { ModifierGroup } from "@/src/schemas";

type State = {
  modifierGroups: ModifierGroup[];
  loading: boolean;
  error: string | null;
  setModifiersGroups: (modifierGroups: ModifierGroup[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useModifiersStore = create<State>((set) => ({
  modifierGroups: [],
  loading: false,
  error: null,

  setModifiersGroups: (modifierGroups) => set({ modifierGroups }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
