import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import {
  UserSchema,
  ModifierGroupsArrayAPIResponseSchema,
  HorariesApiResponseSchema,
  businessSchema,
  SocialMediaApiResponseSchema,
} from "../schemas";
import getToken from "./token";

export const verifySession = cache(async () => {
  const token = await getToken();

  if (!token) {
    redirect("/auth/login");
  }

  // 1. Usuario
  const userReq = await fetch(`${process.env.API_URL}/auth/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const userJson = await userReq.json();
  const parsedUser = UserSchema.safeParse(userJson);

  if (!parsedUser.success) {
    redirect("/auth/login");
  }

  const businessReq = await fetch(`${process.env.API_URL}/auth/business`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const businessJson = await businessReq.json();
  const parsedbusiness = businessSchema.safeParse(businessJson);

  if (!parsedbusiness.success) {
    console.error("Error al parsear modifiers:", parsedbusiness.error);
  }

  // 2. Modificadores
  const modifiersReq = await fetch(`${process.env.API_URL}/modifiersGroup`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const modifiersJson = await modifiersReq.json();

  const parsedModifiers =
    ModifierGroupsArrayAPIResponseSchema.safeParse(modifiersJson);

  if (!parsedModifiers.success) {
    console.error("Error al parsear modifiers:", parsedModifiers.error);
  }

  // 3. Horarios

  const horaryReq = await fetch(`${process.env.API_URL}/business/horary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const horariesJson = await horaryReq.json();
  const parsedHoraries = HorariesApiResponseSchema.safeParse(horariesJson);

  if (!parsedHoraries) {
    console.error("Error al parsear horary:");
  }

  // 4. Redes sociales

  const socialMediaReq = await fetch(`${process.env.API_URL}/business/social`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const socialMediaJson = await socialMediaReq.json();
  const parsedSocialMedia =
    SocialMediaApiResponseSchema.safeParse(socialMediaJson);

  if (!parsedSocialMedia) {
    console.error("Error al parsear horary:");
  }

  // 5. Retornar todo en un mismo objeto
  return {
    isAuth: true,
    user: parsedUser.data,
    business: parsedbusiness.data,
    modifiers: parsedModifiers.success ? parsedModifiers.data : [],
    horaries: parsedHoraries.success ? parsedHoraries.data : [],
    socialMedia: parsedSocialMedia.success ? parsedSocialMedia.data : {},
    // aquí puedes seguir sumando: settings, categorías, permisos, etc.
  };
});
