import { create } from "zustand";
import { SocialMedia } from "@/src/schemas";

type State = {
  socialMedia: SocialMedia;
  loading: boolean;
  error: string | null;
  setSocialMedias: (socialMedia: SocialMedia) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useSocialStore = create<State>((set) => ({
  socialMedia: {
    id: 1,
    facebook: '',
    instagram: '',
    tiktok : '',
    whatsapp: ''
    
  },
  loading: false,
  error: null,

  setSocialMedias: (socialMedia) => set({ socialMedia }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
