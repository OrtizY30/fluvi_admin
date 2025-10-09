
"use server";

import { ErrorResponSchema, SuccessSchema, TokenSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function confirmAccount(
  token: string,
  prevState: ActionStateType
): Promise<ActionStateType> {

  const confirmToken = TokenSchema.safeParse(token);

  if (!confirmToken.success) {
    return {
      errors: confirmToken.error.issues
        .map((issue) => issue.message)
        .filter((e): e is string => Boolean(e)), // 🧼 limpia undefined
      success: "",
    };
  }

  try {
    const res = await fetch(`${process.env.API_URL}/auth/confirm-account`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: confirmToken.data,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      const { error } = ErrorResponSchema.parse(json);
      return {
        errors: [error || "Error desconocido"],
        success: "",
      };
    }

    // ✅ extraemos el string de éxito correctamente
    const parsed = SuccessSchema.parse(json);

    return {
      errors: [],
      success: parsed ?? "",
    };
  } catch (error) {
    return {
      ...prevState,
      errors: ["Error de conexión con el servidor"],
      success: "",
    };
  }
}

