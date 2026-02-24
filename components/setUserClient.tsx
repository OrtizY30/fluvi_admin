"use client"; // ¡esto es clave!

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Business, Category, Horary, ModifierGroup, SocialMedia, User } from "@/src/schemas";
import { useModifiersStore } from "@/store/useModifiersStore";
import { useHorariesStore } from "@/store/useHorariesStore";
import { useSocialStore } from "@/store/useSocialStore";
import { useBusinessStore } from "@/store/useBusinessStore";
import { useCategoriesStore } from "@/store/useCategoriesStore";

type Props = {
  user: User;
  modifiers: ModifierGroup[]
  horaries: Horary[]
  socialMedia: SocialMedia
  business: Business
  categories: Category[]
};

export default function SetUserClient({ user, modifiers, horaries, socialMedia, business, categories }: Props) {
  const setUser = useUserStore((state) => state.setUser);
  const setModifiersGroups = useModifiersStore((state) => state.setModifiersGroups)
  const setHoraries = useHorariesStore((state) => state.setHoraries)
  const setBusiness = useBusinessStore((state) => state.setBusiness)
const setSocialMedia = useSocialStore((state) => state.setSocialMedias)
const setCategories = useCategoriesStore((state) => state.setCategories)

  useEffect(() => {
    if (user) {
      setUser(user)
      setBusiness(business)
      setModifiersGroups(modifiers)
      setHoraries(horaries)
      setSocialMedia(socialMedia)
      setCategories(categories)
    };

  }, [user , setUser, setBusiness, business, setModifiersGroups, modifiers, setHoraries, horaries, setSocialMedia, socialMedia, setCategories, categories]);

  return null;
}