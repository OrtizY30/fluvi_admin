import { Category } from "@/src/schemas";
import { create } from "zustand";

interface CategoriesStore {
    categories: Category[] | null;
    setCategories: (categories: Category[]) => void;
} 

export const useCategoriesStore = create<CategoriesStore>((set) => ({
    categories: null,
    setCategories: (categories) => set({categories})
}))