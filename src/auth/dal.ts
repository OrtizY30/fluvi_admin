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
     console.log("Token en verifySession eliminado:", token);
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

  // 2. Empresa
  const businessReq = await fetch(`${process.env.API_URL}/auth/business`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const businessJson = await businessReq.json();
  const parsedBusiness = businessSchema.safeParse(businessJson);

  if (!parsedBusiness.success) {
    console.error("Error al parsear business:", parsedBusiness.error);
  }

  // 3. Modificadores
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

  // 4. Horarios
  const horaryReq = await fetch(`${process.env.API_URL}/business/horary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const horariesJson = await horaryReq.json();
  const parsedHoraries = HorariesApiResponseSchema.safeParse(horariesJson);

  if (!parsedHoraries.success) {
    console.error("Error al parsear horary:", parsedHoraries.error);
  }

  // 5. Redes sociales
  const socialMediaReq = await fetch(`${process.env.API_URL}/business/social`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const socialMediaJson = await socialMediaReq.json();
  const parsedSocialMedia =
    SocialMediaApiResponseSchema.safeParse(socialMediaJson);

  // ✅ Usamos fallback si el parseo falla
  let socialMedia;
  if (parsedSocialMedia.success) {
    socialMedia = parsedSocialMedia.data;
  } else {
    socialMedia = {
      id: 0,
      instagram: null,
      facebook: null,
      tiktok: null,
      whatsapp: null,
    };
  }

  // 6. Retornar todo junto
  return {
    isAuth: true,
    user: parsedUser.data,
    business: parsedBusiness.data,
    modifiers: parsedModifiers.success ? parsedModifiers.data : [],
    horaries: parsedHoraries.success ? parsedHoraries.data : [],
    socialMedia, // 👈 aquí usamos el objeto correcto
  };
});
