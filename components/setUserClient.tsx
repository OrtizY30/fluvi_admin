"use client"; // ¡esto es clave!

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Business, Horary, ModifierGroup, SocialMedia, User } from "@/src/schemas";
import { useModifiersStore } from "@/store/useModifiersStore";
import { useHorariesStore } from "@/store/useHorariesStore";
import { useSocialStore } from "@/store/useSocialStore";
import { useBusinessStore } from "@/store/useBusinessStore";

type Props = {
  user: User;
  modifiers: ModifierGroup[]
  horaries: Horary[]
  socialMedia: SocialMedia
  business: Business
};

export default function SetUserClient({ user, modifiers, horaries, socialMedia, business }: Props) {
  const setUser = useUserStore((state) => state.setUser);
  const setModifiersGroups = useModifiersStore((state) => state.setModifiersGroups)
  const setHoraries = useHorariesStore((state) => state.setHoraries)
  const setBusiness = useBusinessStore((state) => state.setBusiness)
const setSocialMedia = useSocialStore((state) => state.setSocialMedias)

  useEffect(() => {
    if (user) {
      setUser(user)
      setBusiness(business)
      setModifiersGroups(modifiers)
      setHoraries(horaries)
      setSocialMedia(socialMedia)
    };

  }, [user, setUser, setBusiness, business, setModifiersGroups, modifiers, setHoraries, horaries, setSocialMedia, socialMedia]);

  return null;
}