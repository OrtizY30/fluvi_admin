import { create } from "zustand";
import { Horary } from "@/src/schemas";

type State = {
  horaries: Horary[];
  loading: boolean;
  error: string | null;
  setHoraries: (horaries: Horary[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useHorariesStore = create<State>((set) => ({
  horaries: [],
  loading: false,
  error: null,

  setHoraries: (horaries) => set({ horaries }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
