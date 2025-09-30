import { Business } from "@/src/schemas";
import { create } from "zustand";

interface BusinessStore {
    business: Business | null;
    setBusiness: (business: Business) => void;
} 

export const useBusinessStore = create<BusinessStore>((set) => ({
    business: null,
    setBusiness: (business) => set({business})
}))