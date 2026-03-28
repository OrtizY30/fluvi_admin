import "server-only";

import { cache } from "react";
import { ModifierGroupsArrayAPIResponseSchema } from "../schemas";
import getToken from "../auth/token";

export const getModifiers = cache(async () => {
  try {
    const token = await getToken(); // 👈 sacamos el token como en verifySession

    if (!token) {
      throw new Error("No hay token, el usuario no está autenticado");
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/modifiersGroup`;
    const req = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`, // 👈 agregamos el token
      },
    });

    if (!req.ok) {
      throw new Error("Error al obtener modificadores");
    }

    const json = await req.json();

    const result = ModifierGroupsArrayAPIResponseSchema.safeParse(json);

    if (!result.success) {
      throw new Error("Respuesta del servidor inválida");
    }

    return {
      modifiersGroups: result.data,
    };
  } catch (err) {
    console.log(err);
  }
});
